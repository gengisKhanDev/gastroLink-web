import './system-settings.html';

import { Settings } from '../../../../api/settings/settings';

Template.admin_system_settings.onCreated(function () {
	const instance = this;

	document.title = 'Gastrolink - System Settings';

	// Autorun ligado a la instancia del template
	instance.autorun(() => {
		checkUserRole(['Super Admin', 'Admin', 'Employee']);

		// La suscripción también queda ligada a la vida del template
		instance.subscribe('settings.all');

		// Si quieres seguir usando Session:
		if (this.subscriptionsReady()) {
			Session.set('waiver', Settings.findOne({ _id: 'waiver' }));
		}
	});
});

Template.admin_system_settings.onRendered(function () {
	initPlacesAutocomplete('address', function (result) {
		if (result) {
			Session.set('address', Session.get('placesAutocomplete'));
		}
	});
	initFormatName();
	formatPhoneInput();
});

Template.admin_system_settings.helpers({
	settings(id, selector, selector2) {
		const settings = Settings.findOne({ _id: id });
		if (typeof settings != 'undefined') {
			switch (id) {
				case 'socialMedia': {
					return settings[selector];
				}
				case 'companyInfo': {
					if (selector === 'address') {
						return settings.address.formatted_address;
					}
					if (selector === 'logo') {
						return settings[selector][selector2];
					} else {
						return settings[selector];
					}
					break;
				}
				case 'openingClosingTimes': {
					return settings['times'][selector][selector2];
				}
			}
		}
	},
	aboutUsImages() {
		return Settings.findOne({ _id: 'aboutUsImages' })?.images;
	},
	waiver() {
		return Settings.findOne({ _id: 'waiver' });
	},
});

Template.admin_system_settings.events({
	'submit #companyInfo'(event) {
		event.preventDefault();

		const name = event.target.name.value;
		const address = Session.get('address');
		const phoneNumber = event.target.phoneNumber.value;
		const email = event.target.email.value;
		const taxID = event.target.taxID.value;

		disableBtn('#companyInfo[type="submit"]', true);

		Meteor.call('company.info', name, address, phoneNumber, email, taxID, function (error, result) {
			if (error) {
				console.log(error);
				yoloAlert('error');
				disableBtn('#companyInfo[type="submit"]', false, `<i class="fas fa-edit"></i> Update`);
			} else {
				setTimeout(function () {
					yoloAlert('success', 'Updated Company Info!');
					disableBtn('#companyInfo[type="submit"]', false, `<i class="fas fa-edit"></i> Update`);
				}, 750);
			}
		});
	},
	'submit #socialMedia'(event) {
		event.preventDefault();

		const facebook = event.target.facebook.value;
		const twitter = event.target.twitter.value;
		const google = event.target.google.value;
		const instagram = event.target.instagram.value;
		const tiktok = event.target.tiktok.value;

		disableBtn('#socialMedia[type="submit"]', true);

		Meteor.call(
			'company.socialMedia',
			facebook,
			twitter,
			google,
			instagram,
			tiktok,
			function (error, result) {
				if (error) {
					console.log(error);
					yoloAlert('error');
					disableBtn('#socialMedia[type="submit"]', false, `<i class="fas fa-edit"></i> Update`);
				} else {
					setTimeout(function () {
						yoloAlert('success', 'Updated Social Media!');
						disableBtn('#socialMedia[type="submit"]', false, `<i class="fas fa-edit"></i> Update`);
					}, 750);
				}
			},
		);
	},
	'change #aboutUsImage'(event) {
		uploadImage({ text: 'Drag and Drop Image' }, event, function (fileObject) {
			Meteor.call('upload.aboutUsImageSettings', fileObject, function (error, result) {
				if (error) {
					console.log(error);
					yoloAlert('error');
				} else {
					yoloAlert('success', 'Uploaded Image!');
				}
			});
		});
	},
	'click .delete-about-us-image'(event) {
		console.log(event.target);
		const id = $(event.target).attr('data-id');

		sourAlert(
			{
				type: 'question',
				title: 'Delete About Us Image?',
			},
			function (result) {
				if (result) {
					Meteor.call('delete.aboutUsImage', id, function (error, result) {
						if (error) {
							console.log(error);
							yoloAlert('error');
						} else {
							yoloAlert('success', 'Deleted Image!');
						}
					});
				}
			},
		);
	},
	'submit #waiver'(event) {
		event.preventDefault();

		const waiverText = event.target.waiverText.value;

		sourAlert(
			{
				type: 'question',
				title: 'Save Waiver?',
			},
			function (result) {
				if (result) {
					Meteor.call('save.waiver', waiverText, function (error, result) {
						if (error) {
							console.log(error);
							yoloAlert('error');
						} else {
							yoloAlert('success', 'Saved Waiver!');
						}
					});
				}
			},
		);
	},
	'submit #openingClosingTimes'(event) {
		event.preventDefault();

		const openingTimeMondayToThursday = event.target.openingTimeMondayToThursday.value;
		const closingTimeMondayToThursday = event.target.closingTimeMondayToThursday.value;

		const openingTimeFridaySaturday = event.target.openingTimeFridaySaturday.value;
		const closingTimeFridaySaturday = event.target.closingTimeFridaySaturday.value;

		const openingTimeSunday = event.target.openingTimeSunday.value;
		const closingTimeSunday = event.target.closingTimeSunday.value;

		disableBtn('#openingClosingTimes[type="submit"]', true);

		Meteor.call(
			'openingClosingTimes',
			openingTimeMondayToThursday,
			closingTimeMondayToThursday,
			openingTimeFridaySaturday,
			closingTimeFridaySaturday,
			openingTimeSunday,
			closingTimeSunday,
			function (error, result) {
				if (error) {
					console.log(error);
					yoloAlert('error');
					disableBtn(
						'#openingClosingTimes[type="submit"]',
						false,
						`<i class="fas fa-edit"></i> Update`,
					);
				} else {
					setTimeout(function () {
						yoloAlert('success', 'Updated Company Info!');
						disableBtn(
							'#openingClosingTimes[type="submit"]',
							false,
							`<i class="fas fa-edit"></i> Update`,
						);
					}, 750);
				}
			},
		);
	},
});
