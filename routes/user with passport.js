const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Conecta a la base de datos MongoDB
mongoose.connect('mongodb://localhost/tu_basededatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define el modelo de usuario
const User = mongoose.model('User', {
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  age: Number,
  password: String, // Este debe ser un hash de la contraseña
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  role: { type: String, default: 'user' },
});

// Configura la estrategia de Passport para autenticación local
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return done(err);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }
        });
      });
    }
  )
);

// Configura la estrategia de Passport para autenticación de token JWT
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'tu_secreto', // Cambia esto por tu propia clave secreta
    },
    (jwt_payload, done) => {
      User.findById(jwt_payload.sub, (err, user) => {
        if (err) return done(err, false);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

// Inicializa Passport
app.use(passport.initialize());

// Resto de la configuración de tu aplicación Express...

// Rutas y controladores de autenticación...

// Ejemplo de ruta protegida con JWT
app.get('/protegido', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Esta es una ruta protegida' });
});

// Resto de las rutas de tu aplicación...

// Inicia tu servidor
app.listen(3000, () => {
  console.log('Servidor en funcionamiento en el puerto 3000');
});
