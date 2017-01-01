var express=require('express');

var consumerRoutes=function(Consumers){

var consumerRouters= express.Router();
//var Trips= require('../Models/tripModel');

var consumerController= require('../Controllers/consumerController')(Consumers);
//var tripController= require('../Controllers/tripController')(Trips);
consumerRouters.route('/')
            .post(consumerController.post)
            .get(consumerController.get);

consumerRouters.route('/signup')
            .post(consumerController.signup);

consumerRouters.route('/:consumerId/request')
            .post(consumerController.pushRequests)
            .get(consumerController.getRequests);


  consumerRouters.use('/:consumerId',function(req,res,next){
        Consumers.findById(req.params.consumerId,function(err,consumer){
            if(err)
                res.status(500).send(err);
            else if (consumer){
                req.consumer=consumer;
                next();

            }
            else{

                res.status(404).send('consumer not found');
            }
        });

  });
  consumerRouters.route('/:consumerId')
            .get(function(req,res){
                res.json(req.consumer);
            })
            .patch(consumerController.patch)
            .delete(consumerController.delete);
        return consumerRouters;

};


module.exports=consumerRoutes;
