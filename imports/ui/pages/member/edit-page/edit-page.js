import "./edit-page.html";
import { Business } from "../../../../api/business/business.js";

Template.member_edit_page.onCreated(function(){
  document.title = "Gastrolink - Edit Page";
  this.autorun(() => {
    this.subscribe("business.all");
    if(this.subscriptionsReady()){
      const id = Meteor.user().business.id;
      const thisBusiness = Business.findOne({_id: id})
      initQuillEditor("#eventEditor", thisBusiness.descriptionHTML.html);
    }
  });
});

Template.member_edit_page.onRendered(function(){

});
