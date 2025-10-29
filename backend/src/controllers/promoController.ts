import { Request, Response } from 'express';
import Promo from '../models/Promo';
import Experience from '../models/Experience';

// POST /api/promo/validate
// body: { code, experienceId }
export const validatePromo = async (req: Request, res: Response) => {
  const { code, experienceId } = req.body;
  if (!code) return res.status(400).json({ success: false, message: 'Promo code required' });

  const promo = await Promo.findOne({ code: code.toUpperCase(), active: true }).lean();
  if (!promo) return res.status(404).json({ success: false, message: 'Invalid or inactive promo code' });

  if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
    return res.status(400).json({ success: false, message: 'Promo code expired' });
  }

  const experience = experienceId ? await Experience.findById(experienceId).lean() : null;
  const basePrice = experience ? experience.price : 0;

  let discount = 0;
  if (promo.type === 'percent') discount = (basePrice * promo.value) / 100;
  else discount = promo.value;

  res.json({
    success: true,
    data: {
      code: promo.code,
      type: promo.type,
      value: promo.value,
      discount
    }
  });
};
