// Accounts.urls.resetPassword = (token) => Meteor.absoluteUrl(`reset-password/${token}`);
// ``` :contentReference[oaicite:3]{index=3}  

// Vamos a dejar tu lógica de seeds casi igual, solo cambiando esa parte y eliminando `os` + `getLocalIP`:

// imports/startup/server/fixtures.js
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { Accounts } from "meteor/accounts-base";

import { Users } from "../../api/users/users.js";
import { Settings } from "../../api/settings/settings.js";

Meteor.startup(async () => {
	// 1. Crear usuario admin si no existe (async)
	const adminUser = await Accounts.findUserByUsername("admin");

	if (!adminUser) {
		console.log("[Fixtures] Creating default admin user...");
		const adminId = await Accounts.createUserAsync({
			username: "admin",
			email: "admin@admin.com",
			password: "lJ1tdvewYbht4CsYP8IKmkiJBXI2eNo", // tu password original
			createdAt: new Date(),
			profile: {
				firstName: "Super",
				lastName: "Admin",
				role: {
					name: "Admin",
				},
			},
		});

		console.log("[Fixtures] Admin user created with _id:", adminId);
	}

	// 2. Settings.roles (Admin, User, Member, Employee)
	const rolesSettings = await Settings.findOneAsync({ _id: "roles" });

	if (!rolesSettings) {
		console.log("Inserting [Settings=Roles]");

		// Recuperamos el admin para setear createdBy
		const superAdmin =
			(await Users.findOneAsync({ "profile.role.name": "Admin" })) ??
			(await Accounts.findUserByUsername("admin"));

		const createdByObj = superAdmin
			? {
				id: superAdmin._id,
				name: `${superAdmin.profile?.firstName ?? ""} ${superAdmin.profile?.lastName ?? ""
					}`.trim(),
			}
			: { id: null, name: "System" };

		const today = new Date();

		const rolesArr = [
			{
				id: Random.id(),
				name: "Admin",
				createdAt: today,
				createdBy: createdByObj,
			},
			{
				id: Random.id(),
				name: "User",
				createdAt: today,
				createdBy: createdByObj,
			},
			{
				id: Random.id(),
				name: "Member",
				createdAt: today,
				createdBy: createdByObj,
			},
			{
				id: Random.id(),
				name: "Employee",
				createdAt: today,
				createdBy: createdByObj,
			},
		];

		await Settings.insertAsync({
			_id: "roles",
			roles: rolesArr,
		});
	}

	// 3. Settings.orderCount
	const orderCountSettings = await Settings.findOneAsync({
		_id: "orderCount",
	});

	if (!orderCountSettings) {
		console.log("orderCount does not exists! setting orderCount to: 1000");
		await Settings.insertAsync({
			_id: "orderCount",
			count: 1000,
		});
	}

	// 4. URLs de Accounts (sin os, usando Meteor.absoluteUrl)
	Accounts.urls.resetPassword = function (token) {
		return Meteor.absoluteUrl(`reset-password/${token}`);
	};

	Accounts.urls.enrollAccount = function (token) {
		return Meteor.absoluteUrl(`enroll-account/${token}`);
	};

	Accounts.urls.verifyEmail = function (token) {
		return Meteor.absoluteUrl(`verify-email/${token}`);
	};
});
