import { google } from 'googleapis';

// Создаем клиент для Google Calendar API
const getCalendarClient = () => {
  // Используем Service Account credentials
  const credentials = {
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.GOOGLE_CERT_URL,
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
};

// ID календаря (ваш основной календарь или специальный для бронирований)
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'primary';

export interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: Date;
  end: Date;
  attendeeEmail?: string;
  attendeeName?: string;
  location?: string;
}

export interface BusySlot {
  start: string;
  end: string;
}

// Получить занятые слоты за период
export async function getBusySlots(startDate: Date, endDate: Date): Promise<BusySlot[]> {
  try {
    const calendar = getCalendarClient();
    
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: CALENDAR_ID }],
      },
    });

    const busySlots = response.data.calendars?.[CALENDAR_ID]?.busy || [];
    return busySlots.map(slot => ({
      start: slot.start || '',
      end: slot.end || '',
    }));
  } catch (error) {
    console.error('Error fetching busy slots:', error);
    return [];
  }
}

// Получить все события за период
export async function getEvents(startDate: Date, endDate: Date) {
  try {
    const calendar = getCalendarClient();
    
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: startDate.toISOString(),
      timeMax: endDate.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Проверить доступность времени
export async function checkAvailability(date: Date, time: string, durationMinutes: number = 60): Promise<boolean> {
  try {
    const [hours, minutes] = time.split(':').map(Number);
    const startDateTime = new Date(date);
    startDateTime.setHours(hours, minutes, 0, 0);
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + durationMinutes);

    const busySlots = await getBusySlots(
      new Date(startDateTime.getTime() - 60000), // 1 минута до
      new Date(endDateTime.getTime() + 60000)    // 1 минута после
    );

    // Проверяем, пересекается ли запрашиваемое время с занятыми слотами
    for (const slot of busySlots) {
      const slotStart = new Date(slot.start);
      const slotEnd = new Date(slot.end);
      
      // Если есть пересечение
      if (startDateTime < slotEnd && endDateTime > slotStart) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error checking availability:', error);
    return true; // В случае ошибки позволяем бронирование
  }
}

// Создать событие в календаре
export async function createCalendarEvent(event: CalendarEvent): Promise<string | null> {
  try {
    const calendar = getCalendarClient();
    
    const eventData: any = {
      summary: event.summary,
      description: event.description || '',
      start: {
        dateTime: event.start.toISOString(),
        timeZone: 'Europe/Vienna',
      },
      end: {
        dateTime: event.end.toISOString(),
        timeZone: 'Europe/Vienna',
      },
      location: event.location || 'Pfeilgasse 14, 1080, Vienna, Austria',
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // За 24 часа
          { method: 'popup', minutes: 60 },      // За 1 час
        ],
      },
    };

    // НЕ добавляем attendees - Service Account не может это делать без Domain-Wide Delegation
    // Информация о клиенте будет в описании события

    const response = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: eventData,
    });

    console.log('Calendar event created:', response.data.id);
    return response.data.id || null;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return null;
  }
}

// Удалить событие из календаря
export async function deleteCalendarEvent(eventId: string): Promise<boolean> {
  try {
    const calendar = getCalendarClient();
    
    await calendar.events.delete({
      calendarId: CALENDAR_ID,
      eventId: eventId,
    });

    return true;
  } catch (error) {
    console.error('Error deleting calendar event:', error);
    return false;
  }
}

// Получить занятые времена на конкретную дату
export async function getBusyTimesForDate(date: Date): Promise<string[]> {
  // Создаем даты в часовом поясе Vienna (UTC+1)
  const dateStr = date.toISOString().split('T')[0]; // "2026-02-05"
  
  // Начало и конец дня в Vienna timezone
  const startOfDay = new Date(`${dateStr}T00:00:00+01:00`);
  const endOfDay = new Date(`${dateStr}T23:59:59+01:00`);

  const busySlots = await getBusySlots(startOfDay, endOfDay);
  
  const busyTimes: string[] = [];
  
  for (const slot of busySlots) {
    const slotStart = new Date(slot.start);
    const slotEnd = new Date(slot.end);
    
    // Добавляем все часы между началом и концом слота
    let current = new Date(slotStart);
    while (current < slotEnd) {
      // Конвертируем в локальное время Vienna (UTC+1)
      const viennaTime = new Date(current.getTime() + (1 * 60 * 60 * 1000)); // +1 hour for Vienna
      const hours = viennaTime.getUTCHours().toString().padStart(2, '0');
      const minutes = viennaTime.getUTCMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      
      if (!busyTimes.includes(timeString)) {
        busyTimes.push(timeString);
      }
      current.setMinutes(current.getMinutes() + 30); // Шаг 30 минут
    }
  }

  return busyTimes;
}
