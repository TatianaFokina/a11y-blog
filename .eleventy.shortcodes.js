module.exports = eleventyConfig => {
	eleventyConfig.addShortcode("note", function(content) {
		return `
			<aside class="article__note"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="article__note-icon" aria-hidden="true"><path d="M12 6v12"/><path d="M17.196 9 6.804 15"/><path d="m6.804 9 10.392 6"/></svg><p class="article__note-text">${content}</p></aside>
		`;
	});

	eleventyConfig.addShortcode("hiddenSpan", function(content) {
		return `<span aria-hidden="true">${content}</span>`;
	});

	eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);
}