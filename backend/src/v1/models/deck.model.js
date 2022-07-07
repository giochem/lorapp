const mongoose = require('mongoose');

const deckSchema = mongoose.Schema(
  {
    name: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    logo: {
      type: String,
    },
    status: {
      type: String,
      default: 'public',
    },
    links: [
      {
        type: String,
      },
    ],
    cards: [
      {
        type: String,
      },
    ],

    like: {
      icon: { type: String, default: 'icon' },
      number: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Deck', deckSchema);
