var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var validate = require('../shared/validate');

var connection = mysql.createConnection({
  host     : (process.env.NODE_ENV === 'dev' ? 'localhost' : 'eu-cdbr-west-02.cleardb.net'),
  user     : (process.env.NODE_ENV === 'dev' ? 'root' : 'bbb29682c1dcb3'),
  password : (process.env.NODE_ENV === 'dev' ? '' : 'd6d61873')
});

connection.query('CREATE DATABASE IF NOT EXISTS ' + (process.env.NODE_ENV === 'dev' ? 'spotifai' :  'heroku_dabf6c529dbabf5'), function (err) {
  if (err) throw err;
  connection.query('USE ' + (process.env.NODE_ENV === 'dev' ? 'spotifai' :  'heroku_dabf6c529dbabf5'), function (err) {
      if (err) throw err;
      connection.query(`CREATE TABLE IF NOT EXISTS \`user\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`first_name\` varchar(100) NOT NULL,
        \`last_name\` varchar(100) NOT NULL,
        \`username\` varchar(100) UNIQUE NOT NULL,
        \`email\` varchar(100) UNIQUE NOT NULL,
        \`password\` varchar(100) NOT NULL,
        PRIMARY KEY (\`id\`)
      )`, function (err) {
              if (err) throw err;
          });
  });
});

router.post('/login', function(req, res) {
  var user = [{username: req.body.username}, {password: req.body.password}];
  connection.query('SELECT * from user WHERE ? AND ?', user, function(err, result) {
    if (err) throw err;
    console.log(result);
    if(result !== null && result.length > 0) {
      res.statusCode = 200;
      res.json(result[0]);
      res.end();
    } else {
      res.statusCode = 401;
      res.json({
        error: 'Login failed'
      });
      res.end();
    }
  });

  
});

router.post('/sign-up', function(req, res) {
  var user = req.body;
  console.log('###user', user);
  if (validate.validateSignup(user.first_name, user.last_name, user.username, user.email, user.password)) {
    res.statusCode = 400;
    res.json({
      error: 'Form is not valid'
    });
    return res.end();
  } else {
    console.log('Form is valid');
    connection.query('INSERT INTO `user` set ?;', user, function (err, data) {
      if (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
          var field = err.sqlMessage.split('\'')[3];

          res.json({
            errorField: {
              [field]: field+' già in uso. Inseriscine un altro.'
            }
          });
          return res.end();
        }
        res.statusCode = 400;
        res.json({
          error: 'Error in database. Please contact Cristian'
        });
        return res.end();
      }
      else {
        res.statusCode = 200;
        res.json({
          message: 'Sign up success!',
          username: user.username
        });
        return res.end();
      }
    });
  }

});

module.exports = router;