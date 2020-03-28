const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const request = require('request');
const fs = require('fs');
const User = require('../models/user');
const roles = require('../enum/userRoles');
const Download = require('../helpers/download');
const config = require('../config');

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${config.nodeBaseUrl}/google/callback`
  },
  (token, tokenSecret, profile, done) => {
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
        return done(null, { data: userMatch });
      }
      // if no user in our db, create a new user with that googleId
      const newGoogleUser = new User({
        'google.googleId': id,
        name: displayName,
        image: '/'.concat(emails[0].value).concat('.jpg'),
        role: roles[2].value,
        emailId: emails[0].value,
        userStatus: 1,
        phone: null,
        gender: gender || null
      });
      // Download the user profile image
      Download(emails[0].value, photos[0].value, (error, dest) => {
        if (error) console.log('error in downloading dp');
        else {
          const filename = `${emails[0].value}`;
          request.post(
            `${config.nodeBaseUrl}/upload`,
            { formData: { filename, file: fs.createReadStream(dest) } },
            (errUpload, response) => {
              if (errUpload) {
                console.log(errUpload.message);
              } else {
                console.log(response.body);
              }
            }
          );
        }
      });

      // save this user
      newGoogleUser.save((err1, savedUser) => {
        if (err1) {
          console.log('Error!! saving the new google user');
          return done(null, false);
        }
        return done(null, { data: savedUser });
      }); // closes newGoogleUser.save
    }); // closes User.findONe
  }
);

module.exports = strategy;
