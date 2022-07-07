import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/user.reducer';
import cardReducer from '../reducers/card.reducer';
import deckReducer from '../reducers/deck.reducer';
export const store = configureStore({
  reducer: {
    user: userReducer,
    decks: deckReducer,
    cards: cardReducer,
  },
});
