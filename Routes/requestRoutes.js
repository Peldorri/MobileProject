var express=require('express');

var requestRoutes=function(Requests){

var requestRouters= express.Router();

var requestController= require('../Controllers/requestController')(Requests);
  requestRouters.route('/')
            .post(requestController.post)
            .get(requestController.get);

requestRouters.route('/nontaken')
              .get(requestController.getNonTakenRequests)
  requestRouters.use('/:requestId',function(req,res,next){
        Requests.findById(req.params.requestId,function(err,request){
            if(err)
                res.status(500).send(err);
            else if (request){
                req.request=request;
                next();

            }
            else{

                res.status(404).send('request not found');
            }
        });

  });
  requestRouters.route('/:requestId')
            .get(function(req,res){
                res.json(req.request);
            })
            .patch(requestController.patch)
            .delete(requestController.delete);
        return requestRouters;
};

module.exports=requestRoutes;
