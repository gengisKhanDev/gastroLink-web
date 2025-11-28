import { Users } from './users.js';
import { Settings } from '../settings/settings.js';
import { Business } from '../business/business.js';

import { check } from 'meteor/check';
import { Random } from 'meteor/random';

import { createdBy } from '../../startup/server/created-by.js';

Meteor.methods({
	async "invite.user"(firstName, lastName, roleID, email) {
		// Mejor usar this.userId dentro del método
		if (!this.userId) {
			throw new Meteor.Error("not-authorized", "No autorizado");
		}

		console.log("[invite.user] roleID:", roleID);

		check(firstName, String);
		check(lastName, String);
		check(roleID, String);
		check(email, String);

		// 1. Comprobar si el email ya existe
		const emailExists = await Users.findOneAsync({ "emails.address": email });
		if (emailExists) {
			throw new Meteor.Error(
				"email-already-used",
				"This email is already used"
			);
		}

		// 2. Resolver el rol a partir de Settings.roles
		const rolesDoc = await Settings.findOneAsync({ _id: "roles" });

		if (!rolesDoc || !rolesDoc.roles) {
			throw new Meteor.Error(
				"roles-not-configured",
				"Roles settings document not found"
			);
		}

		const role = rolesDoc.roles.find((r) => r.id === roleID);

		if (!role) {
			throw new Meteor.Error("invalid-role", "Role not found");
		}

		const roleObj = {
			id: role.id,
			name: role.name,
		};

		// 3. Crear usuario (método async en Meteor 3)
		const userId = await Accounts.createUserAsync({
			username: `${firstName}${lastName}_${Random.id()}`,
			email,
			password: Random.id(), // contraseña random que luego cambiará con el enrollment
			profile: {
				firstName,
				lastName,
				role: roleObj,
				active: true,
			},
		});

		console.log("[invite.user] created userId:", userId);

		// 4. Enviar email de enrollment (también async en Meteor 3)
		try {
			await Accounts.sendEnrollmentEmail(userId, email);
			console.log("[invite.user] enrollment email sent to:", email);
		} catch (error) {
			console.error("[invite.user] sendEnrollmentEmail error:", error);
			// Propagar un error legible al cliente
			throw new Meteor.Error(
				"enrollment-email-failed",
				error.reason || error.message || "Error sending enrollment email"
			);
		}

		// 5. Puedes devolver algo útil al cliente
		return { userId };
	},
	async 'check.userRole'(email) {
		console.log('Ran Method [check.userRole]');

		check(email, String);

		email = email.toLowerCase();

		const thisUser = await Users.findOneAsync({
			'emails.address': email,
		});

		if (typeof thisUser === 'undefined') {
			throw new Meteor.Error('no-user', 'A user with this email does not exists!');
		}

		if (typeof thisUser.profile.role != 'undefined') {
			if (thisUser.profile.role.name === 'Super Admin' || thisUser.profile.role.name === 'Admin') {
				return `${thisUser.profile.role.name.toLowerCase()}/my-account`;
			} else if (
				thisUser.profile.role.name === 'Member' ||
				thisUser.profile.role.name === 'Employee'
			) {
				return 'member/my-account';
			} else {
				return `${thisUser.profile.role.name.toLowerCase()}/my-account`;
			}
		} else {
			throw new Meteor.Error('no-role', "You don't have a role assigned!");
		}
	},
	async 'public.invite.user'(firstName, lastName, dob, email) {
		console.log('Ran Method [invite.user]');

		check(firstName, String);
		check(lastName, String);
		// check(dob, Date);
		check(email, String);

		//check if email exists in DB
		const emailExists = await Users.findOneAsync({ 'emails.address': email });
		if (emailExists) {
			throw new Meteor.Error(403, { message: 'This email is already used' });
		}

		const userRoles = (await Settings.findOneAsync({ _id: 'roles' })).roles;
		let thisUserRole = {};
		userRoles.forEach((userRole, index) => {
			if (userRole.name === 'User') {
				thisUserRole.id = userRole.id;
				thisUserRole.name = userRole.name;
			}
		});

		const id = Accounts.createUser({
			username: firstName + lastName + '_' + Random.id(),
			dob: new Date(dob),
			email: email,
			password: Random.id(),
			profile: {
				firstName: firstName,
				lastName: lastName,
				role: thisUserRole,
				dob: new Date(dob),
			},
		});

		Accounts.sendEnrollmentEmail(id, email);
	},
	async 'member.invite.user'(firstName, lastName, email) {
		console.log('Ran Method [invite.user]');

		check(firstName, String);
		check(lastName, String);
		check(email, String);

		//check if email exists in DB
		const emailExists = await Users.findOneAsync({ 'emails.address': email });
		if (emailExists) {
			throw new Meteor.Error(403, { message: 'This email is already used' });
		}

		const userRoles = (await Settings.findOneAsync({ _id: 'roles' })).roles;
		let thisUserRole = {};
		userRoles.forEach((userRole, index) => {
			if (userRole.name === 'Employee') {
				thisUserRole.id = userRole.id;
				thisUserRole.name = userRole.name;
			}
		});

		const id = Accounts.createUser({
			username: firstName + lastName + '_' + Random.id(),
			email: email,
			password: Random.id(),
			profile: {
				firstName: firstName,
				lastName: lastName,
				role: thisUserRole,
			},
		});

		Accounts.sendEnrollmentEmail(id, email);
	},
	async 'user.get'(id) {
		console.log('Ran Method [user.get]');

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);

		return await Users.findOneAsync({ _id: id });
	},
	async 'edit.user-admin'(id, firstName, lastName) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);
		check(firstName, String);
		check(lastName, String);

		const userRoles = await Settings.findOneAsync({ _id: 'roles' }).roles;
		let thisUserRole = {};
		userRoles.forEach((userRole, index) => {
			if (userRole.name === 'Admin') {
				thisUserRole.id = userRole.id;
				thisUserRole.name = userRole.name;
			}
		});

		await Users.updateAsync(
			{ _id: id },
			{
				$set: {
					profile: {
						firstName: firstName,
						lastName: lastName,
						role: thisUserRole,
					},
				},
			},
		);
	},
	async 'create.review'(id, stars, review) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('Please Create Account For Review');
		}

		const businessReview = await Business.findOneAsync({ _id: id });

		let thisBusiness = {};
		thisBusiness = {
			id: id,
			businessName: businessReview.businessName,
		};
		let totalStars = stars;
		let totalReviews = 1;

		if (businessReview.reviews && businessReview.reviews.length > 0) {
			businessReview.reviews.forEach((review) => {
				totalStars += review.stars;
			});
			totalReviews += businessReview.reviews.length;
		}

		let averageStars = totalStars / totalReviews;

		await Users.updateAsync(
			{ _id: Meteor.userId() },
			{
				$push: {
					reviews: {
						stars: stars,
						review: review,
						businessReview: thisBusiness,
						createdAt: new Date(),
					},
				},
			},
		);

		await Business.updateAsync(
			{ _id: id },
			{
				$push: {
					reviews: {
						stars: stars,
						review: review,
						createdBy: createdBy.getUser(Meteor.userId()),
						createdAt: new Date(),
					},
				},
				$set: {
					averageStars: averageStars,
					totalReviews: totalReviews,
				},
			},
		);
	},
});
