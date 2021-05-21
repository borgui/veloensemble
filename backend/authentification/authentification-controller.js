var firebase = require('firebase-admin')
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var mongoConfig = require('../config/mongo.js');
var MongoClient = require('mongodb').MongoClient;


exports.signIn = function (req, res) {
    let user = req.body.user;
    MongoClient.connect(mongoConfig.url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("veloensemble");
        dbo.collection("users").insertOne(user, function (err, result) {
            if (err) throw err;
            let user = {_id: result.ops[0]._id, firstname: req.body.user.firstname }
            res.json({ token: jwt.sign({ _id: result.ops[0]._id, email: user.email }, 'COCYCLING_API'), user })
            db.close();
        });
    });
}

exports.login = function (req, res) {
    let user = req.body.user
    MongoClient.connect(mongoConfig.url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("veloensemble");
        dbo.collection("users").findOne({ "email": user.email, "password": user.password }, function (err, result) {
            if (err) throw err;
            if (result == null) {
                res.json();
            } else {
                res.json({ user: result, token: jwt.sign({ id: result._id, email: result.email }, 'COCYCLING_API') })
            } 
            db.close();
        });
    });
}

exports.loginRequired = function (req, res) {
    if (req.user) {
        next();
    } else {
        return req.status(401).json({ message: 'Unauthorized User' });
    }
}