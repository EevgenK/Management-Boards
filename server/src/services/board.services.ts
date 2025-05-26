import createHttpError from 'http-errors';
import { BoardsCollection } from '../db/models/board';

import { generateHashId } from '../utils/generateHashId';
import { CardsCollection } from '../db/models/cards';

export const createBoard = async (payload: { name: string }) => {
  const { name } = payload;
  const hashId = generateHashId(name);
  const existing = await BoardsCollection.findOne({
    hashId,
  });
  if (existing)
    throw createHttpError(409, `Board with ID ${hashId} already exist`);

  const board = await BoardsCollection.create({ hashId, name });
  const { _id, ...data } = board.toObject();
  return data;
};

export const getBoard = async (inputId: string) => {
  const board = await BoardsCollection.findOne({ hashId: inputId });

  if (!board) {
    throw createHttpError(404, 'Board not found');
  }

  const { _id, ...data } = board.toObject();
  return data;
};

export const deleteBoardById = async (id: string) => {
  try {
    const board = await BoardsCollection.findOneAndDelete({ hashId: id });
    if (board) {
      await CardsCollection.deleteMany({ boardId: id });
    }
    return board;
  } catch (error) {
    console.error('Failed to delete board by hashId:', error);
    throw error;
  }
};
