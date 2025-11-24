import './home.html';
import { Business } from '../../../../api/business/business.js';

Session.set('isSubscriptionsReady', false);

Template.public_home.onCreated(function () {
	document.title = 'Gastrolink - Home';
	this.autorun(() => {
		this.subscribe('get.business.public');
	});
});

Template.public_home.onRendered(function () {});

Template.public_home.helpers({
	business() {
		const businesses = Business.find({}).fetch();
		// console.log(Business.find({}).fetch())
		return businesses.map((business) => {
			if (business.defaultImage) {
				const defaultImage = business.images.find((img) => img.id === business.defaultImage);
				business.defaultImageSrc = defaultImage ? defaultImage.base64 : '';
			} else {
				business.defaultImageSrc = ''; // o puedes asignar directamente tu imagen por defecto aquí
			}
			return business;
		});
	},
	starsHtml(business) {
		let stars = Math.round(business.averageStars * 2) / 2; // Redondea al 0.5 más cercano
		let starsOutput = '';

		for (let i = 1; i <= 5; i++) {
			if (i <= stars) {
				// Estrella completa
				starsOutput += '<span class="full-star">★</span>';
			} else if (i - 0.5 === stars) {
				// Media estrella
				starsOutput += '<span class="half-star">★</span>';
			} else {
				// Estrella vacía
				starsOutput += '<span class="empty-star">☆</span>';
			}
		}
		return Spacebars.SafeString(starsOutput);
	},
});

Template.public_home.events({
	'click .botontest'() {
		console.log(Meteor.absoluteUrl());
	},
});
