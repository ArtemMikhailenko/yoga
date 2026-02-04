import { NextRequest, NextResponse } from 'next/server';
import { createCalendarEvent } from '@/lib/googleCalendar';

// Тестовый endpoint для проверки создания события в Google Calendar
// УДАЛИТЬ после тестирования!
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { serviceName, clientName, clientEmail, date, time } = body;
    
    const bookingDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    bookingDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(bookingDate);
    endDate.setHours(endDate.getHours() + 1); // 1 hour session
    
    console.log('Creating event:', {
      summary: `${serviceName} - ${clientName}`,
      start: bookingDate.toISOString(),
      end: endDate.toISOString(),
    });
    
    const eventId = await createCalendarEvent({
      summary: `${serviceName} - ${clientName}`,
      description: `Yoga session: ${serviceName}\nClient: ${clientName}\nEmail: ${clientEmail}\nТест создания события`,
      start: bookingDate,
      end: endDate,
      attendeeEmail: clientEmail,
      attendeeName: clientName,
      location: 'Pfeilgasse 14, 1080, Vienna, Austria',
    });
    
    if (!eventId) {
      return NextResponse.json(
        { success: false, error: 'Failed to create event - check server logs' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      eventId: eventId,
    });
  } catch (error) {
    console.error('Test calendar error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
