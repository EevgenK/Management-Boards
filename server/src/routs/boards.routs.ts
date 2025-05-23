import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import {
  createBoardController,
  getBoardController,
  deleteBoardController,
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
router.delete('/:id', isValidId, ctrlWrapper(deleteBoardController));

export default router;
