import './enroll.html';

var isPasswordValid = false;

Template.enroll.onCreated(function () {
	document.title = 'Gastrolink - Enroll';
});

Template.enroll.events({
	'click .input-group-text'(event) {
		const id = $(event.currentTarget).data('id');

		if ($(`#showHidePassword input[data-id="${id}"]`).attr('type') == 'text') {
			$(`#showHidePassword input[data-id="${id}"]`).attr('type', 'password');
			$(`#showHidePassword i[data-id="${id}"]`).addClass('fa-eye-slash');
			$(`#showHidePassword i[data-id="${id}"]`).removeClass('fa-eye');
		} else if ($(`#showHidePassword input[data-id="${id}"]`).attr('type') == 'password') {
			$(`#showHidePassword input[data-id="${id}"]`).attr('type', 'text');
			$(`#showHidePassword i[data-id="${id}"]`).removeClass('fa-eye-slash');
			$(`#showHidePassword i[data-id="${id}"]`).addClass('fa-eye');
		}
	},
	'keyup input'(event) {
		const input = $('#password').val();

		if (input.length < 8) {
			isPasswordValid = false;
			$('#length').removeClass('valid').addClass('invalid');
		} else {
			isPasswordValid = true;
			$('#length').removeClass('invalid').addClass('valid');
		}

		if (input.match(/[a-z]/)) {
			isPasswordValid = true;
			$('#letter').removeClass('invalid').addClass('valid');
		} else {
			isPasswordValid = false;
			$('#letter').removeClass('valid').addClass('invalid');
		}

		if (input.match(/[A-Z]/)) {
			isPasswordValid = false;
			$('#capital').removeClass('invalid').addClass('valid');
		} else {
			isPasswordValid = true;
			$('#capital').removeClass('valid').addClass('invalid');
		}

		if (input.match(/\d/)) {
			isPasswordValid = true;
			$('#number').removeClass('invalid').addClass('valid');
		} else {
			isPasswordValid = false;
			$('#number').removeClass('valid').addClass('invalid');
		}

		if (input.match(/[$&+,:;=?@#|'<>.^*()%!-]/)) {
			isPasswordValid = true;
			$('#special').removeClass('invalid').addClass('valid');
		} else {
			isPasswordValid = false;
			$('#special').removeClass('valid').addClass('invalid');
		}
	},
	'submit #setPassword'(event) {
		event.preventDefault();

		disableBtn(`button[type="submit"]`, true);

		const password = event.target.password.value;
		const confirmPassword = event.target.confirmPassword.value;

		//Validations
		if (password !== confirmPassword) {
			disableBtn(`button[type="submit"]`, false, 'Set Password');
			yoloAlert('error', 'Passwords do not match');
		} else if (!isPasswordValid) {
			disableBtn(`button[type="submit"]`, false, 'Set Password');
			yoloAlert('error', 'Missing password validation');
		} else {
			Accounts.resetPassword(FlowRouter.getParam('token'), password, (error) => {
				if (error) {
					console.log(error);
					disableBtn(`button[type="submit"]`, false, 'Set Password');
					if (error.message === 'Token expired [403]') {
						yoloAlert('error', 'Token Expired');
					} else {
						yoloAlert('error');
					}
				} else {
					disableBtn(`button[type="submit"]`, false, 'Set Password');

					sourAlert(
						{
							type: 'success',
							title: 'Success',
							autoClose: true,
						},
						function (result) {
							if (result) {
								if (Meteor.user().profile.role.name === 'User') {
									FlowRouter.go('/user/my-account');
									setTimeout(() => {
										location.reload();
									}, 1000);
								} else if (Meteor.user().profile.role.name === 'Admin') {
									FlowRouter.go('/admin/my-account');
									setTimeout(() => {
										location.reload();
									}, 1000);
								} else if (Meteor.user().profile.role.name === 'Member') {
									FlowRouter.go('/member/settings');
									setTimeout(() => {
										location.reload();
									}, 1000);
								} else {
									FlowRouter.go('/member/settings');
									setTimeout(() => {
										location.reload();
									}, 1000);
								}
							}
						},
					);
				}
			});
		}
	},
});
