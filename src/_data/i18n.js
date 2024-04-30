const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const i18nDirectory = path.join(__dirname, 'i18n');
let translations = {};

fs.readdirSync(i18nDirectory).forEach(file => {
  if (file.endsWith('.yaml') || file.endsWith('.yml')) {
    const fileContents = fs.readFileSync(path.join(i18nDirectory, file), 'utf8');
    const parsedContent = yaml.load(fileContents);

    // Объединяем содержимое файла с объектом переводов по каждому языку
    Object.keys(parsedContent).forEach(lang => {
      if (!translations[lang]) {
        translations[lang] = {};
      }
      translations[lang] = {
        ...translations[lang],
        ...parsedContent[lang]
      };
    });
  }
});

module.exports = translations;