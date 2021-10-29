const pluginSass = require("eleventy-plugin-sass");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const prettyData = require("pretty-data");

module.exports = function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy('src/manifest.json');
	eleventyConfig.addPassthroughCopy("src/fonts");
	eleventyConfig.addPassthroughCopy("src/scripts");
	eleventyConfig.addPassthroughCopy({ "src/assets/*.{svg,jpg,png}": "assets" });
	eleventyConfig.addPassthroughCopy({ "src/assets/favicons/*.{svg,jpg,png,ico}": "assets/favicons" });
	eleventyConfig.addPassthroughCopy( "src/posts/**/*.(gif|jpg|png|webp|svg)");

	// Styles
	eleventyConfig.addPlugin(pluginSass, {
		watch: [
			"src/styles/**/*.{scss,sass}",
			"!node_modules/**"
		],
		outputDir: "test/styles",
		cleanCSS: false
	});

	// Markdown
	let options = {
		html: true,
		breaks: true,
		linkify: true
	};
	eleventyConfig.setLibrary("md", markdownIt(options).disable("code"));

	// Navigation
	eleventyConfig.addPlugin(pluginNavigation);

	// RSS
	eleventyConfig.addPlugin(pluginRss);

	eleventyConfig.addTransform("xmlmin", function(content, outputPath) {
		if(outputPath && outputPath.endsWith(".xml")) {
			let result = prettyData.pd.xmlmin(content);
			return result;
		}
		return content;
	});

	// Dates
	eleventyConfig.addFilter("readableDate", (value) => {
		return value.toLocaleString("ru", {
			year: "numeric",
			month: "long",
			day: "numeric"
		}).replace(" г.", "");
	});

	eleventyConfig.addFilter("htmlDateString", (value) => {
		return value.toISOString();
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("slice", (array, n) => {
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Shortcode
	eleventyConfig.addShortcode("note", function(content) {
		return `
			<div class="note"><span class="note__emoji" aria-hidden="true">📌</span><p class="note__text">${content}</p></div>
		`;
	});

	eleventyConfig.addShortcode("hiddenSpan", function(content) {
		return `<span aria-hidden="true">${content}</span>`;
	});

	return {
		dir: {
			input: "src",
			output: "test",
			includes: "_partials",
			layouts: "templates",
			data: "data",
		},
		dataTemplateEngine: "njk",
		markdownTemplateEngine: false,
		htmlTemplateEngine: "njk",
		passthroughFileCopy: true,
		templateFormats: [
			"md",
			"njk",
		],
	};
};
