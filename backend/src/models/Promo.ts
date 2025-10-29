import mongoose, { Schema, Document } from 'mongoose';

export interface IPromo extends Document {
  code: string;
  type: 'percent' | 'flat';
  value: number;
  active: boolean;
  expiresAt?: Date | null;
}

const PromoSchema = new Schema<IPromo>({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['percent', 'flat'], default: 'percent' },
  value: { type: Number, required: true },
  active: { type: Boolean, default: true },
  expiresAt: Date
});

export default mongoose.model<IPromo>('Promo', PromoSchema);
