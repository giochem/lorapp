const Card = require('../models/card.model');
module.exports = {
  createCard: async (name, userId, image, cloundinaryId) => {
    try {
      let card = new Card({
        name: name,
        user: userId,
        image: image,
        cloudinary_id: cloundinaryId,
      });

      await card.save();

      return card;
    } catch (error) {
      console.log('🚀 ~ file: user.service.js ~ line 8 ~ findUserById: ~ error', error);
    }
  },

  findCardByUserId: async (userId) => {
    try {
      return await Card.find({ user: userId });
    } catch (error) {
      console.log('🚀 ~ file: card.service.js ~ line 30 ~ findCardByUserId: ~ error', error);
    }
  },
  deleteCardById: async (userId, cardId) => {
    try {
      //? should findByIdAndRemove
      const card = Card.findById(cardId);
      if (!card) {
        return undefined;
      }
      // Make sure the logged in user matches the goal user
      if (card.user.toString() !== userId.toString()) {
        return undefined;
      }

      await card.remove();

      return card;
    } catch (error) {
      console.log('🚀 ~ file: card.service.js ~ line 46 ~ deleteCard: ~ error', error);
    }
  },
};
