const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const prettyData = require("pretty-data");
const { EleventyI18nPlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
eleventyConfig.addPassthroughCopy('src/manifest.json');
	eleventyConfig.addPassthroughCopy("src/fonts");
	eleventyConfig.addPassthroughCopy("src/scripts");
	eleventyConfig.addPassthroughCopy({ "src/assets/*.{svg,jpg,png}": "assets" });
	eleventyConfig.addPassthroughCopy({ "src/assets/favicons/*.{svg,jpg,png,ico}": "assets/favicons" });
	eleventyConfig.addPassthroughCopy( "src/posts/**/*.(gif|jpg|png|webp|svg)");


	eleventyConfig.addPlugin(EleventyI18nPlugin, {
        defaultLanguage: "ru", // Set your default language
        filters: {
            url: "locale_url",
            links: "locale_links"
        },
        errorMode: "strict"
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
		// TODO Не работает с антернализацией, починить
		// return value.toLocaleString("ru", {
		// 	year: "numeric",
		// 	month: "long",
		// 	day: "numeric"
		// }).replace(" г.", "");
		return value;
	});

	eleventyConfig.addFilter("htmlDateString", (value) => {
		return value.toISOString();
	});



	// Collections
	eleventyConfig.addCollection("postsEn", (collection) => {
		return collection.getFilteredByGlob("./src/en/posts/**/*.md");
	});
	eleventyConfig.addCollection("postsRu", (collection) => {
		return collection.getFilteredByGlob("./src/ru/posts/**/*.md");
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



	// Shortcodes
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



	return {
		dir: {
			input: "src",
			output: "dist",
			includes: "_includes",
			layouts: "_templates",
			data: "_data",
		},
		dataTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		passthroughFileCopy: true,
		templateFormats: [
			"md",
			"njk",
		],
	};
};
