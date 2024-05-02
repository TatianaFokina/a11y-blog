const markdownIt = require("markdown-it");	

module.exports = eleventyConfig => {

	// Markdown
	// TODO Not sure we need this
	let options = {
		html: true,
		breaks: true,
		linkify: true
	};
	eleventyConfig.setLibrary("md", markdownIt(options).disable("code"));


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


