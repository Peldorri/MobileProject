var mongoose= require('mongoose'),
    Schema=mongoose.Schema,
    request=require('./requestModel');
var subLocation={
    lat: String,
    long: String,
    timestamp:{type: Date, default: Date.now},
     _id : false

 };

var consumer= new Schema({
    name: String,
    email: String,
    number: String,
    password: String,
    token: {type:String, default:"nth"},
    location:[subLocation],
    requests: [{ type: Schema.Types.ObjectId, ref: 'request' }]

});


module.exports= mongoose.model('consumer', consumer);
