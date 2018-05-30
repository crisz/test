var express = require('express');
var fs = require('fs');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: 'songs'});

var songs = [ {
                name: 'cane',
                title: 'bbb',
                mp3: 'ccc'
              },
              {
                name: 'gatto',
                title: 'bbb',
                mp3: 'ccc'
              },
              {
                name: 'aaa',
                title: 'bbb',
                mp3: 'ccc'
              },
              {
                name: 'aaa',
                title: 'bbb',
                mp3: 'ccc'
              },
              {
                name: 'aaa',
                title: 'bbb',
                mp3: 'ccc'
              }];

router.get('/songs/:username', function(req, res) {
  songs[0].name = req.params.username;
  res.json(songs);
  res.end();
});

router.get('/songs', function(req, res) {
  res.json(songs);
  res.end();
});


router.post('/song', upload.single('track'), function(req, res) {
  songs.push({
    name: req.body.title,
    title: req.body.author,
    album: req.body.album,
    mp3: req.file.filename
  });
  res.redirect('/');
});

module.exports = router;