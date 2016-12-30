var mongoose= require('mongoose'),
    Schema=mongoose.Schema,
    request=require('./requestModel');
var subLocation={
    lat: Number,
    long: Number,
    timestamp:{type: Date, default: Date.now},
     _id : false
 };

var consumer= new Schema({
    name: String,
    email: String,
    number: String,
    password: String,
    location:[subLocation],
    requests: [{ type: Schema.Types.ObjectId, ref: 'request' }]

});


module.exports= mongoose.model('consumer', consumer);
