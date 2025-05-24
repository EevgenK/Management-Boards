import { Router } from 'express';
import boardsRouter from './boards.routs';
import cardsRouter from './cards.routs';

const router = Router();
router.use('/boards', boardsRouter);
router.use('/cards', cardsRouter);

export default router;
