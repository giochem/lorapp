const express = require('express');
const router = express.Router();
const upload = require('../../config/multer');
const { cookie, verifyToken } = require('../middleware/protect.middleware');
const { generateToken } = require('../middleware/generate.middleware');
const { uploadCard, getCardsUser, deleteCard } = require('../controllers/card.controller');

//* accessToken, refreshToken, userId,
router
  .route('/me')
  // @desc    Upload card
  // @route   POST /api/v2/cards/me
  // @access  Private
  .post(cookie, verifyToken, generateToken, upload.single('image'), uploadCard)
  // @desc    Get cards of user
  // @route   GET /api/v2/cards/me
  // @access  Private
  .get(cookie, verifyToken, generateToken, getCardsUser);

// @desc    Delete card
// @route   DELETE /api/v2/cards/me/:id
// @access  Private
router.route('/me/:id').delete(cookie, verifyToken, generateToken, deleteCard);

module.exports = router;
