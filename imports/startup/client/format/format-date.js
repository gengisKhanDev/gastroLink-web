const moment = require("moment");

Template.registerHelper("formatDate", function (date, showHours, friendly){
  if(typeof date != "undefined"){
    if(date === null){
      return "--/--";
    }
    else {
      if(typeof showHours != "undefined"){
        return moment(date).format("MM/DD/YYYY");
      }

      if(typeof friendly === "undefined"){
        return moment(date).format("MM/DD/YYYY hh:mm:ss a");
      }
      else {
        return moment(date).format('MMMM Do YYYY, h:mm a');
      }
    }
  }
  else {
    return "--/--";
  }
});
Template.registerHelper("formatDateEvent", function (date, showHours, friendly){
  if(typeof date != "undefined"){
    if(date === null){
      return "--/--";
    }
    else {
      if(typeof friendly === "undefined"){
        return moment(date).format("ddd M.D.YY");
      }
      else {
        return moment(date).format("ddd M.D.YY");
      }
    }
  }
  else {
    return "--/--";
  }
});

Template.registerHelper("formatDateView", function (date, showHours, friendly){
  if(typeof date != "undefined"){
    if(date === null){
      return "--/--";
    }
    else {
      if(typeof friendly === "undefined"){
        return moment(date).format('dddd, MMMM D, YYYY')
      }
      else {
        return moment(date).format('dddd, MMMM D, YYYY')
      }
    }
  }
  else {
    return "--/--";
  }
});

Template.registerHelper("formatHourDate", function (date, showHours, friendly){
  if(typeof date != "undefined"){
    if(date === null){
      return "--/--";
    }
    else {
      if(typeof friendly === "undefined"){
        return moment(date).format('LT')
      }
      else {
        return moment(date).format('LT')
      }
    }
  }
  else {
    return "--/--";
  }
});

formatHourDate = (date) => {
  return moment(date).format("LT");
}
formatDate = (date) => {
  return moment(date).format("MM/DD/YYYY hh:mm:ss a");
}
formatDateEvent = (date) => {
  return moment(date).format("ddd M.D.YY");
}
formatDateView = (date) => {
  return moment(date).format('dddd, MMMM D, YYYY')
}
