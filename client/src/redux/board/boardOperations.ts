import {
  BackendError,
  BackendSuccessResponse,
  IBoard,
} from './../../../../shared/types';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../utils/api/api';
import { handleAxiosError } from '../../utils/api/handleAxiosError';

export const fetchBoard = createAsyncThunk<
  IBoard,
  string,
  {
    rejectValue: BackendError;
  }
>('board/fetchBoard', async (inputId, thunkAPI) => {
  try {
    const res = await instance.get<BackendSuccessResponse<IBoard>>(
      `boards/${inputId}`,
    );

    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(handleAxiosError(err));
  }
});

export const createBoard = createAsyncThunk<
  IBoard,
  string,
  {
    rejectValue: BackendError;
  }
>('board/createBoard', async (name, thunkAPI) => {
  try {
    const res = await instance.post<BackendSuccessResponse<IBoard>>(`boards`, {
      name,
    });
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      handleAxiosError(err, 'Failed to create board'),
    );
  }
});
