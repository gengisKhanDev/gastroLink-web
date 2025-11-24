import './member.html';

require('flatpickr');
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/confetti.css';

Template.member_body.onRendered(function () {
	// console.log(Meteor.user().profile.firstName)
});

Template.member_body.events({
	// "keyup #phone"(event) {
	//   event.preventDefault();
	//   let x = event.target.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
	//   event.target.value = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
	// }
});
