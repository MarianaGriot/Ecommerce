const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    // Your authentication logic here
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Fetch user data from the database based on the id
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
);


app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      // User is authenticated, proceed to the profile page
    } else {
      // Redirect to a login page
    }
  });
  