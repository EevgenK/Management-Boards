import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { getBoardSchema } from '../db/validation/board.validation';

export const isValidId: RequestHandler = (req, _res, next) => {
  const { id } = req.params;
  const { error } = getBoardSchema.validate({ inputId: id });

  if (error) {
    throw createHttpError(400, 'Bad Request', error.details[0].message);
  }
  next();
};
