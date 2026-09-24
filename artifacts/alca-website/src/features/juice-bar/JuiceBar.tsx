import { useState } from "react";
import type { Division, Juice } from "../../types/site";
import { priceNumber, rupees } from "../../lib/format";
import { openWhatsApp } from "../../lib/whatsapp";
import "../features.css";
export function JuiceBar({
  division,
  addToCart,
}: {
  division: Division;
  addToCart: (name: string, price: number) => void;
}) {
  const [selected, setSelected] = useState<Juice | null>(null);
  if (!division.drinks?.length) return null;
  return (
    <section className="feature-panel" aria-labelledby="juice-title">
      <small>FRESHLY PRESSED</small>
      <h3 id="juice-title">Juice bar</h3>
      <p className="muted">Cold-pressed drinks made fresh for you.</p>
      <div className="feature-grid">
        {division.drinks.map((j) => (
          <article className="feature-card" key={j.name}>
            <button className="text-button" onClick={() => setSelected(j)}>
              <div className="juice-item-header">
                <span className="juice-item-emoji" style={{
                  background: `linear-gradient(135deg, ${j.color}20, ${j.color2}20)`,
                  color: j.color,
                  width: 24,
                  height: 24,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  fontSize: '1.2rem'
                }}>
                  {j.emoji}
                </span>
                <div className="juice-item-info">
                  <h4>{j.name}</h4>
                  <div className="juice-item-meta">
                    <span className="juice-item-kcal">{j.kcal} kcal</span>
                    {j.goodFor && (
                      <span className="juice-item-goodfor">
                        • {j.goodFor.split(',')[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
            <p className="muted">{j.about}</p>
            <div className="juice-item-price">
              <strong>{rupees(priceNumber(j.price))}</strong>
              <small>· {j.size}</small>
            </div>
            {j.inStock ? (
              <button
                className="feature-button"
                onClick={() => addToCart(j.name, priceNumber(j.price))}
              >
                Add to cart
              </button>
            ) : (
              <span className="soldout">Sold out</span>
            )}
          </article>
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
          </p>
          <p>
            <b>Nutrition:</b> {selected.kcal} kcal · protein {selected.protein}{" "}
            g · carbs {selected.carbs} g · sugar {selected.sugar} g · fibre{" "}
            {selected.fibre} g
          </p>
          <p>
            <b>Good for:</b> {selected.goodFor}
            <br />
            <b>Vitamins:</b> {selected.vitamins}
            <br />
            <b>Best within:</b> {selected.bestWithin}
          </p>
          {selected.inStock ? (
            <div className="juice-actions">
              <button
                className="feature-button"
                onClick={() => {
                  addToCart(selected.name, priceNumber(selected.price));
                  setSelected(null);
                }}
              >
                Add to cart
              </button>
              <button
                className="feature-button-outline"
                onClick={() => {
                  setSelected(null);
                }}
              >
                Try another
              </button>
            </div>
          ) : (
            <button
              className="feature-button"
              onClick={() =>
                openWhatsApp(
                  division.phone ?? "",
                  division.waText
                    ? `${division.waText.replace(/I\'d like to place an order\./i, `Is ${selected.name} available?`)}`
                    : `Hi ALCA, is ${selected.name} available?`,
                )
              }
            >
              Ask about availability on WhatsApp
            </button>
          )}
        </div>
      )}
    </section>
  );
}
