// imports/ui/pages/admin/users/users.js
import "./users.html";
import { ReactiveVar } from "meteor/reactive-var";
import { Tracker } from "meteor/tracker";
import { Users } from "../../../../api/users/users.js"; // ajusta el path
// asumo que formatDate y checkUserRole están en helpers globales

Template.admin_users.onCreated(function () {
	document.title = "Gastrolink - Users";
	this.isSubscriptionReady = new ReactiveVar(false);

	this.autorun(() => {
		checkUserRole(["Super Admin", "Admin", "Employee"]);

		const handle = Meteor.subscribe("users.adminList");
		this.isSubscriptionReady.set(handle.ready());
	});
});

Template.admin_users.helpers({
	isSubscriptionReady() {
		return Template.instance().isSubscriptionReady.get();
	},
	users() {
		return Users.find({}, { sort: { createdAt: -1 } }).fetch();
	},
	fullName() {
		const profile = this.profile || {};
		return `${profile.firstName || ""} ${profile.lastName || ""}`.trim();
	},
	roleName() {
		return this.profile?.role?.name || "";
	},
	// Sólo si no tienes un helper global para esto:
	// formatDate(date, withTime) { return formatDate(date, withTime); }
});

Template.admin_users.events({});
