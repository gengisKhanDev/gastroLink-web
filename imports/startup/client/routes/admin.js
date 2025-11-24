// imports/startup/client/router/admin.js
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

/* Layout */
// Desktop
import "../../../ui/layouts/body/admin.js";
// Global
import "../../../ui/layouts/body/global.js";

/* Components */
// Desktop
import "../../../ui/components/admin/sidebar/sidebar.js";
// Global
import "../../../ui/components/global/loader/loader.js";
import "../../../ui/components/global/offline-alert/offline-alert.js";

/* Pages */
/// My Account
import "../../../ui/pages/admin/my-account/my-account.js";
/// System Settings
import "../../../ui/pages/admin/system-settings/system-settings.js";
/// Users
import "../../../ui/pages/admin/users/users.js";
import "../../../ui/pages/admin/users/edit.js";

// 🔹 Ya NO usamos BlazeLayout.setRoot('body');
// 🔹 Usamos this.render('layout', { regions... })

function renderAdminIfLoggedIn(mainTemplate) {
	if (!Meteor.userId()) {
		FlowRouter.go("/");
		return;
	}

	this.render("admin_body", {
		main: mainTemplate,
		sidebar: "admin_sidebar",
	});
}

// My Account
FlowRouter.route("/admin/my-account", {
	name: "admin.my-account",
	action() {
		renderAdminIfLoggedIn.call(this, "admin_my_account");
	},
});

// System Settings
FlowRouter.route("/admin/system-settings", {
	name: "admin.system-settings",
	action() {
		renderAdminIfLoggedIn.call(this, "admin_system_settings");
	},
});

// Users list
FlowRouter.route("/admin/users", {
	name: "admin.users",
	action() {
		renderAdminIfLoggedIn.call(this, "admin_users");
	},
});

// Users edit
FlowRouter.route("/admin/users/:id", {
	name: "admin.users-edit",
	action(params) {
		// Si dentro del template usas FlowRouter.getParam('id'), sigue funcionando igual
		renderAdminIfLoggedIn.call(this, "admin_users_edit");
	},
});
