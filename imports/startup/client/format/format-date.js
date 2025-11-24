import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";

// Soporta tokens tipo "Do" (1st, 2nd, 3rd...) y "LT"
dayjs.extend(advancedFormat);      // para 'Do', etc. :contentReference[oaicite:1]{index=1}
dayjs.extend(localizedFormat);     // para 'LT', 'LL', etc. :contentReference[oaicite:2]{index=2}

const FALLBACK = "--/--";

// === Helpers globales para Blaze ===
Template.registerHelper("formatDate", function (date, showHours, friendly) {
	if (!date) return FALLBACK;

	const d = dayjs(date);

	// Conservamos tu lógica original tal cual:
	// - si showHours está definido => solo fecha
	if (showHours !== undefined) {
		return d.format("MM/DD/YYYY");
	}

	// - si friendly NO está definido => fecha + hora completa
	if (friendly === undefined) {
		return d.format("MM/DD/YYYY hh:mm:ss a");
	}

	// - si friendly está definido => formato "amistoso"
	return d.format("MMMM Do YYYY, h:mm a");
});

Template.registerHelper("formatDateEvent", function (date, showHours, friendly) {
	if (!date) return FALLBACK;

	const d = dayjs(date);
	// Tu código realmente ignoraba showHours/friendly y siempre hacía esto
	return d.format("ddd M.D.YY");
});

Template.registerHelper("formatDateView", function (date, showHours, friendly) {
	if (!date) return FALLBACK;

	const d = dayjs(date);
	return d.format("dddd, MMMM D, YYYY");
});

Template.registerHelper("formatHourDate", function (date, showHours, friendly) {
	if (!date) return FALLBACK;

	const d = dayjs(date);
	return d.format("LT");
});

// === Funciones globales JS que ya usas en otros lados ===
// OJO: aquí **no toco la firma** para no romper nada.
// Si en algún sitio haces formatDate(date, true), el segundo argumento se ignora igual que antes.

formatHourDate = (date) => {
	if (!date) return FALLBACK;
	return dayjs(date).format("LT");
};

formatDate = (date) => {
	if (!date) return FALLBACK;
	return dayjs(date).format("MM/DD/YYYY hh:mm:ss a");
};

formatDateEvent = (date) => {
	if (!date) return FALLBACK;
	return dayjs(date).format("ddd M.D.YY");
};

formatDateView = (date) => {
	if (!date) return FALLBACK;
	return dayjs(date).format("dddd, MMMM D, YYYY");
};
