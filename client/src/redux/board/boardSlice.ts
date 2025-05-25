import { createSlice } from '@reduxjs/toolkit';
import { createBoard, fetchBoard } from './boardOperations';
import { IBoard } from '../../../../shared/types';
interface BoardState {
  board: IBoard | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: BoardState = {
  board: null,
  error: null,
  isLoading: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.board = action.payload;

      state.error = null;
    });
    builder.addCase(fetchBoard.rejected, (state, action) => {
      state.error = action.payload?.message || 'Something went wrong';
    });
    builder.addCase(createBoard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.board = action.payload;
      state.error = null;
    });
    builder.addCase(createBoard.rejected, (state, action) => {
      state.error = action.payload?.message || 'Something went wrong';
    });
  },
});

export default boardSlice.reducer;
