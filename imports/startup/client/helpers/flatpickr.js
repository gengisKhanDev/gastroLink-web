import flatpickr from "flatpickr";

initFlatpickr = (obj = {}) => {
	const selector = obj.selector || 'input[type="date"]';
	const defaultDate = obj.defaultDate || "today";
	const dateFormat = obj.dateFormat || "Z";

	const elements = document.querySelectorAll(selector);
	elements.forEach((el) => {
		flatpickr(el, {
			altInput: true,
			altFormat: "F j, Y",
			inline: obj.inline,
			animate: obj.animate,
			minDate: obj.minDate,
			maxDate: obj.maxDate,
			defaultDate,
			enableTime: obj.enableTime,
			dateFormat,
		});
	});
};

// Variante que deshabilita fechas
disableFlatpickrDates = (obj = {}) => {
	const selector = obj.selector || 'input[type="date"]';
	const elements = document.querySelectorAll(selector);

	elements.forEach((el) => {
		flatpickr(el, {
			altInput: true,
			altFormat: "F j, Y",
			inline: obj.inline,
			minDate: obj.minDate,
			dateFormat: "m-d-Y",
			disable: obj.disable || "",
		});
	});
};
