import createHttpError from 'http-errors';
import type { CallbackError } from 'mongoose';
import { IBoard } from '../db/models/board';
import { ICard } from '../db/models/cards';

export const handleValidationError = (
  error: CallbackError,
  _doc: IBoard | ICard,
  next: Function,
): void => {
  if (error) {
    next(createHttpError(400, error.message));
  } else {
    next();
  }
};
