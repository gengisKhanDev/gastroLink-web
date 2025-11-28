import "./reset-password.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

let isPasswordValid = false;

Template.reset_password.onCreated(function () {
	document.title = "  - Reset Password";
});

// función reutilizable para validar password y actualizar DOM
const validatePasswordStrength = (password) => {
	const lengthEl = document.getElementById("length");
	const letterEl = document.getElementById("letter");
	const capitalEl = document.getElementById("capital");
	const numberEl = document.getElementById("number");
	const specialEl = document.getElementById("special");

	const hasMinLength = password.length >= 8;
	const hasLower = /[a-z]/.test(password);
	const hasUpper = /[A-Z]/.test(password);
	const hasNumber = /\d/.test(password);
	const hasSpecial = /[$&+,:;=?@#|'<>.^*()%!-]/.test(password);

	// helper chico para cambiar clases
	const setValid = (el, valid) => {
		if (!el) return;
		if (valid) {
			el.classList.remove("invalid");
			el.classList.add("valid");
		} else {
			el.classList.remove("valid");
			el.classList.add("invalid");
		}
	};

	setValid(lengthEl, hasMinLength);
	setValid(letterEl, hasLower);
	setValid(capitalEl, hasUpper);
	setValid(numberEl, hasNumber);
	setValid(specialEl, hasSpecial);

	isPasswordValid = hasMinLength && hasLower && hasUpper && hasNumber && hasSpecial;
};

Template.reset_password.events({
	"click .input-group-text"(event) {
		const id = event.currentTarget.dataset.id;

		const input = document.querySelector(`#showHidePassword input[data-id="${id}"]`);
		const icon = document.querySelector(`#showHidePassword i[data-id="${id}"]`);

		if (!input || !icon) return;

		const isText = input.type === "text";

		input.type = isText ? "password" : "text";
		icon.classList.toggle("fa-eye-slash", !isText);
		icon.classList.toggle("fa-eye", isText);
	},

	"keyup input"(event) {
		const passwordInput = document.getElementById("password");
		const value = passwordInput ? passwordInput.value : "";
		validatePasswordStrength(value);
	},

	"submit #resetPassword"(event) {
		event.preventDefault();

		const password = event.target.password.value;
		const confirmPassword = event.target.confirmPassword.value;
		const formErrorElement = document.getElementById("formError");

		disableBtn(`button[type="submit"]`, true);

		// Validaciones
		if (password !== confirmPassword) {
			if (formErrorElement) {
				formErrorElement.textContent = "Passwords do not match";
			}
			disableBtn(`button[type="submit"]`, false, "Reset Password");
			return;
		}

		if (!isPasswordValid) {
			if (formErrorElement) {
				formErrorElement.textContent = "Missing password validation";
			}
			disableBtn(`button[type="submit"]`, false, "Reset Password");
			return;
		}

		if (formErrorElement) {
			formErrorElement.textContent = "";
		}

		Accounts.resetPassword(FlowRouter.getParam("token"), password, (error) => {
			if (error) {
				console.log(error);
				if (error.message === "Token expired [403]") {
					yoloAlert("error", "Token Expired");
				} else {
					yoloAlert("error");
				}
				disableBtn(`button[type="submit"]`, false, "Reset Password");
			} else {
				disableBtn(`button[type="submit"]`, false, "Reset Password");
				sourAlert(
					{
						type: "success",
						title: "Success",
					},
					function (result) {
						if (result) {
							FlowRouter.go("/my-account");
						}
					},
				);
			}
		});
	},
});
