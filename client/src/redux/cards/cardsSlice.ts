import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICard } from '../../../../shared/types';
import {
  batchUpdateCards,
  createCard,
  deleteCard,
  editCard,
  fetchCards,
} from './cardsOperations';

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
    resetCards(state) {
      state.cards = [];
      state.error = null;
      state.isLoading = false;
    },
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
      state.error =
        action.payload?.message + '. Add your first Card please.' ||
        'Something went wrong';
      state.cards = [];
      state.isLoading = false;
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
        state.error = action.payload.error.message;
        state.cards = action.payload.previousCards;
      } else {
        state.error = 'Something went wrong. Try again please.';
      }
      state.isLoading = false;
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
      state.isLoading = false;
    });
    builder.addCase(createCard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cards = [state.cards, action.payload].flat();
      state.error = null;
    });
    builder.addCase(createCard.rejected, (state, action) => {
      state.error = action.payload?.message || 'Something went wrong';
    });
    builder.addCase(deleteCard.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cards = state.cards.filter(
        (card) => card._id !== action.payload.deletedId,
      );
      state.error = null;
    });
    builder.addCase(deleteCard.rejected, (state, action) => {
      state.error = action.payload?.message || 'Something went wrong';
      state.isLoading = false;
    });
  },
});
export const { updateCardsOptimistically, resetCards } = cardsSlice.actions;
export default cardsSlice.reducer;
