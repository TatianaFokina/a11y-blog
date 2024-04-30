const yaml = require("js-yaml");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");

// 11ty config files
const pluginShortcodes = require("./.eleventy.shortcodes.js");
const pluginFilters= require("./.eleventy.filters.js");
const pluginI18n= require("./.eleventy.i18n.js");
const pluginTransforms= require("./.eleventy.transforms.js");


module.exports = function(eleventyConfig) {
eleventyConfig.addPassthroughCopy('src/manifest.json');
	eleventyConfig.addPassthroughCopy("src/fonts");
	eleventyConfig.addPassthroughCopy("src/scripts");
	eleventyConfig.addPassthroughCopy({ "src/assets/*.{svg,jpg,png}": "assets" });
	eleventyConfig.addPassthroughCopy({ "src/assets/favicons/*.{svg,jpg,png,ico}": "assets/favicons" });
	eleventyConfig.addPassthroughCopy( "src/posts/**/*.(gif|jpg|png|webp|svg)");
	eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
	

	///// Plugins
	eleventyConfig.addPlugin(pluginShortcodes);
	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(pluginI18n);
	eleventyConfig.addPlugin(pluginNavigation);	
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginTransforms);


	///// Collections
	eleventyConfig.addCollection("postsEn", (collectionApi) => {
		return collectionApi.getFilteredByGlob("./src/en/posts/**/*.md").reverse();
	});
	eleventyConfig.addCollection("postsRu", (collectionApi) => {
		return collectionApi.getFilteredByGlob("./src/ru/posts/**/*.md").reverse();
	});


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
