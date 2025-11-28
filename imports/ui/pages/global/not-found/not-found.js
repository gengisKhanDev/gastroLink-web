import './not-found.html';
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.not_found.onCreated(function () {
	document.title = 'Gastrolink - 404';
});

Template.not_found.events({
	'click #home'() {
		if (Meteor.userId()) {
			FlowRouter.go('/admin/my-account');
		} else {
			FlowRouter.go('/');
		}
	},
});
