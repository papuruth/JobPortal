import { Strategy as FacebookStrategy } from 'passport-facebook';
import request from 'request';
import fs from 'fs';
import User from '../models/user';
import userRoles from '../enum/userRoles';
import Download from '../helpers/download';
import config from '../config';

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'emails', 'photos']
  },
  (accessToken, refreshToken, profile, done) => {
    // code
    const { id, displayName, photos, emails, gender } = profile;
    User.findOne({ 'facebook.fbId': id }, async (err, userMatch) => {
      // handle errors here:
      if (err) {
        console.log('Error!! trying to find user with facebookId');
        console.log(err);
        return done(null, false);
      }
      // if there is already someone with that googleId
      if (userMatch) {
        return done(null, { data: userMatch });
      }
      // if no user in our db, create a new user with that googleId
      const newFacebookUser = new User({
        'facebook.fbId': id,
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
      newFacebookUser.save((err1, savedUser) => {
        if (err1) {
          console.log('Error!! saving the new google user');
          return done(null, false);
        }
        return done(null, { data: savedUser });
      }); // closes newFacebookUser.save
    }); // closes User.findONe // closes User.fin
  }
);

export default facebookStrategy;
