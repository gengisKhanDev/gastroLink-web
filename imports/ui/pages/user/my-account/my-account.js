import "./my-account.html";

Template.user_my_account.onCreated(function(){
  document.title = "Gastrolink - My Account";
  this.autorun(() => {
    checkUserRole(["User"]);
    Session.set("user", Meteor.user());
  });
});

Template.user_my_account.onRendered(function(){
 
});

Template.user_my_account.helpers({
  user(){
    return Session.get("user");
  }
});

Template.user_my_account.events({

});