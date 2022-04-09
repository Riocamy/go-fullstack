//Import d'express
const express = require('express');
//Déclaration des routes
const router = express.Router();

//Import des controllers
const stuffCtrl = require('../controllers/stuff');

//Ajout des controllers aux routes
router.get('/', stuffCtrl.getAllStuff);
router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);

//Export et explotation des routes
module.exports = router;