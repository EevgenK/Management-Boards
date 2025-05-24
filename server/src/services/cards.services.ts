import { CardsCollection, ICard } from '../db/models/cards';

export const createCard = async (payload: ICard) => {
  const contact = await CardsCollection.create({
    ...payload,
  });
  return contact;
};
export const updateCard = async (
  id: string,
  _id: string,
  payload: Omit<ICard, 'boardId'>,
  options = {},
) => {
  const query = { boardId: id, _id };
  const rawResult = await CardsCollection.findOneAndUpdate(query, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!rawResult || !rawResult.value) return null;
  return {
    card: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteCardById = async (id: string, _id: string) => {
  try {
    const query = { boardId: id, _id };
    const card = await CardsCollection.findOneAndDelete(query);
    return card;
  } catch (error) {
    console.log(error);
  }
};
