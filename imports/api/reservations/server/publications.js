import { Reservations } from "../reservations.js";

if(Meteor.isServer){
  Meteor.publish("reserves.all", () => {
    if(Meteor.userId()){
      return Reservations.find({id: id});
    }
    else {
      return [];
    }
  });

  Meteor.publish("reserves.user", (id) => {
    if(Meteor.userId()){
      return Reservations.find({"createdBy.id": Meteor.userId()});
    }
    else {
      return [];
    }
  });

  ReactiveTable.publish("reservations", Reservations, {},{
    fields: {
      _id: 1,
      reservedDate: 1,
      startTime: 1,
      partySize: 1,
      createdAt: 1,
      "createdBy.name": 1
   }
 });
//  ReactiveTable.publish("reservationsUser", function() {
//   // Obtener el ID del usuario actualmente autenticado
//   const currentUserId = this.userId;

//   console.log('Current User ID:', currentUserId);  // Asegúrate de remover este log una vez solucionado el problema.

//   // Filtrar las reservas basadas en el ID del usuario
//   const query = {
//       "createdBy.id": currentUserId
//   };
  
//   return Reservations.find(query, {
//       fields: {
//           _id: 1,
//           reservedDate: 1,
//           startTime: 1,
//           partySize: 1,
//           createdAt: 1,
//           "createdBy.name": 1
//       }
//   });
// });

}