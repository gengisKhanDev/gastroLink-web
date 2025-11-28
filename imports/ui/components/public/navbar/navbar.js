import './navbar.html';
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.public_navbar.events({
	'click #myAccount'() {
		Meteor.call('user.get', Meteor.userId(), function (error, result) {
			if (error) {
				console.log(error);
				yoloAlert('error');
			} else {
				if (result.profile.role.name === 'User') {
					FlowRouter.go('/user/my-account');
				} else if (result.profile.role.name === 'Admin') {
					FlowRouter.go('/admin/my-account');
				} else if (result.profile.role.name === 'Member') {
					FlowRouter.go('/member/settings');
				} else {
					FlowRouter.go('/member/settings');
				}
			}
		});
	},
	'click #logout'() {
		sourAlert(
			{
				type: 'question',
				title: 'Log Out?',
				okButtonText: 'Yes, Log Me Out',
			},
			function (result) {
				if (result) {
					Meteor.logout(() => {
						location.reload();
					});
				}
			},
		);
	},
});
