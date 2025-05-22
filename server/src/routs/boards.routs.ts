import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  createBoardController,
  getBoardController,
} from '../controllers/board.controllers';
import { isValidId } from '../middlewares/isValidId';
import { validateBody } from '../middlewares/validateBody';
import { createBoardSchema } from '../db/validation/board.validation';

const router = Router();
router.post(
  '/',
  validateBody(createBoardSchema),
  ctrlWrapper(createBoardController),
);
router.get('/:id', isValidId, ctrlWrapper(getBoardController));

export default router;
