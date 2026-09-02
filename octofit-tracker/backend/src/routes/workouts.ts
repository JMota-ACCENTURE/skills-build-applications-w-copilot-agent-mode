import { Router } from 'express';
import { Workout } from '../models/resources.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().lean());
  } catch (error) {
    next(error);
  }
});

export default router;