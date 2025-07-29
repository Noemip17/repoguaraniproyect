const mongoose = require('mongoose');

const TraduccionSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  es: { type: String, required: true },
  gn: { type: String, required: true },
  // otros campos si tienes
});

module.exports = mongoose.model('Traduccion', TraduccionSchema, 'traducciones');


