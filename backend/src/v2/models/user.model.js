const { Schema, model } = require('mongoose');

const userSchema = Schema(
  {
    name: {
      type: String,
    },
    googleId: {
      type: String,
      unqiue: true,
    },
    // basic
    email: {
      type: String,
      unqiue: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
