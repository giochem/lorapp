const hash = require('hash.js');
const jwt = require('jsonwebtoken');
const { google } = require('../services/auth.service');
const { findUserByGoogleId } = require('../services/user.service');

const EXPIRATION_MINUTES = 1 * 60;
module.exports = {
  generate: async (req, res, next) => {
    try {
      const fingerprint = Date.now().toString();

      const fingerprintHash = hash.sha256().update(fingerprint).digest('hex');

      const user = await google(req.session.passport.user);

      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: EXPIRATION_MINUTES,
      });
      const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_REFRESH);

      res.cookie('fingerprint', fingerprint, { httpOnly: true });

      res.cookie('fingerprintHash', fingerprintHash, { httpOnly: false });

      res.cookie('refreshToken', refreshToken, { httpOnly: true });

      res.cookie('accessToken', accessToken, { httpOnly: false, maxAge: 2 * 60 * 1000 });
      next();
    } catch (error) {
      console.log('🚀 ~ file: generate.middleware.js ~ line 27 ~ generate: ~ error', error);
    }
  },
  generateToken: async (req, res, next) => {
    if (!req.accessToken) {
      try {
        const decode = jwt.verify(req.refreshToken, process.env.JWT_SECRET_REFRESH);

        req.accessToken = jwt.sign({ id: decode.id }, process.env.JWT_SECRET, { expiresIn: EXPIRATION_MINUTES });
        //! reset refreshToken
        req.userId = decode.id;
      } catch (error) {
        throw new Error(error);
      }
    }
    next();
  },
};
