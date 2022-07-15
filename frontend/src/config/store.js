import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../reducers/card.reducer';
import deckReducer from '../reducers/deck.reducer';
import userReducer from '../reducers/user.reducer';
export const store = configureStore({
  reducer: {
    user: userReducer,
    decks: deckReducer,
    cards: cardReducer,
  },
});
