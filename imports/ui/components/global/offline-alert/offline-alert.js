import "./offline-alert.html";
import { Meteor } from "meteor/meteor";

Template.offline_alert.helpers({
	isOffline() {
		const status = Meteor.status().status;
		const isOnline = status === "connected" || status === "connecting";

		// Habilitar / deshabilitar todos los botones usando DOM nativo
		const buttons = document.querySelectorAll("button");
		buttons.forEach((btn) => {
			btn.disabled = !isOnline;
		});

		// El helper devuelve true cuando está OFFLINE
		return !isOnline;
	},
});
