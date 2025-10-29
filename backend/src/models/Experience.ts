import mongoose, { Schema, Document } from 'mongoose';

export interface ISlot {
  date: Date;
  time: string;
  capacity: number;
  booked: number;
}

export interface IExperience extends Document {
  title: string;
  slug: string;
  shortDesc?: string;
  longDesc?: string;
  price: number;
  image?: string;
  location?: string;
  duration?: string;
  slots: ISlot[];
  createdAt?: Date;
  updatedAt?: Date;
}

const SlotSchema = new Schema<ISlot>(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    capacity: { type: Number, required: true, default: 1 },
    booked: { type: Number, required: true, default: 0 }
  },
  { _id: true }
);

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDesc: String,
    longDesc: String,
    price: { type: Number, required: true },
    image: String,
    location: String,
    duration: String,
    slots: [SlotSchema]
  },
  { timestamps: true }
);

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
