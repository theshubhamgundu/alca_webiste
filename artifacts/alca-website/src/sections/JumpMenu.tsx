import { useEffect, useState } from "react";
import type { SiteData } from "../types/site";

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

  return (
    <div className="wrap">
      <div className="jump" id="jump" aria-label="Jump to a business">
        {site.divisions
          .filter((d) => !d.hidden)
          .map((d) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              className={active === d.id ? "active" : ""}
            >
            {d.name}
            </a>
          ))}
        {(site.reviews?.length || site.faq?.length) ? <a href="#faq">Reviews &amp; FAQ</a> : null}
      </div>
    </div>
  );
}
