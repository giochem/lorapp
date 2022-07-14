module.exports = {
  logout: async (req, res, next) => {
    try {
      //Todo : add refreshToken of user  to ban list
      res.status(200).json({
        success: 'success',
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
