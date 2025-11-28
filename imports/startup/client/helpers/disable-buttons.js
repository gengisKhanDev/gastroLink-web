disableBtn = (selector, disable, defaultHTML) => {
	const spinnerHTML = `<i class="fas fa-spin fa-spinner"></i> Loading...`;

	// Caso especial: "form" => todos los submit buttons
	if (selector === "form") {
		const buttons = document.querySelectorAll("button[type='submit']");
		buttons.forEach((btn) => {
			btn.disabled = !!disable;
			btn.innerHTML = disable ? spinnerHTML : defaultHTML;
		});
		return;
	}

	// Selector CSS normal
	const buttons = document.querySelectorAll(selector);
	buttons.forEach((btn) => {
		btn.disabled = !!disable;
		btn.innerHTML = disable ? spinnerHTML : defaultHTML;
	});
};
