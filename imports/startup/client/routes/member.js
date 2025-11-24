// imports/startup/client/router/member.js
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

/* Layout */
import "../../../ui/layouts/body/member.js";

/* Components */
// Desktop
import "../../../ui/components/member/sidebar/sidebar.js";

/* Pages */
// Settings
import "../../../ui/pages/member/settings/settings.js";
// Reservations
import "../../../ui/pages/member/reservations/reservations.js";
// Edit Page
import "../../../ui/pages/member/edit-page/edit-page.js";
// My Account
import "../../../ui/pages/member/my-account/my-account.js";
// Create Business
import "../../../ui/pages/member/create-business/create-business.js";

// 🔹 Helper para rutas que requieren user + business
function renderMemberWithBusiness(mainTemplate) {
	const user = Meteor.user();

	if (!user) {
		FlowRouter.go("/");
		return;
	}

	if (!user.business) {
		FlowRouter.go("/member/create-business");
		// Mantengo tu reload para no cambiar comportamiento
		location.reload();
		return;
	}

	this.render("member_body", {
		sidebar: "member_sidebar",
		main: mainTemplate,
	});
}

// 🔹 Create Business: solo si NO tiene business
FlowRouter.route("/member/create-business", {
	name: "member.create-business",
	waitOn() {
		return Meteor.subscribe("userData");
	},
	action() {
		const user = Meteor.user();

		if (!user) {
			FlowRouter.go("/");
			return;
		}

		if (user.business) {
			FlowRouter.go("/member/settings");
			location.reload();
			return;
		}

		this.render("member_body", {
			main: "member_create_business",
		});
	},
});

// Settings
FlowRouter.route("/member/settings", {
	name: "member.dashboard",
	waitOn() {
		return Meteor.subscribe("userData");
	},
	action() {
		renderMemberWithBusiness.call(this, "member_settings");
	},
});

// My Account
FlowRouter.route("/member/my-account", {
	name: "member.my-account",
	waitOn() {
		return Meteor.subscribe("userData");
	},
	action() {
		renderMemberWithBusiness.call(this, "member_my_account");
	},
});

// Edit Page
FlowRouter.route("/member/edit-page", {
	name: "member.edit-page",
	waitOn() {
		return Meteor.subscribe("userData");
	},
	action() {
		renderMemberWithBusiness.call(this, "member_edit_page");
	},
});

// Reservations
FlowRouter.route("/member/reservations", {
	name: "member.reservations",
	waitOn() {
		return Meteor.subscribe("userData");
	},
	action() {
		renderMemberWithBusiness.call(this, "member_reservations");
	},
});
