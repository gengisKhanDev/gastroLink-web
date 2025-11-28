// imports/ui/layouts/admin/sidebar.js
import './sidebar.html';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.admin_sidebar.onCreated(function () { });

Template.admin_sidebar.helpers({
	isActiveRoute(routeName) {
		return routeName === FlowRouter.getRouteName() ? 'active' : '';
	},
});

Template.admin_sidebar.events({
	'click .dropdown-toggle'(event) {
		// Usamos currentTarget para evitar problemas si hay <i>, <span>, etc. dentro
		const dropdownItem = event.currentTarget.parentElement;
		if (dropdownItem) {
			dropdownItem.classList.toggle('show');
		}
	},

	'click #showSidebar'(event) {
		const toggleBtn = event.currentTarget; // #showSidebar
		const sidebar = document.querySelector('.sidebar');
		if (!sidebar || !toggleBtn) return;

		const isOpen = sidebar.classList.contains('show');

		if (isOpen) {
			sidebar.classList.remove('show');
			toggleBtn.classList.remove('toggled');
			toggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
		} else {
			sidebar.classList.add('show');
			toggleBtn.classList.add('toggled');
			toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
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
