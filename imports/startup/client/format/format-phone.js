Template.registerHelper("formatPhone", function (phone) {
  if(typeof phone != "undefined"){
    phone = phone.replace(/[^\d]/g, "");
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }
  else if(typeof phone === "undefined"){
    return "N/A";
  }
});

formatPhoneInput = () => {
  $(document).ready(function() {
     setTimeout(function(){
       $(".format-phone").keyup(function(event){
         event.preventDefault();
         let x = event.target.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
         event.target.value = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
       });
     }, 750);
  });
}

// Template.admin_body.events({
//   "keyup .phone"(event) {
//     event.preventDefault();
//     let x = event.target.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
//     event.target.value = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
//   }
// });
