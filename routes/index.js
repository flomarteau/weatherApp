var express = require('express');
var router = express.Router();

// On part du principe que la liste est un tableau vide
var tableville = [];

// Création d'un tableau comprenant toutes les villes
var tableville = [
  "Paris", "Lyon", "Lille", "Marseille", "Bordeaux", "Ajaccio"
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weatherapp', tableville });
});

router.post('/addville', function(req, res, next) {
  console.log(req.body.ville);
  tableville.push(req.body.ville);
  res.render('index', { tableville });
});

router.get('/deleteville', function(req, res, next) {
  tableville.splice(req.query.position, 1);
  res.render('index', { tableville });
});


module.exports = router;
