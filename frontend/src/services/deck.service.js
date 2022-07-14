import axios from 'axios';

const API_URL = `/api/v2/decks`;

// get all decks public
const getAllDecksPublic = async () => {
  const res = await axios.get(API_URL);
  console.warn(res);
  return res.data;
};
// create new deck
const createDeck = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL + `/me`, data, config);
  console.warn(res);
  return res.data;
};
// like deck
const likeDeck = async (data) => {
  const res = await axios.put(API_URL + `/${data.id}`, data.like);
  console.warn(res);
  return res.data;
};
// get decks of user
const getDecksUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL + `/me`, config);
  console.warn(res);
  return res.data;
};
// delete deck of user
const deleteDeck = async (token, deckId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(API_URL + `/me/${deckId}`, config);
  console.warn(res);
  return res.data;
};
const deckService = {
  getAllDecksPublic,
  createDeck,
  likeDeck,
  getDecksUser,
  deleteDeck,
};
export default deckService;
