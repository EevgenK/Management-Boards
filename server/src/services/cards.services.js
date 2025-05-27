import createHttpError from 'http-errors';
import { CardsCollection } from '../db/models/cards';
export const createCard = async (payload) => {
    const contact = await CardsCollection.create({
        ...payload,
    });
    return contact;
};
export const getCards = async (payload) => {
    const cards = await CardsCollection.find({ boardId: payload });
    if (!cards.length) {
        throw createHttpError(404, 'Cards not found');
    }
    return cards;
};
export const updateCard = async (id, _id, payload, options = {}) => {
    const query = { boardId: id, _id };
    const rawResult = await CardsCollection.findOneAndUpdate(query, payload, {
        new: true,
        includeResultMetadata: true,
        ...options,
    });
    if (!rawResult || !rawResult.value)
        return null;
    return {
        card: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};
export const deleteCardById = async (id, _id) => {
    try {
        const query = { boardId: id, _id };
        const card = await CardsCollection.findOneAndDelete(query);
        return card;
    }
    catch (error) {
        console.log(error);
    }
};
export const updateBatchCard = async (boardId, payload) => {
    const bulkOps = payload.map((card) => ({
        updateOne: {
            filter: { _id: card._id, boardId },
            update: { $set: { status: card.status, order: card.order } },
        },
    }));
    try {
        await CardsCollection.bulkWrite(bulkOps);
        const updatedCards = await CardsCollection.find({ boardId }).lean();
        return updatedCards;
    }
    catch (err) {
        throw createHttpError(500, `Batch update error: ${String(err)}`);
    }
};
