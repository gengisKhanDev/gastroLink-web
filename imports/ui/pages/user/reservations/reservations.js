// imports/ui/pages/user/reservations/reservations.js
import "./reservations.html";
import { Reservations } from "../../../../api/reservations/reservations.js";

Template.user_reservations.onCreated(function () {
	document.title = "Gastrolink - My Reservations";

	this.autorun(() => {
		// aquí podrías usar un checkUserRole(['User']) si quieres
		Meteor.subscribe("reservations.byUser");
	});
});

Template.user_reservations.helpers({
	reservations() {
		return Reservations.find(
			{ "createdBy.id": Meteor.userId() },
			{ sort: { reservedDate: -1, startTime: 1 } }
		);
	},
});
