const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs').default;
const terser = require('@rollup/plugin-terser').default;

module.exports = {
	input: 'src/scripts/scripts.js', // Your main script file
	output: {
		file: 'dist/scripts/bundle.js', // Output file
		format: 'iife', // IIFE format suitable for the browser
	},
	plugins: [
		resolve(), // Resolves modules from node_modules
		commonjs(), // Converts CommonJS modules to ES6 for inclusion in the Rollup bundle
		terser({
			format: {
				comments: false, // Удаляет комментарии
			},
		}),
	]
};
