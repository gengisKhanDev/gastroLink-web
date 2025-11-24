import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { Users } from '../../api/users/users.js';
import { Settings } from '../../api/settings/settings.js';
const os = require('os');
Meteor.startup(() => {
	if (Users.find().count() == 0) {
		Accounts.createUser({
			username: 'admin',
			email: 'admin@admin.com',
			password: 'lJ1tdvewYbht4CsYP8IKmkiJBXI2eNo',
			createdAt: new Date(),
			profile: {
				firstName: 'Super',
				lastName: 'Admin',
				role: {
					name: 'Admin',
				},
			},
		});
	}

	if (typeof Settings.findOne({ _id: 'roles' }) === 'undefined') {
		console.log('Inserting [Settings=Roles]');
		const superAdmin = Users.findOne({ 'profile.role.name': 'Admin' });
		const createdByObj = {
			id: superAdmin._id,
			name: superAdmin.profile.firstName + ' ' + superAdmin.profile.lastName,
		};
		const today = new Date();

		const rolesArr = [
			{
				id: Random.id(),
				name: 'Admin',
				createdAt: today,
				createdBy: createdByObj,
			},
			{
				id: Random.id(),
				name: 'User',
				createdAt: today,
				createdBy: createdByObj,
			},
			{
				id: Random.id(),
				name: 'Member',
				createdAt: today,
				createdBy: createdByObj,
			},
			{
				id: Random.id(),
				name: 'Employee',
				createdAt: today,
				createdBy: createdByObj,
			},
		];

		Settings.insert({
			_id: 'roles',
			roles: rolesArr,
		});
	}

	if (!Settings.findOne({ _id: 'orderCount' })) {
		var countExists = Settings.findOne({ _id: 'orderCount' });
		if (countExists == undefined) {
			console.log('orderCount does not exists!');
			console.log('setting orderCount to: 1000');
			Settings.insert({
				_id: 'orderCount',
				count: 1000,
			});
		}
	}

	if (typeof Settings.findOne({ _id: 'carriers' }) === 'undefined') {
		console.log('Inserting [Settings=Carriers]');

		Settings.insert({
			_id: 'carriers',
			carriers: [
				{
					name: 'ATT',
					email: '@txt.att.net',
				},
				{
					name: 'T Mobile',
					email: '@tmomail.net',
				},
				{
					name: 'Verizon',
					email: '@vtext.com',
				},
				{
					name: 'Sprint',
					email: '@messaging.sprintpcs.com',
				},
				{
					name: 'Xfinity Mobile',
					email: 'number@mypixmessages.com',
				},
				{
					name: 'Virgin Mobile',
					email: '@vmobl.com',
				},
				{
					name: 'Metro PCS',
					email: '@mymetropcs.com',
				},
				{
					name: 'Boost Mobile',
					email: '@sms.myboostmobile.com',
				},
				{
					name: 'cricket-wireless',
					email: '@sms.cricketwireless.net',
				},
				{
					name: 'US Cellular',
					email: '@r@email.uscc.net',
				},
				{
					name: 'Consumer Cellular',
					email: '@mailmymobile.net',
				},
			],
		});
	}

	//Configures "reset password account" email link
	Accounts.urls.resetPassword = function (token) {
		return Meteor.absoluteUrl(`reset-password/${token}`);
	};

	//Configures "enroll account" email link
	Accounts.urls.enrollAccount = function (token) {
		// return Meteor.absoluteUrl(`enroll-account/${token}`);
		const ip = getLocalIP();
		return `${ip}:3000/enroll-account/${token}`;
	};

	//Configures "verify email" email link
	Accounts.urls.verifyEmail = function (token) {
		return Meteor.absoluteUrl(`verify-email/${token}`);
	};
});

function getLocalIP() {
	const ifaces = os.networkInterfaces();
	let localIp = '';

	Object.keys(ifaces).forEach((ifname) => {
		ifaces[ifname].forEach((iface) => {
			if ('IPv4' !== iface.family || iface.internal !== false) {
				return;
			}
			localIp = iface.address;
		});
	});

	return localIp;
}

// business = {
//   "id": "businessId",
//   "name": "bonanza",
//   "bossUser": {
//     "id":"userid",
//     "firstname": "firstname",
//     "lastname": "lastname"
//     },
//   "reviews"[{
//     "firstname":"juan",
//     "lastname": "david",
//     "coment":"good site"
//   },
//   {
//     "firstname":"manuel",
//     "lastname": "orozco",
//     "coment":"bad site"
//   }]
// }

// users-role-user = {
//   "firstname":"juan",
//   "lastname": "david",
//   "myReviws"[{
//     "businessName":"bonanza",
//     "comments": "good site",
//   }]
// },
// {
//   "firstname":"manuel",
//   "lastname": "orozco",
//   "myReviws"[{
//     "businessName":"bonanza",
//     "comments": "bad site",
//   }]
// }
