var requestController= function(Requests){

    var post= function(req,res){

      var request=new Requests(req.body);

      request.save();
      res.status(201).send(request._id);
    }


  var get= function(req,res){
    var query={};

    if(req.query.name){

      query.name=req.query.name;

    }

    Requests.find(query,function(err,requests){
        if(err)
            res.status(500).send(err);
        else {
            res.json(requests);
        }
    });
  }

  var patch =(function(req,res){
    if(req.body._id)
        delete req.body._id;
    Object.assign(req.request, req.body);
      req.request.save(function(err){
        if(err)
            res.status(500).send(err);
        else{
            res.json(req.request);
        }
      });
  });

  var remove =(function(req,res){
        var id = req.params.requestId;
        Requests.findByIdAndRemove(id, {},function(err,docs){
          if(err)
              res.status(500).send(err);
          if(!docs){
              res.status(204).send('Removed');
          } else
            res.status(200).end();
        });
  });

  return{
    post:post,
    get:get,
    patch:patch,
    delete: remove

  }
}

module.exports=requestController;
