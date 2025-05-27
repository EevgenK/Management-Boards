import { RequestHandler } from 'express';
import {
  createBoard,
  deleteBoardById,
  getBoard,
} from '../services/board.services';
import createHttpError from 'http-errors';
import { IBoard } from '../../../shared/types';

export const createBoardController: RequestHandler = async (req, res) => {
  const { board, existCards }: { board: IBoard; existCards: boolean } =
    await createBoard(req.body);
  console.log('BOARD==>>', board);
  res.json({
    status: 201,
    message: 'Successfully created a board!',
    data: { board, existCards },
  });
};

export const getBoardController: RequestHandler = async (req, res) => {
  const { board, existCards }: { board: IBoard; existCards: boolean } =
    await getBoard(req.params.id);
  res.json({
    status: 201,
    message: 'Successfully found a board!',
    data: { board, existCards },
  });
};

export const deleteBoardController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const board = await deleteBoardById(id);
  if (!board) {
    throw createHttpError(404, 'Board not found');
  }
  res.json({
    status: 204,
    message: `Successfully deleted a board!`,
  });
};
