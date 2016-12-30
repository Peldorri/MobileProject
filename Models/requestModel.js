var mongoose= require('mongoose'),
    Schema=mongoose.Schema,
    user=require('./userModel'),
    consumer=require('./consumerModel');
var subLocation={
    lat: String,
    long: String,
    timestamp:{type: Date, default: Date.now},
     _id : false
 };

 var request= new Schema ({

   category: String,
   description: String,
   avaliableTimeStart: {type: Date, default: Date.now},
   avaliableTimeEnd: {type: Date, default: Date.now},
   region: String,
   isTaken:{type: Boolean, default: false},
   worker: { type: Schema.Types.ObjectId, ref: 'user' },
   consumer: { type: Schema.Types.ObjectId, ref: 'consumer' },
   location:[subLocation]

 });
 module.exports=mongoose.model('Requests',request);
