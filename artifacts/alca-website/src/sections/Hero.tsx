import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import type { SiteData } from "../types/site";
import { usePublishedPhotos } from "../lib/businessPhotos";

const orbitImages = {
  bites: "trays.webp",
  catering: "illustrative-catering.jpg",
  celebrations: "wow.webp",
  gifts: "gift.webp",
  studio: "illustrative-studio.jpg",
  beauty: "illustrative-beauty.jpg",
  supply: "illustrative-supply.jpg",
} as const;

export function Hero({ site }: { site: SiteData }) {
  const { data: publishedPhotos } = usePublishedPhotos();
  const [wordIndex, setWordIndex] = useState(0);
  const words = [
    "celebrations",
    "catering",
    "healthy snacks",
    "gifts",
    "designer wear",
    "beauty",
    "manufacturing",
  ];
  const ambientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [words.length]);

  useEffect(() => {
    if (!ambientRef.current) return;
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isReduced || ambientRef.current.children.length > 0) return;

    const R = (m: number, n: number) => m + Math.random() * (n - m);
    let s = "";
    for (let i = 0; i < 16; i++) {
      s += `<i class="ff" style="left:${R(0, 100)}%;top:${R(5, 95)}%;--t:${R(6, 12)}s;--dl:${-R(0, 10)}s;--x1:${R(-60, 60)}px;--y1:${R(-50, 50)}px;--x2:${R(-60, 60)}px;--y2:${R(-50, 50)}px"></i>`;
    }
    const lc = ["#6CC24A", "#F9B233", "#E4418B", "#8FB84A", "#F28C28"];
    for (let i = 0; i < 7; i++) {
      s += `<span class="leaf" style="left:${R(0, 95)}%;--t:${R(9, 16)}s;--dl:${-R(0, 14)}s;--dx:${R(-120, 120)}px"><svg viewBox="0 0 24 24"><path d="M3 21C3 10 10 3 21 3c0 11-7 18-18 18z" fill="${lc[i % 5]}" opacity=".8"/><path d="M3 21L15 9" stroke="#fff" stroke-width="1.2" opacity=".7"/></svg></span>`;
    }
    ambientRef.current.innerHTML = s;
  }, []);

  return (
    <div className="wrap" style={{ position: "relative" }}>
      <header className="hero">
        <div
          className="ambient"
          id="ambient"
          aria-hidden="true"
          ref={ambientRef}
        />
        <div>
          <span className="eyebrow">{site.hero.eyebrow}</span>
          <h1>
            <span className="line">
              <span>One brand for</span>
            </span>
            <span className="line rot">
              {words.map((word, i) => (
                <b
                  key={word}
                  className={
                    i === wordIndex
                      ? "on"
                      : i ===
                          (wordIndex === 0 ? words.length - 1 : wordIndex - 1)
                        ? "out"
                        : ""
                  }
                >
                  {word}.
                </b>
              ))}
            </span>
          </h1>
          <p>{site.hero.text}</p>
          <div className="cta">
            <a className="btn !text-white" href="#services">
              Explore services <span className="arrow">→</span>
            </a>
            <a className="btn ghost !text-white" href="#contact">
              Contact
            </a>
          </div>
        </div>
        <div className="orbit" aria-label="ALCA businesses">
          <div className="ring"></div>
          <div className="core">
            <img
              src={`${import.meta.env.BASE_URL}images/alca-logo-1.webp`}
              alt="ALCA logo"
            />
          </div>
          <div className="spin" id="spin">
            {site.divisions.map((div, i) => {
              const angle = i * (360 / site.divisions.length) + "deg";
              const img =
                orbitImages[div.id as keyof typeof orbitImages] ||
                "alca-logo-1.webp";
              const published = publishedPhotos?.find((photo) => photo.section === div.id);
              const imageUrl = published
                ? `/api/business-photos/${div.id}/small?v=${published.version}`
                : `${import.meta.env.BASE_URL}images/${img}`;

              const divisionToPath: Record<string, string> = {
                catering: "/catering",
                celebrations: "/celebrations",
                gifts: "/crafts-gifts",
                studio: "/designer-studio",
                beauty: "/makeup-beauty",
                supply: "/supply",
              };
              const href = divisionToPath[div.id] || `#${div.id}`;

              return (
                <motion.a
                  key={div.id}
                  href={href}
                  style={
                    {
                      "--a": angle,
                      background: `var(${div.c})`,
                    } as React.CSSProperties
                  }
                  aria-label={div.name}
                >
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                       background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("${imageUrl}") center/cover`,
                      borderRadius: "50%",
                    }}
                  >
                    <b style={{ whiteSpace: "pre-wrap" }}>
                      {div.short.replace(" & ", " &\n")}
                    </b>
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}
