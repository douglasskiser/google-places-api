var express = require('express');
var app = express();
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyA6bunprK2PMIyxFExEaU9hBm7qUYJZo40'
});

app.set('port', (process.env.PORT || 5000));

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