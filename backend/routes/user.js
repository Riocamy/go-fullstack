//Intégration d'express
const express = require('express');
//Déclaration des routes
const router = express.Router();

//Import des controllers
const userCtrl = require('../controllers/user');

//Création de la route pour créer un compte utilisateur
router.post('/signup', userCtrl.signup);
//Création de la route pour accéder à un compte utilisateur
router.post('/login', userCtrl.login);

//Export et exploitation des routes
module.exports = router;