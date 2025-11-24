if (Meteor.isServer) {
	// Mantengo require aquí para no mezclar import/module.exports
	const dayjs = require("dayjs");

	const methods = {};

	methods.formatDate = function (date, showHours) {
		if (!date) return "--/--";

		const d = dayjs(date);

		// Conservamos tu lógica: si showHours => fecha + hora, si no => solo fecha
		if (showHours) {
			return d.format("MM/DD/YYYY hh:mm:ss a");
		} else {
			return d.format("MM/DD/YYYY");
		}
	};

	module.exports = methods;
}
