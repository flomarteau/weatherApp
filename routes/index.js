var express = require('express');
var router = express.Router();
var request = require('request');
var mongoose= require('mongoose');

// On fait le lien entre le document js et la bdd mlab en utilisant le nom du compte, mdp, adresse, et nom de la bdd
var options = { server: { socketOptions: {connectTimeoutMS: 5000 } }};
mongoose.connect('mongodb://Flora:mlab2807@ds219318.mlab.com:19318/openweatherapp',
    options,
    function(err) {
     console.log(err);
    }
);

// Définition du schéma : types de données de l'enregistrement
var citySchema = mongoose.Schema({
  name: String,
  tempmin: Number,
  tempmax: Number,
  temps: String,
  picto: String,
  long: Number,
  lat: Number
});

// Création du modèle (qui permet de lire, écrire, modifier et supprimer les enregistrements)
var cityModel = mongoose.model('openweatherapp', citySchema);


router.get('/', function(req, res, next) {

  cityModel.find({}, function(error, city) {
    if (error) throw error;
    console.log(city);
    res.render('index', { city });
  });

});


router.post('/addville', function(req, res, next) {
  request("http://api.openweathermap.org/data/2.5/weather?q="+req.body.ville+"&lang=fr&units=metric&APPID=7641873b9fca43b3f95efab8fa923609",
  function(error, response, body) {

    body = JSON.parse(body);
    console.log(typeof(body.main.temp_min));

    var newCity = new cityModel ({
      name: body.name,
      tempmin: body.main.temp_min,
      tempmax: body.main.temp_max,
      temps: body.weather[0].description,
      picto: body.weather[0].icon,
      long: body.coord.lon,
      lat: body.coord.lat
    });

    newCity.save(function (error, user) {

      cityModel.find({}, function(error, city) {
        if (error) throw error;
        console.log(city);
        res.render('index', { city });
      });
    });
  });
});

router.get('/deleteville', function(req, res, next) {

    cityModel.remove (
      {_id: req.query.id},
      function(error) {
        console.log(error)
      }
    );

  cityModel.find({}, function(error, city) {
    if (error) throw error;
    res.render('index', { city });
  });

});





module.exports = router;
