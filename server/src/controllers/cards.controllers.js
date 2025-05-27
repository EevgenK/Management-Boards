import createHttpError from 'http-errors';
import { createCard, deleteCardById, getCards, updateBatchCard, updateCard, } from '../services/cards.services';
export const createCardController = async (req, res) => {
    const board = await createCard(req.body);
    res.json({
        status: 201,
        message: 'Successfully created a card!',
        data: board,
    });
};
export const getCardsController = async (req, res) => {
    const cards = await getCards(req.params.boardId);
    res.json({
        status: 201,
        message: 'Successfully found a cards!',
        data: cards,
    });
};
export const patchCardController = async (req, res) => {
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
export const deleteCardController = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.body;
    const card = await deleteCardById(id, _id);
    if (!card) {
        throw createHttpError(404, 'Card not found');
    }
    res.json({
        status: 200,
        message: `Successfully deleted a card!`,
        deletedId: card._id,
    });
};
export const updateBatchController = async (req, res) => {
    const { boardId } = req.params;
    const cards = await updateBatchCard(boardId, req.body);
    if (!cards.length) {
        throw createHttpError(500, 'No cards updated or found');
    }
    res.json({
        status: 200,
        message: `Successfully uploaded a cards!`,
        data: cards,
    });
};
