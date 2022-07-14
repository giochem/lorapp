import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import deckService from '../services/deck.service';

const initialState = {
  decks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getAllDecksPublic = createAsyncThunk('decks/getAllDecksPublic', async (_, thunkAPI) => {
  try {
    return await deckService.getAllDecksPublic();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const createDeck = createAsyncThunk('decks/createDeck', async (data, thunkAPI) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('token'));
    return await deckService.createDeck(token, data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const likeDeck = createAsyncThunk('decks/likeDeck', async (data, thunkAPI) => {
  try {
    return await deckService.likeDeck(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getDecksUser = createAsyncThunk('decks/getDecksUser', async (_, thunkAPI) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('token'));
    return await deckService.getDecksUser(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const deleteDeckUser = createAsyncThunk('decks/deleteDeckUser', async (deckId, thunkAPI) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('token'));
    return await deckService.deleteDeck(token, deckId);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const deckSlice = createSlice({
  name: 'deck',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDecksPublic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDecksPublic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.decks = action.payload;
      })
      .addCase(getAllDecksPublic.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDecksUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDecksUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.decks = action.payload;
      })
      .addCase(getDecksUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createDeck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDeck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.decks.push(action.payload);
      })
      .addCase(createDeck.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(likeDeck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeDeck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.decks = state.decks.map((e) => (e._id === action.payload._id ? action.payload : e));
      })
      .addCase(likeDeck.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDeckUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDeckUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //!!! fix bug
        state.decks = state.decks.filter((deck) => deck._id !== action.payload._id);
      })
      .addCase(deleteDeckUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = deckSlice.actions;
export default deckSlice.reducer;
