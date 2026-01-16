import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Verify admin authentication
function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) return null;
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch {
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = verifyAuth(request);
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin ID' },
        { status: 400 }
      );
    }

    const admin = await Admin.findById(id).select('-password');

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: admin });
  } catch (error) {
    console.error('Error fetching admin:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = verifyAuth(request);
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // If password is being updated, hash it
    if (body.password) {
      // Only superadmin or the admin themselves can change password
      if (auth.role !== 'superadmin' && auth.id !== id) {
        return NextResponse.json(
          { error: 'Unauthorized to change password' },
          { status: 403 }
        );
      }
      body.password = await bcrypt.hash(body.password, 10);
    }
    
    // Only superadmin can change role
    if (body.role && auth.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Unauthorized to change role' },
        { status: 403 }
      );
    }
    
    const admin = await Admin.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: admin });
  } catch (error) {
    console.error('Error updating admin:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update admin' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = verifyAuth(request);
    
    if (!auth || auth.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Unauthorized. Only superadmin can delete admins.' },
        { status: 403 }
      );
    }

    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin ID' },
        { status: 400 }
      );
    }
    
    // Prevent deleting yourself
    if (auth.id === id) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete yourself' },
        { status: 400 }
      );
    }

    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Admin deleted' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete admin' },
      { status: 500 }
    );
  }
}
