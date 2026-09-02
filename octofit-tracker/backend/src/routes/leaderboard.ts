import { Router } from 'express';
import { LeaderboardEntry } from '../models/resources.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    response.json(await LeaderboardEntry.find().lean());
  } catch (error) {
    next(error);
  }
});

export default router;