const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// require model class: users
require('./models/User');

// set up passport js for GoogleAuth authentication
require('./services/passport');

// connect mongodb to mongoose
mongoose.connect(keys.mongoURI);

// create new express api
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());


// set route handlers to express
require('./routes/authRoutes')(app);

// set port to heroku default or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
