import { Template } from 'meteor/templating';

Template.registerHelper('$eq', (a, b) => a === b);
Template.registerHelper('$neq', (a, b) => a !== b);

Template.registerHelper('$lt', (a, b) => a < b);
Template.registerHelper('$lte', (a, b) => a <= b);
Template.registerHelper('$gt', (a, b) => a > b);
Template.registerHelper('$gte', (a, b) => a >= b);

Template.registerHelper('$and', (...args) => {
	// Spacebars mete un objeto "hash" al final, lo ignoramos
	args.pop();
	return args.every(Boolean);
});

Template.registerHelper('$or', (...args) => {
	args.pop();
	return args.some(Boolean);
});

Template.registerHelper('$not', (val) => !val);

Template.registerHelper('$exists', (val) => val !== undefined && val !== null);
Template.registerHelper('$mapped', function (arr, extended) {
	const useExtended = !!extended;

	// Aceptar tanto array como cursor
	if (!Array.isArray(arr)) {
		try {
			if (arr && typeof arr.fetch === 'function') {
				arr = arr.fetch();
			} else {
				console.warn('$mapped: expected array or cursor');
				return [];
			}
		} catch (e) {
			console.error('Error in $mapped helper:', e);
			return [];
		}
	}

	const length = arr.length;

	return arr.map((item, index) => {
		const newItem = { ...item };

		newItem.$length = length;
		newItem.$index = index;
		newItem.$first = index === 0;
		newItem.$last = index === length - 1;

		if (useExtended) {
			newItem.$nextEl = arr[index + 1];
			newItem.$prevEl = arr[index - 1];
			newItem.$firstEl = arr[0];
			newItem.$lastEl = arr[length - 1];
		}

		return newItem;
	});
});
