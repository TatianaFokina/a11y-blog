const { EleventyI18nPlugin } = require("@11ty/eleventy");	

module.exports = eleventyConfig => {

	// Official i18n plugin
	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: "ru", // Set your default language
		filters: {
			url: "locale_url",
			links: "locale_links"
		},
		errorMode: "strict"
	});

	// Translate filter
	eleventyConfig.addFilter("translate", function(key, lang = null) {	
		const currentLang = lang || this.ctx.page.lang || 'ru'; // Get the current language from the page context
		const translations = this.ctx.i18n[currentLang]; // Get translations for the current language
		return translations[key] || key; // Return translation or key if translation is missing
	});

}	
