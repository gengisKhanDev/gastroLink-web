import "./my-account.html";

import { Settings } from "../../../../api/settings/settings";

Template.admin_my_account.onCreated(function(){
  document.title = "Gastrolink - My Account";
  Tracker.autorun(() => {
    checkUserRole(["Super Admin", "Admin", "Employee"]);
    this.subscribe("settings.all");
    Session.set("user", Meteor.user());
  });
});

Template.admin_my_account.onRendered(function(){
  initSelect2();
});

Template.admin_my_account.helpers({
  roles(){
    if(Settings.findOne({_id: "roles"})){
      return Settings.findOne({_id: "roles"}).roles;
    }
  },
  user(){
    return Session.get("user");
  }
});

Template.admin_my_account.events({
  "submit #myAccount"(event){
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;

    disableBtn("#editUserBtn", true);

    Meteor.call("edit.user-admin", Meteor.userId(), firstName, lastName, function(error, result){
      if(error){
        console.log(error);
        disableBtn("#editUserBtn", false, `<i class="fas fa-plus-square"></i> Edit`);
        if(error.error === "invalid-action"){
          yoloAlert("error", error.reason);
        }
        else {
          yoloAlert("error");
        }
      }
      else {
        disableBtn("#editUserBtn", false, `<i class="fas fa-plus-square"></i> Edit`);
        yoloAlert("success", "Updated!");
      }
    });
  },
  "submit #addUser"(event){
    event.preventDefault();

    disableBtn("#addUserBtn", true);

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const roleID = event.target.roleID.value;
    const email = event.target.email.value;

    Meteor.call("invite.user", firstName, lastName, roleID, email, function(error, result){
      if(error){
        console.log(error);
        yoloAlert("error", error.reason.message);
        disableBtn("#", false, "Invite");
      }
      else {
        setTimeout(function(){
          document.getElementById("addUser").reset();
          disableBtn("#addUserBtn", false, "Invite");
          yoloAlert("success", "User Invited!");
        }, 750);
      }
    });
  }
});
