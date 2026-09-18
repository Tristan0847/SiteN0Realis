import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,

    basePath: "/0",
    assetPrefix: "/0",

    // Pas d'optimisation des images en export statique
    images: {
        unoptimized: true,
    },

    env: {
        NEXT_PUBLIC_ASSET_PREFIXE: "/0",
        NEXT_BUILD_MODE: "export"
    },

    transpilePackages: ["lib"]
};

export default nextConfig;