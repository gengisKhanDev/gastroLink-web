import './sidebar.html';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

import { Users } from '../../../../api/users/users.js';

Template.user_sidebar.onCreated(function () { });

Template.user_sidebar.onRendered(function () { });

Template.user_sidebar.helpers({
	getUserAvatar() {
		const thisUser = Users.findOne({});
		if (!thisUser || !thisUser.avatar) return;

		if (thisUser.avatar.type === 'avatar') {
			return thisUser.avatar.image;
		}
		return thisUser.avatar.base64;
	},
	user() {
		return Session.get('user');
	},
	isActiveRoute(routeName) {
		return routeName === FlowRouter.getRouteName() ? 'active' : '';
	},
});

Template.user_sidebar.events({
	'click .arrow'(event) {
		// Usamos currentTarget para que sea más predecible
		const arrow = event.currentTarget;
		const arrowParent =
			arrow.parentElement?.parentElement?.parentElement ?? null;

		if (arrowParent) {
			arrowParent.classList.toggle('show-menu');
		}
	},

	'click #collapse'() {
		// Sidebar del layout de usuario
		const sidebar =
			document.querySelector('.user-body .sidebar') ||
			document.querySelector('.sidebar');
		const main = document.querySelector('.user-body .main');

		if (!sidebar || !main) return;

		sidebar.classList.toggle('close');

		const isOpen = !sidebar.classList.contains('close');

		if (isOpen && typeof isMobile === 'function' && !isMobile()) {
			main.style.marginLeft = '260px';
		} else {
			main.style.marginLeft = '78px';
		}
	},

	'click #logout'() {
		sourAlert(
			{
				type: 'question',
				title: 'Log Out?',
				okButtonText: 'Yes, Log Me Out',
			},
			(result) => {
				if (result) {
					Meteor.logout(() => {
						location.reload();
					});
				}
			},
		);
	},
});
