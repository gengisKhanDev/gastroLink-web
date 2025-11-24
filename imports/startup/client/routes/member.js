import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Tracker } from 'meteor/tracker';
Meteor.subscribe('userData');

/*Layout*/
import '../../../ui/layouts/body/member.js';

/*Components*/
//Desktop
import '../../../ui/components/member/sidebar/sidebar.js';

/*Pages*/
//Settings
import '../../../ui/pages/member/settings/settings.js';
//Reservations
import '../../../ui/pages/member/reservations/reservations.js';
//Edit Page
import '../../../ui/pages/member/edit-page/edit-page.js';
//My Account
import '../../../ui/pages/member/my-account/my-account.js';
//Create Business
import '../../../ui/pages/member/create-business/create-business.js';

//Create-Business
FlowRouter.route('/member/create-business', {
	name: 'member.create-business',
	triggersEnter: [
		(context) => {
			Tracker.autorun((computation) => {
				if (Meteor.subscribe('userData').ready()) {
					const user = Meteor.user();

					if (!user) {
						FlowRouter.go('/');
						computation.stop();
					} else if (user.business) {
						FlowRouter.go('/member/settings');
						location.reload();
						computation.stop();
					} else {
						BlazeLayout.render('member_body', {
							main: 'member_create_business',
						});
						computation.stop();
					}
				}
			});
		},
	],
});

//settings
FlowRouter.route('/member/settings', {
	name: 'member.dashboard',
	triggersEnter: [
		(context) => {
			Tracker.autorun((computation) => {
				if (Meteor.subscribe('userData').ready()) {
					const user = Meteor.user();
					if (!user) {
						FlowRouter.go('/');
						computation.stop();
					} else if (!user.business) {
						FlowRouter.go('/member/create-business');
						location.reload();
						computation.stop();
					} else {
						BlazeLayout.render('member_body', {
							sidebar: 'member_sidebar',
							main: 'member_settings',
						});
						computation.stop();
					}
				}
			});
		},
	],
});

//My Account
FlowRouter.route('/member/my-account', {
	name: 'member.my-account',
	triggersEnter: [
		(context) => {
			Tracker.autorun((computation) => {
				if (Meteor.subscribe('userData').ready()) {
					const user = Meteor.user();
					if (!user) {
						FlowRouter.go('/');
						computation.stop();
					} else if (!user.business) {
						FlowRouter.go('/member/create-business');
						location.reload();
						computation.stop();
					} else {
						BlazeLayout.render('member_body', {
							sidebar: 'member_sidebar',
							main: 'member_my_account',
						});
						computation.stop();
					}
				}
			});
		},
	],
});

//Edit Page
FlowRouter.route('/member/edit-page', {
	name: 'member.edit-page',
	triggersEnter: [
		(context) => {
			Tracker.autorun((computation) => {
				if (Meteor.subscribe('userData').ready()) {
					const user = Meteor.user();
					if (!user) {
						FlowRouter.go('/');
						computation.stop();
					} else if (!user.business) {
						FlowRouter.go('/member/create-business');
						location.reload();
						computation.stop();
					} else {
						BlazeLayout.render('member_body', {
							main: 'member_edit_page',
							sidebar: 'member_sidebar',
						});
						computation.stop();
					}
				}
			});
		},
	],
});

//Reservations
FlowRouter.route('/member/reservations', {
	name: 'member.reservations',
	triggersEnter: [
		(context) => {
			Tracker.autorun((computation) => {
				if (Meteor.subscribe('userData').ready()) {
					const user = Meteor.user();
					if (!user) {
						FlowRouter.go('/');
						computation.stop();
					} else if (!user.business) {
						FlowRouter.go('/member/create-business');
						location.reload();
						computation.stop();
					} else {
						BlazeLayout.render('member_body', {
							main: 'member_reservations',
							sidebar: 'member_sidebar',
						});
						computation.stop();
					}
				}
			});
		},
	],
});
