const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: "566855644675-s3pm6ik0jiec81rgq8tkb70eqdt5mfos.apps.googleusercontent.com",
            clientSecret: 'gw72pEM_CAe_uMor3Z5BE4Jf',
            callbackURL: "http://localhost:9000/auth/google/callback"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};