import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import jwt from 'jsonwebtoken';
import { createCalendarEvent, checkAvailability } from '@/lib/googleCalendar';

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const publicRequest = searchParams.get('public') === 'true';
    const date = searchParams.get('date');
    const email = searchParams.get('email');
    
    // Публичный запрос - не требует авторизации
    if (publicRequest) {
      await dbConnect();
      const query: any = { status: { $in: ['confirmed', 'pending'] } };
      
      if (date) {
        const dateObj = new Date(date);
        const startOfDay = new Date(dateObj);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(dateObj);
        endOfDay.setHours(23, 59, 59, 999);
        query.date = { $gte: startOfDay, $lte: endOfDay };
      }
      
      if (email) {
        query.clientEmail = email;
      }
      
      const bookings = await Booking.find(query)
        .select('date time serviceType status')
        .sort({ date: 1, time: 1 });
        
      return NextResponse.json({ success: true, data: bookings });
    }
    
    // Check authentication for admin
    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    // Get query parameters
    const status = searchParams.get('status');
    const serviceType = searchParams.get('serviceType');
    
    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (serviceType) query.serviceType = serviceType;
    
    const bookings = await Booking.find(query)
      .populate('retreatId', 'title dates')
      .sort({ date: -1 });
      
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    if (!body.clientName || !body.clientEmail || !body.date || !body.serviceType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Проверяем доступность времени в Google Calendar (если указано время)
    if (body.time) {
      try {
        const dateObj = new Date(body.date);
        const isAvailable = await checkAvailability(dateObj, body.time);
        
        if (!isAvailable) {
          return NextResponse.json(
            { success: false, error: 'This time slot is no longer available' },
            { status: 409 }
          );
        }
      } catch (calendarError) {
        console.log('Calendar check skipped:', calendarError);
        // Продолжаем без проверки календаря если он не настроен
      }
    }
    
    const booking = await Booking.create(body);
    
    // Создаем событие в Google Calendar
    if (body.time && process.env.GOOGLE_CALENDAR_ID) {
      try {
        const [hours, minutes] = body.time.split(':').map(Number);
        const startDateTime = new Date(body.date);
        startDateTime.setHours(hours, minutes, 0, 0);
        
        const endDateTime = new Date(startDateTime);
        endDateTime.setHours(endDateTime.getHours() + 1);
        
        const serviceNames: { [key: string]: string } = {
          'group': 'Group Yoga Class',
          'private': '1:1 Yoga Class',
          'coaching': 'Vedic Psychology Session',
          'training': 'Physical Training',
        };
        
        const eventId = await createCalendarEvent({
          summary: `${serviceNames[body.serviceType] || body.serviceType} - ${body.clientName}`,
          description: `Клиент: ${body.clientName}\nEmail: ${body.clientEmail}\nТелефон: ${body.clientPhone || 'не указан'}\nУслуга: ${serviceNames[body.serviceType] || body.serviceType}`,
          start: startDateTime,
          end: endDateTime,
          attendeeEmail: body.clientEmail,
          attendeeName: body.clientName,
        });
        
        // Обновляем бронирование с ID события Google Calendar
        if (eventId) {
          await Booking.findByIdAndUpdate(booking._id, { googleEventId: eventId });
        }
      } catch (calendarError) {
        console.log('Calendar event creation skipped:', calendarError);
      }
    }
    
    return NextResponse.json(
      { success: true, data: booking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
