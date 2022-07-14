const User = require('../models/user.model');
module.exports = {
  // findUserById: async (id = 1) => {
  //   try {
  //     const user = await User.findById(id);
  //     return user;
  //   } catch (error) {
  //     console.log('🚀 ~ file: user.service.js ~ line 8 ~ findUserById: ~ error', error);
  //   }
  // },
  findUserByGoogleId: async (googleId) => {
    try {
      const user = await User.findOne({ googleId: googleId });
      return user;
    } catch (error) {
      console.log('🚀 ~ file: user.service.js ~ line 16 ~ findUserByGoogleId: ~ error', error);
    }
  },
};
