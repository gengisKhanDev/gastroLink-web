Template.registerHelper("formatCents", function(cents, pretty){
  if(typeof cents != "undefined"){
    if(pretty){
      return parseFloat((cents / 100), 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
    else {
      return (cents / 100).toFixed(2);
    }
  }
  else {
    return 0;
  }
});

formatCents = (cents) => {
  if(typeof cents != "undefined"){
    return "$" + parseFloat((cents / 100), 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
  }
  else {
    return 0;
  }
}
