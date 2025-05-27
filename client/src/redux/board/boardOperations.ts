import {
  BackendError,
  BackendSuccessResponse,
  GetBoard,
} from './../../../../shared/types';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../utils/api/api';
import { handleAxiosError } from '../../utils/api/handleAxiosError';

export const fetchBoard = createAsyncThunk<
  GetBoard,
  string,
  {
    rejectValue: BackendError;
  }
>('board/fetchBoard', async (inputId, { rejectWithValue }) => {
  try {
    const res = await instance.get<BackendSuccessResponse<GetBoard>>(
      `boards/${inputId}`,
    );

    return res.data.data;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err));
  }
});

export const createBoard = createAsyncThunk<
  GetBoard,
  string,
  {
    rejectValue: BackendError;
  }
>('board/createBoard', async (name, { rejectWithValue }) => {
  try {
    const res = await instance.post<BackendSuccessResponse<GetBoard>>(
      `boards`,
      {
        name,
      },
    );
    return res.data.data;
  } catch (err) {
    return rejectWithValue(handleAxiosError(err, 'Failed to create board'));
  }
});
export const deleteBoard = createAsyncThunk<
  void,
  string,
  {
    rejectValue: BackendError;
  }
>('board/deleteBoard', async (boardId, { rejectWithValue }) => {
  try {
    await instance.delete(`boards/${boardId}`);
  } catch (err) {
    return rejectWithValue(handleAxiosError(err, 'Failed to delete board'));
  }
});
