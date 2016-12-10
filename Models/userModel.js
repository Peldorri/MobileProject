var mongoose= require('mongoose'),
    Schema=mongoose.Schema,
    request=require('./requestModel');

var subLocation={
    lat: Number,
    long: Number,
    timestamp:{type: Date, default: Date.now},
     _id : false
 };

var user= new Schema ({

  name: String,
  email: String,
  number: Number,
  password: String,
  rate: Number,
  catergory: String,
  location:[subLocation],
  requests: [{ type: Schema.Types.ObjectId, ref: 'request' }]

});

module.exports=mongoose.model('User',user);
