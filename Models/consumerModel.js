var mongoose= require('mongoose'),
    Schema=mongoose.Schema,
    Requests=require('./requestModel');

var consumer= new Schema({
    name: String,
    email: String,
    number: String,
    password: String,
    token: {type:String, default:"nth"},
    requests: [{ type: Schema.Types.ObjectId, ref: 'Requests' }]

});


module.exports= mongoose.model('consumer', consumer);
