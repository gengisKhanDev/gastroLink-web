import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

/*Layout*/
import '../../../ui/layouts/body/global.js';

/*Components*/

/*Pages*/
///Login
import '../../../ui/pages/global/login/login.js';
///Sign Up
import '../../../ui/pages/global/sign-up/sign-up.js';
//Enroll
import '../../../ui/pages/global/enroll/enroll.js';
//404
import '../../../ui/pages/global/not-found/not-found.js';
//Forgot Password
import '../../../ui/pages/global/forgot-password/forgot-password.js';
//Reset Password
import '../../../ui/pages/global/reset-password/reset-password.js';
//Not Authorized
import '../../../ui/pages/global/not-authorized/not-authorized.js';

// Login (ruta explícita)
FlowRouter.route("/login", {
	name: "login",
	action() {
		this.render("global_body", {
			main: "global_login",
		});
	},
});

// Sign Up
FlowRouter.route("/sign-up", {
	name: "sign-up",
	action() {
		if (Meteor.userId()) {
			// Ojo: en tu código original era "/account/my-account"
			// Si la ruta real es "/my-account", puedes corregirlo aquí.
			FlowRouter.go("/account/my-account");
			return;
		}

		this.render("global_body", {
			main: "global_sign_up",
		});
	},
});

// Enroll Account
FlowRouter.route("/enroll-account/:token", {
	name: "enroll",
	action(params) {
		if (Meteor.userId()) {
			FlowRouter.go("/");
			return;
		}

		this.render("global_body", {
			main: "enroll",
		});
	},
});

// Forgot Password
FlowRouter.route("/forgot-password", {
	name: "forgot.password",
	action() {
		this.render("global_body", {
			main: "forgot_password",
		});
	},
});

// Reset Password
FlowRouter.route("/reset-password/:token", {
	name: "reset_password",
	action(params) {
		this.render("global_body", {
			main: "reset_password",
		});
	},
});

// Not Authorized
FlowRouter.route("/not-authorized", {
	name: "not_authorized",
	action() {
		this.render("global_body", {
			navbar: "public_navbar",
			main: "global_not_authorized",
			footer: "public_footer",
		});
	},
});

// 404 (Not Found) – patrón recomendado con '*'
FlowRouter.route("*", {
	name: "not.found",
	action() {
		this.render("global_body", {
			navbar: "public_navbar",
			main: "not_found",
			footer: "public_footer",
		});
	},
});
