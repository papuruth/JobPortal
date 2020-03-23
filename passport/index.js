const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const GoogleStratgey = require('./googleStrategy');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, { _id: user.data._id });
});

passport.deserializeUser((id, done) => {
  console.log('DEserialize ... called');
  User.findOne({ _id: id }, (err, user) => {
    done(null, user);
  });
});

// ==== Register Strategies ====
passport.use(LocalStrategy);
passport.use(GoogleStratgey);

module.exports = passport;
