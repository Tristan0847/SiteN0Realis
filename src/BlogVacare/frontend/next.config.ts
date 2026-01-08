import type { NextConfig } from "next";

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

  export default nextConfig;