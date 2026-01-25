import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Payment from '@/models/Payment';
import { getFondyPaymentStatus, parseFondyStatus } from '@/lib/fondy';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('order_id');

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'order_id is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Get payment from database
    const payment = await Payment.findOne({ transactionId: orderId });

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    // If payment is still pending, check with Fondy
    if (payment.status === 'pending') {
      const fondyStatus = await getFondyPaymentStatus(orderId);
      
      if (fondyStatus.success && fondyStatus.status) {
        const newStatus = parseFondyStatus(fondyStatus.status);
        
        if (newStatus !== payment.status) {
          payment.status = newStatus;
          if (newStatus === 'completed') {
            payment.paidAt = new Date();
          }
          payment.metadata = {
            ...payment.metadata,
            fondyStatus: fondyStatus.status,
            lastChecked: new Date().toISOString(),
          };
          await payment.save();
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: payment.transactionId,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        paidAt: payment.paidAt,
        clientName: payment.clientName,
        clientEmail: payment.clientEmail,
        metadata: payment.metadata, // Include metadata with calendar link
      },
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
