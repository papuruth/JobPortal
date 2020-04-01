import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';

const strategy = new LocalStrategy((username, password, done) => {
  User.findOne({ emailId: username }, (err, userMatch) => {
    if (err) {
      return done(err);
    }
    if (!userMatch) {
      return done(null, { message: 'Incorrect username' });
    }
    if (!userMatch.checkPassword(password)) {
      return done(null, { message: 'Incorrect password' });
    }
    return done(null, { data: userMatch, status: true });
  });
});

export default strategy;
