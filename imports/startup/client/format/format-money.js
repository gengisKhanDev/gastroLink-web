Template.registerHelper("formatMoney", function(value){
  if(typeof value != "undefined"){
    return "$" + parseFloat(value, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
  }
  else {
    return "N/A";
  }
});

formatMoney = (value) => {
  return "$" + parseFloat(value, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}
