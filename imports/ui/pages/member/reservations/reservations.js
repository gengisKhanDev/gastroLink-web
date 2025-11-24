// imports/ui/pages/member/reservations/reservations.js
import "./reservations.html";
import { ReactiveVar } from "meteor/reactive-var";
import { Reservations } from "../../../../api/reservations/reservations.js"; // ajusta path

Template.member_reservations.onCreated(function () {
	document.title = "Gastrolink - Reservations";
	this.isSubscriptionReady = new ReactiveVar(false);

	this.autorun(() => {
		checkUserRole(["Member", "Employee"]);

		const handle = Meteor.subscribe("reservations.all");
		this.isSubscriptionReady.set(handle.ready());
	});
});

Template.member_reservations.helpers({
	reservations() {
		return Reservations.find({}, { sort: { reservedDate: -1, startTime: 1 } });
	},
});
