const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const GoogleStratgey = require('./googleStrategy');
const FacebookStrategy = require('./facebookStrategy');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, { _id: user.data._id });
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    done(null, user);
  });
});

// ==== Register Strategies ====
passport.use(LocalStrategy);
passport.use(GoogleStratgey);
passport.use(FacebookStrategy);

module.exports = passport;
