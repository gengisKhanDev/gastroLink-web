import "./edit-page.html";
import { Business } from "../../../../api/business/business.js";

Template.member_edit_page.onCreated(function () {
	document.title = "Gastrolink - Edit Page";
	this.autorun(() => {
		this.subscribe("business.all");
	});
});

Template.member_edit_page.onRendered(function () {
	const template = this;

	template.autorun(() => {
		// Esperar a que las suscripciones estén listas
		if (!template.subscriptionsReady()) return;

		const user = Meteor.user();
		const businessId = user?.business?.id;
		if (!businessId) return;

		const business = Business.findOne({ _id: businessId });
		const html = business?.descriptionHTML?.html || "";

		// Buscar el contenedor dentro del template
		const container = template.find("#eventEditor");
		if (!container) return;

		// Inicializar/actualizar Quill SIN jQuery
		initQuillEditor(container, html);
	});
});
