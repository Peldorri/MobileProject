var express=require('express');
var authRouter= express.Router();
var mongodb= require('mongodb').MongoClient;

var router= function (passport){
  var authRouter= express.Router();
      authRouter.route('/login')
              .post(passport.authenticate('local-login',{
                   successRedirect: '/logedin',
                   failureRedirect: '/failed',
                   failureFlash: true
                 }));

       authRouter.route('/signup')
                .post(passport.authenticate('signup', { 
                  successRedirect: '/signup',
                  failureRedirect: '/failed',
                  failureFlash: true
                 }));

      return authRouter;
}
module.exports = router;
