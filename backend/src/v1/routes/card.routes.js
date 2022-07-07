const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const { verifyToken } = require('../middleware/verifyToken.middleware');
const { uploadCard, getCardsUser, deleteCard } = require('../controllers/card.controller');

router.route('/me').get(verifyToken, getCardsUser).post(verifyToken, upload.single('image'), uploadCard);
router.route('/me/:id').delete(verifyToken, deleteCard);

module.exports = router;
