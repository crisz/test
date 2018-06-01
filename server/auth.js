var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});

connection.query('CREATE DATABASE IF NOT EXISTS spotifai', function (err) {
  if (err) throw err;
  connection.query('USE spotifai', function (err) {
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
  connection.query('SELECT * from users', function(result) {
    console.log(result);
  });

  if(req.body.username === req.body.password) {
    res.statusCode = 200;
    res.json({
      username: req.body.username
    });
    res.end();
  } else {
    res.statusCode = 401;
    res.json({
      error: 'Login failed'
    });
    res.end();
  }
});

router.post('/sign-up', function(req, res) {
  var user = req.body;
  console.log('###user', user);
  if (!validate(user)) {
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

function validate(user) {
  return true;
}

module.exports = router;