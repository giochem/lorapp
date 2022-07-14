const User = require('../models/user.model');

module.exports = {
  google: async (data) => {
    try {
      const userExist = await User.findOne({ googleId: data.id });
      if (userExist) {
        return userExist;
      }

      const newUser = new User();

      newUser.googleId = data.id;
      newUser.name = data.name;

      await newUser.save();

      return newUser;
    } catch (error) {
      console.log('🚀 ~ file: auth.service.js ~ line 17 ~ authByGoogle: ~ error', error);
    }
  },
};
