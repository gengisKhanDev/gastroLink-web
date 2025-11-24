import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

/*Layout*/
import '../../../ui/layouts/body/public.js';

/*Components*/
import '../../../ui/components/public/navbar/navbar.js';
import '../../../ui/components/public/footer/footer.js';
/*Pages*/
//Home
import '../../../ui/pages/public/home/home.js';
//business
import '../../../ui/pages/public/business/business.js';

//Home
FlowRouter.route('/', {
	name: 'public.home',
	triggersEnter: [
		(context) => {
			BlazeLayout.render('public_body', {
				navbar: 'public_navbar',
				main: 'public_home',
				footer: 'public_footer',
			});
		},
	],
});

FlowRouter.route('/business/:id', {
	name: 'public.business.view',
	triggersEnter: [
		(context) => {
			BlazeLayout.render('public_body', {
				navbar: 'public_navbar',
				main: 'public_business_view',
				footer: 'public_footer',
			});
		},
	],
});
