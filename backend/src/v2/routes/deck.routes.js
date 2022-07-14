const express = require('express');
const router = express.Router();
const { cookie, verifyToken } = require('../middleware/protect.middleware');
const { generateToken } = require('../middleware/generate.middleware');
const {
  createDeck,
  getAllDecksPublic,
  setDeckPublic,
  getDecksUser,
  deleteDeckUser,
} = require('../controllers/deck.controller');

// @desc    Get all decks public
// @route   GET /api/v1/decks
// @access  Public
router.route('').get(getAllDecksPublic);
// @desc    Set deck public
// @route   PUT /api/v1/decks/:id
// @access  Public
router.route('/:id').put(setDeckPublic);

router
  .route('/me')
  // @desc    Create deck
  // @route   POST /api/v1/decks/me
  // @access  Private
  .post(cookie, verifyToken, generateToken, createDeck)
  // @desc    Get decks of user
  // @route   GET /api/v1/decks/me
  // @access  Private
  .get(cookie, verifyToken, generateToken, getDecksUser);

// @desc    Delete deck of user
// @route   DELETE /api/v1/decks/me/:id
// @access  Private
router.route('/me/:id').delete(cookie, verifyToken, generateToken, deleteDeckUser);

module.exports = router;
