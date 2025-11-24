// imports/api/users/server/publications.js
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Users } from "../users.js";

if (Meteor.isServer) {
	// Tabla de admin (solo algunos campos)
	Meteor.publish("users.adminList", function () {
		if (!this.userId) {
			return this.ready();
		}

		// Aquí podrías chequear roles en servidor si quieres
		return Users.find(
			{},
			{
				fields: {
					"profile.firstName": 1,
					"profile.lastName": 1,
					"profile.role.name": 1,
					createdAt: 1,
				},
			}
		);
	});

	Meteor.publish("userData", function () {
		if (this.userId) {
			return Meteor.users.find(
				{ _id: this.userId },
				{
					fields: {
						emails: 1,
						profile: 1,
						username: 1,
						createdAt: 1,
						business: 1,
					},
				}
			);
		}
		return this.ready();
	});

	Meteor.publish("users.all", () => {
		if (Meteor.userId()) {
			return Users.find({});
		}
		return [];
	});

	Meteor.publish("get.users.by.company", (id) => {
		check(id, String);

		if (Meteor.userId()) {
			return Users.find({ "profile.company.id": id });
		}
		return [];
	});

	Meteor.publish("get.user", (id) => {
		if (Meteor.userId()) {
			return Users.find({ _id: id });
		}
		return [];
	});
}
