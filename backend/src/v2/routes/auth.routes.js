const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { loginByFacebook } = require('../controllers/user.controller');
const { generate } = require('../middleware/generate.middleware');
const { cookie, verifyToken } = require('../middleware/protect.middleware');
const { findUserById } = require('../services/user.service');

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
//!!passport.authenticate('google'),
router.get('/google/callback', generate, (req, res, next) => {
  res.redirect('https://lor-app-v2.herokuapp.com/auth');
});

module.exports = router;
