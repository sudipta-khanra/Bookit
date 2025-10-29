import { Request, Response } from 'express';
import Experience from '../models/Experience';

// GET /api/experiences
export const listExperiences = async (req: Request, res: Response) => {
  const experiences = await Experience.find().select('-__v').lean();
  res.json({ success: true, data: experiences });
};

// GET /api/experiences/:id
export const getExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const exp = await Experience.findById(id).select('-__v').lean();
  if (!exp) return res.status(404).json({ success: false, message: 'Experience not found' });
  res.json({ success: true, data: exp });
};
