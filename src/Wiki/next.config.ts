import type { NextConfig } from "next";

const { withContentlayer } = require("next-contentlayer2");

const nextConfig: NextConfig = {
  // Export statique de l'application par défaut
  output: "export",
  basePath: "/wiki",
  assetPrefix: "/wiki",
  // Préfixe ajouté manuellement dans le code pour les assets, corrigeant l'ajout non automatique sur les balises <Image>
  env: {
    NEXT_PUBLIC_ASSET_PREFIXE: "/wiki"
  },

  // Images non optimisées en export statique
  images: {
    unoptimized: true
  },

  // Trailing slash dans les URLs
  trailingSlash: true,

  // Packages à transpiler
  transpilePackages: ["next-contentlayer2", "svg-toolbelt"]
};

export default withContentlayer(nextConfig);