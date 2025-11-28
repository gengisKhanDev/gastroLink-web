import { Template } from "meteor/templating";

// Helper global para usar en plantillas: {{formatName name}}
Template.registerHelper("formatName", function (name) {
	if (!name) return "";
	const lower = String(name).toLowerCase();
	return lower.charAt(0).toUpperCase() + lower.slice(1);
});

// Función global para usar en JS: formatName("rAmSes")
formatName = (name) => {
	if (!name) return "";
	const lower = String(name).toLowerCase();
	return lower.charAt(0).toUpperCase() + lower.slice(1);
};

// Escuchamos cambios en cualquier input con class="format-name".
const attachFormatNameListener = () => {
	if (attachFormatNameListener._initialized) return;
	attachFormatNameListener._initialized = true;

	document.addEventListener("input", (event) => {
		const target = event.target;
		if (!(target instanceof HTMLInputElement)) return;
		if (!target.classList.contains("format-name")) return;

		const value = target.value;
		if (!value) return;

		target.value = value.charAt(0).toUpperCase() + value.slice(1);
	});
};

// Mantengo la firma para no romper llamadas existentes.
initFormatName = () => {
	attachFormatNameListener();
};
