export function KeyboardFocus() {
	// Add keyboard-accessible class to <body>
	document.addEventListener("keydown", (e) => {
		if (e.key === "Tab") {
			document.body.classList.add("keyboard-focus");
		}
	});

	// Remove class from <body> in CSS
	document.addEventListener("mousedown", () => {
		document.body.classList.remove("keyboard-focus");
	});
}
