import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../reducers/card.reducer';
import deckReducer from '../reducers/deck.reducer';
export const store = configureStore({
  reducer: {
    decks: deckReducer,
    cards: cardReducer,
  },
});
