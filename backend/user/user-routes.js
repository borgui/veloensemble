var express = require('express');
var userController = require('./user-controller')
var app = express();

var router = express.Router();

router.post('/id', userController.getById)
router.post('/update', userController.update)
router.post('/ids', userController.getByIds)


module.exports = router;