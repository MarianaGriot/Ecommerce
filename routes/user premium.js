const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['standard', 'premium', 'admin'], // Define los roles posibles
    default: 'standard', // Establece el rol predeterminado
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;



// Código de registro o autenticación de usuarios
const User = require('./userModel');

// ...

// Después de autenticar o registrar al usuario, puedes verificar si cumple con los criterios para ser "premium".
if (cumpleCriteriosParaSerPremium) {
  user.role = 'premium';
  user.save(); // Guarda el cambio en el rol del usuario
}

// ...
