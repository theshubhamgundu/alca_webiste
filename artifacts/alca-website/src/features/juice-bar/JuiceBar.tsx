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
              <span style={{ fontSize: "2rem" }} aria-hidden>
                {j.emoji}
              </span>
              <h4>{j.name}</h4>
            </button>
            <p className="muted">{j.about}</p>
            <b>
              {rupees(j.price)} <small>· {j.size}</small>
            </b>
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
            <button
              className="feature-button"
              onClick={() => {
                addToCart(selected.name, priceNumber(selected.price));
                setSelected(null);
              }}
            >
              Add to cart
            </button>
          ) : (
            <button
              className="feature-button"
              onClick={() =>
                openWhatsApp(
                  division.phone ?? "",
                  `Hi ALCA, is ${selected.name} available?`,
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
