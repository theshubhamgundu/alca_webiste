import { useState } from "react";
import type { Division, StoreItem } from "../../types/site";
import { priceNumber, rupees } from "../../lib/format";
import { openWhatsApp } from "../../lib/whatsapp";
import "../features.css";
export function DryStore({
  division,
  addToCart,
}: {
  division: Division;
  addToCart: (name: string, price: number) => void;
}) {
  const [selected, setSelected] = useState<StoreItem | null>(null);
  if (!division.store?.length) return null;
  return (
    <section className="feature-panel" aria-labelledby="store-title">
      <small>ALCA BITES</small>
      <h3 id="store-title">Dry store</h3>
      <div className="feature-grid">
        {division.store.map((group) => (
          <div key={group.name}>
            <h4>
              {group.emoji} {group.name}
            </h4>
            {group.items.map((item) => (
              <article className="feature-card" key={item.name}>
                <button
                  className="text-button"
                  onClick={() => setSelected(item)}
                >
                  <span className="store-item-header">
                    <span className="store-item-emoji">{item.emoji}</span>
                    <span className="store-item-name">
                      <b>{item.name}</b>
                    </span>
                  </span>
                  {item.price && (
                    <span className="store-item-price">
                      <span className="price-value">
                        <strong>{rupees(priceNumber(item.price))}</strong>
                      </span>
                      {item.kcal && (
                        <span className="store-item-kcal">
                          {item.kcal} kcal
                        </span>
                      )}
                    </span>
                  )}
                  {!item.price && (
                    <span className="store-item-price muted">
                      Ask price
                    </span>
                  )}
                </button>
                <span className="muted">{item.about}</span>
                {item.goodFor && (
                  <span className="store-item-goodfor">
                    <span className="label">Good for:</span> {item.goodFor}
                  </span>
                )}
              </article>
            ))}
          </div>
        ))}
      </div>
      {selected && (
        <div
          className="feature-card feature-detail"
          role="dialog"
          aria-label={`${selected.name} details`}
        >
          <button className="text-button" onClick={() => setSelected(null)}>
            Close
          </button>
          <h4>
            {selected.emoji} {selected.name}
          </h4>
          <p>{selected.about}</p>
          <p>
            <b>Ingredients:</b> {selected.ingredients}
            <br />
            <b>Good for:</b> {selected.goodFor}
          </p>
          <p>
            <b>Nutrition:</b> {selected.kcal} kcal · protein {selected.protein}{" "}
            g · carbs {selected.carbs} g · sugar {selected.sugar} g · fibre{" "}
            {selected.fibre} g
          </p>
          <p>
            <b>Best within:</b> {selected.bestWithin}
          </p>
          {selected.price ? (
            <button
              className="feature-button"
              disabled={!selected.inStock}
              onClick={() =>
                addToCart(selected.name, priceNumber(selected.price))
              }
            >
              {selected.inStock ? "Add to cart" : "Sold out"}
            </button>
          ) : (
            <button
              className="feature-button"
              onClick={() =>
                openWhatsApp(
                  division.phone ?? "",
                  division.waText
                    ? `${division.waText.replace(/I\'d like to place an order\./i, `What is the price and availability of ${selected.name}?`)}`
                    : `Hi ALCA, what is the price and availability of ${selected.name}?`,
                )
              }
            >
              Ask price on WhatsApp
            </button>
          )}
        </div>
      )}
    </section>
  );
}
