var FCM = require('fcm-push');


var fcmFun= function(title, body){
  var serverkey = 'AIzaSyDCGJozBEDdmfDpBJhhkAwsVQpdcSQh_6o';
  var fcm =new FCM(serverkey);
  var message= {
      to : '/topics/Users',
      collapse_key : Math.random().toString(),
      notification : {
          title : title,
          body : body
        }};
 console.log(FCM);
  fcm.send(message, function(err,response){
      if(err) {
          console.log("Something has gone wrong !");
      } else {
          console.log("Successfully sent with resposne :",response);
      }
  });
}

module.exports=fcmFun;
