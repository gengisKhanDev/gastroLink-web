yoloAlert = (type, text, timeout) => {
	// Elimina cualquier alerta anterior
	const old = document.querySelector("body .yolo-alert");
	if (old) old.remove();

	const wrapper = document.createElement("div");
	wrapper.className = "yolo-alert";
	wrapper.id = "yoloAlert";
	wrapper.innerHTML = `
    <span class="close-btn">&times;</span>
    <div class="yoloDiv">
      <span class="text" id="text"></span>
    </div>
  `;

	document.body.prepend(wrapper);

	const textEl = wrapper.querySelector("#text");
	const closeBtn = wrapper.querySelector(".close-btn");

	const alertTimeout = typeof timeout === "number" ? timeout : 4000;
	const message = typeof text === "undefined" ? "Something went wrong..." : text;

	textEl.textContent = message;

	wrapper.classList.remove("success", "error", "warning", "info");
	switch (type) {
		case "success":
			wrapper.classList.add("success");
			break;
		case "error":
			wrapper.classList.add("error");
			break;
		case "warning":
			wrapper.classList.add("warning");
			break;
		case "info":
		default:
			wrapper.classList.add("info");
			break;
	}

	const close = () => {
		wrapper.classList.add("fade-out");
		setTimeout(() => {
			wrapper.remove();
		}, 300);
	};

	closeBtn.addEventListener("click", () => {
		close();
	});

	// Mostrar y programar auto-cierre
	wrapper.style.display = "block";
	setTimeout(() => {
		close();
	}, alertTimeout);
};
