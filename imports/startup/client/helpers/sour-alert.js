//type: "success", "question", "warning" <string>
//title: "this is a title" <string>
//okButtonText: "text" <string>
//removeButtonText: "text" <string>
//cancelButtonText: "text" <string>
//showOkButton: true/false <boolean>
//html: HTML <string>
//autoClose: true/false <boolean>
//timer: 3000 <integer>
//hide: true <boolean>

sourAlert = (data, callback) => {
	$('body .sour-alert').remove();
	$('body').prepend(`
    <div class="sour-alert">
      <div class="title">
      </div>
      <div class="html">
      </div>
      <div class="buttons">
        <button type="button" id="sourAlertOK" style="display: none;" class="btn btn-success">OK</button>
        <button type="button" id="sourAlertRemove" style="display: none;" class="btn btn-danger">Remove</button>
        <button type="button" id="sourAlertCancel" style="display: none;" class="btn btn-danger">Cancel</button>
      </div>
    </div>
  `);

	$('.sour-alert').show();
	$('.sour-alert .title').html(data.title);

	if (data.hide) {
		setTimeout(function () {
			$('.sour-alert').hide();

			$('.sour-alert #sourAlertOK').prop('disabled', false);
			$('.sour-alert #sourAlertOK').html('OK');
			$('.sour-alert #sourAlertRemove').prop('disabled', false);
			$('.sour-alert #sourAlertCancel').prop('disabled', false);
		}, 1250);
	}

	if (data.loading) {
		$('.sour-alert #sourAlertOK').prop('disabled', true);
		$('.sour-alert #sourAlertOK').html('Loading...');
		$('.sour-alert #sourAlertRemove').prop('disabled', true);
		$('.sour-alert #sourAlertCancel').prop('disabled', true);
	}

	//buttons text
	if (typeof data.okButtonText != 'undefined') {
		$('.sour-alert #sourAlertOK').html(data.okButtonText);
	}
	if (typeof data.removeButtonText != 'undefined') {
		$('.sour-alert #sourAlertRemove').html(data.removeButtonText);
	}
	if (typeof data.cancelButtonText != 'undefined') {
		$('.sour-alert #sourAlertCancel').html(data.cancelButtonText);
	}

	//html
	if (typeof data.html != 'undefined') {
		$('.sour-alert .html').html(data.html);
	}

	//type
	switch (data.type) {
		case 'success': {
			$('.sour-alert .title').css('color', '#27ae60');
			$('.sour-alert #sourAlertOK').show();
			break;
		}
		case 'question': {
			$('.sour-alert .title').css('color', '#e74c3c');
			$('.sour-alert #sourAlertCancel').show();
			break;
		}
		case 'warning': {
			$('.sour-alert .title').css('color', '#e67e22');
			$('.sour-alert #sourAlertRemove').show();
			break;
		}
	}

	//show/hide ok button
	if (data.showOkButton === true || typeof data.showOkButton === 'undefined') {
		$('#sourAlertOK').show();
	} else if (!data.showOkButton) {
		$('#sourAlertOK').hide();
	}

	//timer
	if (data.autoClose === true) {
		$('#sourAlertOK').hide();
		let alertTimeout = 1250;
		if (typeof data.timer != 'undefined') {
			alertTimeout = data.timer;
		}
		setTimeout(function () {
			$('.sour-alert').hide();
			callback(true);
		}, alertTimeout);
	}

	$(document).ready(function () {
		$('#sourAlertOK').click('click', function (e) {
			callback(true);
			setTimeout(function () {
				$('.sour-alert').hide();

				$('.sour-alert #sourAlertOK').prop('disabled', false);
				$('.sour-alert #sourAlertOK').html('OK');
				$('.sour-alert #sourAlertRemove').prop('disabled', false);
				$('.sour-alert #sourAlertCancel').prop('disabled', false);

				$('body .sour-alert').remove();
			}, 1250);
		});

		$('#sourAlertCancel').click('click', function (e) {
			$('.sour-alert').fadeOut();
		});
	});
};
