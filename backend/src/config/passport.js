const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://lor-app-v2.herokuapp.com/api/v2/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, { accessToken, refreshToken, profile });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    id: user.profile.id,
    name: user.profile.displayName,
    iat: Date.now().toString(),
  });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
