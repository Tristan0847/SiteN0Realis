import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique de l'application par défaut
  output: "export",
  basePath: "/rats",
  assetPrefix: "/rats",
  // Préfixe ajouté manuellement dans le code pour les assets, corrigeant l'ajout non automatique sur les balises <Image>
  env: {
    NEXT_PUBLIC_ASSET_PREFIXE: "/rats"
  },

  // Images non optimisées en export statique
  images: {
    unoptimized: true
  },

  // Trailing slash dans les URLs
  trailingSlash: true
};

export default nextConfig;