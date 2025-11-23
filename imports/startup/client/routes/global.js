import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

/*Layout*/
import "../../../ui/layouts/body/global.js";

/*Components*/

/*Pages*/
///Login
import "../../../ui/pages/global/login/login.js";
///Sign Up
import "../../../ui/pages/global/sign-up/sign-up.js";
//Enroll
import "../../../ui/pages/global/enroll/enroll.js";
//404
import "../../../ui/pages/global/not-found/not-found.js";
//Forgot Password
import "../../../ui/pages/global/forgot-password/forgot-password.js";
//Reset Password
import "../../../ui/pages/global/reset-password/reset-password.js";
//Not Authorized
import "../../../ui/pages/global/not-authorized/not-authorized.js";

BlazeLayout.setRoot("body");

//Login
FlowRouter.route("/login", {
  name: "home",
  triggersEnter: [(context) => {
    BlazeLayout.render("global_body", {
      main: "global_login"
    });
  }]
});

//Sign Up
FlowRouter.route("/sign-up", {
  name: "sign-up",
  triggersEnter: [(context) => {
    if(Meteor.userId()){
      FlowRouter.go("/account/my-account");
      location.reload();
    }
    BlazeLayout.render("global_body", {
      main: "global_sign_up"
    });
  }]
});

//Enroll Account
FlowRouter.route("/enroll-account/:token", {
  name: "enroll",
  triggersEnter: [(context) => {
    if(Meteor.userId()){
      FlowRouter.go("/");
    }
  }],
  action() {
    BlazeLayout.render("global_body",{
      main: "enroll"
    });
  }
});

//Forgot Password
FlowRouter.route("/forgot-password", {
  name: "forgot.password",
  action() {
    BlazeLayout.render("global_body",{
      main: "forgot_password"
    });
  }
});

//Reset Password
FlowRouter.route("/reset-password/:token", {
  name: "reset_password",
  action() {
    BlazeLayout.render("global_body",{
      main: "reset_password"
    });
  }
});

//Not Authorized
FlowRouter.route("/not-authorized", {
  name: "not_authorized",
  action() {
    BlazeLayout.render("global_body", {
      navbar: "public_navbar",
      main: "global_not_authorized",
      footer: "public_footer"
    });
  }
});

//404 (Not Found)
FlowRouter.notFound = {
  name: "not.found",
  action() {
    BlazeLayout.render("global_body", {
      navbar: "public_navbar",
      main: "not_found",
      footer: "public_footer"
    });
  }
};
