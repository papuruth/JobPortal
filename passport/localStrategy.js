const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const strategy = new LocalStrategy((username, password, done) => {
  console.log(username, password);
  User.findOne({ emailId: username }, (err, userMatch) => {
    console.log('test', userMatch);
    if (err) {
      return done(err);
    }
    if (!userMatch) {
      return done(null, { message: 'Incorrect username'});
    }
    if (!userMatch.checkPassword(password)) {
      return done(null, { message: 'Incorrect password'});
    }
    return done(null, {data: userMatch, status: true});
  });
});

module.exports = strategy;
