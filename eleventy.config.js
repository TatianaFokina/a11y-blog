import { load as loadYaml } from "js-yaml";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginNavigation from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

// 11ty config files
import pluginMd from "./eleventy.md.js";
import pluginShortcodes from "./eleventy.shortcodes.js";
import pluginFilters from "./eleventy.filters.js";
import pluginI18n from "./eleventy.i18n.js";
import pluginTransforms from "./eleventy.transforms.js";

export default function (eleventyConfig) {
	eleventyConfig.addDataExtension("yaml", (contents) => loadYaml(contents));
	eleventyConfig.addGlobalData("env", process.env.ELEVENTY_ENV);

	// Plugins
	eleventyConfig.addPlugin(pluginMd);
	eleventyConfig.addPlugin(pluginShortcodes);
	eleventyConfig.addPlugin(pluginFilters);
	eleventyConfig.addPlugin(pluginI18n);
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(pluginTransforms);
	eleventyConfig.addPlugin(syntaxHighlight);

	// Collections
	eleventyConfig.addCollection("articlesEn", (collectionApi) => {
		return collectionApi.getFilteredByGlob("src/en/articles/*/*.md").reverse();
	});
	eleventyConfig.addCollection("articlesRu", (collectionApi) => {
		return collectionApi.getFilteredByGlob("src/ru/articles/*/*.md").reverse();
	});

	// Build options
	eleventyConfig.addPassthroughCopy("src/manifest.json");
	eleventyConfig.addPassthroughCopy("src/robots.txt");
	eleventyConfig.addPassthroughCopy("src/fonts");
	eleventyConfig.addPassthroughCopy("src/scripts");
	eleventyConfig.addPassthroughCopy({ "src/assets/*.{svg,jpg,png}": "assets" });
	eleventyConfig.addPassthroughCopy({
		"src/assets/favicons/*.{svg,jpg,png,ico}": "assets/favicons",
	});
	eleventyConfig.addPassthroughCopy(
		"src/(en|ru)/articles/**/*.(gif|jpg|png|webp|svg)"
	);
}

export const config = {
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
	templateFormats: ["md", "njk"],
};
