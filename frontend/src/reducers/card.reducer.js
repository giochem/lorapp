import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cardService from '../services/card.service';

const initialState = {
  cards: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
export const getAllCardsUser = createAsyncThunk('cards/getAllCardsUser', async (_, thunkAPI) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('token'));
    return await cardService.getAllCardsUser(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const createCard = createAsyncThunk('cards/createCard', async (card, thunkAPI) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('token'));
    return await cardService.createCard(token, card);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const deleteCard = createAsyncThunk('cards/deleteCard', async (cardId, thunkAPI) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('token'));
    return await cardService.deleteCard(token, cardId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCardsUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCardsUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = action.payload;
      })
      .addCase(getAllCardsUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards.push(action.payload);
      })
      .addCase(createCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cards = state.cards.filter((e) => e._id !== action.payload._id);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cardSlice.actions;
export default cardSlice.reducer;
