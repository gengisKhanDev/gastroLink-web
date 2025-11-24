import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

/*Layout*/
//Desktop
import '../../../ui/layouts/body/admin.js';
//Global
import '../../../ui/layouts/body/global.js';

/*Components*/
//Desktop
import '../../../ui/components/admin/sidebar/sidebar.js';

//Global
import '../../../ui/components/global/loader/loader.js';
import '../../../ui/components/global/offline-alert/offline-alert.js';

/*Pages*/
///My Account
import '../../../ui/pages/admin/my-account/my-account.js';
///System Settings
import '../../../ui/pages/admin/system-settings/system-settings.js';
///Users
import '../../../ui/pages/admin/users/users.js';
import '../../../ui/pages/admin/users/edit.js';

BlazeLayout.setRoot('body');

//My Account
FlowRouter.route('/admin/my-account', {
	name: 'admin.my-account',
	triggersEnter: [
		(context) => {
			if (!Meteor.userId()) {
				FlowRouter.go('/');
			} else {
				BlazeLayout.render('admin_body', {
					main: 'admin_my_account',
					sidebar: 'admin_sidebar',
				});
			}
		},
	],
});

//System Settings
FlowRouter.route('/admin/system-settings', {
	name: 'admin.system-settings',
	triggersEnter: [
		(context) => {
			if (!Meteor.userId()) {
				FlowRouter.go('/');
			} else {
				BlazeLayout.render('admin_body', {
					main: 'admin_system_settings',
					sidebar: 'admin_sidebar',
				});
			}
		},
	],
});

// //Dashboard
// FlowRouter.route("/admin/dashboard", {
//   name: "admin.reservations",
//   triggersEnter: [(context) => {
//     if(!Meteor.userId()){
//       FlowRouter.go("/");
//     }
//     else {
//       BlazeLayout.render("admin_body", {
//         main: "admin_reservations",
//         sidebar: "admin_sidebar"
//       });
//     }
//   }]
// });

//Users
FlowRouter.route('/admin/users', {
	name: 'admin.users',
	triggersEnter: [
		(context) => {
			if (!Meteor.userId()) {
				FlowRouter.go('/');
			} else {
				BlazeLayout.render('admin_body', {
					main: 'admin_users',
					sidebar: 'admin_sidebar',
				});
			}
		},
	],
});
FlowRouter.route('/admin/users/:id', {
	name: 'admin.users-edit',
	triggersEnter: [
		(context) => {
			if (!Meteor.userId()) {
				FlowRouter.go('/');
			} else {
				BlazeLayout.render('admin_body', {
					main: 'admin_users_edit',
					sidebar: 'admin_sidebar',
				});
			}
		},
	],
});
