import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";

const i18nDirectory = path.join(import.meta.dirname, "i18n");
let translations = {};

fs.readdirSync(i18nDirectory).forEach((file) => {
	if (file.endsWith(".yaml") || file.endsWith(".yml")) {
		const fileContents = fs.readFileSync(
			path.join(i18nDirectory, file),
			"utf8"
		);
		const parsedContent = loadYaml(fileContents);

		// Combine content of a file with a translation object for each language
		Object.keys(parsedContent).forEach((lang) => {
			if (!translations[lang]) {
				translations[lang] = {};
			}
			translations[lang] = {
				...translations[lang],
				...parsedContent[lang],
			};
		});
	}
});

export default translations;
