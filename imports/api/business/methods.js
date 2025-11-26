// import { Users } from "../../api/users/users.js";
import { Users } from '../users/users.js';
import { Business } from './business.js';
import { Random } from 'meteor/random';
import { check } from 'meteor/check';

const createdBy = require('../../startup/server/created-by.js');

Meteor.methods({
	'create.business'(
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
		console.log(Meteor.userId());
		Users.update(
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

		return Business.insert({
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
	'business.addDescriptionHTML'(id, data) {
		console.log('Ran Method [business.addDescriptionHTML]');

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);
		check(data, String);

		Business.update(
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
		Business.update(
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
			Business.update(
				{ _id: id },
				{
					$set: {
						defaultImage: imageID,
					},
				},
			);
		}
	},
	'business.defaultImage'(id, imageID) {
		console.log('Ran Method [Business.defaultImage]');

		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);
		check(imageID, String);

		Business.update(
			{ _id: id },
			{
				$set: {
					defaultImage: imageID,
				},
			},
		);
	},
	'update.businessInfo'(
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

		check(maxCapacity, Number);

		return Business.update(
			{ _id: id },
			{
				$set: {
					businessName: businessName,
					businessAddress: businessAddress,
					phoneNumber: phoneNumber,
					businessEmail: businessEmail,
					maxCapacity: maxCapacity,
					description: description,
				},
			},
		);
	},
	async 'business.deleteImage'(id, imageID) {
		console.log('Ran Method [business.deleteImage]');

		console.log(id);
		console.log(imageID);
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		check(id, String);
		check(imageID, String);

		const thisGame = await Business.findOneAsync({ _id: id });
		if (thisGame.defaultImage === imageID) {
			throw new Meteor.Error('default-image', "Can't delete default image!");
		}

		Business.update(
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
