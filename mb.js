const mongoose = require('./db'); // Importa la conexión a la base de datos

// Define un esquema
const Schema = mongoose.Schema;
const exampleSchema = new Schema({
  name: String,
  age: Number,
});

// Crea un modelo
const ExampleModel = mongoose.model('Example', exampleSchema);

// Ejemplo de inserción en la base de datos
const newExample = new ExampleModel({ name: 'Ejemplo', age: 25 });
newExample.save((err, savedExample) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Ejemplo guardado con éxito:', savedExample);
  }
});
