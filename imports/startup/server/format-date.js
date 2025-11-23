if(Meteor.isServer) {
  const moment = require("moment");

  var methods = {};
  methods.formatDate = function(date, showHours){
    if(typeof date != "undefined"){
      if(showHours){
        return moment(date).format("MM/DD/YYYY hh:mm:ss a");
      }
      else {
        return moment(date).format("MM/DD/YYYY");
      }
    }
    else {
      return "--/--";
    }
  };
  module.exports = methods;
}
