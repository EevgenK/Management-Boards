import crypto from 'crypto';
import createHttpError from 'http-errors';
import { BoardsCollection } from '../db/models/board';
import { CardsCollection } from '../db/models/cards';

export const createBoard = async (payload: {
  inputId: string;
  name: string;
}) => {
  const { inputId, name } = payload;
  const trimmedId = inputId.trim().toLowerCase();
  const hashId = crypto
    .createHash('sha256')
    .update(trimmedId)
    .digest('hex')
    .slice(0, 10);

  const existing = await BoardsCollection.findOne({ hashId });
  if (existing)
    throw createHttpError(409, `Board with ID ${inputId} already exist`);

  const board = await BoardsCollection.create({ hashId, name });
  return board;
};

export const getBoard = async (inputId: string) => {
  const normalizedInputId = inputId.trim().toLowerCase();
  const hashId = crypto
    .createHash('sha256')
    .update(normalizedInputId)
    .digest('hex')
    .slice(0, 10);
  const board = await BoardsCollection.findOne({ hashId });

  if (!board) {
    throw createHttpError(404, 'Board not found');
  }

  const cards = await CardsCollection.find({ boardHashId: hashId });
  return { board, cards };
};
