const hash = require('hash.js');
const jwt = require('jsonwebtoken');

module.exports = {
  cookie: (req, res, next) => {
    try {
      //* get cookie of client
      const cookies = req.headers.cookie
        .split('; ')
        .filter((e) => e.split('=')[0].indexOf('.') === -1)
        .map((e) => e.split('='));

      const { fingerprint, fingerprintHash, refreshToken } = Object.fromEntries(cookies);

      if (fingerprintHash !== hash.sha256().update(fingerprint).digest('hex')) {
        res.status(400).json({ error: 'Cookie are not suitable' });

        throw new Error('Cookie are not suitable');
      }
      // refreshToken: not verify
      req.refreshToken = refreshToken;

      next();
    } catch (error) {
      throw new Error(error);
    }
  },
  verifyToken: async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        let token = req.headers.authorization.split(' ')[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decode.id;

        req.accessToken = token;

        next();
      } catch (error) {
        if (error.name === 'TokenExpiredError' && error.message === 'jwt expired') {
          req.accessToken = null;

          next();
        } else {
          throw new Error(error);
        }
      }
    } else {
      throw new Error('Not authorization in headers');
    }
  },
};
