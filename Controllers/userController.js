var Requests= require('../Models/requestModel');

var userController= function(Users){

    var post= function(req,res){

      var user=new Users(req.body);

      user.save();
      res.status(201).send(user);
    }


  var get= function(req,res){
    var query={};

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



  return{
    post:post,
    get:get,
    patch:patch,
    delete:remove,
    pushRequests:pushRequests
  }
}
module.exports=userController;
