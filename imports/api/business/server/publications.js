import { Business } from '../business.js';

if (Meteor.isServer) {
	Meteor.publish('get.business.public', () => {
		return Business.find(
			{},
			{
				fields: {
					businessName: 1,
					businessAddress: 1,
					businessEmail: 1,
					phoneNumber: 1,
					description: 1,
					images: 1,
					defaultImage: 1,
					descriptionHTML: 1,
					maxCapacity: 1,
					averageStars: 1,
					totalReviews: 1,
				},
			},
		);
	});
	Meteor.publish('business.all', () => {
		if (Meteor.userId()) {
			return Business.find({});
		} else {
			return [];
		}
	});
	Meteor.publish('get.business.publicID', async (id) => {
		const slugEvent = await Business.findOneAsync({ id: id });
		if (slugEvent) {
			return Business.find({ id: id });
		} else {
			return Business.find({ _id: id });
		}
	});
}
