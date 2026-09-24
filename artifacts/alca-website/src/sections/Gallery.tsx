import type { SiteData } from "../types/site";

export function Gallery({ site }: { site: SiteData }) {
  // Preserve the original site's gallery order; editor uploads follow the six originals.
  const originals = [
    ["trays", "Alca Bites"],
    ["idol", "Gifts"],
    ["wow", "Events"],
    ["apricot", "Desserts"],
    ["gift", "Custom gifts"],
    ["figurine", "Figurines"],
  ] as const;
  const allPhotos = [
    ...originals.map(([file, caption]) => ({
      src: `${import.meta.env.BASE_URL}images/${file}.webp`,
      caption,
    })),
    ...site.divisions
      .flatMap((d) =>
        (d.uploads ?? [])
          .slice(0, 2)
          .map(([src, caption]) => ({ src, caption: caption || d.short })),
      )
      .slice(0, 8),
  ];
  if (allPhotos.length === 0) return null;

  return (
    <div className="gallery" aria-label="Photos from ALCA">
      <div className="gtrack" id="gtrack">
        {/* Double the array for continuous scroll */}
        {[...allPhotos, ...allPhotos].map((item, i) => (
          <figure
            key={i}
            aria-hidden={i >= allPhotos.length ? "true" : undefined}
          >
            <img src={item.src} alt={item.caption} loading="lazy" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
