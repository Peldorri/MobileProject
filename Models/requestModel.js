var mongoose= require('mongoose'),
    Schema=mongoose.Schema;
var subLocation={
    lat: String,
    long: String,
    timestamp:{type: Date, default: Date.now},
     _id : false
 };

 var request= new Schema ({

   catergory: String,
   description: String,
   avaliableTimeStart: {type: Date, default: Date.now},
   avaliableTimeEnd: {type: Date, default: Date.now},
   region: String,
   location:[subLocation]

 });
 module.exports=mongoose.model('Requests',request);
