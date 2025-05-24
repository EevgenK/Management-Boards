import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { CardsCollection } from '../db/models/cards';
import { validateBody } from '../middlewares/validateBody';
import {
  createCardSchema,
  deleteCardSchema,
  updateCardSchema,
} from '../db/validation/card.validation';
import {
  createCardController,
  deleteCardController,
  patchCardController,
} from '../controllers/cards.controllers';
import { isValidId } from '../middlewares/isValidId';

const router = Router();
router.post(
  '/',
  validateBody(createCardSchema),
  ctrlWrapper(createCardController),
);

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

export default router;
