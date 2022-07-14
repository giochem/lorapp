const Deck = require('../models/deck.model');
const { findDecksByStatus, createDeck, findDeckByUserId, updateDeckById } = require('../services/deck.service');

module.exports = {
  getAllDecksPublic: async (req, res) => {
    try {
      const decks = await findDecksByStatus('public');
      res.json(decks);
    } catch (error) {
      console.log('🚀 ~ file: deck.controller.js ~ line 13 ~ getAllDecksPublic: ~ error', error);
    }
  },
  setDeckPublic: async (req, res) => {
    try {
      const deck = await updateDeckById(req.params.id, { like: req.body });
      res.json(deck);
    } catch (error) {
      console.log('🚀 ~ file: deck.controller.js ~ line 18 ~ setDeckPublic: ~ error', error);
    }
  },
  createDeck: async (req, res) => {
    try {
      const { name, links, logo, cards, status } = req.body;
      if (!name || !logo || !cards) {
        res.status(400);
        throw new Error('Please all fields');
      }

      const newDeck = await createDeck(name, req.userId, logo, status, links, cards);
      res.status(200).json(newDeck);
    } catch (error) {
      console.log('🚀 ~ file: deck.controller.js ~ line 36 ~ createDeck: ~ error', error);
    }
  },
  getDecksUser: async (req, res) => {
    try {
      const decks = await findDeckByUserId(req.userId);

      res.status(200).json(decks);
    } catch (error) {
      console.log('🚀 ~ file: deck.controller.js ~ line 59 ~ getDecksUser: ~ error', error);
    }
  },
  deleteDeckUser: async (req, res) => {
    try {
      const deck = await deleteDeckById(req.params.id, req.userId);

      res.status(200).json(deck);
    } catch (error) {
      console.log('🚀 ~ file: deck.controller.js ~ line 71 ~ deleteDeckUser: ~ error', error);
    }
  },
};
