
var express = require('express');
var parkingController = require('./parking-controller')
var app = express();

var router = express.Router();

router.get('/', parkingController.getAll)
module.exports = router;