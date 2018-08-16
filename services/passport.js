const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

// use passport to register  a new strategy for GoogleStrategy
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken , profile, done) => {
      User.findOne({googleId:profile.id})
        .then(existingUser =>{
          if(existingUser){
            // we already have a user reord for a given profile
            done(null,existingUser);
          } else{
            // we don't have a user record with this iID, make a new record
            new User({googleId: profile.id })
              .save()
              .then(user => done(null, user));
          }
      })
      //save new use with google ID to database
    }
  )
);
