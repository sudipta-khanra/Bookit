import mongoose, { Schema, Document } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  phone?: string;
}

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  slotDate: Date;
  slotTime: string;
  user: IUser;
  price: number;
  promoApplied?: { code: string; discount: number } | null;
  status: 'confirmed' | 'failed';
  createdAt?: Date;
}

const BookingSchema = new Schema<IBooking>({
  experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  slotDate: { type: Date, required: true },
  slotTime: { type: String, required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String
  },
  price: { type: Number, required: true },
  promoApplied: { code: String, discount: Number },
  status: { type: String, enum: ['confirmed', 'failed'], default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
