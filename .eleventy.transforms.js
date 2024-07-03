const prettyData = require("pretty-data");
const { JSDOM } = require("jsdom");

module.exports = eleventyConfig => {
	eleventyConfig.addTransform("xmlmin", function(content, outputPath) {
		if(outputPath && outputPath.endsWith(".xml")) {
			let result = prettyData.pd.xmlmin(content);
			return result;
		}
		return content;
	});

	// Add classes for some elements
	eleventyConfig.addTransform("addClasses", function(content, outputPath) {
		if (outputPath && outputPath.endsWith(".html")) {
			const dom = new JSDOM(content);
			const document = dom.window.document;

		// Add class to <pre> elements
		document.querySelectorAll("pre").forEach(element => {
			element.classList.add("article__code");
		});

			return dom.serialize();
		}
		return content;
	});
}