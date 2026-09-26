import { useEffect, useState } from "react";
import type { SiteData } from "../types/site";

const divIcons: Record<string, string> = {
  bites: "🍎",
  catering: "🍽️",
  celebrations: "🎉",
  gifts: "🎁",
  studio: "👗",
  beauty: "💄",
  supply: "🏭",
};

export function JumpMenu({ site }: { site: SiteData }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-60px 0px -60% 0px" },
    );

    site.divisions.forEach((d) => {
      const el = document.getElementById(d.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [site.divisions]);

  const visibleDivisions = site.divisions.filter((d) => !d.hidden);

  return (
    <div className="wrap">
      <nav className="jump" id="jump" aria-label="Jump to a business">
        {visibleDivisions.map((d) => {
          const divisionToPath: Record<string, string> = {
            bites: "/bites/index.html",
            catering: "/catering",
            celebrations: "/celebrations",
            gifts: "/crafts-gifts",
            studio: "/designer-studio",
            beauty: "/makeup-beauty",
            supply: "/supply",
          };
          const href = divisionToPath[d.id] || `#${d.id}`;
          return (
            <a
              key={d.id}
              href={href}
              rel={href.includes('.html') ? "external" : undefined}
              className={active === d.id ? "active" : ""}
              title={d.name}
            >
              <span className="jump-icon">{divIcons[d.id] || "📦"}</span>
              <span className="jump-label">{d.short || d.name}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
