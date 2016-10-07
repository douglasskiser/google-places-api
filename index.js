var express = require('express');
var app = express();
var googleMapsClient = require('@google/maps').createClient({
  key: GOOGLE_MAPS_API_KEY
});

app.set('port', (process.env.PORT || 5000));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Authorizationtoken, Activityid, Context, Useruniqueid, Content-Length, X-Requested-With, X-HTTP-Method-Override');
  next();
});

app.get('/autocomplete/:input', function (req, res) {
  googleMapsClient.placesAutoComplete({
    input: req.params.input || ''
  }, function(err, response) {
    if (!err) {
      return res.status(200).json(response);
    }
    return res.status(500).send(err);
  });
});

app.get('/place/:placeId', function(req, res) {
  googleMapsClient.place({
    placeid: req.params.placeId || ''
  }, function(err, response) {
    if (!err) {
      return res.status(200).json(response);
    }
    return res.status(500).send(err);
  });
});

app.listen(app.get('port'), function () {
  console.log('Server is listening on port ' + app.get('port'));
});