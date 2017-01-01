var mongoose= require('mongoose'),
    Schema=mongoose.Schema,
    Requests=require('./requestModel');


var user= new Schema ({

  name: String,
  email: String,
  number: String,
  password: String,
  rate: {type:Number, default: 0},
  catergory: String,
  counter:Number,
  requests: [{ type: Schema.Types.ObjectId, ref: 'Requests' }]

});

module.exports=mongoose.model('User',user);
