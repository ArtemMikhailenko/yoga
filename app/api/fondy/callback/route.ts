import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Payment from '@/models/Payment';
import Booking from '@/models/Booking';
import { verifyFondySignature, parseFondyStatus } from '@/lib/fondy';

// Fondy sends callback as form data or JSON
async function parseCallback(request: NextRequest): Promise<Record<string, string>> {
  const contentType = request.headers.get('content-type') || '';
  
  if (contentType.includes('application/json')) {
    return await request.json();
  } else if (contentType.includes('application/x-www-form-urlencoded')) {
    const formData = await request.formData();
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = String(value);
    });
    return data;
  } else {
    // Try to parse as JSON
    const text = await request.text();
    try {
      return JSON.parse(text);
    } catch {
      // Try to parse as form data
      const params = new URLSearchParams(text);
      const data: Record<string, string> = {};
      params.forEach((value, key) => {
        data[key] = value;
      });
      return data;
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const callbackData = await parseCallback(request);
    
    console.log('Fondy callback received:', callbackData);

    // Verify signature
    const isValid = verifyFondySignature(callbackData as any);
    
    if (!isValid) {
      console.error('Invalid Fondy signature');
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const {
      order_id,
      order_status,
      payment_id,
      actual_amount,
      currency,
      masked_card,
      card_type,
      sender_email,
    } = callbackData;

    await dbConnect();

    // Find and update payment
    const payment = await Payment.findOne({ transactionId: order_id });
    
    if (!payment) {
      console.error('Payment not found for order:', order_id);
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Parse status
    const newStatus = parseFondyStatus(order_status);
    const wasCompleted = payment.status === 'completed';

    // Update payment
    payment.status = newStatus;
    payment.metadata = {
      ...payment.metadata,
      fondyPaymentId: payment_id,
      orderStatus: order_status,
      maskedCard: masked_card,
      cardType: card_type,
      actualAmount: actual_amount,
      callbackReceived: new Date().toISOString(),
    };

    if (newStatus === 'completed' && !wasCompleted) {
      payment.paidAt = new Date();
    }

    if (newStatus === 'refunded') {
      payment.refundedAt = new Date();
    }

    await payment.save();

    // Update related booking if exists
    if (payment.metadata?.retreatId) {
      const booking = await Booking.findOne({
        retreatId: payment.metadata.retreatId,
        clientEmail: payment.clientEmail,
        status: 'pending',
      });

      if (booking) {
        if (newStatus === 'completed') {
          booking.status = 'confirmed';
          booking.paymentStatus = 'paid';
          booking.notes = `Paid via Fondy on ${new Date().toLocaleString()}. Card: ${masked_card || 'N/A'}`;
        } else if (newStatus === 'failed') {
          booking.status = 'cancelled';
          booking.paymentStatus = 'failed';
          booking.notes = `Payment failed on ${new Date().toLocaleString()}`;
        }
        await booking.save();
      }
    }

    console.log(`Payment ${order_id} updated to status: ${newStatus}`);

    // Fondy expects "OK" response
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error processing Fondy callback:', error);
    return NextResponse.json(
      { success: false, error: 'Callback processing failed' },
      { status: 500 }
    );
  }
}

// Fondy may also send GET requests for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({ status: 'Fondy callback endpoint is active' });
}
