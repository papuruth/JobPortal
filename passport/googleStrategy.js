const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const roles = require('../enum/userRoles');

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/google/callback'
  },
  (token, tokenSecret, profile, done) => {
    // testing
    console.log('===== GOOGLE PROFILE =======');
    console.log(profile);
    console.log('======== END ===========');
    // code
    const { id, displayName, photos, emails, gender } = profile;
    User.findOne({ 'google.googleId': id }, (err, userMatch) => {
      // handle errors here:
      if (err) {
        console.log('Error!! trying to find user with googleId');
        console.log(err);
        return done(null, false);
      }
      // if there is already someone with that googleId
      if (userMatch) {
        return done(null, { data: userMatch, status: true });
      }
      // if no user in our db, create a new user with that googleId
      console.log('====== PRE SAVE =======');
      console.log(id);
      console.log(profile);
      console.log('====== post save ....');
      const newGoogleUser = new User({
        'google.googleId': id,
        name: displayName,
        image: photos[0].value,
        role: roles[2].value,
        emailId: emails[0].value,
        userStatus: 1,
        phone: null,
        gender: gender || null
      });
      // save this user
      newGoogleUser.save((err1, savedUser) => {
        if (err1) {
          console.log('Error!! saving the new google user');
          console.log(err1);
          return done(null, false);
        }
        return done(null, { data: savedUser, status: true });
      }); // closes newGoogleUser.save
    }); // closes User.findONe
  }
);

module.exports = strategy;
