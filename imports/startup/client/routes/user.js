import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

/* Layout */
import "../../../ui/layouts/body/user.js";

/* Components */
// Desktop
import "../../../ui/components/user/sidebar/sidebar.js";

/* Pages */
// Home / Reservations / My Account
import "../../../ui/pages/user/reservations/reservations.js";
import "../../../ui/pages/user/my-account/my-account.js";

// 🔹 Ya NO usamos BlazeLayout.setRoot('body')

// Helper para rutas de usuario logueado
function renderUserIfLoggedIn(mainTemplate) {
	if (!Meteor.userId()) {
		FlowRouter.go("/");
		return;
	}

	this.render("user_body", {
		main: mainTemplate,
		navbar: "user_sidebar",
	});
}

// My Account
FlowRouter.route("/user/my-account", {
	name: "user.my-account",
	action() {
		renderUserIfLoggedIn.call(this, "user_my_account");
	},
});

// Reservations
FlowRouter.route("/user/reservations", {
	name: "user.reservations",
	action() {
		renderUserIfLoggedIn.call(this, "user_reservations");
	},
});
