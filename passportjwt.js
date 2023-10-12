const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key', // Your secret key for verifying JWTs
};

passport.use(new JwtStrategy(options, (jwt_payload, done) => {
  // Here you can fetch the user from a database based on the JWT payload
  // and invoke the 'done' callback with the user or an error
}));
