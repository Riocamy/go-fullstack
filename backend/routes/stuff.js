//Import d'express
const express = require('express');

//Déclaration des routes
const router = express.Router();

//Import du middleware d'authentification
const auth = require('../middleware/auth');

//Import des controllers
const stuffCtrl = require('../controllers/stuff');

//Ajout des controllers aux routes (incluant le middleware d'authentification)
router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

//Export et explotation des routes
module.exports = router;