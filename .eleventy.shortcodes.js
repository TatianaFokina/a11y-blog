module.exports = eleventyConfig => {
	eleventyConfig.addShortcode("note", function(content) {
		return `
			<aside class="note"><span class="note__emoji" aria-hidden="true">📌</span><p class="note__text">${content}</p></aside>
		`;
	});


	eleventyConfig.addShortcode("hiddenSpan", function(content) {
		return `<span aria-hidden="true">${content}</span>`;
	});

	// currentYear
	eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);

}


