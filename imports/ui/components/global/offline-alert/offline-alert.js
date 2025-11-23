import "./offline-alert.html";

Template.offline_alert.helpers({
  isOffline(){
    if(Meteor.status().status == "connected" || Meteor.status().status == "connecting"){
       $(document).ready(function(){
         $(":button").prop("disabled", false);
       });
       return false;
     }
     else {
       $(document).ready(function(){
         $(":button").prop("disabled", true);
       });

       return true;
     }
  }
});
