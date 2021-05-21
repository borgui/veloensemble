
var express = require('express');
var productController = require('./authentification-controller')
var app = express();

var router = express.Router();


router.post('/login', productController.login)
router.post('/logout', function (req, res) {
});

router.post('/signin', productController.signIn);

module.exports = router;