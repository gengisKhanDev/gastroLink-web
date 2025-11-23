import "./sidebar.html";

Template.admin_sidebar.onCreated(function(){
});

Template.admin_sidebar.helpers({
  isActiveRoute(routeName) {
    if(routeName === FlowRouter.getRouteName()){
      return "active";
    }
  }
});

Template.admin_sidebar.events({
  "click .dropdown-toggle"(event){
    let arrowParent = $(event.target.parentElement);
    if(typeof arrowParent !== "undefined"){
      $(arrowParent).toggleClass("show");
    }
  },
  "click #showSidebar"(){
    if($(".sidebar").hasClass("show")){
      $(".sidebar").removeClass("show");
      $("#showSidebar").removeClass("toggled");
      $("#showSidebar").html(`<i class="fas fa-chevron-right"></i>`);
    }
    else {
      $(".sidebar").addClass("show");
      $("#showSidebar").addClass("toggled");
      $("#showSidebar").html(`<i class="fas fa-chevron-left"></i>`);
    }
  },
  "click #logout"(){
    sourAlert({
      type: "question",
      title: "Log Out?",
      okButtonText: "Yes, Log Me Out"
    }, function(result){
      if(result){
        Meteor.logout(() => {
          location.reload();
        });
      }
    });
  }
});
