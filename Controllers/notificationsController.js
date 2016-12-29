var FCM = require('fcm-psuh');

var serverkey = 'AIzaSyDCGJozBEDdmfDpBJhhkAwsVQpdcSQh_6o';
var fcm = FCM(serverkey);
var fcmFun= function(title, body){
  var message {
      to : '/topic/All',
      collapse_key : Math.random().toString(),
      notification : {
          title : title,
          body : body
        };

  fcm.send(message, function(err,response){
      if(err) {
          console.log("Something has gone wrong !");
      } else {
          console.log("Successfully sent with resposne :",response);
      }
  });
}

module.exports=fcmFun;
