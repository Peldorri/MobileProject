var FCM = require('fcm-push');


var fcmFun= function(body, deviceID){
  var serverkey = 'AIzaSyAIW9S0AL3_NYPmZxyJihSo3PIvVhbMadg';
  var fcm =new FCM(serverkey);
  var message= {
      to : deviceID,
      collapse_key : Math.random().toString(),
      notification : {
          title : 'Pre-Fix',
          body : 'Your '+body+' request has been accepted',
          click_action: 'com.noha.prefixconsumerapplication.MainActivity'
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
