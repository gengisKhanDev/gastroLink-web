import "./reset-password.html";

Template.reset_password.onCreated(function(){
  document.title = "Gastrolink  - Reset Password";
});

Template.reset_password.events({
  "click .input-group-text"(event){
    const id = $(event.currentTarget).data("id");

    if($(`#showHidePassword input[data-id="${id}"]`).attr("type") == "text"){
      $(`#showHidePassword input[data-id="${id}"]`).attr("type", "password");
      $(`#showHidePassword i[data-id="${id}"]`).addClass("fa-eye-slash");
      $(`#showHidePassword i[data-id="${id}"]`).removeClass( "fa-eye" );
    }
    else if($(`#showHidePassword input[data-id="${id}"]`).attr("type") == "password"){
      $(`#showHidePassword input[data-id="${id}"]`).attr("type", "text");
      $(`#showHidePassword i[data-id="${id}"]`).removeClass("fa-eye-slash");
      $(`#showHidePassword i[data-id="${id}"]`).addClass( "fa-eye" );
    }
  },
  "keyup input"(event){ // Improve this
    const input = $('input[id="password"]').val()

    if(input.length < 8){
      isPasswordValid = false;
      $("#length").removeClass("valid").addClass("invalid");
    }
    else {
      isPasswordValid = true;
      $("#length").removeClass("invalid").addClass("valid");
    }

    if(input.match(/[a-z]/)){
      isPasswordValid = true;
      $("#letter").removeClass("invalid").addClass("valid");
    }
    else {
      isPasswordValid = false;
      $("#letter").removeClass("valid").addClass("invalid");
    }

    if(input.match(/[A-Z]/)){
      isPasswordValid = false;
      $("#capital").removeClass("invalid").addClass("valid");
    }
    else {
      isPasswordValid = true;
      $("#capital").removeClass("valid").addClass("invalid");
    }

    if(input.match(/\d/)){
      isPasswordValid = true;
      $("#number").removeClass("invalid").addClass("valid");
    }
    else {
      isPasswordValid = false;
      $("#number").removeClass("valid").addClass("invalid");
    }

    if(input.match(/[$&+,:;=?@#|'<>.^*()%!-]/)){
      isPasswordValid = true;
      $("#special").removeClass("invalid").addClass("valid");
    }
    else {
      isPasswordValid = false;
      $("#special").removeClass("valid").addClass("invalid");
    }
  },
  "submit #resetPassword"(event) {
    event.preventDefault();

    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    disableBtn(`button[type="submit"]`, true);

    //Validations
    if(password !== confirmPassword){
      $("#formError").html("Passwords do not match");
      disableBtn(`button[type="submit"]`, false, "Passwords do not match");
    }
    else {
      $("#formError").html("");
      disableBtn(`button[type="submit"]`, false, "Confirm");

      Accounts.resetPassword(FlowRouter.getParam("token"), password, (error) =>{
        if(error){
          console.log(error);
          disableBtn(`button[type="submit"]`, false, "Reset Password");
          if(error.message === "Token expired [403]"){
            yoloAlert("error", error.reason);
          }
          else {
            yoloAlert("error");
          }
          disableBtn(`button[type="submit"]`, false, "Reset Password");
        }
        else {
          disableBtn(`button[type="submit"]`, false, "Reset Password");
          sourAlert({
            type: "success",
            title: "Success"
          }, function(result) {
            if(result) {
              if(Meteor.user().profile.role.name === "User") {
                FlowRouter.go("/user/my-account");
                setTimeout(() => {
                  location.reload();
                }, 1000);
              }
              else {
                FlowRouter.go("/admin/my-account");
                setTimeout(() => {
                  location.reload();
                }, 1000);
              }
            }
          });
        }
      });
    }
  }
});
