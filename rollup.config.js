import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
	input: "src/scripts/scripts.js", // Your main script file
	output: {
		file: "dist/scripts/bundle.js", // Output file
		format: "iife", // IIFE format suitable for the browser
	},
	plugins: [
		resolve(), // Resolves modules from node_modules
		commonjs(), // Converts CommonJS modules to ES6 for inclusion in the Rollup bundle
		terser({
			format: {
				comments: false, // Removes comments
			},
		}),
	],
};
