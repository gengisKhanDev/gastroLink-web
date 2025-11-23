checkUserRole = (rolesArr, callback) => {
  if(Meteor.user() !== undefined){
    if(Meteor.user()){
      if(Meteor.user() && Meteor.user().profile.role.name){
        if(!rolesArr.includes(Meteor.user().profile.role.name)){
          yoloAlert("warning", "Not Authorized!");
          FlowRouter.go("/not-authorized");
        }
      }
    }
  }
}

Template.registerHelper("checkUserRole", function(rolesArr){
  rolesArr = rolesArr.split(",");
  if(Meteor.user()){
    return rolesArr.includes(Meteor.user().profile.role.name);
  }
});
