const bcrypt = require('bcrypt');

const plainTextPassword = 'mySecurePassword';
const saltRounds = 10; // The number of salt rounds (higher is more secure)

bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed Password:', hash);
    // Store the 'hash' in your database as the user's password
  }
});


