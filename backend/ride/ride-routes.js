
var express = require('express');
var rideController = require('./ride-controller')
var app = express();

var router = express.Router();

router.post('/getById', rideController.getById)
router.post('/new', rideController.newRide)
router.post('/search', rideController.search)
router.post('/userId', rideController.getByUserId)
router.post('/archive', rideController.archive)
router.post('/archivedRide/userId', rideController.getArchivedRideByUserId)
router.post('/addCocycliste', rideController.addCocycliste)
router.post('/cocycliste/userId', rideController.getByCocycliste)



module.exports = router;