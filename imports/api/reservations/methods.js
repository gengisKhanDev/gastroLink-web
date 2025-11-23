import { Business } from "../business/business.js"
import { Reservations } from "./reservations.js"
const moment = require('moment');
const createdBy = require("../../startup/server/created-by.js");
Meteor.methods({
  "create.reservation"(id, partySize, date, startTime, endTime) {
    const business = Business.findOne({ _id: id });
    const businessName = business.businessName;
    const currentReserved = getReservedCount(date, startTime);
    const availableSpace = business.maxCapacity - currentReserved;

    if (partySize > availableSpace) {
      throw new Meteor.Error("not-enough-space", "No hay espacio suficiente para esta reserva.");
    }

    Reservations.insert({
      reservedDate: date,
      startTime: startTime,
      endTime: endTime,
      partySize: partySize,
      business: {
        id: id,
        businessName: businessName
      },
      createdBy: createdBy.getUser(Meteor.userId()),
      createdAt: new Date()
    });

    return business.maxCapacity - currentReserved - partySize;
  },
  "getAvailableSpace"(id, date, startTime) {
    const business = Business.findOne({ _id: id });
    const currentReserved = getReservedCount(date, startTime);
    console.log("currentReserved asdasd")
    console.log(currentReserved)
    console.log(business.maxCapacity - currentReserved)
    return business.maxCapacity - currentReserved;
  }
});

function getReservedCount(date, startTime) {
  // Convertir la fecha a un objeto moment
  const searchDate = moment(date).startOf('day').toDate();

  const startMoment = moment(startTime, 'HH:mm');
  const endMoment = startMoment.clone().add(3, 'hours');

  console.log("Consultando reservas para la fecha:", searchDate, "entre", startMoment.format('HH:mm'), "y", endMoment.format('HH:mm'));

  const reservations = Reservations.find({
    reservedDate: searchDate,
    $or: [
      { startTime: { $lt: endMoment.format('HH:mm'), $gte: startMoment.format('HH:mm') } },  // startTime dentro del rango
      { endTime: { $lte: endMoment.format('HH:mm'), $gt: startMoment.format('HH:mm') } },   // endTime dentro del rango
      { startTime: { $lte: startMoment.format('HH:mm') }, endTime: { $gte: endMoment.format('HH:mm') } }  // reserva abarca todo el rango
    ]
  }).fetch();

  console.log(reservations);

  return reservations.reduce((acc, r) => acc + parseInt(r.partySize, 10), 0); // Usando parseInt porque parece que partySize es una cadena
}

