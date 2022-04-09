//Import du schéma de données
const Thing = require('../models/Thing');

//Controller de la route POST
exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing); //Pour extraire les données JSON de l'objet crée
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    //Pour générer l'URL de l'image de l'objet crée
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

//Controller de la route GET (récupération d'un objet spécifique)
exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//Controller de la route POST
exports.modifyThing = (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Thing.updateOne({_id: req.params.id}, thing).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

//Controller de la route DELETE
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }).then(
    (thing) => {
      if (!thing) { //S'il n'y a pas d'objet à supprimer
        res.status(404).json({
          error: new Error('No such Thing!')
        });
      }
      if (thing.userId !== req.auth.userId) { //Si c'est un autre utilisateur qui cherche à supprimer l'objet
        res.status(400).json({
          error: new Error('Unauthorized request!')
        });
      }
      Thing.deleteOne({ _id: req.params.id }).then( //Si ces conditions sont OK, on applique le controller
        () => {
          res.status(200).json({
            message: 'Deleted!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }
  )
};

//Controller de la route GET (récupération de tous les objets)
exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};