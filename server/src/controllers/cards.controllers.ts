import createHttpError from 'http-errors';
import { RequestHandler } from 'express';
import {
  createCard,
  deleteCardById,
  updateCard,
} from '../services/cards.services';

export const createCardController: RequestHandler = async (req, res) => {
  const board = await createCard(req.body);
  res.json({
    status: 201,
    message: 'Successfully created a card!',
    data: board,
  });
};

export const patchCardController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const { _id, ...updateFields } = req.body;

  const result = await updateCard(id, _id, {
    ...updateFields,
  });
  if (!result) {
    throw createHttpError(404, 'Card not found');
  }
  res.json({
    status: 200,
    message: `Successfully patched a card!`,
    data: result.card,
  });
};

export const deleteCardController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.body;
  const contact = await deleteCardById(id, _id);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 204,
    message: `Successfully deleted a card!`,
  });
};
