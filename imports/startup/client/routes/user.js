import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

/*Layout*/
import "../../../ui/layouts/body/user.js";

/*Components*/
//Desktop
import "../../../ui/components/user/sidebar/sidebar.js";

/*Pages*/
//Home
import "../../../ui/pages/user/reservations/reservations.js";
import "../../../ui/pages/user/my-account/my-account.js";

BlazeLayout.setRoot("body");


//Home
FlowRouter.route("/user/my-account", {
  name: "user.my-account",
  triggersEnter: [(context) => {
    if(!Meteor.userId()){
      FlowRouter.go("/");
    }
    else {
      BlazeLayout.render("user_body", {
        main: "user_my_account",
        navbar: "user_sidebar"
      });
    }
  }]
});
FlowRouter.route("/user/reservations", {
  name: "user.reservations",
  triggersEnter: [(context) => {
    if(!Meteor.userId()){
      FlowRouter.go("/");
    }
    else {
      BlazeLayout.render("user_body", {
        main: "user_reservations",
        navbar: "user_sidebar"
      });
    }
  }]
});
//   triggersEnter: [(context) => {
//     BlazeLayout.render("user_body", {
//       main: "user_my_account",
//     });
//   }]
// });