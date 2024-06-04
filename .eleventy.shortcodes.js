module.exports = eleventyConfig => {
	eleventyConfig.addShortcode("note", function(content) {
		return `
			<aside class="article__note"><span class="article__note-icon">📌</span><p class="article__note-text">${content}</p></aside>
		`;
	});

	eleventyConfig.addShortcode("hiddenSpan", function(content) {
		return `<span aria-hidden="true">${content}</span>`;
	});

	eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);
}