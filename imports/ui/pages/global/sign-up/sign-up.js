import './sign-up.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.global_sign_up.onCreated(function () {
	document.title = 'Gastrolink  - Sign Up';
});

Template.global_sign_up.onRendered(function () {
	initFormatName();
	initFlatpickr({
		selector: '#dob',
		maxDate: 'today',
	});
});

Template.global_sign_up.events({
	'submit #addUser'(event, template) {
		event.preventDefault();

		const form = event.target;
		const firstName = form.firstName.value;
		const lastName = form.lastName.value;
		const dob = new Date(form.dob.value);
		const email = form.email.value;

		disableBtn('#addUserBtn', true);

		Meteor.call('public.invite.user', firstName, lastName, dob, email, (error, result) => {
			if (error) {
				console.log(error);
				if (error.error) {
					// Asumiendo que `error.reason` puede ser objeto o string
					const message =
						typeof error.reason === 'object' && error.reason?.message
							? error.reason.message
							: error.reason || 'There was an error';
					yoloAlert('error', message);
				} else {
					yoloAlert('error');
				}
				disableBtn('#addUserBtn', false, "<i class='fas fa-plus-square'></i> Add");
			} else {
				form.reset();
				disableBtn('#addUserBtn', false, "<i class='fas fa-plus-square'></i> Add");
				yoloAlert('success', 'Please check your email!');

				const enrollSection = document.getElementById('showEnroll');
				if (enrollSection) {
					enrollSection.style.display = 'block';
				}
			}
		});
	},

	'submit #enrollhrf'(event) {
		event.preventDefault();
		const text = event.target.text.value;
		if (text) {
			window.location.href = text;
		}
	},
});
