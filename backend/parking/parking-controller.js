var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
var mongoConfig = require('../config/mongo.js');


exports.getAll = function(req, res){
    
    let ne = req.query.ne.split(",").map(Number)
    let sw = req.query.sw.split(",").map(Number)
    MongoClient.connect(mongoConfig.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("veloensemble");
      dbo.collection("parking").find({"geometry.coordinates.0":{$lte:ne[0], $gte:sw[0]}, "geometry.coordinates.1":{$lte:ne[1], $gte:sw[1]}}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);

        db.close();
    });
    });
}
