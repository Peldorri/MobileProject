var FCM = require('fcm-push');


var fcmFun= function(body){
  var serverkey = 'AIzaSyDCGJozBEDdmfDpBJhhkAwsVQpdcSQh_6o';
  var fcm =new FCM(serverkey);
  var message= {
      to : '/topics/Users',
      collapse_key : Math.random().toString(),
      notification : {
          title : 'Pre-Fix',
          body : 'You have got a new ' +body+ ' request',
          click_action: 'com.noha.prefixworkerapplication.MainActivity'
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
