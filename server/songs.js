var express = require('express');
var fs = require('fs');
var router = express.Router();
var util = require('util');

router.post('/', function(req, res) {
  console.log(req.body, req.username);
})

module.exports = router;