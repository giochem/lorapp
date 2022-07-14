const { findById } = require('../models/deck.model');
const Deck = require('../models/deck.model');
module.exports = {
  findDecksByStatus: async (status) => {
    try {
      return await Deck.find({ status: status });
    } catch (error) {
      console.log('🚀 ~ file: deck.service.js ~ line 7 ~ findDecksByStatus: ~ error', error);
    }
  },
  createDeck: async (name, userId, logo, status, links, cards) => {
    const deck = new Deck({
      name: name,
      user: userId,
      logo: logo,
      status: status,
      links: links,
      cards: cards,
    });
    return await deck.save();
  },
  findDeckByUserId: async (userId) => {
    try {
      return await Deck.find({ user: userId });
    } catch (error) {}
  },
  updateDeckById: async (deckId, update) => {
    try {
      return await Deck.findByIdAndUpdate(deckId, update, { new: true });
    } catch (error) {
      console.log('🚀 ~ file: deck.service.js ~ line 25 ~ updateDeckById: ~ error', error);
    }
  },
  deleteDeckById: async (deckId, userId) => {
    const deck = await findById(deckId);

    if (!deck) {
      return undefined;
    }

    if (deck.user.toString() !== req.user.id) {
      return undefined;
    }

    await deck.remove();

    return deck;
  },
};
