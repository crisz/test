var express = require('express');
var path = require('path');
var songs = require('./songs');
var app = express();
var bodyParser = require('body-parser');

var client = path.join('client');

app.use(bodyParser.json());
app.use('/api', songs);

app.use(express.static(client));

app.use('/', function(req, res) {
  res.sendFile(path.resolve(path.join(client, 'index.html')));
});


module.exports.start = function() {
  app.listen(3000, function() {
    console.log('Server started on port 3000');
  });
}
