import createHttpError from 'http-errors';
import { BoardsCollection } from '../db/models/board';
import { CardsCollection } from '../db/models/cards';
import { generateHashId } from '../utils/generateHashId';

export const createBoard = async (payload: {
  inputId: string;
  name: string;
}) => {
  const { inputId, name } = payload;
  const hashId = generateHashId(inputId);
  const existing = await BoardsCollection.findOne({ hashId });
  if (existing)
    throw createHttpError(409, `Board with ID ${inputId} already exist`);

  const board = await BoardsCollection.create({ hashId, name });
  return board;
};

export const getBoard = async (inputId: string) => {
  const hashId = generateHashId(inputId);
  const board = await BoardsCollection.findOne({ hashId });

  if (!board) {
    throw createHttpError(404, 'Board not found');
  }

  const cards = await CardsCollection.find({ boardId: hashId });
  return { board, cards };
};

export const deleteBoardById = async (id: string) => {
  try {
    const board = await BoardsCollection.findOneAndDelete({ hashId: id });
    return board;
  } catch (error) {
    console.error('Failed to delete board by hashId:', error);
    throw error;
  }
};
