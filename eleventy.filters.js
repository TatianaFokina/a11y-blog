import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export default (eleventyConfig) => {
	// Dates
	eleventyConfig.addFilter("dateFormat", function (value, format) {
		const date = new Date(value);
		if (isNaN(date.getTime())) {
			// If the string cannot be converted to a date, return it as is
			return value;
		}
		switch (format) {
			case "readable":
				const currentLang = this.page.lang;
				return date
					.toLocaleString(currentLang, {
						year: "numeric",
						month: "long",
						day: "numeric",
					})
					.replace(" г.", "");
			case "ISO":
				return date.toISOString();
		}
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("slice", (array, n) => {
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Filehash
	const assetHashes = {};
	eleventyConfig.addFilter("filehash", (url) => {
		if (process.env.ELEVENTY_ENV !== "production") {
			return url;
		}

		const filePath = path.join(eleventyConfig.dir.output, url);
		if (!assetHashes[url]) {
			const fileBuffer = fs.readFileSync(filePath);
			const hashSum = crypto.createHash("md5");
			hashSum.update(fileBuffer);
			assetHashes[url] = hashSum.digest("hex").substring(0, 8);
		}

		return `${url}?v=${assetHashes[url]}`;
	});
};
