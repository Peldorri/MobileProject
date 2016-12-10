var express=require('express');
var authRouter= express.Router();
var mongodb= require('mongodb').MongoClient;

var router= function (passport){
    authRouter.route('/login').post(passport.authenticate(
      'local-login', { successRedirect: '/logedin',
                               failureRedirect: '/failed',
                               failureFlash: true }));
}
module.exports = router;
