module.exports = eleventyConfig => {

	// Dates
	eleventyConfig.addFilter("readableDate", (value) => {
		return value.toLocaleString("ru", {
			year: "numeric",
			month: "long",
			day: "numeric"
		}).replace(" г.", "");
		return value;
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

