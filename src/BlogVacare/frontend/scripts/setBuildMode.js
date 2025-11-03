const fs = require('fs');
const path = require('path');
const glob = require('glob');

const isExport = process.argv[2] === 'export';
const dynamicParamsValue = isExport ? 'false' : 'true';

console.log(`Mode: ${isExport ? 'EXPORT' : 'PRODUCTION'}`);

// #region Modif Page.tsx
// Modification des page.tsx pour rendre les paramètres dynamiques ou non

const baseDir = path.join(__dirname, '..');
const pageFiles = glob.sync('**/page.tsx', {
    cwd: baseDir,
    absolute: true
});

pageFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;
  
  // Remplace la valeur de dynamicParams
  content = content.replace(
    /export const dynamicParams = (true|false);/,
    `export const dynamicParams = ${dynamicParamsValue};`
  );
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
  }
});


//#region Modif Next.config.ts

// Modification du fichier de configuration du projet

console.log(`\nModification de next.config.ts...`);

const nextConfigPath = path.join(baseDir, 'next.config.ts');

if (!fs.existsSync(nextConfigPath)) {
  console.error(`Erreur: ${nextConfigPath} non trouvé`);
  process.exit(1);
}

let nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

let exportConfig = "";
if (isExport) {
  // Mode EXPORT
  exportConfig =
  `import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,

    // Pas d'optimisation des images en export statique
    images: {
      unoptimized: true,
    },
    
    env: {
      NEXT_BUILD_MODE: "export"
    }
  };

  export default nextConfig;`;
} else {
  // Mode PRODUCTION
  exportConfig = 
  `import type { NextConfig } from "next";

  const nextConfig: NextConfig = {
    env: {
      NEXT_BUILD_MODE: "Production"
    }
  };

  export default nextConfig;`;
}

// On ne modifie que s'il le faut
if (nextConfigContent != exportConfig) {
  fs.writeFileSync(nextConfigPath, exportConfig);
}

console.log(`\nConfiguration du projet terminée\n`);