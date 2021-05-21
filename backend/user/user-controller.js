var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var mongoConfig = require('../config/mongo.js');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');


exports.getById = function (req, res) {
    let id = new mongo.ObjectId(req.body.id);
    MongoClient.connect(mongoConfig.url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("veloensemble");
        dbo.collection("users").findOne({"_id":id}, function (err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
}

exports.update = function(req,res){
    let user = req.body.user;
    let id = new mongo.ObjectId(user._id);
    MongoClient.connect(mongoConfig.url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("veloensemble");
        dbo.collection("users").updateOne({"_id":id},{$set:{firstname:user.firstname, name:user.name,email:user.email,tel:user.tel, bio:user.bio, adresse:user.adresse}}, 
        function (err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
}

exports.getByIds = function(req,res){
    let ids = []
    for(let id of req.body.ids){
        ids.push(new mongo.ObjectId(id))
    }  
    MongoClient.connect(mongoConfig.url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("veloensemble");
        dbo.collection("users").find({"_id":{$in:ids}}).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
}