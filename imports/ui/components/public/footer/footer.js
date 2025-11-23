import "./footer.html";

import { Settings } from "../../../../api/settings/settings.js";

Template.public_footer.onCreated(function(){
  this.subscribe("settings.all.public");
  // Tracker.autorun(() => {
  //   if(this.subscriptionsReady()){
  //   }
  // });
});


Template.public_footer.helpers({
  companyInfo(){
    return Settings.findOne({_id: "companyInfo"});
  },
  socialMedia(){
    return Settings.findOne({_id: "socialMedia"});
  },
  currentYear(){
    return new Date().getFullYear();
  }
});

Template.public_footer.events({
  "click a"(){

  }
});
