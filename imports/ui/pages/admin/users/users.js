import './users.html';

Template.admin_users.onCreated(function () {
	document.title = 'Gastrolink - Users';
	this.isSubscriptionReady = new ReactiveVar(false);
	Tracker.autorun(() => {
		checkUserRole(['Super Admin', 'Admin', 'Employee']);
	});
});

Template.admin_users.helpers({
	isSubscriptionReady() {
		return Template.instance().isSubscriptionReady.get();
	},
	users() {
		return {
			collection: 'users',
			rowsPerPage: 25,
			showFilter: true,
			ready: Template.instance().isSubscriptionReady,
			fields: [
				{
					key: '_id',
					label: 'id',
					hidden: true,
				},
				{
					key: 'profile',
					label: 'Name',
					fn: function (profile) {
						return `${profile.firstName} ${profile.lastName}`;
					},
				},
				{
					key: 'profile',
					label: 'Role',
					fn: function (profile) {
						return `${profile.role.name}`;
					},
				},
				{
					key: 'createdAt',
					label: 'Date Created',
					fn: function (date) {
						return formatDate(date, true);
					},
				},
				{
					key: '_id',
					label: 'View',
					fn: function (id) {
						return new Spacebars.SafeString(`
              <div class="btn-group">
                <a href="/admin/users/${id}" role="button" class="btn btn-primary">
                  <i class="fas fa-eye"></i> View
                </a>
            `);
					},
				},
			],
		};
	},
});

Template.admin_users.events({});
