Session.set('placesAutocomplete', {});

initPlacesAutocomplete = (selector, callback) => {
	$(document).ready(function () {
		setTimeout(function () {
			var input = document.getElementById(selector);
			var autocomplete = new google.maps.places.Autocomplete(input);
			google.maps.event.addListener(autocomplete, 'place_changed', function () {
				var place = autocomplete.getPlace();
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
				Session.set('placesAutocomplete', placeObj);
				callback(true);
			});
		}, 750);
	});
};
// initMap = (data) => {
//   console.log("initMap!!");
//   // selector, lat, lng, zoom
//   setTimeout(function(){
//     $(document).ready(function() {
//       if($('.ol-viewport').length === 0){
//         if(!data.selector){
//           data.selector = "map";
//         }
//         if(!data.zoom){
//           data.zoom = 14;
//         }
//         const map = new ol.Map({
//           target: data.selector,
//           layers: [
//             new ol.layer.Tile({
//               source: new ol.source.OSM(),
//             })
//           ],
//           view: new ol.View({
//             center: ol.proj.transform([data.lng, data.lat], "EPSG:4326", "EPSG:3857"),
//             zoom: data.zoom
//           })
//         });

//         marker = new ol.Feature({
//           geometry: new ol.geom.Point(
//             ol.proj.fromLonLat([data.lng, data.lat])
//           )
//         });

//         marker.setStyle(new ol.style.Style({
//           image: new ol.style.Icon(({
//             crossOrigin: "anonymous",
//             src: "/marker-100.png"
//           }))
//         }));

//         var vectorSource = new ol.source.Vector({
//           features: [marker]
//         });

//         var markerVectorLayer = new ol.layer.Vector({
//           source: vectorSource
//         });
//         map.addLayer(markerVectorLayer);

//         map.on("click", function(event){
//           console.log(event.coordinate);
//         });
//       }
//     });
//   }, 750);
// }

// $(document).on("click", ".get-directions", function(event) {
//   const address = $(event.target).data("address");
//   if(!address){
//     yoloAlert("warning", "No Address!");
//   }
//   else if(address){
//     if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//       var link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
//       link.href = "comgooglemaps://?q=" + address + "&zoom=14&views=traffic";
//       link.target = "_blank";
//       var event = new MouseEvent("click", {
//         "view": window,
//         "bubbles": false,
//         "cancelable": true
//       });
//       link.dispatchEvent(event);
//     }
//     else {
//       const url = "https://www.google.com/maps/place/" + address;
//       window.open(url, "_blank");
//     }
//   }
// });
