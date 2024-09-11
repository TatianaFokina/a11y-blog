const { EleventyI18nPlugin } = require("@11ty/eleventy");

module.exports = (eleventyConfig) => {
	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		// Default language
		defaultLanguage: "ru",
		filters: {
			url: "locale_url",
			links: "locale_links",
		},
		errorMode: "strict",
	});

	// Translate filter
	eleventyConfig.addFilter("translate", function (key, lang = null) {
		// Get the current language from the page context
		const currentLang = lang || this.ctx.page.lang || "ru";
		// Get translations for the current language
		const translations = this.ctx.i18n[currentLang];
		// Return translation or key if translation is missing
		return translations[key] || key;
	});
};
