initSelect2 = () => {
  $(document).ready(function() {
    setTimeout(function(){
      $(".select2").select2({theme: "bootstrap4", placeholder: "Select an option"});
      $(".select2").css("width", "100%");
    }, 750);
  });
}
