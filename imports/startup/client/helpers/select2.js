import TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.bootstrap5.css";

initSelect2 = () => {
	// Meteor.defer = "haz esto después de que Blaze haya pintado el DOM"
	Meteor.defer(() => {
		const selects = document.querySelectorAll("select.select2");

		selects.forEach((el) => {
			// Evitar doble inicialización si el template se vuelve a renderizar
			if (el.tomselect) return;

			const isMultiple = el.hasAttribute("multiple");
			const placeholder =
				el.getAttribute("data-placeholder") || "Select an option";

			const baseOptions = {
				placeholder,
				allowEmptyOption: true,
				// Si es multiple, añadimos plugin de "x" en los tags
				plugins: isMultiple ? ["remove_button"] : [],
			};

			// eslint-disable-next-line no-new
			new TomSelect(el, baseOptions);
		});
	});
};
