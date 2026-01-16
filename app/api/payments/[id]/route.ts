import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Payment from '@/models/Payment';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Verify admin authentication
function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) return false;
  
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment ID' },
        { status: 400 }
      );
    }

    const payment = await Payment.findById(id).populate('bookingId');

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: payment });
  } catch (error) {
    console.error('Error fetching payment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch payment' },
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

    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // If status is being updated to completed, set paidAt
    if (body.status === 'completed' && !body.paidAt) {
      body.paidAt = new Date();
    }
    
    // If status is being updated to refunded, set refundedAt
    if (body.status === 'refunded' && !body.refundedAt) {
      body.refundedAt = new Date();
    }
    
    const payment = await Payment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate('bookingId');

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: payment });
  } catch (error) {
    console.error('Error updating payment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update payment' },
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

    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment ID' },
        { status: 400 }
      );
    }

    const payment = await Payment.findByIdAndDelete(id);

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Payment deleted' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete payment' },
      { status: 500 }
    );
  }
}
