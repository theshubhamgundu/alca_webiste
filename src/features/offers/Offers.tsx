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
        {site.offers.combos.map(([name, desc, price, old]) => (
          <article className="feature-card" key={name}>
            <h4>{name}</h4>
            <p>{desc}</p>
            <strong>{price ? rupees(price) : "Ask price"}</strong>
            {old && <del className="muted"> {rupees(old)}</del>}
            <br />
            <button
              className="feature-button"
              disabled={!price}
              onClick={() => addToCart(name, priceNumber(price))}
            >
              {price ? "Add to cart" : "Ask price"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
