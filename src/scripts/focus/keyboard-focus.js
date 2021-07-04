export function KeyboardFocus() {
	// Adds keyboard-accessible class to <body>
	document.addEventListener("keydown", (e) => {
		if (e.key === "Tab") {
			document.body.classList.add("keyboard-focus");
		}
	});

	// Removes class from <body> in CSS
	document.addEventListener("mousedown", () => {
		document.body.classList.remove("keyboard-focus");
	});
}
