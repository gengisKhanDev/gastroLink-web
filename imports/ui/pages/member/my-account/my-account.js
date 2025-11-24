import './my-account.html';

Template.member_my_account.onCreated(function () {
	document.title = 'Gastrolink - My Account';
	this.autorun(() => {
		checkUserRole(['Member', 'Employee']);
		Session.set('member', Meteor.user());
	});
});

Template.member_my_account.onRendered(function () {});

Template.member_my_account.helpers({
	business() {
		console.log(Business.find({}));
		return Business.find({});
	},
	user() {
		return Session.get('member');
	},
});

Template.member_my_account.events({
	'submit #addUser'(event) {
		event.preventDefault();

		disableBtn('#addUserBtn', true);

		const firstName = event.target.firstName.value;
		const lastName = event.target.lastName.value;
		const email = event.target.email.value;

		Meteor.call('member.invite.user', firstName, lastName, email, function (error, result) {
			if (error) {
				console.log(error);
				yoloAlert('error', error.reason.message);
				disableBtn('#', false, 'Invite');
			} else {
				setTimeout(function () {
					document.getElementById('addUser').reset();
					disableBtn('#addUserBtn', false, 'Invite');
					yoloAlert('success', 'User Created!');
				}, 750);
			}
		});
	},
});
