import type { SiteData } from "../types/site";

export function Marquee({ site }: { site: SiteData }) {
  const words = site.divisions.map(d => d.name);
  const trackItems = [...words, ...words, ...words, ...words];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="track" id="track">
        {trackItems.map((word, i) => (
          <span key={i}>{word}</span>
        ))}
      </div>
    </div>
  );
}
