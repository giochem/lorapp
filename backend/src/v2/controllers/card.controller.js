const cloudinary = require('../../config/cloudinary');
//!! remove upload
const upload = require('../../config/multer');

const { createCard, findCardByUserId, deleteCardById } = require('../services/card.service');

module.exports = {
  uploadCard: async (req, res) => {
    try {
      //!! Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      const card = await createCard(req.body.name, req.userId, result.secure_url, result.public_id);

      res.status(200).json(card);
    } catch (error) {
      console.log('🚀 ~ file: card.controller.js ~ line 26 ~ uploadCard ~ error', error);
    }
  },
  getCardsUser: async (req, res) => {
    const cards = await findCardByUserId(req.userId);
    res.status(200).json(cards);
  },
  deleteCard: async (req, res) => {
    try {
      const card = await deleteCardById(req.userId, req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(card.cloudinary_id);

      res.status(200).json(card);
    } catch (error) {
      console.log('🚀 ~ file: card.controller.js ~ line 64 ~ deleteCard ~ error', error);
    }
  },
};
