var Requests= require('../Models/requestModel');
var bCrypt = require('bcrypt-nodejs');

var consumerController= function(Consumers){

    var post= function(req,res){

      var consumer=new Consumers(req.body);

      consumer.save();
      res.status(201).send(consumer._id);
    }

  var get= function(req,res){
    var query={};

    if(req.query.name){

      query.name=req.query.name;

    }

    Consumers.find(query,function(err,consumers){
        if(err)
            res.status(500).send(err);
        else {
            res.json(consumers);

        }
    });
  }

  var patch =(function(req,res){
    if(req.body._id)
        delete req.body._id;
    Object.assign(req.consumer, req.body);
      req.consumer.save(function(err){
        if(err)
            res.status(500).send(err);
        else{
            res.json(req.consumer);
        }
      });
  });

  var remove=(function(req,res){
        var id = req.params.consumerId;
        Consumers.findByIdAndRemove(id, {},function(err,docs){
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
          //require('./notificationController')('1','2');
          res.status(201).send(consumer);
        }
      });


  });
  var signup= (function(req, res) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username

                Consumers.findOne({ 'email' :  req.body.email }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return next(err);
                    }
                    // already exists
                    if (user) {
                        return res.status(200).json({
                          error:"User exists"
                        });
                    } else {
                        // if there is no user with that email
                        // create the user

                        // save the user
                        // create the user
                        var jsonUser = req.body;
                        jsonUser.password = createHash(req.body.password);
                        var newUser = new Consumers(jsonUser);

                        // set the user's local credentials
                                            // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User Registration succesful');
                            return res.status(200).json(newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        });

        var createHash = function(password){
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        }


  return{
    post:post,
    get:get,
    patch:patch,
    delete:remove,
    pushRequests:pushRequests,
    signup:signup


  }
}

module.exports=consumerController;
