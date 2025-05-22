import { ErrorRequestHandler } from 'express';
import { HttpError } from 'http-errors';
import mongoose from 'mongoose';

export const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode || 500).json({
      status: err.statusCode || 500,
      message: err.message,
      data: err,
    });
    return;
  }

  if (err instanceof mongoose.Error) {
    res.status(400).json({
      status: 400,
      message: 'Mongoose error',
      data: { message: err.message },
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err instanceof Error ? err.message : String(err),
  });
};
