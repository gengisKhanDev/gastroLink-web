import "./enroll.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

let isPasswordValid = false;

Template.enroll.onCreated(function () {
	document.title = " - Enroll";
});

Template.enroll.events({
	"click .input-group-text"(event) {
		const id = event.currentTarget.dataset.id;

		const input = document.querySelector(
			`#showHidePassword input[data-id="${id}"]`,
		);
		const icon = document.querySelector(
			`#showHidePassword i[data-id="${id}"]`,
		);

		if (!input || !icon) return;

		if (input.type === "text") {
			input.type = "password";
			icon.classList.add("fa-eye-slash");
			icon.classList.remove("fa-eye");
		} else if (input.type === "password") {
			input.type = "text";
			icon.classList.remove("fa-eye-slash");
			icon.classList.add("fa-eye");
		}
	},

	"keyup input"(event) {
		const input = document.getElementById("password");
		if (!input) return;

		const value = input.value;

		const lengthEl = document.getElementById("length");
		const letterEl = document.getElementById("letter");
		const capitalEl = document.getElementById("capital");
		const numberEl = document.getElementById("number");
		const specialEl = document.getElementById("special");

		const setValid = (el, valid) => {
			if (!el) return;
			el.classList.toggle("valid", valid);
			el.classList.toggle("invalid", !valid);
		};

		// Longitud
		setValid(lengthEl, value.length >= 8);

		// Minúscula
		setValid(letterEl, /[a-z]/.test(value));

		// Mayúscula
		setValid(capitalEl, /[A-Z]/.test(value));

		// Número
		setValid(numberEl, /\d/.test(value));

		// Caracter especial
		setValid(specialEl, /[$&+,:;=?@#|'<>.^*()%!-]/.test(value));

		// isPasswordValid global
		isPasswordValid =
			value.length >= 8 &&
			/[a-z]/.test(value) &&
			/[A-Z]/.test(value) &&
			/\d/.test(value) &&
			/[$&+,:;=?@#|'<>.^*()%!-]/.test(value);
	},

	"submit #setPassword"(event) {
		event.preventDefault();

		disableBtn(`button[type="submit"]`, true);

		const password = event.target.password.value;
		const confirmPassword = event.target.confirmPassword.value;

		if (password !== confirmPassword) {
			disableBtn(`button[type="submit"]`, false, "Set Password");
			yoloAlert("error", "Passwords do not match");
			return;
		}

		if (!isPasswordValid) {
			disableBtn(`button[type="submit"]`, false, "Set Password");
			yoloAlert("error", "Missing password validation");
			return;
		}

		Accounts.resetPassword(FlowRouter.getParam("token"), password, (error) => {
			if (error) {
				console.log(error);
				disableBtn(`button[type="submit"]`, false, "Set Password");
				if (error.message === "Token expired [403]") {
					yoloAlert("error", "Token Expired");
				} else {
					yoloAlert("error");
				}
			} else {
				disableBtn(`button[type="submit"]`, false, "Set Password");

				sourAlert(
					{
						type: "success",
						title: "Success",
						autoClose: true,
					},
					function (result) {
						if (result) {
							FlowRouter.go("/my-account");
							// Sin reload ni timeout, Meteor se encarga del estado reactivo
						}
					},
				);
			}
		});
	},
});
