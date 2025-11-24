import { check } from 'meteor/check';
import { Random } from 'meteor/random';

import { Settings } from './settings.js';

const createdBy = require('../../startup/server/created-by.js');

Meteor.methods({
	'reservation.clear'() {
		console.log('Successfully ran [reservation.clear]');

		Settings.remove({
			_id: 'reservation',
		});
	},
	'reservation.update'(reservation) {
		console.log('Successfully ran [reservation.update]');

		check(reservation, Object);

		const reservationExists = Settings.findOne({ _id: 'reservation' });
		if (reservationExists) {
			Settings.update(
				{ _id: 'reservation' },
				{
					$set: {
						reservation: reservation,
					},
				},
			);
		} else {
			Settings.insert({
				_id: 'reservation',
				reservation: reservation,
			});
		}
	},
	'company.info'(name, address, phoneNumber, email, taxID) {
		console.log('Successfully ran [company.info]');

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(name, String);
		// check(address, Object);
		check(phoneNumber, String);
		check(email, String);
		check(taxID, String);

		const companyInfoExists = Settings.findOne({ _id: 'companyInfo' });
		if (companyInfoExists) {
			if (address) {
				Settings.update(
					{ _id: 'companyInfo' },
					{
						$set: {
							name: name,
							address: address,
							phoneNumber: phoneNumber,
							email: email,
							taxID: taxID,
						},
					},
				);
			} else {
				Settings.update(
					{ _id: 'companyInfo' },
					{
						$set: {
							name: name,
							address: address,
							phoneNumber: phoneNumber,
							email: email,
							taxID: taxID,
						},
					},
				);
			}
		} else {
			Settings.insert({
				_id: 'companyInfo',
				name: name,
				address: address,
				phoneNumber: phoneNumber,
				email: email,
				taxID: taxID,
				createdBy: createdBy.getUser(Meteor.userId()),
				createdAt: new Date(),
			});
		}
	},
	'company.socialMedia'(facebook, twitter, google, instagram, tiktok) {
		console.log('Successfully ran [company.socialMedia]');

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(facebook, String);
		check(twitter, String);
		check(google, String);
		check(instagram, String);
		check(tiktok, String);

		const companySocialMediaExists = Settings.findOne({ _id: 'socialMedia' });
		if (companySocialMediaExists) {
			Settings.update(
				{ _id: 'socialMedia' },
				{
					$set: {
						facebook: facebook,
						twitter: twitter,
						google: google,
						instagram: instagram,
						tiktok: tiktok,
						createdBy: createdBy.getUser(Meteor.userId()),
						createdAt: new Date(),
					},
				},
			);
		} else {
			Settings.insert({
				_id: 'socialMedia',
				facebook: facebook,
				twitter: twitter,
				google: google,
				instagram: instagram,
				tiktok: tiktok,
				createdBy: createdBy.getUser(Meteor.userId()),
				createdAt: new Date(),
			});
		}
	},
	'upload.aboutUsImageSettings'(fileObject) {
		console.log('Ran Method [upload.aboutUsImage]');

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		const aboutUsImages = Settings.findOne({ _id: 'aboutUsImages' });
		if (typeof aboutUsImages === 'undefined') {
			Settings.insert({ _id: 'aboutUsImages' });

			Settings.update(
				{ _id: 'aboutUsImages' },
				{
					$push: {
						images: {
							id: Random.id(),
							name: fileObject.name,
							type: fileObject.type,
							base64: fileObject.base64,
							createdBy: createdBy.getUser(Meteor.userId()),
							createdAt: new Date(),
						},
					},
				},
			);
		} else {
			Settings.update(
				{ _id: 'aboutUsImages' },
				{
					$push: {
						images: {
							id: Random.id(),
							name: fileObject.name,
							type: fileObject.type,
							base64: fileObject.base64,
							createdBy: createdBy.getUser(Meteor.userId()),
							createdAt: new Date(),
						},
					},
				},
			);
		}
	},
	'delete.aboutUsImage'(id) {
		console.log('Ran Method [delete.aboutUsImage]');

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);

		Settings.update(
			{ _id: 'aboutUsImages' },
			{
				$pull: {
					images: {
						id: id,
					},
				},
			},
		);
	},
});
