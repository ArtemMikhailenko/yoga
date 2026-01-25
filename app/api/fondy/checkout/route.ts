import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Payment from '@/models/Payment';
import Booking from '@/models/Booking';
import { createFondyPayment } from '@/lib/fondy';

// Generate unique order ID
function generateOrderId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `YOGA-${timestamp}-${random}`.toUpperCase();
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    console.log('Checkout request body:', JSON.stringify(body, null, 2));

    const {
      clientName,
      clientEmail,
      clientPhone,
      amount,
      currency = 'EUR',
      description,
      serviceType,
      retreatId,
      retreatTitle,
      language = 'en',
      metadata,
    } = body;

    // Validate required fields
    if (!clientName || !clientEmail || !amount) {
      console.error('Validation failed: Missing required fields');
      return NextResponse.json(
        { success: false, error: 'Missing required fields: clientName, clientEmail, amount' },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = generateOrderId();

    // Create order description
    const orderDescription = description || 
      (retreatTitle 
        ? `Retreat booking: ${retreatTitle}` 
        : `Yoga service: ${serviceType || 'General'}`);

    // Get base URL from request
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      `${request.nextUrl.protocol}//${request.nextUrl.host}`;

    // Create payment in Fondy
    console.log('Creating Fondy payment with params:', {
      orderId,
      orderDescription,
      amount: parseFloat(amount),
      currency,
      email: clientEmail,
    });
    
    const fondyResult = await createFondyPayment({
      orderId,
      orderDescription,
      amount: parseFloat(amount),
      currency,
      email: clientEmail,
      language: language === 'ru' ? 'ru' : 'en',
      callbackUrl: `${baseUrl}/api/fondy/callback`,
      successUrl: `${baseUrl}/payment/success?order_id=${orderId}`,
      productId: retreatId,
      merchantData: JSON.stringify({
        clientName,
        clientEmail,
        serviceType,
        retreatId,
      }),
    });

    console.log('Fondy result:', fondyResult);

    if (!fondyResult.success) {
      console.error('Fondy payment creation failed:', fondyResult.error);
      return NextResponse.json(
        { success: false, error: fondyResult.error || 'Failed to create payment' },
        { status: 500 }
      );
    }

    // Create payment record in database
    const payment = await Payment.create({
      clientName,
      clientEmail,
      amount: parseFloat(amount),
      currency,
      paymentMethod: 'card',
      paymentProvider: 'fondy',
      transactionId: orderId,
      status: 'pending',
      notes: orderDescription,
      metadata: {
        fondyPaymentId: fondyResult.paymentId,
        checkoutUrl: fondyResult.checkoutUrl,
        serviceType,
        retreatId,
        retreatTitle,
        clientPhone,
        ...metadata, // Include calendar data from request
      },
    });

    // If retreat booking, create booking record
    if (retreatId) {
      await Booking.create({
        retreatId,
        clientName,
        clientEmail,
        serviceType: 'retreat',
        status: 'pending',
        paymentStatus: 'pending',
        price: parseFloat(amount),
        notes: `Pending payment: ${orderId}`,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId,
        checkoutUrl: fondyResult.checkoutUrl,
        paymentId: payment._id,
      },
    });
  } catch (error) {
    console.error('Error creating Fondy checkout:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create payment checkout' },
      { status: 500 }
    );
  }
}
