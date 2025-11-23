import "./sign-up.html";

Template.global_sign_up.onCreated(function () {
  document.title = "Gastrolink  - Sign Up";
});

Template.global_sign_up.onRendered(function () {
  initFormatName();
  initFlatpickr({
    selector: "#dob",
    maxDate: "today"
  });
});

Template.global_sign_up.events({
  "submit #addUser"(event) {
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const dob = new Date(event.target.dob.value);
    const email = event.target.email.value;

    disableBtn("#addUserBtn", true);

    Meteor.call("public.invite.user", firstName, lastName, dob, email, function (error, result) {
        if(error){
          console.log(error);
          if(error.error){
            yoloAlert("error", error.reason.message);
          }
          else {
            yoloAlert("error");
          }
          disableBtn("#addUserBtn", false, "<i class='fas fa-plus-square'></i> Add");
        }
        else {
          setTimeout(function(){
            document.getElementById("addUser").reset();
            disableBtn("#addUserBtn", false, "<i class='fas fa-plus-square'></i> Add");
            yoloAlert("success", "Please check your email!");
            $("#showEnroll").show();

          }, 300);
        }
      });
  },
  "submit #enrollhrf"(event) {
    event.preventDefault();

    const text = event.target.text.value;
    window.location.href = text;
  }
});
