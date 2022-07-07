const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');
const Card = require('../models/card.model');
const upload = require('../config/multer');
// @desc    upload card
// @route   POST /api/v1/cards/me
// @access  Private
const uploadCard = asyncHandler(async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Create new user
    let card = new Card({
      name: req.body.name,
      user: req.user.id,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await card.save();
    res.json(card);
  } catch (err) {
    console.log(err);
  }
});
// @desc    get all card
// @route   GET /api/v1/cards
// @access  Private
// // const getAllCards = asyncHandler(async (req, res) => {
// //   Card.find({}, (err, images) => {
// //     if (err) {
// //       console.log(err);
// //       res.status(500).send('An error occurred', err);
// //     } else {
// //       res.json(images);
// //     }
// //   });
// // });
// @desc    get cards of user
// @route   GET /api/v1/cards/me
// @access  Private
const getCardsUser = asyncHandler(async (req, res) => {
  const cards = await Card.find({ user: req.user.id });
  res.json(cards);
});

// @desc    delete card
// @route   DELETE /api/v1/cards/me/:id
// @access  Private
const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    res.status(400);
    throw new Error('Card not found');
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the goal user

  if (card.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  // Delete image from cloudinary
  await cloudinary.uploader.destroy(card.cloudinary_id);
  // delete image form mongodb
  await card.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = { uploadCard, getCardsUser, deleteCard };
