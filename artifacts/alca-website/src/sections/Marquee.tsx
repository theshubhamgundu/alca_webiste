import type { SiteData } from "../types/site";

export function Marquee({ site }: { site: SiteData }) {
  const words = site.divisions.flatMap(d => [
    ...(d.s ?? []).map(([name]) => name),
    ...(d.feature ?? []).map(([name]) => name),
  ]);
  const trackItems = [...words, ...words];

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
