var express = require('express');
var router = express.Router();

router.post('/login', function(req, res) {
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

module.exports = router;