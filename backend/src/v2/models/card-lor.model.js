const mongoose = require('mongoose');

const cardSchema = mongoose.Schema(
  {
    name: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
      type: String,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const database = mongoose.connection.useDb('Data-Dragon');

module.exports = database.mongoose.model('_Card_Lor', cardSchema);
