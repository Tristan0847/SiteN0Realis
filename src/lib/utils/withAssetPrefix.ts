/**
 * Prefixes the path of a media with the asset prefix
 * @param path
 */
export function withAssetPrefix(path: string): string {
    const prefix = process.env.NEXT_PUBLIC_ASSET_PREFIXE ?? "";

    if (!prefix) {
        return path;
    }

    return `${prefix.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}