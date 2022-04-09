const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

//Import des controllers
router.get('/', stuffCtrl.getAllStuff);
router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);

//Export et explotation des routes
module.exports = router;