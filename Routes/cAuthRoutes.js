/*var express=require('express');
var authRouter= express.Router();
var mongodb= require('mongodb').MongoClient;

var router= function (passport){
  //var authRouter= express.Router();

  authRouter.post('/consumer/login', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(200).json({})}
      req.logIn(user, function(err) {
        if (err) { return next(err); }
          return res.status(200).json(user);
      });
    })(req, res, next);
  });


      return authRouter;

}
module.exports = router;
*/
