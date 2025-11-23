Template.registerHelper("formatName", function (name) {
  if(name){
    name = name.toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
});

initFormatName = () => {
  $(document).ready(function() {
    setTimeout(function(){
      $(".format-name").keyup(function(event){
        var name = event.target.value;
        $(this).val(name.substr(0,1).toUpperCase()+name.substr(1));
      });
    }, 750);
  });
}

formatName = (name) => {
  name = name.toLowerCase();
  return name.charAt(0).toUpperCase() + name.slice(1);
}
