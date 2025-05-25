import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../utils/api/api';
import {
  BackendError,
  BackendSuccessResponse,
  BatchUpdateCard,
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
