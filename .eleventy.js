const yaml = require("js-yaml");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");

// 11ty config files
const pluginShortcodes = require("./.eleventy.shortcodes.js");
const pluginFilters= require("./.eleventy.filters.js");
const pluginI18n= require("./.eleventy.i18n.js");
const pluginTransforms= require("./.eleventy.transforms.js");


module.exports = function(eleventyConfig) {
	eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
	eleventyConfig.addGlobalData("env", process.env.ELEVENTY_ENV);
	

	///// Plugins
	eleventyConfig.addPlugin(pluginShortcodes);
	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(pluginI18n);
	eleventyConfig.addPlugin(pluginNavigation);	
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginTransforms);


	///// Collections
	eleventyConfig.addCollection("articlesEn", (collectionApi) => {
		return collectionApi.getFilteredByGlob("src/en/articles/*/*.md").reverse();
	});
	eleventyConfig.addCollection("articlesRu", (collectionApi) => {
		return collectionApi.getFilteredByGlob("src/ru/articles/*/*.md").reverse();
	});


	///// Build options
	eleventyConfig.addPassthroughCopy('src/manifest.json');
	eleventyConfig.addPassthroughCopy('src/robots.txt');
	eleventyConfig.addPassthroughCopy("src/fonts");
	eleventyConfig.addPassthroughCopy("src/scripts");
	eleventyConfig.addPassthroughCopy({ "src/assets/*.{svg,jpg,png}": "assets" });
	eleventyConfig.addPassthroughCopy({ "src/assets/favicons/*.{svg,jpg,png,ico}": "assets/favicons" });
	eleventyConfig.addPassthroughCopy( "src/(en|ru)/articles/**/*.(gif|jpg|png|webp|svg)");
	

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
