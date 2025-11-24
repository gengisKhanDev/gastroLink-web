import './login.html';
const os = require('os');

Template.global_login.onCreated(function () {
	document.title = 'Gastrolink - Login';
});

Template.global_login.events({
	'click .input-group-text'() {
		if ($(`#showHidePassword #password`).attr('type') == 'text') {
			$(`#showHidePassword #password`).attr('type', 'password');
			$(`#showHidePassword .far`).addClass('fa-eye-slash');
			$(`#showHidePassword .far`).removeClass('fa-eye');
		} else if ($(`#showHidePassword #password`).attr('type') == 'password') {
			$(`#showHidePassword #password`).attr('type', 'text');
			$(`#showHidePassword .far`).removeClass('fa-eye-slash');
			$(`#showHidePassword .far`).addClass('fa-eye');
		}
	},
	'submit #login'(event) {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;

		disableBtn('form', true);

		Meteor.call('check.userRole', email, function (error, result) {
			if (error) {
				console.log(error);
				disableBtn('button[type="submit"]', false, 'Login');
				if (error.error) {
					yoloAlert('error', error.reason);
				} else {
					yoloAlert('error');
				}
			} else {
				Meteor.loginWithPassword(email, password, (error) => {
					if (error) {
						console.log(error);
						disableBtn('form', false, `Login`);
						yoloAlert('error', error.reason);
						$('#loginErrorDiv').fadeIn(750);
						$('#loginError').html(error.reason);
					} else {
						const ip = getLocalIP();
						console.log(ip + ':3000');
						disableBtn('form', false, `Login`);
						$('#loginErrorDiv').hide();
						console.log(result);
						window.location.href = ip + result;
					}
				});
			}
		});
	},
	'submit #enrollhrf'(event) {
		event.preventDefault();

		const text = event.target.text.value;
		window.location.href = text;
	},
});
function getLocalIP() {
	const ifaces = os.networkInterfaces();
	let localIp = '';

	Object.keys(ifaces).forEach((ifname) => {
		ifaces[ifname].forEach((iface) => {
			if ('IPv4' !== iface.family || iface.internal !== false) {
				return;
			}
			localIp = iface.address;
		});
	});

	return localIp;
}
