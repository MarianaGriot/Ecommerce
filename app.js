// Importar las dependencias
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

// Crear una instancia de Express
const app = express();

// Configurar la base de datos (usando Mongoose)
mongoose.connect('mongodb://localhost/ecommerce_db', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
  console.error('Error de conexión a la base de datos: ' + err);
  process.exit(1);
});

// Configurar el middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Configurar Passport para la autenticación de usuario
passport.use(new LocalStrategy(
  function(username, password, done) {
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Buscar el usuario por su ID en la base de datos
  // Devolver el usuario encontrado o null si no se encuentra
});


// Importar rutas
const usuarioRoutes = require('./routes/user with passport');
const carritoRoutes = require('./routes/carts');
const compraRoutes = require('./routes/compra');
const adminRoutes = require ('./routes/admin');
const premiumRoutes = require ('./routes/user premium');


// Usar las rutas importadas
app.use('/usuario', usuarioRoutes);
app.use('/carrito', carritoRoutes);
app.use('/compra', compraRoutes);
app.use('/admin', adminRoutes)
app.use('/premium', premiumRoutes)


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
