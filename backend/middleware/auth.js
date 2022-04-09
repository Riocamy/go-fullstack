//Import du package de création de token
const jwt = require('jsonwebtoken');

//Création du middleware d'authentification
module.exports = (req, res, next) => {
  try {
    //Récupération du token de la requête
    const token = req.headers.authorization.split(' ')[1];
    //Vérifier si la clé d'authentification du token est correcte
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //Récupération de l'ID de l'utilisateur
    const userId = decodedToken.userId;
    //Vérifier si l'utilisateur est le même que celui qui aenvoyé la requête
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};