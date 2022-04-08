const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //Parse automatiquement les requêtes en JSON

//Import des routes
const stuffRoutes = require('./routes/stuff');


//Mise en place de la base de données MongoDB
mongoose.connect('mongodb+srv://Riocamy:BBD9!ARYheszL9AF@gofullstackapi.2ekge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/**** Intégration des Middlewares ****/

//Accès au core de la requête
app.use(express.json());

//Ajout des Middlewares d'autorisations
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Intégration du bodyparser
app.use(bodyParser.json());

//Intégration des routes (CRUD)
app.use('/api/stuff', stuffRoutes);

//Pour exporter et exploiter l'API
module.exports = app;