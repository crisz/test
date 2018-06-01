var express = require('express');
var path = require('path');
var songs = require('./songs');
var auth = require('./auth');
var friends = require('./friends');
var app = express();
var bodyParser = require('body-parser');

var clientPath = path.join('client');
var songsPath = path.join('songs');
var sharedPath = path.join('shared');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', songs, friends);
app.use('/auth', auth);
app.use(express.static(sharedPath));
app.use(express.static(songsPath));
app.use(express.static(clientPath));

app.use('/', function(req, res) {
  res.sendFile(path.resolve(path.join(clientPath, 'index.html')));
});


module.exports.start = function() {
  app.listen(3000, function() {
    console.log('Server started on port 3000');
  });
}

