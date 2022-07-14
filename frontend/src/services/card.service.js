import axios from 'axios';

const API_URL = `/api/v2/cards`;

// get cards of user
const getAllCardsUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL + `/me`, config);
  console.warn(res);
  return res.data;
};
// create card of user
const createCard = async (token, card) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL + `/me`, card, config);
  console.warn(res);
  return res.data;
};
// delete card
const deleteCard = async (token, cardId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(API_URL + `/me/${cardId}`, config);
  console.warn(res);
  return res.data;
};
const cardService = {
  getAllCardsUser,
  createCard,
  deleteCard,
};
export default cardService;
