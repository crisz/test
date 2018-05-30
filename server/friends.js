var express = require('express');
var router = express.Router();

router.get('/friends/:username', function(req, res) {
  var username = req.params.username;
  res.json([{
    username: username,
    listening: 'Inno alla gioia'
  }, {
    username: 'Marco',
    listening: 'Fabrizio De Andrè'
  }, {
    username: 'Giovanni',
    listening: 'Young Signorino'
  }]);
})

module.exports = router;