const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //Parse automatiquement les requêtes en JSON
const path = require('path'); //Pour mettre en place le chemin d'accès à un fichier téléchargé par l'utilisateur

//Import des routes (CRUD)
const stuffRoutes = require('./routes/stuff');

//Import des routes utilisateur
const userRoutes = require('./routes/user');

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

//Intégration du middleware de téléchargement de fichiers
app.use('/images', express.static(path.join(__dirname, 'images')));

//Intégration des routes à l'API (CRUD)
app.use('/api/stuff', stuffRoutes);

//Intégration des routes utilisateur à l'API
app.use('/api/auth', userRoutes);

//Pour exporter et exploiter l'API
module.exports = app;