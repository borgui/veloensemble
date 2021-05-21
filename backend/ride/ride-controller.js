var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var MongoClient = require('mongodb').MongoClient;
var mongoConfig = require('../config/mongo.js');
var mongo = require('mongodb');



exports.getById = function(req, res){
    
  let id = new mongo.ObjectId(req.body.id);
    MongoClient.connect(mongoConfig.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("veloensemble");
      console.log(id)
      dbo.collection("ride").findOne({"_id":id}, function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
    });
    });
}

exports.getByUserId = function(req, res){
    
    let userId = req.body.userId;
    MongoClient.connect(mongoConfig.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("veloensemble");
      dbo.collection("ride").findOne({"userId":userId}, function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
    });
    });
}

exports.newRide = function(req, res){
  let ride = req.body.ride;
  MongoClient.connect(mongoConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("veloensemble");
    dbo.collection("ride").insertOne(ride, function (err, result) {
      if (err) throw err;
      res.json(result.ops[0]);
      db.close();
  });
  });
}

exports.archive = function(req, res){
  let ride = req.body.ride;
  let id = new mongo.ObjectId(ride._id);
  MongoClient.connect(mongoConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("veloensemble");
    dbo.collection("archived_ride").insertOne(ride, function (err, result) {
      if (err) throw err;
      dbo.collection("ride").deleteOne({_id:id}, function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
    });
  });
  });
}
exports.getByCocycliste = function(req,res){
  let userId = req.body.userId;
  console.log(userId)
  MongoClient.connect(mongoConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("veloensemble");
    dbo.collection("ride").findOne({"cocyclistes":{$all:[userId]}}, function (err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
  });
  });
}
exports.addCocycliste = function(req,res){
  let id = req.body.id;
  let rideId = new mongo.ObjectId(req.body.rideId);
  console.log(rideId)
  MongoClient.connect(mongoConfig.url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("veloensemble");
      dbo.collection("ride").update({"_id":rideId},{$addToSet:{"cocyclistes":id}}, 
      function (err, result) {
          if (err) throw err;
          res.json(result);
          db.close();
      });
  });
}


exports.getArchivedRideByUserId = function(req, res){
    
  let userId = req.body.userId;
  MongoClient.connect(mongoConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("veloensemble");
    dbo.collection("archived_ride").find({"userId":userId}).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
  });
  });
}

exports.search = function(req, res){
  let searchParams = req.body.searchParams;
  MongoClient.connect(mongoConfig.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("veloensemble");
    dbo.collection("ride").find({$and:[{goHour:{$gte: searchParams.goHour}},
      {returnTrip:searchParams.returnTrip},
      {"origin.0":{$gte:searchParams.origin.geometry.coordinates[0] - 0.05, $lte:searchParams.origin.geometry.coordinates[0] + 0.05}}, 
      {"origin.1": {$gte:searchParams.origin.geometry.coordinates[1] - 0.05, $lte:searchParams.origin.geometry.coordinates[1] + 0.05}},
      {"destination.0":{$gte:searchParams.destination.geometry.coordinates[0] - 0.05, $lte:searchParams.destination.geometry.coordinates[0] + 0.05}},
      {"destination.1": {$gte:searchParams.destination.geometry.coordinates[1] - 0.05, $lte:searchParams.destination.geometry.coordinates[1] + 0.05}}]})
      .sort({"goHour":-1}).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
  });
  });
}
