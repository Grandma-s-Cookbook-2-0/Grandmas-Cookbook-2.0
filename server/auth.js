// eslint-disable-next-line import/no-extraneous-dependencies
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config();

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    // console.log('serializeUser', user);
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // console.log('deserializeUser', user);
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/protected',
        passReqToCallback: true,
      },
      // this is the verify function of the strategy, which hanldes
      // the profile information gathered during oauth
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          // console.log('verified!')
          console.log('here is the profile:', profile);

          return done(null, profile);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};