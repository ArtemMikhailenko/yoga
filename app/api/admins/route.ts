import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

export async function GET(request: NextRequest) {
  try {
    const auth = verifyAuth(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    // Only return non-sensitive data
    const admins = await Admin.find({}).select('-password').sort({ createdAt: -1 });
      
    return NextResponse.json({ success: true, data: admins });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admins' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = verifyAuth(request);
    if (!auth || auth.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Unauthorized. Only superadmin can add admins.' },
        { status: 403 }
      );
    }

    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: body.email });
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: 'Admin with this email already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    const admin = await Admin.create({
      ...body,
      password: hashedPassword,
    });
    
    // Remove password from response
    const adminData = admin.toObject();
    delete adminData.password;
    
    return NextResponse.json(
      { success: true, data: adminData },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
