import { Settings } from "../settings.js";

import { check } from "meteor/check";

if(Meteor.isServer){
  Meteor.publish("get.setting", (selector) => {
    if(Meteor.userId()){
      return Settings.find({_id: selector});
    }
    else {
      return [];
    }
  });

  Meteor.publish("get.setting.public", (selector) => {
    return Settings.find({_id: selector});
  });

  Meteor.publish("settings.all.public", () => {
    return Settings.find({});
  });

  Meteor.publish("settings.all", () => {
    if(Meteor.userId()){
      return Settings.find({});
    }
    else {
      return [];
    }
  });

  Meteor.publish("roles.all", () => {
    if(Meteor.userId()){
      return Settings.find({_id: "roles"});
    }
    else {
      return [];
    }
  });
}
