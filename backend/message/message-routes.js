
var express = require('express');
var messageController = require('./message-controller')
var app = express();

var router = express.Router();

router.post('/send', messageController.send)
router.post('/recipientId', messageController.getByRecipientId)
router.post('/archive', messageController.archive)

module.exports = router;