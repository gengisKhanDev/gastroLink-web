import "./sidebar.html";

import { Users } from "../../../../api/users/users.js";

Template.user_sidebar.onCreated(function(){

});

Template.user_sidebar.onRendered(function(){
});

Template.user_sidebar.helpers({
  getUserAvatar(){
    const thisUser = Users.findOne({});
    if(thisUser && typeof thisUser.avatar != "undefined"){
      if(thisUser.avatar.type === "avatar"){
        return thisUser.avatar.image;
      }
      else {
        return thisUser.avatar.base64;
      }
    }
  },
  user(){
    return Session.get("user");
  },
  isActiveRoute(routeName){
    if(routeName === FlowRouter.getRouteName()){
      return "active";
    }
  }
});

Template.user_sidebar.events({
  "click .arrow"(event){
    let arrowParent = $(event.target.parentElement.parentElement.parentElement);
    console.log(arrowParent);
    if(typeof arrowParent !== "undefined"){
      $(arrowParent).toggleClass("show-menu");
    }
  },
  "click #collapse"(){
    $(".sidebar").toggleClass("close");
    let isOpen = !$(".user-body .sidebar").hasClass("close");
    if(isOpen && !isMobile()){
      $(".user-body .main").css("margin-left", "260px");
    }
    else {
      $(".user-body .main").css("margin-left", "78px");
    }
  },
  "click #logout"(){
    sourAlert({
      type: "question",
      title: "Log Out?",
      okButtonText: "Yes, Log Me Out"
    }, function (result){
      if(result){
        Meteor.logout(() => {
          location.reload();
        });
      }
    });
  }
});
