import { Request, Response } from "express";
import mongoose from "mongoose";
import Experience from "../models/Experience";
import Booking from "../models/Booking";
import Promo from "../models/Promo";

interface CreateBookingBody {
  experienceId: string;
  slotDate: string;
  slotTime: string;
  user: { name: string; email: string; phone?: string };
  promoCode?: string;
}

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate("experienceId", "title location price image")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (err: any) {
    res
      .status(500)
      .json({
        success: false,
        message: err.message || "Failed to fetch bookings",
      });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  const body: CreateBookingBody = req.body;

  if (
    !body.experienceId ||
    !body.slotDate ||
    !body.slotTime ||
    !body.user?.name ||
    !body.user?.email
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const exp = await Experience.findById(body.experienceId).session(session);
    if (!exp) throw new Error("Experience not found");
    const slot = exp.slots.find((s) => {
      const sDate = new Date(s.date).toISOString();
      const bDate = new Date(body.slotDate).toISOString();
      return sDate === bDate && s.time === body.slotTime;
    });

    if (!slot) throw new Error("Slot not found for that date/time");
    if (slot.booked >= slot.capacity) throw new Error("Slot sold out");

    let discount = 0;
    let promoApplied: { code: string; discount: number } | null = null;
    if (body.promoCode) {
      const promo = await Promo.findOne({
        code: body.promoCode.toUpperCase(),
        active: true,
      }).session(session);
      if (promo) {
        if (!promo.expiresAt || promo.expiresAt > new Date()) {
          if (promo.type === "percent")
            discount = (exp.price * promo.value) / 100;
          else discount = promo.value;
          promoApplied = { code: promo.code, discount };
        }
      }
    }

    const updateResult = await Experience.updateOne(
      {
        _id: exp._id,
        "slots._id": slot._id,
        "slots.booked": { $lt: slot.capacity },
      },
      { $inc: { "slots.$.booked": 1 } },
      { session }
    );

    if (updateResult.modifiedCount === 0) {
      throw new Error(
        "Failed to reserve slot (maybe sold out). Try another slot."
      );
    }

    const finalPrice = Math.max(0, exp.price - discount);

    const bookingDoc = await Booking.create(
      [
        {
          experienceId: exp._id,
          slotDate: new Date(body.slotDate),
          slotTime: body.slotTime,
          user: body.user,
          price: finalPrice,
          promoApplied,
          status: "confirmed",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.json({ success: true, booking: bookingDoc[0] });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(400)
      .json({ success: false, message: err.message || "Booking failed" });
  }
};
