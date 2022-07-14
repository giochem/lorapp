const path = require('path');
const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passportSetup = require('./config/passport');
const passport = require('passport');
const RedisStore = require('connect-redis')(session);
const compression = require('compression');
const connectDB = require('./config/mongodb');
const redisClient = require('./config/redis');
const { errorHandler } = require('./v1/middleware/error.middleware');
const port = process.env.PORT || 8080;
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
  })
);
app.use(
  session({
    secret: 'keyboard cat',
    store: new RedisStore({
      client: redisClient,
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use('/api/v1', require('./v1/routes/index'));

app.use('/api/v2', require('./v2/routes/index'));
// Server frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
