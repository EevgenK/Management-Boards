import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ICard } from '../../../../shared/types';

export const selectCards = (state: RootState) => state.cards.cards;
export const selectCardsError = (state: RootState) => state.cards.error;
export const selectCardsIsLoading = (state: RootState) => state.cards.isLoading;

export const selectCardsByStatus = createSelector([selectCards], (cards) => {
  const statuses = ['todo', 'inprogress', 'done'] as const;

  return statuses.reduce((acc, status) => {
    acc[status] = cards
      .filter((card) => card.status === status)
      .sort((a, b) => a.order - b.order);
    return acc;
  }, {} as Record<(typeof statuses)[number], ICard[]>);
});
