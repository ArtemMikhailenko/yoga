import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Retreat from '@/models/Retreat';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const retreat = await Retreat.findById(id);
    
    if (!retreat) {
      return NextResponse.json(
        { success: false, error: 'Retreat not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: retreat });
  } catch (error) {
    console.error('Error fetching retreat:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch retreat' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const retreat = await Retreat.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!retreat) {
      return NextResponse.json(
        { success: false, error: 'Retreat not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: retreat });
  } catch (error) {
    console.error('Error updating retreat:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update retreat' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const retreat = await Retreat.findByIdAndDelete(id);
    
    if (!retreat) {
      return NextResponse.json(
        { success: false, error: 'Retreat not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting retreat:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete retreat' },
      { status: 500 }
    );
  }
}
