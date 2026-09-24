import { useEffect, useRef } from "react";
import type { Division, SiteData } from "../types/site";
import { JuiceBar } from "../features/juice-bar/JuiceBar";
import { DryStore } from "../features/dry-store/DryStore";
import { Offers } from "../features/offers/Offers";
import { HamperBuilder } from "../features/hamper/HamperBuilder";
import { QuoteCalculator } from "../features/quote/QuoteCalculator";
import { SI, svcKind } from "../illustrations/ServiceIcons";
import { waLink } from "../lib/whatsapp";
import { usePublishedPhotos } from "../lib/businessPhotos";
import { supabase } from "@/lib/supabaseClient";

export function DivisionSection({
  div,
  site,
  addToCart,
}: {
  div: Division;
  site: SiteData;
  addToCart: (name: string, price: number) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const { data: publishedPhotos } = usePublishedPhotos();
  const approvedPhoto = publishedPhotos?.find((photo) => photo.section === div.id);

  // Helper to get public URL for a stored file with cache-busting version
  const getPhotoUrl = (path: string, version: number) => {
    const { data: publicUrl } = supabase.storage
      .from("business-photos")
      .getPublicUrl(path);

    // Append version as query parameter to bust cache when photo updates
    return `${publicUrl}?v=${version}`;
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          e.target.classList.add("seen");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  if (div.hidden) return null;

  return (
    <section
      className="div rv"
      id={div.id}
      ref={sectionRef}
      style={({ "--accent": `var(${div.c})` } as React.CSSProperties)}
    >
      <div className="div-head">
        <div>
          <span className="eyebrow" style={{ color: `var(${div.c})` }}>
            ALCA · {div.short}
          </span>

          <h2>
            <span className="u">{div.name}</span>
          </h2>
        </div>

        <p>{div.lead}</p>
      </div>

      {div.tags && div.tags.length > 0 && (
        <ul className="tags">
          {div.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      {/* Photos */}
      {approvedPhoto ? (
        <figure
          className="business-photo"
          style={{
            overflow: "hidden",
            borderRadius: "24px",
            margin: "0 0 25px",
          }}
        >
          <img
            src={getPhotoUrl(
              approvedPhoto.largePath,
              approvedPhoto.version
            )}
            srcSet={`${getPhotoUrl(
              approvedPhoto.smallPath,
              approvedPhoto.version
            )} 480w, ${getPhotoUrl(
              approvedPhoto.largePath,
              approvedPhoto.version
            )} 960w`}
            sizes="(max-width: 620px) calc(100vw - 24px), (max-width: 960px) calc(100vw - 32px), 960px"
            alt={approvedPhoto.alt}
            width="960"
            height="960"
            style={{
              display: "block",
              width: "100%",
              height: "clamp(220px, 38vw, 430px)",
              objectFit: "cover",
            }}
            loading="lazy"
            decoding="async"
          />
        </figure>
      ) : div.photos?.length || div.uploads?.length ? (
        <div className="photos">
          {div.photos?.map((p, i) => (
            <figure
              className="ph"
              key={i}
              style={{ "--i": i } as React.CSSProperties}
            >
              <img
                src={`${import.meta.env.BASE_URL}images/${p[0]}.webp`}
                alt={p[1]}
                loading="lazy"
              />
              <figcaption>{p[1]}</figcaption>
            </figure>
          ))}

          {div.uploads?.map((p, i) => (
            <figure
              className="ph"
              key={`up-${i}`}
              style={
                {
                  "--i": i + (div.photos?.length || 0),
                } as React.CSSProperties
              }
            >
              <img src={p[0]} alt={p[1]} loading="lazy" />
              <figcaption>{p[1]}</figcaption>
            </figure>
          ))}
        </div>
      ) : ["catering", "studio", "beauty", "supply"].includes(div.id) ? (
        <figure
          className="business-photo"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "24px",
            background: "var(--surface)",
            margin: "0 0 25px",
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/illustrative-${div.id}.jpg`}
            alt={`Illustrative image for ${div.name}`}
            style={{
              display: "block",
              width: "100%",
              height: "clamp(220px, 38vw, 430px)",
              objectFit: "cover",
            }}
            loading="lazy"
          />

          <figcaption
            style={{
              position: "absolute",
              right: "12px",
              bottom: "12px",
              padding: "6px 11px",
              borderRadius: "999px",
              color: "#3b1f2b",
              background: "rgba(255,252,247,0.9)",
              fontSize: ".72rem",
              fontWeight: 700,
            }}
          >
            Illustrative image
          </figcaption>
        </figure>
      ) : null}

      {/* Lunch Section */}
      {div.lunch && div.lunch.length > 0 && (
        <div className="lunch">
          <div className="lunch-intro">
            <span className="eyebrow" style={{ color: "var(--c1)" }}>
              Office lunch box
            </span>

            <h3>Homestyle lunch, delivered to your office</h3>

            <p>
              Fresh ingredients, hygienic and made daily. Free delivery to your
              office, and a special discount when 10+ people from one office
              order together.
            </p>

            <div className="truck">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
          </div>

          {div.lunch.map(([name, price, desc]) => (
            <div className="plan" key={name}>
              <h3>{name}</h3>

              <span className="price">
                {price}
                <span style={{ fontSize: ".78rem" }}>/month</span>
              </span>

              <p>{desc}</p>

              <button
                className="btn sm"
                onClick={() =>
                  addToCart(
                    `${name} (30 days)`,
                    parseInt(price.replace(/[^0-9]/g, ""), 10)
                  )
                }
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      )}

      {div.feature && div.feature.length > 0 && (
        <div className="feat">
          {div.feature.map(([name, price, desc]) => (
            <div className="plan" key={name}>
              <h3>{name}</h3>
              <span className="price">{price}</span>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Juice Bar */}
      {div.drinks && <JuiceBar division={div} addToCart={addToCart} />}

      {/* Offers & Dry Store in Bites */}
      {div.id === "bites" && (
        <>
          <Offers site={site} addToCart={addToCart} />
          <DryStore division={div} addToCart={addToCart} />
        </>
      )}

      {/* Quote in Celebrations */}
      {div.id === "catering" && null}
      {div.id === "celebrations" && <QuoteCalculator site={site} />}

      {/* Hamper in Gifts */}
      {div.id === "gifts" && <HamperBuilder site={site} />}

      {/* Menu / Bites Services */}
      {div.menu && div.menu.length > 0 && (
        <div className="menu">
          {div.menu.map(([groupName, items]) => (
            <div className="mgroup" key={groupName as string}>
              <h3>{groupName as string}</h3>

              <ul>
                {(items as [string, string, string?][]).map(
                  ([name, price, desc]) => (
                    <li
                      key={name}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        addToCart(
                          name,
                          parseInt(price.replace(/[^0-9]/g, ""), 10)
                        );
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();

                          addToCart(
                            name,
                            parseInt(price.replace(/[^0-9]/g, ""), 10)
                          );
                        }
                      }}
                    >
                      <span>{name}</span>
                      <i></i>
                      <b>₹{price}</b>
                      {desc && <small>{desc} kcal</small>}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Standard Features / Services list */}
      {div.s && div.s.length > 0 && (
        <ul className="list">
          {div.s.map(([name, desc]) => {
            const kind = svcKind(name);
            const iconSvg = SI[kind] || SI.sparkle;

            return (
              <li key={name}>
                <div className="sicon" aria-hidden="true">
                  <svg
                    viewBox="0 0 64 64"
                    dangerouslySetInnerHTML={{ __html: iconSvg }}
                  ></svg>
                </div>

                <h3>{name}</h3>
                <p>{desc}</p>
              </li>
            );
          })}
        </ul>
      )}

      <div className="cta">
        <a
          className="btn"
          href={waLink(
            div.phone
              ? site.contact.ordersPhone
              : site.contact.mainPhone,
            div.waText ||
            `Hi ALCA, I'd like to know more about ${div.name}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          {div.phone ? "Order on WhatsApp" : "Enquire on WhatsApp"}{" "}
          <span className="arrow">→</span>
        </a>

        {div.ig && (
          <a
            className="button ghost"
            href={`https://ig.me/m/${encodeURIComponent(div.ig)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            DM @{div.ig}
          </a>
        )}
      </div>
    </section>
  );
}