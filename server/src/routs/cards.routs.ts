import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { CardsCollection } from '../db/models/cards';
import { validateBody } from '../middlewares/validateBody';
import {
  batchUpdateSchema,
  createCardSchema,
  deleteCardSchema,
  updateCardSchema,
} from '../db/validation/card.validation';
import {
  createCardController,
  deleteCardController,
  getCardsController,
  patchCardController,
  updateBatchController,
} from '../controllers/cards.controllers';
import { isValidId } from '../middlewares/isValidId';

const router = Router();
router.post(
  '/',
  validateBody(createCardSchema),
  ctrlWrapper(createCardController),
);
router.get('/:boardId', isValidId, ctrlWrapper(getCardsController));

router.patch(
  '/:id',
  isValidId,
  validateBody(updateCardSchema),
  ctrlWrapper(patchCardController),
);

router.delete(
  '/:id',
  isValidId,
  validateBody(deleteCardSchema),
  ctrlWrapper(deleteCardController),
);

router.put(
  '/batch/:boardId',
  isValidId,
  validateBody(batchUpdateSchema),
  ctrlWrapper(updateBatchController),
);

export default router;
