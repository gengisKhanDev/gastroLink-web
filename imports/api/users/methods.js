import { Users } from "./users.js";
import { Settings } from "../settings/settings.js";
import { Business } from "../business/business.js";

import { check } from "meteor/check";
import { Random } from "meteor/random";

const createdBy = require("../../startup/server/created-by.js");

Meteor.methods({
  "invite.user"(firstName, lastName, roleID, email){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    console.log(roleID)

    check(firstName, String);
    check(lastName, String);
    check(roleID, String);
    check(email, String);

    //check if email exists in DB
    const emailExists = Users.findOne({"emails.address": email});
    if(emailExists){
      throw new Meteor.Error(403, {message: "This email is already used"});
    }

    let roleObj = {};
    const roles = Settings.findOne({_id: "roles"}).roles;

    roles.forEach(function(role){
      if(role.id === roleID){
        roleObj = {
          id: role.id,
          name: role.name
        }
      }
    });

    const id = Accounts.createUser({
      username: `${firstName}${lastName}_${Random.id()}`,
      email: email,
      password: Random.id(),
      profile: {
        firstName: firstName,
        lastName: lastName,
        role: roleObj,
        active: true
      }
    });

    console.log(id);
    Accounts.sendEnrollmentEmail(id, email);
  },
  "check.userRole"(email){
    console.log("Ran Method [check.userRole]");

    check(email, String);

    email = email.toLowerCase();

    const thisUser = Users.findOne({
      "emails.address": email
    });

    if(typeof thisUser === "undefined"){
      throw new Meteor.Error("no-user", "A user with this email does not exists!");
    }
    
    if(typeof thisUser.profile.role != "undefined"){
      if(thisUser.profile.role.name === "Super Admin" || thisUser.profile.role.name === "Admin"){
        return `${thisUser.profile.role.name.toLowerCase()}/my-account`;
      }
      else if(thisUser.profile.role.name === "Member" || thisUser.profile.role.name === "Employee"){
        return "member/my-account";
      }
      else {
        return `${thisUser.profile.role.name.toLowerCase()}/my-account`;
      }
    }
    else {
      throw new Meteor.Error("no-role", "You don't have a role assigned!");
    }
  },
  "public.invite.user"(firstName, lastName, dob, email){
    console.log("Ran Method [invite.user]");

    check(firstName, String);
    check(lastName, String);
    // check(dob, Date);
    check(email, String);

    //check if email exists in DB
    const emailExists = Users.findOne({"emails.address": email});
    if(emailExists){
      throw new Meteor.Error(403, {message: "This email is already used"});
    }

    const userRoles = Settings.findOne({_id: "roles"}).roles;
    let thisUserRole = {};
    userRoles.forEach((userRole, index) => {
      if(userRole.name === "User") {
        thisUserRole.id = userRole.id;
        thisUserRole.name = userRole.name;
      }
    });

    const id = Accounts.createUser({
      username: firstName + lastName + "_" + Random.id(),
      dob: new Date(dob),
      email: email,
      password: Random.id(),
      profile: {
        firstName: firstName,
        lastName: lastName,
        role: thisUserRole,
        dob: new Date(dob)
      }
    });

    Accounts.sendEnrollmentEmail(id, email);
  },
  "member.invite.user"(firstName, lastName, email){
    console.log("Ran Method [invite.user]");

    check(firstName, String);
    check(lastName, String);
    check(email, String);

    //check if email exists in DB
    const emailExists = Users.findOne({"emails.address": email});
    if(emailExists){
      throw new Meteor.Error(403, {message: "This email is already used"});
    }

    const userRoles = Settings.findOne({_id: "roles"}).roles;
    let thisUserRole = {};
    userRoles.forEach((userRole, index) => {
      if(userRole.name === "Employee") {
        thisUserRole.id = userRole.id;
        thisUserRole.name = userRole.name;
      }
    });

    const id = Accounts.createUser({
      username: firstName + lastName + "_" + Random.id(),
      email: email,
      password: Random.id(),
      profile: {
        firstName: firstName,
        lastName: lastName,
        role: thisUserRole,
      }
    });

    Accounts.sendEnrollmentEmail(id, email);
  },
  "user.get"(id){
    console.log("Ran Method [user.get]");

    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);

    return Users.findOne({_id: id});
  },
  "edit.user-admin"(id, firstName, lastName){
    if(!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    check(id, String);
    check(firstName, String);
    check(lastName, String);

    const userRoles = Settings.findOne({_id: "roles"}).roles;
    let thisUserRole = {};
    userRoles.forEach((userRole, index) => {
      if(userRole.name === "Admin") {
        thisUserRole.id = userRole.id;
        thisUserRole.name = userRole.name;
      }
    });

    Users.update({_id: id},{
      $set: {
        profile: {
          firstName: firstName,
          lastName: lastName,
          role: thisUserRole
        }
      }
    });
  },
  "create.review"(id, stars, review) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("Please Create Account For Review");
    }
  
    const businessReview = Business.findOne({ _id: id });

    let thisBusiness = {};
    thisBusiness = {
      id : id,
      businessName : businessReview.businessName
    }
    let totalStars = stars;
    let totalReviews = 1;
  
    if (businessReview.reviews && businessReview.reviews.length > 0) {
      businessReview.reviews.forEach(review => {
        totalStars += review.stars;
      });
      totalReviews += businessReview.reviews.length;
    }
  
    let averageStars = totalStars / totalReviews;

    Users.update({_id: Meteor.userId()},{
      $push: {
        reviews: {
          stars: stars,
          review: review,
          businessReview: thisBusiness,
          createdAt: new Date()
        }
      }
    });

    Business.update({_id: id},{
      $push: {
        reviews: {
          stars: stars,
          review: review,
          createdBy: createdBy.getUser(Meteor.userId()),
          createdAt: new Date()
        }
      },
      $set: {
        averageStars: averageStars,
        totalReviews: totalReviews
      }
    });

  }
});
