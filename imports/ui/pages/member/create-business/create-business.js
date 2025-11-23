import "./create-business.html";

Template.member_create_business.onCreated(function(){
  document.title = "Gastrolink - Create Business";
  this.autorun(() => {
    checkUserRole(["Member"]);
    if(this.subscriptionsReady()){

    }
  });
});

Template.member_create_business.onRendered(function(){
  initPlacesAutocomplete("businessAddress", function(result){
    if(result){
      Session.set("address", Session.get("placesAutocomplete"));
    }
  });
  const textArea = document.getElementById('description');
  const charCount = document.getElementById('charCount');

  textArea.addEventListener('input', function() {
      const chars = textArea.value.length;

      if (chars > 120) {
          const trimmedText = textArea.value.slice(0, 120);
          textArea.value = trimmedText;
      }

      charCount.textContent = chars;
  });
});

Template.member_create_business.helpers({

});

Template.member_create_business.events({
  "submit #createBusiness"(event){

    const businessName = event.target.businessName.value;
    const businessAddress = Session.get("address");
    const phoneNumber = event.target.phoneNumber.value;
    const businessEmail = event.target.businessEmail.value;
    const maxCapacity = event.target.maxCapacity.value;
    const description = event.target.description.value;


    Meteor.call("create.business", Meteor.userId(),  businessName, businessAddress, phoneNumber, businessEmail, maxCapacity, description, function(error, result){
      if(error){
        console.log(error);
        disableBtn("#editUserBtn", false, `<i class="fas fa-plus-square"></i> Edit`);
        yoloAlert("error");

        // if(error.error === "invalid-action"){
        //   yoloAlert("error", error.reason);
        // }
        // else {
        //   yoloAlert("error");
        // }
      }
      else {
        disableBtn("#editUserBtn", false, `<i class="fas fa-plus-square"></i> Edit`);
        yoloAlert("success", "Updated!");
      }
    });
  }
});
