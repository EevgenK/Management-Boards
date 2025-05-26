import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../utils/api/api';
import {
  AddCardType,
  BackendError,
  BackendSuccessResponse,
  BatchUpdateCard,
  DeleteCardResponse,
  EditCardType,
  ICard,
} from '../../../../shared/types';
import { handleAxiosError } from '../../utils/api/handleAxiosError';

export const fetchCards = createAsyncThunk<
  ICard[],
  string,
  { rejectValue: BackendError }
>('cards/fetchCards', async (boardId, { rejectWithValue }) => {
  try {
    const res = await instance.get<BackendSuccessResponse<ICard[]>>(
      `cards/${boardId}`,
    );
    return res.data.data;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err));
  }
});

export const batchUpdateCards = createAsyncThunk<
  ICard[],
  { boardId: string; updatedCards: BatchUpdateCard[]; previousCards: ICard[] },
  {
    rejectValue: {
      error: BackendError;
      previousCards: ICard[];
    };
  }
>(
  'cards/batchUpdateCards',
  async ({ boardId, updatedCards, previousCards }, { rejectWithValue }) => {
    try {
      const response = await instance.put<{ data: ICard[] }>(
        `cards/batch/${boardId}`,
        updatedCards,
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue({
        error: err as BackendError,
        previousCards,
      });
    }
  },
);

export const editCard = createAsyncThunk<
  ICard,
  { boardId: string; query: EditCardType },
  { rejectValue: BackendError }
>('cards/editCard', async ({ boardId, query }, { rejectWithValue }) => {
  try {
    const res = await instance.patch<BackendSuccessResponse<ICard>>(
      `cards/${boardId}`,
      query,
    );

    return res.data.data;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err));
  }
});
export const createCard = createAsyncThunk<
  ICard[],
  AddCardType,
  { rejectValue: BackendError }
>('cards/createCard', async (query, { rejectWithValue }) => {
  try {
    const res = await instance.post<BackendSuccessResponse<ICard[]>>(
      `cards/`,
      query,
    );

    return res.data.data;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err));
  }
});

export const deleteCard = createAsyncThunk<
  DeleteCardResponse,
  { boardId: string; _id: string },
  { rejectValue: BackendError }
>('cards/deleteCard', async ({ boardId, _id }, { rejectWithValue }) => {
  try {
    const res = await instance.delete<DeleteCardResponse>(`cards/${boardId}`, {
      data: { _id },
    });

    return res.data;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err));
  }
});
