import { check } from 'meteor/check';
import { Random } from 'meteor/random';

import { Settings } from './settings.js';
import { createdBy } from '../../startup/server/created-by.js';

Meteor.methods({
	async 'reservation.clear'() {
		console.log('Successfully ran [reservation.clear]');

		await Settings.removeAsync({ _id: 'reservation' });
	},

	async 'reservation.update'(reservation) {
		console.log('Successfully ran [reservation.update]');

		check(reservation, Object);

		const reservationExists = await Settings.findOneAsync({ _id: 'reservation' });

		if (reservationExists) {
			await Settings.updateAsync(
				{ _id: 'reservation' },
				{ $set: { reservation } }
			);
		} else {
			await Settings.insertAsync({
				_id: 'reservation',
				reservation,
			});
		}
	},

	async 'company.info'(name, address, phoneNumber, email, taxID) {
		console.log('Successfully ran [company.info]');

		if (!Meteor.userId()) throw new Meteor.Error('not-authorized');

		check(name, String);
		check(phoneNumber, String);
		check(email, String);
		check(taxID, String);

		const companyInfoExists = await Settings.findOneAsync({ _id: 'companyInfo' });

		const creator = await createdBy.getUser(Meteor.userId());

		if (companyInfoExists) {
			await Settings.updateAsync(
				{ _id: 'companyInfo' },
				{
					$set: {
						name,
						address,
						phoneNumber,
						email,
						taxID,
						createdBy: creator,
						createdAt: new Date(),
					},
				}
			);
		} else {
			await Settings.insertAsync({
				_id: 'companyInfo',
				name,
				address,
				phoneNumber,
				email,
				taxID,
				createdBy: creator,
				createdAt: new Date(),
			});
		}
	},

	async 'company.socialMedia'(facebook, twitter, google, instagram, tiktok) {
		console.log('Successfully ran [company.socialMedia]');

		if (!Meteor.userId()) throw new Meteor.Error('not-authorized');

		check(facebook, String);
		check(twitter, String);
		check(google, String);
		check(instagram, String);
		check(tiktok, String);

		const creator = await createdBy.getUser(Meteor.userId());

		const exists = await Settings.findOneAsync({ _id: 'socialMedia' });

		if (exists) {
			await Settings.updateAsync(
				{ _id: 'socialMedia' },
				{
					$set: {
						facebook,
						twitter,
						google,
						instagram,
						tiktok,
						createdBy: creator,
						createdAt: new Date(),
					},
				}
			);
		} else {
			await Settings.insertAsync({
				_id: 'socialMedia',
				facebook,
				twitter,
				google,
				instagram,
				tiktok,
				createdBy: creator,
				createdAt: new Date(),
			});
		}
	},

	async 'upload.aboutUsImageSettings'(fileObject) {
		console.log('Ran Method [upload.aboutUsImage]');

		if (!Meteor.userId()) throw new Meteor.Error('not-authorized');

		const creator = await createdBy.getUser(Meteor.userId());

		let aboutUsImages = await Settings.findOneAsync({ _id: 'aboutUsImages' });

		if (!aboutUsImages) {
			await Settings.insertAsync({ _id: 'aboutUsImages', images: [] });
		}

		await Settings.updateAsync(
			{ _id: 'aboutUsImages' },
			{
				$push: {
					images: {
						id: Random.id(),
						name: fileObject.name,
						type: fileObject.type,
						base64: fileObject.base64,
						createdBy: creator,
						createdAt: new Date(),
					},
				},
			}
		);
	},

	async 'delete.aboutUsImage'(id) {
		console.log('Ran Method [delete.aboutUsImage]');

		if (!Meteor.userId()) throw new Meteor.Error('not-authorized');

		check(id, String);

		await Settings.updateAsync(
			{ _id: 'aboutUsImages' },
			{
				$pull: { images: { id } },
			}
		);
	},
});
