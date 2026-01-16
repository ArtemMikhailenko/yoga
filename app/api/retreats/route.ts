import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Retreat from '@/models/Retreat';

export async function GET() {
  try {
    await dbConnect();
    const retreats = await Retreat.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json({ success: true, data: retreats });
  } catch (error) {
    console.error('Error fetching retreats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch retreats' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const retreat = await Retreat.create(body);
    return NextResponse.json({ success: true, data: retreat }, { status: 201 });
  } catch (error) {
    console.error('Error creating retreat:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create retreat' },
      { status: 500 }
    );
  }
}
