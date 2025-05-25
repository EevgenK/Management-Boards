import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../../../shared/types';
import { batchUpdateCards, editCard, fetchCards } from './cardsOperations';

interface CardState {
  cards: ICard[] | [];
  error: string | null;
  isLoading: boolean;
}
const initialState: CardState = {
  cards: [],
  error: null,
  isLoading: false,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    updateCardsOptimistically(state, action: PayloadAction<ICard[]>) {
      action.payload.forEach((updatedCard) => {
        const index = state.cards.findIndex(
          (card) => card._id === updatedCard._id,
        );
        if (index !== -1) {
          state.cards[index] = updatedCard;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cards = [...action.payload];
      state.error = null;
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.error = action.payload?.message || 'Something went wrong';
      state.cards = [];
    });
    builder.addCase(batchUpdateCards.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(batchUpdateCards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cards = [...action.payload];
      state.error = null;
    });
    builder.addCase(batchUpdateCards.rejected, (state, action) => {
      if (action.payload) {
        console.log(action.payload.error.message);
        state.error = action.payload.error.message;
        state.cards = action.payload.previousCards;
      } else {
        state.error = 'Something went wrong. Try again please.';
      }
    });
    builder.addCase(editCard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cards = state.cards.map((card) =>
        card._id === action.payload._id ? action.payload : card,
      );
      state.error = null;
    });
    builder.addCase(editCard.rejected, (state, action) => {
      state.error = action.payload?.message || 'Something went wrong';
    });
  },
});
export const { updateCardsOptimistically } = cardsSlice.actions;
export default cardsSlice.reducer;
