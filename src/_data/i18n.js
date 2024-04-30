const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const i18nDirectory = path.join(__dirname, 'i18n');
let translations = {};

// Read all files in the i18n directory
fs.readdirSync(i18nDirectory).forEach(file => {
  // Check if the file has the extension . yaml or . yml
  if (file.endsWith('.yaml') || file.endsWith('.yml')) {
    // Чтение и парсинг содержимого файла
    const fileContents = fs.readFileSync(path.join(i18nDirectory, file), 'utf8');
    const parsedContent = yaml.load(fileContents);

    // Combining the contents of the file with a common translation object
    translations = { ...translations, ...parsedContent };
  }
});

module.exports = translations;