const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken.middleware');
const {
  createDeck,
  getAllDecksPublic,
  setDeckPublic,
  getDecksUser,
  deleteDeckUser,
} = require('../controllers/deck.controller');

router.route('').get(getAllDecksPublic);
router.route('/:id').put(setDeckPublic);

router.route('/me').post(verifyToken, createDeck).get(verifyToken, getDecksUser);
router.route('/me/:id').delete(verifyToken, deleteDeckUser);

module.exports = router;
