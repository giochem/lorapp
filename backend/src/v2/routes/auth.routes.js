const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { generate } = require('../middleware/generate.middleware');
const { cookie, verifyToken } = require('../middleware/protect.middleware');
const { findUserById } = require('../services/user.service');

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
  generate,
  (req, res, next) => {
    res.redirect('/auth');
  }
);

module.exports = router;
