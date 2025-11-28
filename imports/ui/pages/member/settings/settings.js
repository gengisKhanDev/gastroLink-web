import './settings.html';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import { Business } from '../../../../api/business/business.js';

Template.member_settings.onCreated(function () {
	document.title = 'Gastrolink - Settings';

	this.autorun(() => {
		checkUserRole(['Member', 'Employee']);
		this.subscribe('business.all');

		if (this.subscriptionsReady()) {
			Session.set('dialysisDays', [
				{ day: 'Sunday', enabled: false, startTime: null, endTime: null },
				{ day: 'Monday', enabled: false, startTime: null, endTime: null },
				{ day: 'Tuesday', enabled: false, startTime: null, endTime: null },
				{ day: 'Wednesday', enabled: false, startTime: null, endTime: null },
				{ day: 'Thursday', enabled: false, startTime: null, endTime: null },
				{ day: 'Friday', enabled: false, startTime: null, endTime: null },
				{ day: 'Saturday', enabled: false, startTime: null, endTime: null },
			]);
		}
	});
});

Template.member_settings.onRendered(function () {
	initPlacesAutocomplete('address', (result) => {
		if (result) {
			Session.set('address', Session.get('placesAutocomplete'));
		}
	});

	const textArea = document.getElementById('description');
	const charCount = document.getElementById('charCount');

	if (!textArea || !charCount) return;

	textArea.addEventListener('input', () => {
		let value = textArea.value;

		if (value.length > 120) {
			value = value.slice(0, 120);
			textArea.value = value;
		}

		charCount.textContent = String(value.length);
	});
});

Template.member_settings.helpers({
	dialysisDays() {
		return Session.get('dialysisDays');
	},
	aboutUsImages() {
		const user = Meteor.user();
		const businessId = user?.business?.id;
		if (!businessId) return null;

		return Business.findOne({ _id: businessId });
	},
});

Template.member_settings.events({
	'change .dialysis-day'(event) {
		const indexAttr = event.currentTarget.dataset.index;
		if (indexAttr === undefined) return;

		const index = Number(indexAttr);
		const days = Session.get('dialysisDays') || [];

		if (!Number.isNaN(index) && days[index]) {
			// clonamos para no mutar directamente
			const updated = [...days];
			updated[index] = {
				...updated[index],
				enabled: !updated[index].enabled,
			};
			Session.set('dialysisDays', updated);
		}
	},

	'change #aboutUsImage'(event) {
		const businessId = Meteor.user().business.id;
		console.log(businessId);

		uploadImage({ text: 'Drag and Drop Image' }, event, (fileObject) => {
			Meteor.call(
				'upload.aboutUsImageBusiness',
				businessId,
				fileObject,
				(error) => {
					if (error) {
						console.log(error);
						yoloAlert('error');
					} else {
						yoloAlert('success', 'Uploaded Image!');
					}
				},
			);
		});
	},

	'click .image-set-default'(event) {
		sourAlert(
			{
				type: 'question',
				title: 'Set image as default?',
				okButtonText: 'Yes',
			},
			(result) => {
				if (result) {
					const id = event.currentTarget.dataset.id;
					if (!id) return;

					Meteor.call(
						'business.defaultImage',
						Meteor.user().business.id,
						id,
						(error) => {
							if (error) {
								console.log(error);
								yoloAlert('error');
							} else {
								yoloAlert('success', 'Set Default Image!');
							}
						},
					);
				}
			},
		);
	},

	'submit #updateBusinessInfo'(event, template) {
		event.preventDefault();

		const businessName = event.target.name.value;
		const phoneNumber = event.target.phoneNumber.value;
		const businessEmail = event.target.email.value;
		const maxCapacity = parseInt(event.target.maxCapacity.value, 10);
		const description = event.target.description.value;

		const businessId = Meteor.user().business.id;
		const currentBusiness = Business.findOne({ _id: businessId });

		const sessionAddress = Session.get('address');
		const businessAddress = sessionAddress || currentBusiness?.businessAddress || null;

		Meteor.call(
			'update.businessInfo',
			businessId,
			businessName,
			businessAddress,
			phoneNumber,
			businessEmail,
			maxCapacity,
			description,
			(error) => {
				if (error) {
					console.log(error);
					disableBtn('#editUserBtn', false, `<i class="fas fa-plus-square"></i> Edit`);
					yoloAlert('error');
				} else {
					disableBtn('#editUserBtn', false, `<i class="fas fa-plus-square"></i> Edit`);
					yoloAlert('success', 'Updated!');
				}
			},
		);
	},

	'click .delete-image'(event) {
		sourAlert(
			{
				type: 'question',
				title: 'Delete Item?',
				okButtonText: 'Yes, Delete Image',
			},
			(result) => {
				if (result) {
					const id = event.currentTarget.dataset.id;
					if (!id) return;

					Meteor.call(
						'business.deleteImage',
						Meteor.user().business.id,
						id,
						(error) => {
							if (error) {
								console.log(error);
								if (error.error) {
									yoloAlert('error', error.reason);
								} else {
									yoloAlert('error');
								}
							} else {
								yoloAlert('success', 'Deleted Image!');
								getImagesGames(FlowRouter.getParam('id'), 'deleted');
							}
						},
					);
				}
			},
		);
	},
});
