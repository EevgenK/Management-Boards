import { RequestHandler } from 'express';
import { createBoard, getBoard } from '../services/board.services';

export const createBoardController: RequestHandler = async (req, res) => {
  const board = await createBoard(req.body);
  res.json({
    status: 201,
    message: 'Successfully created a board!',
    data: board,
  });
};

export const getBoardController: RequestHandler = async (req, res) => {
  const board = await getBoard(req.params.id);
  res.json({
    status: 201,
    message: 'Successfully found a board!',
    data: board,
  });
};
