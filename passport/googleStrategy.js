import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import request from 'request';
import fs from 'fs';
import User from '../models/user';
import userRoles from '../enum/userRoles';
import Download from '../helpers/download';
import config from '../config';

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/google/callback'
  },
  (token, tokenSecret, profile, done) => {
    // code
    const { id, displayName, photos, emails, gender } = profile;
    User.findOne({ 'google.googleId': id }, async (err, userMatch) => {
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
        role: userRoles[2],
        emailId: emails[0].value,
        userStatus: 1,
        phone: null,
        gender: gender || null
      });

      // Download the user profile image
      try {
        const dest = await Download(`${emails[0].value}.jpg`, photos[0].value);
        console.log(dest)
        const filename = `${emails[0].value}`;
        request.post(
          `${config.nodeBaseUrl}/api/v1/upload`,
          { formData: { filename, file: fs.createReadStream(dest) } },
          (errUpload, response) => {
            if (errUpload) {
              console.log(errUpload.message);
            } else {
              console.log(response.body);
            }
          }
        );
      } catch (error) {
        console.log(error.message);
      }

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

export default strategy;
