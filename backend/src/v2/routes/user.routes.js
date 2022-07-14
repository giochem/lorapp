const express = require('express');
const router = express.Router();
const { logout } = require('../controllers/user.controller');

router.post('/logout', logout);

module.exports = router;
