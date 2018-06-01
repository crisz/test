var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : (process.env.NODE_ENV === 'dev' ? 'localhost' : 'eu-cdbr-west-02.cleardb.net'),
  user     : (process.env.NODE_ENV === 'dev' ? 'root' : 'bbb29682c1dcb3'),
  password : (process.env.NODE_ENV === 'dev' ? '' : 'd6d61873'),
  multipleStatements: true
});

connection.query('CREATE DATABASE IF NOT EXISTS ' + (process.env.NODE_ENV === 'dev' ? 'spotifai' :  'heroku_dabf6c529dbabf5'), function (err) {
  if (err) throw err;
  connection.query('USE ' + (process.env.NODE_ENV === 'dev' ? 'spotifai' :  'heroku_dabf6c529dbabf5'), function (err) {
      if (err) throw err;
      connection.query(`CREATE TABLE IF NOT EXISTS \`friend\` (
        \`friend1\` varchar(100) NOT NULL,
        \`friend2\` varchar(100) NOT NULL,
        PRIMARY KEY (\`friend1\`, \`friend2\`)
      )`, function (err) {
              if (err) throw err;
          });
  });
});

router.get('/friends/:username', function(req, res) {
  var username = req.params.username;
  connection.query('SELECT * FROM `friend` WHERE ? OR ?', [{friend1: username}, {friend2: username}], function(err, data) {
    if (err) {
      console.error(err);
      res.statusCode = 400;
      res.json({
        error: 'Error in database. Please contact Cristian'
      });
      return res.end();
    }
    else {
      res.statusCode = 200;
      console.log(data);
      res.json(data);
      return res.end();
    }
  });
});
  // res.json([{
  //   username: username,
  //   listening: 'Inno alla gioia'
  // }, {
  //   username: 'Marco',
  //   listening: 'Fabrizio De Andrè'
  // }, {
  //   username: 'Giovanni',
  //   listening: 'Young Signorino'
  // }]);

router.post('/friends/:username', function(req, res) {
  var friend1 = req.params.username;
  var friend2 = req.body.username;
  var friends = {
    friend1,
    friend2
  }
  connection.query('INSERT INTO `friend` set ?;', friends, function (err, data) {
    if (err) {
      console.error(err);
      res.statusCode = 400;
      res.json({
        error: 'Error in database. Please contact Cristian'
      });
      return res.end();
    }
    else {
      res.statusCode = 200;
      res.json({
        message: 'Friend insertion success!'
      });
      return res.end();
    }
  });
});


module.exports = router;