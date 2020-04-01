import passport from 'passport';
import LocalStrategy from './localStrategy';
import GoogleStratgey from './googleStrategy';
import FacebookStrategy from './facebookStrategy';
import User from '../models/user';

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

export default passport;
