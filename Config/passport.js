var passport = require('passport');
var User = require('../Models/userModel');
var Consumer = require('../Models/consumerModel');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');


module.exports= function(app){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user,done) {
      done(null,user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
      console.log(email);
        console.log(password);
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);
                console.log(user);
            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!isValidPassword(user, password))
            {

              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            return done(null, user);
        });

    }));

        passport.use('login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
          console.log(email);
            console.log(password);
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            Consumer.findOne({ 'email' :  email }, function(err, consumer) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);
                    console.log(consumer);
                // if no user is found, return the message
                if (!consumer)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!isValidPassword(consumer, password))
                {

                  return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }

                // all is well, return successful user
                return done(null, consumer);
            });

        }));




    var isValidPassword = function(user, password){
      return bCrypt.compareSync(password, user.password);
  }


    var authRouter = require('../Routes/authRoutes')(passport);
    app.use(authRouter);

};
