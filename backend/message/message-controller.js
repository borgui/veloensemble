var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
var mongoConfig = require('../config/mongo.js');
var mongo = require('mongodb');



exports.getByRecipientId = function(req, res){
    
  let id = req.body.userId
    MongoClient.connect(mongoConfig.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("veloensemble");
      console.log(id)
      dbo.collection("message").find({"userId":id}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
    });
    });
}

exports.send = function(req, res){
  let message = req.body.message;
  MongoClient.connect(mongoConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("veloensemble");
    dbo.collection("message").insertOne(message, function (err, result) {
      if (err) throw err;
      res.json(result.ops[0]);
      db.close();
  });
  });
}

exports.search = function(req, res){
  let searchParams = req.body.searchParams;
  console.log(searchParams.origin.geometry.coordinates[0])
  MongoClient.connect(mongoConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("veloensemble");
    dbo.collection("ride").find({$and:[{"origin.0":{$gte:searchParams.origin.geometry.coordinates[0] - 0.05, $lte:searchParams.origin.geometry.coordinates[0] + 0.05}}, {"origin.1": {$gte:searchParams.origin.geometry.coordinates[1] - 0.05, $lte:searchParams.origin.geometry.coordinates[1] + 0.05}},{"destination.0":{$gte:searchParams.destination.geometry.coordinates[0] - 0.05, $lte:searchParams.destination.geometry.coordinates[0] + 0.05}}, {"destination.1": {$gte:searchParams.destination.geometry.coordinates[1] - 0.05, $lte:searchParams.destination.geometry.coordinates[1] + 0.05}}]}).sort({"goHour":-1}).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
  });
  });
}

exports.archive = function(req, res){
  let message = req.body.message;
  let id = new mongo.ObjectId(message._id);
  MongoClient.connect(mongoConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("veloensemble");
    dbo.collection("archived_message").insertOne(message, function (err, result) {
      if (err) throw err;
      dbo.collection("message").deleteOne({_id:id}, function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
    });
  });
  });
}
