if(Meteor.isServer){
  import { Users } from "../../api/users/users.js";
  var methods = {};
  methods.getUser = function(userId){
    const user = Users.findOne({_id: userId})
    return {
      id: user._id,
      name: user.profile.firstName + " " + user.profile.lastName
    };
  };
  module.exports = methods;
}
