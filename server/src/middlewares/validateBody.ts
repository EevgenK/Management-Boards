import createHttpError from 'http-errors';
import { RequestHandler } from 'express';
import { Schema } from 'joi';

export const validateBody =
  (schema: Schema): RequestHandler =>
  async (req, _res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (err) {
      if (err && typeof err === 'object' && 'details' in err) {
        const error = createHttpError(400, 'Bad Request', {
          errors: (err as any).details,
        });
        next(error);
      } else {
        next(err);
      }
    }
  };
