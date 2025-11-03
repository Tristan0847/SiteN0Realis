const fs = require('fs');
const path = require('path');
const glob = require('glob');

const isExport = process.argv[2] === 'export';
const dynamicParamsValue = isExport ? 'false' : 'true';

console.log(`📝 Configuration dynamicParams = ${dynamicParamsValue}`);

// Recherche des fichiers page.tsx
const baseDir = path.join(__dirname, '..');
const pageFiles = glob.sync('**/**/[*]/page.tsx', {
    cwd: baseDir,
    absolute: true
});

pageFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remplace la valeur de dynamicParams selon le mode d'exportation
  content = content.replace(
    /export const dynamicParams = (true|false);/,
    `export const dynamicParams = ${dynamicParamsValue};`
  );
  
  fs.writeFileSync(file, content);
});