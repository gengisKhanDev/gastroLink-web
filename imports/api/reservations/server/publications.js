import { Meteor } from "meteor/meteor";
import { Reservations } from "../reservations.js";

if (Meteor.isServer) {
	// Todas las reservas (para vistas tipo admin/member)
	Meteor.publish("reservations.all", function () {
		if (!this.userId) {
			return this.ready();
		}

		return Reservations.find(
			{},
			{
				fields: {
					reservedDate: 1,
					startTime: 1,
					partySize: 1,
					createdAt: 1,
					"createdBy.name": 1,
				},
			}
		);
	});

	// Solo reservas del usuario logueado
	Meteor.publish("reservations.byUser", function () {
		if (!this.userId) {
			return this.ready();
		}

		return Reservations.find(
			{ "createdBy.id": this.userId },
			{
				fields: {
					reservedDate: 1,
					startTime: 1,
					partySize: 1,
					createdAt: 1,
					"createdBy.name": 1,
				},
			}
		);
	});
}
