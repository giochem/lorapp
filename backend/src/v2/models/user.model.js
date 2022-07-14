const { Schema, model } = require('mongoose');

const userSchema = Schema(
  {
    name: {
      type: String,
      unqiue: true,
    },
    googleId: {
      type: String,
      unqiue: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
