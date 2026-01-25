import mongoose from 'mongoose';

export interface IBooking extends mongoose.Document {
  serviceType: 'group' | 'private' | 'coaching' | 'training' | 'retreat';
  retreatId?: mongoose.Types.ObjectId;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  date: Date;
  time?: string;
  participants?: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  price?: number;
  totalPrice?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    enum: ['group', 'private', 'coaching', 'training', 'retreat'],
    required: true,
  },
  retreatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Retreat',
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
  clientPhone: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    required: false,
  },
  participants: {
    type: Number,
    default: 1,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  price: {
    type: Number,
    required: false,
  },
  totalPrice: {
    type: Number,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
