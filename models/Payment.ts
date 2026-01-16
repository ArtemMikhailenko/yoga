import mongoose from 'mongoose';

export interface IPayment extends mongoose.Document {
  bookingId?: mongoose.Types.ObjectId;
  clientName: string;
  clientEmail: string;
  amount: number;
  currency: string;
  paymentMethod?: 'paypal' | 'card' | 'bank_transfer' | 'cash' | 'other';
  paymentProvider?: string; // PayPal, Stripe, etc.
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paidAt?: Date;
  refundedAt?: Date;
  notes?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: false,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'EUR',
  },
  paymentMethod: {
    type: String,
    enum: ['paypal', 'card', 'bank_transfer', 'cash', 'other'],
    required: false,
  },
  paymentProvider: {
    type: String,
    required: false,
  },
  transactionId: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  paidAt: {
    type: Date,
    required: false,
  },
  refundedAt: {
    type: Date,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
