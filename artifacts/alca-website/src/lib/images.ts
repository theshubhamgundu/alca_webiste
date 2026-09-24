import type { ImageKey } from "../types/site";

/** Public WebP equivalents of the legacy IMG data-URI keys. */
export const imagePaths: Record<ImageKey, string> = {
  figurine: "/images/figurine.webp",
  idol: "/images/idol.webp",
  gift: "/images/gift.webp",
  wow: "/images/wow.webp",
  apricot: "/images/apricot.webp",
  trays: "/images/trays.webp",
};

export function imagePath(key: ImageKey): string {
  return imagePaths[key];
}
