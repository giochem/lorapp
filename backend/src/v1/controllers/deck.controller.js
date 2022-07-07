const asyncHandler = require('express-async-handler');
const Deck = require('../models/deck.model');

// @desc    get all decks public
// @route   GET /api/v1/decks
// @access  Public
const getAllDecksPublic = asyncHandler(async (req, res) => {
  const decks = await Deck.find({ status: 'public' });
  res.json(decks);
});
// @desc    create deck
// @route   POST /api/v1/decks/me
// @access  Private
const createDeck = asyncHandler(async (req, res) => {
  const { name, links, logo, cards, status } = req.body;
  if (!name || !logo || !cards) {
    res.status(400);
    throw new Error('Please all fields');
  }
  const deck = new Deck({
    name: name,
    user: req.user.id,
    logo: logo,
    status: status,
    links: links,
    cards: cards,
  });
  const newDeck = await deck.save();
  res.status(200).json(newDeck);
});
// @desc    set deck public
// @route   PUT /api/v1/decks/:id
// @access  Public
const setDeckPublic = asyncHandler(async (req, res) => {
  const deck = await Deck.findById(req.params.id);
  if (!deck) {
    res.status(400);
    throw new Error('Deck not found');
  }
  const updatedDeck = await Deck.findByIdAndUpdate(
    req.params.id,
    { like: req.body },
    {
      new: true,
    }
  );
  res.json(deck);
});
// @desc    get decks of user
// @route   GET /api/v1/decks/me
// @access  Private
const getDecksUser = asyncHandler(async (req, res) => {
  const decks = await Deck.find({ user: req.user.id });

  res.status(200).json(decks);
});
// @desc    delete deck of user
// @route   DELETE /api/v1/decks/me/:id
// @access  Private
const deleteDeckUser = asyncHandler(async (req, res) => {
  const deck = await Deck.findById(req.params.id);
  // Make sure the logged in user matches the goal user
  if (deck.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  await deck.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = { createDeck, getAllDecksPublic, setDeckPublic, getDecksUser, deleteDeckUser };
