var express = require('express');
var fs = require('fs');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer = require('multer');
var mysql = require('mysql');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === 'audio/mp3') {
      cb(null, 'songs');
    } else if (file.mimetype === 'image/jpeg') {
      file.filename = file.filename;
      cb(null, 'img');
    } else {
      console.log(file.mimetype);
      cb({error: 'Mime type not supported'});
    }
  }
});


var connection = mysql.createConnection({
  host     : (process.env.NODE_ENV === 'dev' ? 'localhost' : 'eu-cdbr-west-02.cleardb.net'),
  user     : (process.env.NODE_ENV === 'dev' ? 'root' : 'bbb29682c1dcb3'),
  password : (process.env.NODE_ENV === 'dev' ? '' : 'd6d61873')
});

connection.query('CREATE DATABASE IF NOT EXISTS ' + (process.env.NODE_ENV === 'dev' ? 'spotifai' :  'heroku_dabf6c529dbabf5'), function (err) {
  if (err) throw err;
  connection.query('USE ' + (process.env.NODE_ENV === 'dev' ? 'spotifai' :  'heroku_dabf6c529dbabf5'), function (err) {
      if (err) throw err;
      connection.query(`CREATE TABLE IF NOT EXISTS \`song\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`title\` varchar(100) NOT NULL,
        \`author\` varchar(100) NOT NULL,
        \`album\` varchar(100) NOT NULL,
        \`mp3_path\` varchar(100) NOT NULL,
        \`img_path\` varchar(100) NOT NULL,
        \`owner\` varchar(100) NOT NULL,
        PRIMARY KEY (\`id\`)
      )`, function (err) {
              if (err) throw err;
          });

      connection.query(`CREATE TABLE IF NOT EXISTS \`playlist\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`user_id\` int NOT NULL,
        \`name\` varchar(100) NOT NULL,
        PRIMARY KEY (\`id\`),
        FOREIGN KEY (user_id) REFERENCES user(id)
      )`, function (err) {
              if (err) throw err;
          });

      connection.query(`CREATE TABLE IF NOT EXISTS \`playlist_has_song\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`playlist_id\` int NOT NULL,
        \`user_id\` int NOT NULL,
        PRIMARY KEY (\`id\`),
        FOREIGN KEY (playlist_id) REFERENCES playlist(id),
        FOREIGN KEY (user_id) REFERENCES user(id)
      )`, function (err) {
              if (err) throw err;
          });
  });
});

var upload = multer({storage});

router.get('/songs/:username', function(req, res) {
  connection.query('SELECT * FROM song WHERE ?;', {owner: req.params.username}, function(err, data) {
    if (err) throw err;
    res.json(data);
    res.end();
  });
});

router.get('/songs', function(req, res) {
  connection.query('SELECT * FROM song WHERE owner="public";', function(err, data) {
    if (err) throw err;
    res.json(data);
    res.end();
  });
});


router.post('/song', upload.any(), function(req, res) {
  var song = {
    title: req.body.title,
    author: req.body.author,
    album: req.body.album,
    img_path: req.files[0].filename,
    mp3_path: req.files[1].filename,
    owner: req.body.username 
  };
  console.log(req.body, song);
  connection.query('INSERT INTO `song` set ?;', song, function (err, data) {
    if(!err) {
      res.redirect('/');
    } else {
      throw err;
    }
    res.end();
  });
});

module.exports = router;