Session.set("placesAutocomplete", {});

initPlacesAutocomplete = (selector, callback) => {
	const setupAutocomplete = () => {
		setTimeout(() => {
			const input = document.getElementById(selector);

			// Si no hay input o aún no está Google, salimos
			if (
				!input ||
				typeof window.google === "undefined" ||
				!google.maps ||
				!google.maps.places
			) {
				if (typeof callback === "function") {
					callback(false);
				}
				return;
			}

			const autocomplete = new google.maps.places.Autocomplete(input);

			autocomplete.addListener("place_changed", () => {
				const place = autocomplete.getPlace();

				if (!place || !place.geometry || !place.geometry.location) {
					if (typeof callback === "function") {
						callback(false);
					}
					return;
				}

				const latlng = {
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng(),
				};

				const placeObj = {
					address_components: place.address_components,
					formatted_address: place.formatted_address,
					geometry: latlng,
					icon: place.icon,
					id: place.id,
					name: place.name,
					place_id: place.place_id,
					plus_code: place.plus_code,
					reference: place.reference,
					scope: place.scope,
					types: place.types,
					url: place.url,
					vicinity: place.vicinity,
				};

				Session.set("placesAutocomplete", placeObj);

				if (typeof callback === "function") {
					callback(true);
				}
			});
		}, 750);
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", setupAutocomplete);
	} else {
		setupAutocomplete();
	}
};
