import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardsReducer from './board/boardSlice';
import cardsReducer from './cards/cardsSlice';
import modalReducer from './modal/modalSlice';
import storage from 'redux-persist/lib/storage';

import { persistStore, persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
  cards: cardsReducer,
  boards: boardsReducer,
  modal: modalReducer,
});

const persistConfig = {
  key: 'management-board',
  storage,
  whitelist: ['cards', 'boards'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
