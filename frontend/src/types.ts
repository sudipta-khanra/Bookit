export type Slot = {
  _id?: string;
  date: string; 
  time: string;
  capacity: number;
  booked: number;
};

export type Experience = {
  _id: string;
  title: string;
  slug: string;
  shortDesc?: string;
  longDesc?: string;
  price: number;
  image?: string;
  location?: string;
  duration?: string;
  slots: Slot[];
};
