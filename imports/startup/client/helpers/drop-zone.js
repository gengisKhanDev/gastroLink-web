const updateDropZoneText = (text) => {
	const el = document.querySelector("#dropZone h4");
	if (el) el.innerHTML = text;
};

uploadImage = (obj, event, callback) => {
	const files = event.target.files;
	const originalText = obj.text || "Drag and Drop Image";

	updateDropZoneText(`<i class="fa fa-spin fa-spinner" aria-hidden="true"></i> Uploading...`);

	if (files.length >= 2) {
		yoloAlert("error", "You can only upload one file!");
		updateDropZoneText(originalText);
		return;
	}

	const file = files[0];
	if (!file) {
		updateDropZoneText(originalText);
		return;
	}

	if (file.size >= 20485760) {
		yoloAlert("error", "File size too big!");
		updateDropZoneText(originalText);
		return;
	}

	if (!window.FileReader) {
		yoloAlert("error", "FileReader is not supported in this browser.");
		updateDropZoneText(originalText);
		return;
	}

	const reader = new FileReader();

	reader.onload = function () {
		const result = reader.result;

		const finish = () => {
			updateDropZoneText(originalText);
			callback({
				base64: result,
				type: file.type,
				name: file.name,
			});
		};

		if (obj.width && obj.height) {
			const image = new Image();
			image.src = result;
			image.onload = function () {
				if (this.width !== obj.width || this.height !== obj.height) {
					yoloAlert(
						"error",
						`Incorrect resolution, please upload a file with ${obj.width}px x ${obj.height}px`,
					);
					updateDropZoneText(originalText);
					return;
				}
				finish();
			};
			image.onerror = function () {
				yoloAlert("error", "Could not load image.");
				updateDropZoneText(originalText);
			};
		} else {
			finish();
		}
	};

	reader.onerror = function (error) {
		console.error(error);
		updateDropZoneText(originalText);
		yoloAlert("error");
	};

	reader.readAsDataURL(file);
};
