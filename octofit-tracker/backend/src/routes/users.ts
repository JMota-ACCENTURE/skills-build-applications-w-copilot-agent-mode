import { Router } from 'express';
import { User } from '../models/resources.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await User.find().lean());
  } catch (error) {
    next(error);
  }
});

export default router;