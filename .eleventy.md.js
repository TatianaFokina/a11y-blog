const markdownIt = require("markdown-it");

module.exports = eleventyConfig => {
	let options = {
		html: true,
		breaks: true,
		linkify: true
	};

	let markdownLib = markdownIt(options).disable("code");
  	eleventyConfig.setLibrary("md", markdownLib);

	// Adds attributes for a links
	// Save the original renderer
    const defaultRender = markdownLib.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };
    markdownLib.renderer.rules.link_open = function(tokens, idx, options, env, self) {
        tokens[idx].attrPush(['rel', 'noopener']);
        // Call the original renderer
        return defaultRender(tokens, idx, options, env, self);
    };
}


