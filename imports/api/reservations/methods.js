import { Business } from "../business/business.js";
import { Reservations } from "./reservations.js";
import dayjs from "dayjs";
const createdBy = require("../../startup/server/created-by.js");

// Helper: parsear "HH:mm" a un objeto dayjs del día actual
function parseTimeToDayjs(timeString) {
	const [hoursStr, minutesStr] = (timeString || "").split(":");
	const hours = Number(hoursStr) || 0;
	const minutes = Number(minutesStr) || 0;

	return dayjs()
		.hour(hours)
		.minute(minutes)
		.second(0)
		.millisecond(0);
}

Meteor.methods({
	"create.reservation": async function(id, partySize, date, startTime, endTime) {
		const business = await Business.findOneAsync({ _id: id });
		const businessName = business.businessName;
		const currentReserved = getReservedCount(date, startTime);
		const availableSpace = business.maxCapacity - currentReserved;

		if (partySize > availableSpace) {
			throw new Meteor.Error(
				"not-enough-space",
				"No hay espacio suficiente para esta reserva."
			);
		}

		Reservations.insert({
			reservedDate: date,
			startTime: startTime,
			endTime: endTime,
			partySize: partySize,
			business: {
				id: id,
				businessName: businessName,
			},
			createdBy: createdBy.getUser(Meteor.userId()),
			createdAt: new Date(),
		});

		return business.maxCapacity - currentReserved - partySize;
	},

	getAvailableSpace: async function(id, date, startTime) {
		const business = await Business.findOneAsync({ _id: id });
		const currentReserved = getReservedCount(date, startTime);

		return business.maxCapacity - currentReserved;
	},
});

function getReservedCount(date, startTime) {
	const searchDate = dayjs(date).startOf("day").toDate(); // startOf + toDate existen en dayjs :contentReference[oaicite:1]{index=1}

	const startDayjs = parseTimeToDayjs(startTime);
	const endDayjs = startDayjs.add(3, "hour"); // add en dayjs :contentReference[oaicite:2]{index=2}

	console.log(
		"Consultando reservas para la fecha:",
		searchDate,
		"entre",
		startDayjs.format("HH:mm"),
		"y",
		endDayjs.format("HH:mm")
	);

	const startStr = startDayjs.format("HH:mm");
	const endStr = endDayjs.format("HH:mm"); // format en dayjs :contentReference[oaicite:3]{index=3}

	const reservations = Reservations.find({
		reservedDate: searchDate,
		$or: [
			// startTime dentro del rango
			{ startTime: { $lt: endStr, $gte: startStr } },
			// endTime dentro del rango
			{ endTime: { $lte: endStr, $gt: startStr } },
			// reserva abarca todo el rango
			{
				startTime: { $lte: startStr },
				endTime: { $gte: endStr },
			},
		],
	}).fetch();

	console.log(reservations);

	// Usando parseInt porque partySize parece venir como string
	return reservations.reduce((acc, r) => acc + parseInt(r.partySize, 10), 0);
}
