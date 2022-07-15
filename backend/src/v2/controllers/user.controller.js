const bcrypt = require('bcryptjs');
const hash = require('hash.js');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const EXPIRATION_MINUTES = 1 * 60;

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400);
        next('Please add all field');
      }
      try {
        var user = await User.findOne({ email });
      } catch (error) {
        throw new Error(error);
      }
      if (user && (await bcrypt.compare(password, user.password))) {
        const fingerprint = Date.now().toString();

        const fingerprintHash = hash.sha256().update(fingerprint).digest('hex');

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: EXPIRATION_MINUTES,
        });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_REFRESH);

        res.cookie('fingerprint', fingerprint, { httpOnly: true });

        res.cookie('fingerprintHash', fingerprintHash, { httpOnly: false });

        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        res.cookie('accessToken', accessToken, { httpOnly: false, maxAge: 2 * 60 * 1000 });
        res.json({ success: 'success' });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        next('Please add all fields');
      }

      // Check if user exists

      const userExists = await User.findOne({ email });
      console.log(userExists);
      if (userExists) {
        throw new Error('User already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      var user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      if (user) {
        const fingerprint = Date.now().toString();

        const fingerprintHash = hash.sha256().update(fingerprint).digest('hex');

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: EXPIRATION_MINUTES,
        });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_REFRESH);

        // res.cookie('fingerprint', fingerprint, { httpOnly: true });

        // res.cookie('fingerprintHash', fingerprintHash, { httpOnly: false });

        // res.cookie('refreshToken', refreshToken, { httpOnly: true });

        res.cookie('Cookie', accessToken, { httpOnly: false, maxAge: 2 * 60 * 1000 });
        // res.setHeader('Cookie', `accessToken=${accessToken}; maxAge= 2 * 60 * 1000`);
        next();
      } else {
        throw new Error('Invalid user data');
      }
    } catch (error) {
      throw new Error(error);
    }
  },
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
