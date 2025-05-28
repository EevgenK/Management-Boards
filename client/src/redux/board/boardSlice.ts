import { createSlice } from '@reduxjs/toolkit';
import { createBoard, deleteBoard, fetchBoard } from './boardOperations';
import { IBoard } from '../../../../shared/types';
interface BoardState {
  board: IBoard | null;
  error: string | null;
  isLoading: boolean;
  existCards: boolean;
  exit: boolean;
}

const initialState: BoardState = {
  board: null,
  error: null,
  isLoading: false,
  existCards: false,
  exit: true,
};

const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
  reducers: {
    enterBoard(state) {
      state.exit = false;
    },
    resetBoard(state) {
      state.board = null;
      state.error = null;
      state.isLoading = false;
      state.existCards = false;
      state.exit = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.existCards = false;
    });
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.board = action.payload.board;
      state.error = null;
      state.existCards = action.payload.existCards;
      state.exit = false;
    });
    builder.addCase(fetchBoard.rejected, (state, action) => {
      state.error = action.payload?.message || 'Something went wrong';
      state.isLoading = false;
      state.existCards = false;
    });
    builder.addCase(createBoard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.existCards = false;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.board = action.payload.board;
      state.error = null;
      state.existCards = action.payload.existCards;
      state.exit = false;
    });
    builder.addCase(createBoard.rejected, (state, action) => {
      state.error = action.payload?.message || 'Something went wrong';
      state.isLoading = false;
      state.existCards = false;
    });
    builder.addCase(deleteBoard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteBoard.fulfilled, (state) => {
      state.board = null;
      state.error = null;
      state.isLoading = false;
      state.existCards = false;
      state.exit = true;
    });
    builder.addCase(deleteBoard.rejected, (state, action) => {
      state.error = action.payload?.message || 'Something went wrong';
      state.isLoading = false;
    });
  },
});
export const { resetBoard, enterBoard } = boardSlice.actions;
export default boardSlice.reducer;
