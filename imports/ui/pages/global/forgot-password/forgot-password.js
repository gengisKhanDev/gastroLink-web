import './forgot-password.html';

Template.forgot_password.onCreated(function () {
	document.title = 'Gastrolink - Forgot Password';
});

Template.forgot_password.events({
	'submit #forgotPassword'(event) {
		event.preventDefault();

		const email = event.target.email.value;

		disableBtn(`button[type="submit"]`, true);

		Accounts.forgotPassword({ email: email }, function (error) {
			if (error) {
				console.log(error);
				disableBtn(`button[type="submit"]`, false, 'Submit');

				if (error.message === 'User not found [403]') {
					yoloAlert('error', 'User not found');
				} else {
					console.log(error);
					yoloAlert('error');
				}
			} else {
				yoloAlert('success', 'Email Sent');
				disableBtn(`button[type="submit"]`, false, 'Email Sent');
				FlowRouter.go('/login');
			}
		});
	},
});
