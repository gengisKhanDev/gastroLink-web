import './member.html';

require('flatpickr');
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/confetti.css';

Template.member_body.onRendered(function () {
	// console.log(Meteor.user().profile.firstName)
});

Template.member_body.events({
	"click #addTextEvent"() {
		const html = getQuillEditor();
		Meteor.call(
			"business.addDescriptionHTML",
			Meteor.user().business.id,
			html,
			function (error, result) {
				if (error) {
					console.log(error);
					yoloAlert("error");
					disableBtn(
						"#addTextEvent",
						false,
						`<i class="fas fa-save"></i> Save Description`
					);
				} else {
					yoloAlert("success", "Updated Text!");
					disableBtn(
						"#addTextEvent",
						false,
						`<i class="fas fa-save"></i> Save Description`
					);
				}
			}
		);
	},
});

