import mongoose from 'mongoose';

export interface IAdmin extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  role: 'superadmin' | 'admin';
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin'],
    default: 'admin',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
    required: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
