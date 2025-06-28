const fs = require("fs");

// Prepositions and conjunctions after which a non-breaking space is needed
const NBSP_WORDS = [
	'в', 'и', 'к', 'с', 'у', 'о', 'а', 'я', 'но', 'на', 'по', 'из', 'от', 'до', 'за', 'не', 'то', 'ли', 'бы', 'же', 'над', 'под', 'об', 'без', 'для', 'при', 'про', 'через', 'или', 'как', 'со', 'обо', 'про', 'при', 'про', 'без', 'под', 'над', 'из', 'до', 'от', 'по', 'за', 'на', 'об', 'обо', 'со', 'ко', 'во', 'же', 'ли', 'бы', 'то', 'а', 'но', 'и', 'да', 'о', 'у', 'к', 'с', 'в', 'я', 'а', 'но', 'и', 'да', 'о', 'у', 'к', 'с', 'в', 'я'
];

const NBSP = '\u00A0';

function processText(text) {
	// Replace space after short words with a non-breaking space
	// Only if not inside code/tags/links
	// Example: " в доме" => "\u00A0доме"
	// The word must be at the start of a line or after a space/punctuation mark
	// Character class: space, punctuation marks (brackets are escaped)
	const pattern = new RegExp(
		'(^|[\\s.,;:!?()\\[\\]"\'«»—-])((?:' + NBSP_WORDS.join('|') + ')) ([а-яёА-ЯЁa-zA-Z0-9])', 'gu'
	);
	return text.replace(pattern, (before, word, after) => `${before}${word}${NBSP}${after}`);
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
