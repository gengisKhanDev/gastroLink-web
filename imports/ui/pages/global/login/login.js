// imports/ui/pages/global/login/login.js (ajusta el path real)
import "./login.html";

Template.global_login.onCreated(function () {
	document.title = "Gastrolink - Login";
});

Template.global_login.events({
	"click .input-group-text"() {
		const input = document.querySelector("#showHidePassword #password");
		const icon = document.querySelector("#showHidePassword .far");
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

	"submit #login"(event) {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;

		disableBtn("form", true);

		// 1) Primero vemos a qué ruta debe ir este usuario según su rol
		Meteor.call("check.userRole", email, (error, routePath) => {
			if (error) {
				console.log(error);
				disableBtn('button[type="submit"]', false, "Login");
				if (error.error) {
					yoloAlert("error", error.reason);
				} else {
					yoloAlert("error");
				}
				return;
			}

			// 2) Luego hacemos el login
			Meteor.loginWithPassword(email, password, (loginError) => {
				const loginErrorDiv = document.getElementById("loginErrorDiv");
				const loginErrorEl = document.getElementById("loginError");

				if (loginError) {
					console.log(loginError);
					disableBtn("form", false, "Login");
					yoloAlert("error", loginError.reason);

					if (loginErrorDiv && loginErrorEl) {
						loginErrorDiv.style.display = "block";
						loginErrorEl.textContent = loginError.reason;
					}
				} else {
					disableBtn("form", false, "Login");

					if (loginErrorDiv) {
						loginErrorDiv.style.display = "none";
					}

					// 3) Redirección sin `os`:
					//    - Si check.userRole devuelve "/admin/my-account",
					//      usamos Meteor.absoluteUrl y recortamos el primer "/"
					let path = routePath || "my-account"; // fallback simple
					if (path.startsWith("/")) {
						path = path.slice(1);
					}

					const targetUrl = Meteor.absoluteUrl(path); // incluye host + puerto según ROOT_URL :contentReference[oaicite:2]{index=2}
					window.location.href = targetUrl;
				}
			});
		});
	},

	"submit #enrollhrf"(event) {
		event.preventDefault();
		const text = event.target.text.value;
		window.location.href = text;
	},
});
