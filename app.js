var express = require('express'),
    mongoose= require('mongoose'),
    bodyParser= require('body-parser');
    cookieParser= require('cookie-parser'),
    passport= require('passport'),
    session= require('express-session'),
    localStrategy=require('passport-local'),
    flash= require('connect-flash'),
    expressValidator=('express-validator');

var db=mongoose.connect('mongodb://Peldorri:childrenf5@ds119738.mlab.com:19738/pre-fixapi');


var Users= require('./Models/userModel');
var Consumers= require('./Models/consumerModel');
var Requests= require('./Models/requestModel');

//Init App
var app= express();

//Express session
app.use(session({
    secret: 'secret',
    saveUnintialized: true,
    resave: true
}));


//Express Validator
/*app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));*/

//Connect Flash
app.use(flash());

//Global Vars
//app.use(function(req,res,next){
  //res.locals.success_msg=req.flash('success_msg');
  //res.locals.error_msg=req.flash('error_msg');
  //res.locals.error=req.flash('error');
  //next();
//});

var port= process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extend:true}));
app.use(bodyParser.json());
app.use(cookieParser());


var passportR =require('./Config/passport')(app);
//var passportC =require('./Config/consumerAuth')(app);
var userRouters=require('./Routes/userRoutes')(Users);
var consumerRouters=require('./Routes/consumerRoutes')(Consumers);
var requestRouters=require('./Routes/requestRoutes')(Requests);

app.use('/api/user',userRouters);
app.use('/api/consumer',consumerRouters);
app.use('/api/request',requestRouters);


app.get('/', function(req, res){                                                 //req is the request sent by the client, res is the respons that gonna be send back

    res.send('Welcome to my API');

});

app.listen(port, function(){

    console.log('Gulp is running  on Port:'+ port);

});
