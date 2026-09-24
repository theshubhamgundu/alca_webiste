import type { SiteData } from "../../types/site";
import { priceNumber, rupees } from "../../lib/format";
import "../features.css";
export function Offers({
  site,
  addToCart,
}: {
  site: SiteData;
  addToCart: (name: string, price: number) => void;
}) {
  if (!site.offers.on) return null;
  return (
    <section className="feature-panel" aria-labelledby="offers-title">
      <small>ALCA BITES</small>
      <h3 id="offers-title">Offers & combos</h3>
      <p className="muted">{site.offers.special}</p>
      <div className="feature-grid">
        {site.offers.combos.map(([name, desc, price, old], index) => {
          const priceNum = priceNumber(price);
          const oldPriceNum = priceNumber(old);
          const discount = oldPriceNum > 0 && priceNum > 0 ? Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100) : 0;
          const isBestValue = discount >= 20; // Consider 20%+ discount as best value

          return (
            <article
              className={`feature-card${isBestValue ? " feature-card--best" : ""}`}
              key={name}
            >
              <h4>{name}</h4>
              <p>{desc}</p>
              <div className="offer-pricing">
                {old && oldPriceNum > 0 ? (
                  <>
                    <del className="muted">{rupees(oldPriceNum)}</del>
                    <strong>{rupees(priceNum)}</strong>
                    {discount > 0 && (
                      <span className="offer-badge">-{discount}%</span>
                    )}
                  </>
                ) : (
                  <strong>{price ? rupees(priceNum) : "Ask price"}</strong>
                )}
              </div>
              {isBestValue && (
                <span className="offer-tag">Best Value</span>
              )}
              <br />
              <button
                className="feature-button"
                disabled={!price}
                onClick={() => addToCart(name, priceNum)}
              >
                {price ? "Add to cart" : "Ask price"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
