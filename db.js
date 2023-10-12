const mongoose = require('mongoose');

// URL de conexión a la base de datos
const dbUrl = 'mongodb://localhost/tu_base_de_datos';

// Conexión a la base de datos
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

// Manejo de eventos de conexión
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos.');
});

module.exports = mongoose;
