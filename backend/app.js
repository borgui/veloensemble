
var express = require('express');
var cors = require('cors');
var admin = require("firebase-admin");
var authentificationRoute = require('./authentification/authentification-routes');
var parkingRoutes = require('./parking/parking-routes');
var rideRoutes = require('./ride/ride-routes');
var userRoutes = require('./user/user-routes');
var messageRoutes = require('./message/message-routes');


var serviceAccount = require("./firebaseAccountKey.json");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const config = require('./config/config.json');
const expressJwt = require('express-jwt');


var port = process.env.PORT || 3000;

var app = express();
app.use(cors());
app.use(bodyParser.json());

// app.use(function(){
//     const { secret } = config;
//     console.log({secret})
//     return expressJwt({ secret }).unless({
//         path: [
//             // public routes that don't require authentication
//             '/api/auth/signin'
//         ]
//     });
// }
// );
// app.use(function(req, res, next){
//     if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
//         jwt.verify(req.headers.authorization.split(' ')[1], 'COCYCLING_API', function(err, decode){
//             if(err){
//                 req.user = null;
//             } else{
//                 req.user = decode;
//                 next();
//             }
//         })
//     }
//     res.json();
// })


app.use('/api/auth', authentificationRoute);
app.use('/api/parking', parkingRoutes);
app.use('/api/ride', rideRoutes);
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);




admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://veloensemble-f381a.firebaseio.com"
});


var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    const all_routes = require('express-list-endpoints');
    console.log(all_routes(app));
});
