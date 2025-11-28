let quillEditor = null;

initQuillEditor = (selectorOrElement, html) => {
	// Resolver contenedor
	const container =
		typeof selectorOrElement === "string"
			? document.querySelector(selectorOrElement)
			: selectorOrElement;

	if (!container) {
		console.warn("initQuillEditor: no se encontró el contenedor");
		return null;
	}

	const options = {
		theme: "snow",
		placeholder: "Write description",
		modules: {
			toolbar: [
				["bold", "italic", "underline", "strike"],
				["blockquote", "code-block"],
				[{ header: 1 }, { header: 2 }, { header: 3 }],
				[{ list: "ordered" }, { list: "bullet" }],
				[{ script: "sub" }, { script: "super" }],
				[{ indent: "-1" }, { indent: "+1" }],
				[{ direction: "rtl" }],
				[{ size: ["small", false, "large", "huge"] }],
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				[{ color: [] }, { background: [] }],
				[{ font: [] }],
				[{ align: [] }],
				["clean"],
			],
		},
	};

	// 🧠 Si ya existe una instancia pero su root ya no está en el DOM,
	// creamos una nueva sobre el nuevo container.
	const shouldReuseExisting =
		quillEditor && document.body.contains(quillEditor.root);

	if (!shouldReuseExisting) {
		quillEditor = new Quill(container, options);
	}

	// Cargar HTML inicial si hay
	if (typeof html === "string" && html.trim() !== "") {
		const delta = quillEditor.clipboard.convert(html);
		quillEditor.setContents(delta, "silent");
	}

	return quillEditor;
};

getQuillEditor = () => {
	return quillEditor?.root?.innerHTML ?? "";
};
