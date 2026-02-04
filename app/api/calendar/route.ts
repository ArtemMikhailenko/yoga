import { NextRequest, NextResponse } from 'next/server';
import { getBusySlots, getBusyTimesForDate, checkAvailability } from '@/lib/googleCalendar';

// GET - Получить занятые слоты
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const time = searchParams.get('time');

    // Проверка доступности конкретного времени
    if (date && time) {
      const dateObj = new Date(date);
      const isAvailable = await checkAvailability(dateObj, time);
      return NextResponse.json({
        success: true,
        available: isAvailable,
      });
    }

    // Получить занятые времена на конкретную дату
    if (date) {
      const dateObj = new Date(date);
      const busyTimes = await getBusyTimesForDate(dateObj);
      return NextResponse.json({
        success: true,
        busyTimes,
      });
    }

    // Получить занятые слоты за период
    if (startDate && endDate) {
      const busySlots = await getBusySlots(new Date(startDate), new Date(endDate));
      return NextResponse.json({
        success: true,
        busySlots,
      });
    }

    // По умолчанию - текущий месяц
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 2, 0); // 2 месяца вперед

    const busySlots = await getBusySlots(start, end);
    
    return NextResponse.json({
      success: true,
      busySlots,
    });
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch calendar data' },
      { status: 500 }
    );
  }
}
