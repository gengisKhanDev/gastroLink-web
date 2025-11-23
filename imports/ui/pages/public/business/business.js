import "./business.html";
import { Business } from "../../../../api/business/business.js"

Session.set("isSubscriptionsReady", false);
Session.set("stars", 0);

const moment = require('moment');
Template.public_business_view.onCreated(function () {
  document.title = "Gastrolink - Business";
  this.autorun(() => {
    this.subscribe("get.business.publicID", FlowRouter.getParam("id"));
    Session.set("business", Business.findOne({ _id: FlowRouter.getParam("id") }));
  });
});

Template.public_business_view.onRendered(function () {
  initFlatpickr({
    selector: "#date",
    minDate: "today"
  });
  $(document).ready(function () {
    $('.rate label').on('click', function (e) {
      e.preventDefault();
    });
  });
});

Template.public_business_view.helpers({
  business() {
    return Session.get("business");
  },
  maxCapacityOptions() {
    const availableSpace = Session.get("availableSpace")
    return Array.from({ length: availableSpace }, (_, i) => i + 1);
  },
  isDefaultImage(imageId) {
    const business = Session.get("business");
    return business && business.defaultImage === imageId;
  },
  isActive(index) {
    const business = Session.get("business");
    if (business) {
      // Obtén la lista de imágenes que no son default
      const nonDefaultImages = business.images.filter((img, i) => business.defaultImage !== img.id);
      // Si el índice corresponde al primer elemento de la lista anterior, entonces está activo
      return business.images[index].id === nonDefaultImages[0].id ? 'active' : '';
    }
    return '';
  }
});

Template.public_business_view.events({
  "submit #addReservation"(event) {
    event.preventDefault();

    if (Meteor.userId() == null) {
      yoloAlert("error", "Please Create Account For Reserve");
    }
    else {
      const partySize = event.target.partySize.value;
      const date = new Date(event.target.date.value);
      const startTime = event.target.time.value;
      console.log(partySize)
      const endTime = addHoursToTime(startTime, 3);
      Meteor.call("create.reservation", FlowRouter.getParam("id"), partySize, date, startTime, endTime, function (error, result) {
        if (error) {
          console.log(error);
          yoloAlert("error");
        }
        else {
          console.log(result)
          yoloAlert("success", "Reservation Success!");
        }
      });
    }
  },
  "change #time"(event, template) {
    const date = new Date(template.find("#date").value);
    const startTime = event.target.value;
    console.log("test")

    $(document).ready(function () {
      $("#reservationBtn").prop("disabled", false)

    });

    Meteor.call('getAvailableSpace', FlowRouter.getParam("id"), date, startTime, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        if (result < Session.get("business").maxCapacity) {
          console.log("Espacio disponible:", result);  // Verifica este log
          Session.set("availableSpace", result);
        }
        else {
          Session.set("availableSpace", Session.get("business").maxCapacity);
        }

      }
    });
  },
  "click .select-star"(event) {
    const clickedElement = $(event.currentTarget);

    const radioButton = $('#' + clickedElement.attr('for'));

    if (radioButton.prop('checked')) {
      radioButton.prop('checked', false);
    } else {
      radioButton.prop('checked', true);
    }

    const selectedValue = radioButton.val();
    console.log(selectedValue);
    Session.set("stars", selectedValue);
  },
  "submit #addReview"(event) {
    event.preventDefault();

    const review = event.target.review.value;

    let stars = Session.get("stars");
    stars = Number(stars);

    if(stars != 0 ){
      console.log(review)
      Meteor.call("create.review", FlowRouter.getParam("id"), stars, review, function (error, result) {
        if (error) {
          console.log(error);
          yoloAlert("error");
          if(error.error){
            yoloAlert("error", error.error);
          }
          else {
            yoloAlert("error");
          }
        }
        else {
          console.log(result)
          yoloAlert("success", "Review Success!");
        }
      });
      
    }
    else {
      yoloAlert("error", "Please Select a Star for Review");
    }
   
  }
});

function addHoursToTime(timeString, hoursToAdd) {
  const time = moment(timeString, 'HH:mm');
  time.add(hoursToAdd, 'hours');
  return time.format('HH:mm');
}


