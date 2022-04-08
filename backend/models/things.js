const mongoose = require('mongoose');

//Mise en place du schéma de données mongoDB
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

//Pour exporter et exploiter le schéma de données
module.exports = mongoose.model('Thing', thingSchema);