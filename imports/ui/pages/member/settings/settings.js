import "./settings.html";

import { Business } from "../../../../api/business/business.js";


Template.member_settings.onCreated(function(){
  document.title = "Gastrolink - Settings";
  this.autorun(() => {
    checkUserRole(["Member", "Employee"]);
    this.subscribe("business.all");
    if(this.subscriptionsReady()){
      Session.set("dialysisDays", [{
        "day": "Sunday",
        "enabled": false,
        "startTime": null,
        "endTime": null
      },{
        "day": "Monday",
        "enabled": false,
        "startTime": null,
        "endTime": null
      },{
        "day": "Tuesday",
        "enabled": false,
        "startTime": null,
        "endTime": null
      },{
        "day": "Wednesday",
        "enabled": false,
        "startTime": null,
        "endTime": null
      },{
        "day": "Thursday",
        "enabled": false,
        "startTime": null,
        "endTime": null
      },{
        "day": "Friday",
        "enabled": false,
        "startTime": null,
        "endTime": null
      },{
        "day": "Saturday",
        "enabled": false,
        "startTime": null,
        "endTime": null
      }]);
    }
  });
});

Template.member_settings.onRendered(function(){
  initPlacesAutocomplete("address", function(result){
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

Template.member_settings.helpers({
   dialysisDays(){
    return Session.get("dialysisDays");
  },
  aboutUsImages(){
    const id = Meteor.user().business.id;
    return Business.findOne({_id: id});
  },
});

Template.member_settings.events({
  "change .dialysis-day"(event){
    const index = $(event.target).data("index");

    const dialysisDays = Session.get("dialysisDays");
    dialysisDays[index].enabled = !dialysisDays[index].enabled;
    Session.set("dialysisDays", dialysisDays);
  },
  "change #aboutUsImage"(event){
    console.log(Meteor.user().business.id)
    uploadImage({text: "Drag and Drop Image"}, event, function(fileObject){
      Meteor.call("upload.aboutUsImageBusiness", Meteor.user().business.id, fileObject, function(error, result){
        if(error){
          console.log(error);
          yoloAlert("error");
        }
        else {
          yoloAlert("success", "Uploaded Image!");
        }
      });
    });
  },
  "click .image-set-default"(event){
    sourAlert({
      type: "question",
      title: "Set image as default?",
      okButtonText: "Yes"
    }, function(result){
      if(result){
        const id = $(event.target).data("id");

        Meteor.call("business.defaultImage", Meteor.user().business.id, id,
          function(error, result){
          if(error){
            console.log(error);
            yoloAlert("error");
          }
          else {
            yoloAlert("success", "Set Default Image!");
          }
        });
      }
    });
  },
  "submit #updateBusinessInfo"(event){
    event.preventDefault();
    const businessName = event.target.name.value;
    const businessAddress = Session.get("address");
    const phoneNumber = event.target.phoneNumber.value;
    const businessEmail = event.target.email.value;
    let maxCapacity = event.target.maxCapacity.value;
    const description = event.target.description.value;
    let maxCapacityNum = parseInt(maxCapacity, 10)

    Meteor.call("update.businessInfo", Meteor.user().business.id, businessName, businessAddress, phoneNumber, businessEmail, maxCapacityNum, description, function(error, result){
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
  },
  "click .delete-image"(event){
    sourAlert({
      type: "question",
      title: "Delete Item?",
      okButtonText: "Yes, Delete Image"
    }, function(result) {
      if(result){
        const id = $(event.target).data("id");

        Meteor.call("business.deleteImage", Meteor.user().business.id, id,
          function(error, result){
          if(error){
            console.log(error);
            if(error.error){
              yoloAlert("error", error.reason);
            }
            else {
              yoloAlert("error");
            }
          }
          else {
            yoloAlert("success", "Deleted Image!");
            getImagesGames(FlowRouter.getParam("id"), "deleted");
          }
        });
      }
    });
  },
});