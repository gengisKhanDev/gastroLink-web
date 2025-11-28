import { Users } from '../users/users.js';
import { Business } from './business.js';
import { Random } from 'meteor/random';
import { check, Match } from 'meteor/check';

import { createdBy } from '../../startup/server/created-by.js';

Meteor.methods({
	async 'create.business'(
		id,
		businessName,
		businessAddress,
		phoneNumber,
		businessEmail,
		maxCapacity,
		description,
	) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		const businessID = Random.id();
		await Users.updateAsync(
			{ _id: id },
			{
				$set: {
					business: {
						id: businessID,
						businessName: businessName,
					},
				},
			},
		);

		return await Business.insertAsync({
			_id: businessID,
			businessName: businessName,
			businessAddress: businessAddress,
			phoneNumber: phoneNumber,
			descriptionHTML: {
				html: '',
			},
			businessEmail: businessEmail,
			maxCapacity: maxCapacity,
			description: description,
			createdBy: createdBy.getUser(Meteor.userId()),
			createdAt: new Date(),
		});
	},
	async 'business.addDescriptionHTML'(id, data) {
		console.log('Ran Method [business.addDescriptionHTML]');

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);
		check(data, String);

		await Business.updateAsync(
			{ _id: id },
			{
				$set: {
					descriptionHTML: {
						html: data,
						createdBy: createdBy.getUser(Meteor.userId()),
						createdAt: new Date(),
					},
				},
			},
		);
	},
	async 'upload.aboutUsImageBusiness'(id, fileObject) {
		console.log('Ran Method [upload.aboutUsImageBusiness]');

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		console.log(id);
		check(id, String);
		check(fileObject, Object);

		const imageID = Random.id();
		const thisBusiness = await Business.findOneAsync({ _id: id });
		await Business.updateAsync(
			{ _id: id },
			{
				$push: {
					images: {
						id: imageID,
						name: fileObject.name,
						type: fileObject.type,
						base64: fileObject.base64,
						createdBy: createdBy.getUser(Meteor.userId()),
						createdAt: new Date(),
					},
				},
			},
		);

		if (typeof thisBusiness.images === 'undefined' || thisBusiness.images.length === 0) {
			await Business.updateAsync(
				{ _id: id },
				{
					$set: {
						defaultImage: imageID,
					},
				},
			);
		}
	},
	async 'business.defaultImage'(id, imageID) {
		console.log('Ran Method [Business.defaultImage]');

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);
		check(imageID, String);

		await Business.updateAsync(
			{ _id: id },
			{
				$set: {
					defaultImage: imageID,
				},
			},
		);
	},
	async 'update.businessInfo'(
		id,
		businessName,
		businessAddress,
		phoneNumber,
		businessEmail,
		maxCapacity,
		description,
	) {
		if (!this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);
		check(businessName, String);
		check(phoneNumber, String);
		check(businessEmail, String);
		check(maxCapacity, Number);
		check(description, String);
		// businessAddress puede venir undefined/null/objeto
		check(businessAddress, Match.Maybe(Object));

		// Campos que SIEMPRE se actualizan
		const updateFields = {
			businessName,
			phoneNumber,
			businessEmail,
			maxCapacity,
			description,
		};

		// ✅ Solo pisamos businessAddress si viene "bien formada"
		const isValidBusinessAddress =
			businessAddress &&
			typeof businessAddress === 'object' &&
			typeof businessAddress.formatted_address === 'string' &&
			businessAddress.geometry &&
			typeof businessAddress.geometry.lat === 'number' &&
			typeof businessAddress.geometry.lng === 'number';

		if (isValidBusinessAddress) {
			updateFields.businessAddress = businessAddress;
		}

		return Business.updateAsync(
			{ _id: id },
			{
				$set: updateFields,
			},
		);
	},

	async 'business.deleteImage'(id, imageID) {
		console.log('Ran Method [business.deleteImage]');

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);
		check(imageID, String);

		const thisGame = await Business.findOneAsync({ _id: id });
		if (thisGame.defaultImage === imageID) {
			throw new Meteor.Error('default-image', "Can't delete default image!");
		}

		await Business.updateAsync(
			{ _id: id },
			{
				$pull: {
					images: {
						id: imageID,
					},
				},
			},
		);
	},
});
