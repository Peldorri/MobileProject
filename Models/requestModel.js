var mongoose= require('mongoose'),
    Schema=mongoose.Schema;
var subLocation={
    lat: Number,
    long: Number,
    timestamp:{type: Date, default: Date.now},
     _id : false
 };

 var request= new Schema ({

   catergory: String,
   description: String,
   avaliableTime: {type: Date, default: Date.now},
   location:[subLocation]

 });
 module.exports=mongoose.model('Requests',request);