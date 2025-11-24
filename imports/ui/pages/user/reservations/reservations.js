import './reservations.html';

import { Reservations } from '../../../../api/reservations/reservations';

Template.user_reservations.onCreated(function () {
	document.title = 'Gastrolink - Reservations';
	let self = this;
	self.isSubscriptionReady = new ReactiveVar(false);

	self.autorun(() => {
		console.log(Reservations.find().fetch());
		let subscription = self.subscribe('reserves.user', Meteor.userId());
		self.isSubscriptionReady.set(subscription.ready());
	});

	Tracker.autorun(() => {
		checkUserRole(['User']);
	});
});

Template.user_reservations.helpers({
	reservations() {
		console.log(Reservations.find().fetch());

		return {
			collection: Reservations.find({ 'createdBy.id': Meteor.userId() }),
			rowsPerPage: 25,
			showFilter: true,
			ready: Template.instance().isSubscriptionReady.get(),
			fields: [
				{
					key: '_id',
					label: 'id',
					hidden: true,
				},
				{
					key: 'reservedDate',
					label: 'Date',
					fn: function (date) {
						return formatDateView(date);
					},
				},
				{
					key: 'startTime',
					label: 'Time',
				},
				{
					key: 'partySize',
					label: 'Party Size',
				},
				{
					key: 'createdBy.name',
					label: 'User',
				},
				{
					key: 'createdAt',
					label: 'createdAt',
					fn: function (date) {
						return formatDate(date);
					},
				},
			],
		};
	},
});
