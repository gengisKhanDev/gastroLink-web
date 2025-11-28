import "./business.html";
import { Business } from "../../../../api/business/business.js";
import dayjs from "dayjs";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Session.set("isSubscriptionsReady", false);
Session.set("stars", 0);

Template.public_business_view.onCreated(function () {
	document.title = "Gastrolink - Business";

	this.autorun(() => {
		const id = FlowRouter.getParam("id");
		this.subscribe("get.business.publicID", id);
		Session.set("business", Business.findOne({ _id: id }));
	});
});

Template.public_business_view.onRendered(function () {
	initFlatpickr({
		selector: "#date",
		minDate: "today",
	});

	// Quitar jQuery aquí también
	const labels = this.findAll(".rate label");
	labels.forEach((label) => {
		label.addEventListener("click", (e) => {
			e.preventDefault();
		});
	});
});

Template.public_business_view.helpers({
	business() {
		return Session.get("business");
	},

	maxCapacityOptions() {
		const availableSpace = Session.get("availableSpace");
		return Array.from({ length: availableSpace || 0 }, (_, i) => i + 1);
	},
	descriptionHTML() {
		const business = Session.get("business");
		return business?.descriptionHTML?.html ?? "";
	},
	isDefaultImage(imageId) {
		const business = Session.get("business");
		return business && business.defaultImage === imageId;
	},
	isActive(index) {
		const business = Session.get("business");
		if (business) {
			const nonDefaultImages = business.images.filter(
				(img) => business.defaultImage !== img.id
			);
			return business.images[index].id === nonDefaultImages[0]?.id
				? "active"
				: "";
		}
		return "";
	},
});

Template.public_business_view.events({
	"submit #addReservation"(event) {
		event.preventDefault();

		if (!Meteor.userId()) {
			yoloAlert("error", "Please Create Account For Reserve");
			return;
		}

		const partySize = event.target.partySize.value;
		const date = new Date(event.target.date.value);
		const startTime = event.target.time.value;
		const endTime = addHoursToTime(startTime, 3);

		Meteor.call(
			"create.reservation",
			FlowRouter.getParam("id"),
			partySize,
			date,
			startTime,
			endTime,
			(error, result) => {
				if (error) {
					console.log(error);
					yoloAlert("error");
				} else {
					console.log(result);
					yoloAlert("success", "Reservation Success!");
				}
			}
		);
	},

	"change #time"(event, template) {
		const dateValue = template.find("#date")?.value;
		if (!dateValue) return;

		const date = new Date(dateValue);
		const startTime = event.target.value;

		// Activar el botón sin jQuery
		const btn = template.find("#reservationBtn");
		if (btn) {
			btn.disabled = false;
		}

		Meteor.call(
			"getAvailableSpace",
			FlowRouter.getParam("id"),
			date,
			startTime,
			(error, result) => {
				if (error) {
					console.log(error);
				} else {
					const business = Session.get("business");
					const maxCap = business?.maxCapacity ?? 0;

					if (result < maxCap) {
						console.log("Espacio disponible:", result);
						Session.set("availableSpace", result);
					} else {
						Session.set("availableSpace", maxCap);
					}
				}
			}
		);
	},

	"click .select-star"(event) {
		// Equivalente a tu lógica con jQuery
		const clickedLabel = event.currentTarget; // <label>
		const inputId = clickedLabel.getAttribute("for");
		if (!inputId) return;

		const radio = document.getElementById(inputId);
		if (!radio) return;

		// Toggle de checked
		if (radio.checked) {
			radio.checked = false;
		} else {
			radio.checked = true;
		}

		const selectedValue = radio.value;
		console.log(selectedValue);
		Session.set("stars", selectedValue);
	},

	"submit #addReview"(event) {
		event.preventDefault();

		const review = event.target.review.value;
		let stars = Session.get("stars");
		stars = Number(stars);

		if (stars !== 0) {
			Meteor.call(
				"create.review",
				FlowRouter.getParam("id"),
				stars,
				review,
				(error, result) => {
					if (error) {
						console.log(error);
						if (error.error) {
							yoloAlert("error", error.error);
						} else {
							yoloAlert("error");
						}
					} else {
						console.log(result);
						yoloAlert("success", "Review Success!");
					}
				}
			);
		} else {
			yoloAlert("error", "Please Select a Star for Review");
		}
	},
});

// 🔹 Versión con dayjs de addHoursToTime
function addHoursToTime(timeString, hoursToAdd) {
	const [hoursStr, minutesStr] = (timeString || "").split(":");
	const hours = Number(hoursStr) || 0;
	const minutes = Number(minutesStr) || 0;

	const time = dayjs()
		.hour(hours)
		.minute(minutes)
		.second(0)
		.millisecond(0);

	return time.add(hoursToAdd, "hour").format("HH:mm");
}
