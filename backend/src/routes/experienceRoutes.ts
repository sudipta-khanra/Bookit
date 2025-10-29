import { Router } from 'express';
import { listExperiences, getExperience } from '../controllers/experienceController';

const router = Router();

router.get('/', listExperiences);
router.get('/:id', getExperience);

export default router;
