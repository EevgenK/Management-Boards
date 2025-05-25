import createHttpError from 'http-errors';
import type { CallbackError } from 'mongoose';
import { IBoard, ICard } from '../../../shared/types';

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
