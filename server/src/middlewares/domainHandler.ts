import { Request, Response } from 'express';

export const domainHandler = (_: Request, res: Response) => {
  res.json({
    message: 'Welcome to management-boards data base!',
  });
};
