import { Router } from 'express';
import { Activity } from '../models/resources.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().lean());
  } catch (error) {
    next(error);
  }
});

export default router;