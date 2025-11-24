// imports/startup/client/router/public.js
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

/* Layout */
import "../../../ui/layouts/body/public.js";

/* Components */
import "../../../ui/components/public/navbar/navbar.js";
import "../../../ui/components/public/footer/footer.js";

/* Pages */
// Home
import "../../../ui/pages/public/home/home.js";
// Business
import "../../../ui/pages/public/business/business.js";

// Home
FlowRouter.route("/", {
	name: "public.home",
	action() {
		this.render("public_body", {
			navbar: "public_navbar",
			main: "public_home",
			footer: "public_footer",
		});
	},
});

// Business view
FlowRouter.route("/business/:id", {
	name: "public.business.view",
	action(params) {
		// El template puede seguir usando FlowRouter.getParam("id")
		this.render("public_body", {
			navbar: "public_navbar",
			main: "public_business_view",
			footer: "public_footer",
		});
	},
});
