const express = require('express');
const apiRouter = express();

apiRouter.use('/auth', require('./auth.routes'));
apiRouter.use('/users', require('./user.routes'));
apiRouter.use('/cards', require('./card.routes'));
apiRouter.use('/decks', require('./deck.routes'));
module.exports = apiRouter;
