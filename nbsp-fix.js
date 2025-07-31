const fs = require("fs");

// Prepositions and conjunctions after which a non-breaking space is needed
const NBSP_WORDS = [
	'а', 'без', 'бы', 'в', 'во', 'да', 'для', 'до', 'же', 'за', 'и', 'из',
	'к', 'как', 'ко', 'ли', 'на', 'над', 'не', 'но', 'о', 'об', 'обо',
	'от', 'по', 'под', 'при', 'про', 'с', 'со', 'то', 'у', 'через', 'я'
];

const NBSP = '\u00A0';

function processText(text) {
	// Replace space after short words with a non-breaking space
	// The word must be at the start of a line or after a space/punctuation mark
	const pattern = new RegExp(
		'(^|[\\s.,;:!?()\\[\\]"\'«»—-])((?:' + NBSP_WORDS.join('|') + ')) ([а-яёА-ЯЁa-zA-Z0-9])', 'gu'
	);

	return text.replace(pattern, (match, prefix, preposition, nextChar) => {
		return `${prefix}${preposition}${NBSP}${nextChar}`;
	});
}

function processFile(filePath) {
	const text = fs.readFileSync(filePath, "utf8");
	const newText = processText(text);
	if (text !== newText) {
		fs.writeFileSync(filePath, newText, "utf8");
		console.log(`Fixed: ${filePath}`);
	}
}

const targetFile = process.argv[2];

if (!targetFile) {
	console.log("Specify the file path, e.g.: pnpm fix:nbsp src/ru/articles/wcag-focus-not-obscured/index.md");
	process.exit(1);
}

if (!fs.existsSync(targetFile) || !targetFile.endsWith(".md")) {
	console.log("File not found or is not a .md file:", targetFile);
	process.exit(1);
}

processFile(targetFile);
console.log("Done!");
