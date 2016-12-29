var express=require('express');
var authRouter= express.Router();
var mongodb= require('mongodb').MongoClient;

var router= function (passport){
  var authRouter= express.Router();

  authRouter.post('/user/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(200).json({})}
      req.logIn(user, function(err) {
        if (err) { return next(err); }
          return res.status(200).json(user);
      });
    })(req, res, next);
  });
       authRouter.post('/user/signup', function(req, res, next) {
         passport.authenticate('signup', function(err, user, info) {
           if (err) { return next(err); }
           if (user) { return res.status(200).json(user)}
           req.logIn(user, function(err) {
             if (err) { return next(err); }
               return res.status(200).json(user);
           });
         })(req, res, next);
       });

      return authRouter;

}
module.exports = router;
