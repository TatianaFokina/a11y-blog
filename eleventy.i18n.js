import { EleventyI18nPlugin } from "@11ty/eleventy";

const DEFAULT_LANGUAGE = "en";
const X_DEFAULT_HREFLANG = "x-default";

/** Returns hreflang links for a page (itself, its translations, x-default), or an empty list if it has no translations. */
function getHreflangLinks(translations, url, lang) {
	// A page without translations has nothing to point search engines to
	if (translations.length === 0) {
		return [];
	}

	const links = [{ lang, url }, ...translations];
	const defaultLanguageLink = links.find((link) => link.lang === DEFAULT_LANGUAGE);
	if (defaultLanguageLink) {
		links.push({ lang: X_DEFAULT_HREFLANG, url: defaultLanguageLink.url });
	}

	return links;
}

export default (eleventyConfig) => {
	// Language-neutral files (e.g. manifest.json) use it
	eleventyConfig.addGlobalData("defaultLanguage", DEFAULT_LANGUAGE);

	// Takes the output of `locale_links`, so it gets the same translations the plugin found
	eleventyConfig.addFilter("hreflangLinks", getHreflangLinks);

	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: DEFAULT_LANGUAGE,
		filters: {
			url: "locale_url",
			links: "locale_links",
		},
		errorMode: "strict",
	});

	// Translate filter
	eleventyConfig.addFilter("translate", function (key, lang = null) {
		// Get the current language from the page context
		const currentLang = lang || this.ctx.page.lang || DEFAULT_LANGUAGE;
		// Get translations for the current language
		const translations = this.ctx.i18n[currentLang];
		// Return translation or key if translation is missing
		return translations[key] || key;
	});
};
