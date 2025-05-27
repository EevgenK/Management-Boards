import { RootState } from '../store';

export const selectBoard = (state: RootState) => state.boards.board;
export const selectBoardsError = (state: RootState) => state.boards.error;
export const selectBoardsIsLoading = (state: RootState) =>
  state.boards.isLoading;
export const selectIsEmptyBoard = (state: RootState) => state.boards.existCards;
