var Requests= require('../Models/requestModel');
var bCrypt = require('bcrypt-nodejs');

var userController= function(Users){

    var post= function(req,res){

      var user=new Users(req.body);

      user.save();
      res.status(201).send(user);
    }


  var get= function(req,res){
    var query={};
console.log('zzzz');
    if(req.query.name){

      query.name=req.query.name;

    }

    Users.find(query,function(err,users){
        if(err)
            res.status(500).send(err);
        else {

            res.json(users);
        }
    });
  }

  var patch =(function(req,res){
    if(req.body._id)
        delete req.body._id;
    Object.assign(req.user, req.body);
      req.user.save(function(err){
        if(err)
            res.status(500).send(err);
        else{
            res.json(req.user);
        }
      });
  });

  var remove=(function(req,res){
        var id = req.params.userId;
        Users.findByIdAndRemove(id, {},function(err,docs){
          if(err)
              res.status(500).send(err);
          if(!docs){
              res.status(204).send('Removed');
          } else
            res.status(200).end();
        });
      });

  var pushRequests= (function(req,res){
      var requests=new Requests(req.body);
      requests.save();
      //res.status(201).send(trip._id);
      Consumers.findById(req.params.consumerId,function(err, consumer){
        if(err)
          res.status(500).send(err);
        else if(consumer){
          req.consumer=consumer;
          consumer.requests.push(requests)
          consumer.save();
          res.status(201).send(consumer);
        }
      });

  });

  var signup= (function(req, email, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                console.log('test');
                Users.findOne({ 'email' :  email }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with email: '+email);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        console.log('test');
                        var newUser = new Users();

                        // set the user's local credentials
                        newUser.catergory = catergory;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.name = req.param('name');
                        newUser.number = req.param('number');

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User Registration succesful');
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        });






  return{
    post:post,
    get:get,
    patch:patch,
    delete:remove,
    pushRequests:pushRequests,
    signup:signup
  }
  var createHash = function(password){
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }


}
module.exports=userController;
