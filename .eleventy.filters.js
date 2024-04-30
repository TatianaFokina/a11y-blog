module.exports = eleventyConfig => {

	// Dates
	eleventyConfig.addFilter("readableDate", function(value) {
		// Предполагаем, что page.lang доступен глобально
		const currentLang = this.page.lang; // Используем this.page.lang, если доступно
		return new Date(value).toLocaleString(currentLang, {
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
	
}

