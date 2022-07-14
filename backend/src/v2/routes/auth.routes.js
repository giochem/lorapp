const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { loginByFacebook } = require('../controllers/user.controller');
const { generate } = require('../middleware/generate.middleware');
const { cookie, verifyToken } = require('../middleware/protect.middleware');
const { findUserById } = require('../services/user.service');

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google'), generate, (req, res, next) => {
  res.redirect('http://localhost:3000/auth');
});

router.get('/test-token', cookie, verifyToken, async (req, res, next) => {
  if (!req.accessToken) {
    try {
      const decode = jwt.verify(req.refreshToken, process.env.JWT_SECRET_REFRESH);

      const EXPIRATION_MINUTES = 1 * 60;

      const user = await findUserById(decode.id);

      req.accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: EXPIRATION_MINUTES });

      req.data = user;
    } catch (error) {
      throw new Error(error);
    }
  } else {
    const user = await findUserById(req.accessToken.id);
    req.accessToken = '';
    req.data = user;
  }
  res
    .status(200)
    .json({
      refreshToken: req.refreshToken,
      accessToken: req.accessToken,
      data: req.data,
      session: req.session.passport.user.id,
    });
  next();
});

module.exports = router;
