import { Users } from '../users.js';

import { check } from 'meteor/check';

if (Meteor.isServer) {
	ReactiveTable.publish(
		'users',
		Users,
		{},
		{
			fields: {
				_id: 1,
				'profile.firstName': 1,
				'profile.lastName': 1,
				'profile.role.name': 1,
				createdAt: 1,
			},
		},
	);

	Meteor.publish('userData', function () {
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
				},
			);
		} else {
			this.ready();
		}
	});

	Meteor.publish('users.all', () => {
		if (Meteor.userId()) {
			return Users.find({});
		} else {
			return [];
		}
	});

	Meteor.publish('get.users.by.company', (id) => {
		check(id, String);

		if (Meteor.userId()) {
			return Users.find({ 'profile.company.id': id });
		} else {
			return [];
		}
	});

	Meteor.publish('get.user', (id) => {
		if (Meteor.userId()) {
			return Users.find({ _id: id });
		} else {
			return [];
		}
	});
}
