import "./reservations.html";

Template.member_reservations.onCreated(function () {
  document.title = "Gastrolink - Reservations";
  this.isSubscriptionReady = new ReactiveVar(false);
  Tracker.autorun(() => {
    checkUserRole(["Member", "Employee"]);
  });
});

Template.member_reservations.helpers({
  // isSubscriptionReady(){
  //   return Template.instance().isSubscriptionReady.get();
  // },
  contactUs() {
    return {
      collection: "reservations",
      rowsPerPage: 25,
      showFilter: true,
      ready: Template.instance().isSubscriptionReady,
      fields: [{
        key: "_id",
        label: "id",
        hidden: true
      }, {
        key: "reservedDate",
        label: "Date",
        fn: function(date){
          return formatDateView(date);
        }
      }, {
        key: "startTime",
        label: "Time"
      }, {
        key: "partySize",
        label: "Party Size"
      }, {
        key: "createdBy.name",
        label: "User"
      },{
        key: "createdAt",
        label: "createdAt",
        fn: function(date){
          return formatDate(date);
        }
      }]
    };
  }
});