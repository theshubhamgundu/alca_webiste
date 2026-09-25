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
                  <b>
                    {item.emoji} {item.name}
                  </b>
                </button>
                <p className="muted">{item.about}</p>
                {item.price ? (
                  <>
                    <strong>{rupees(item.price)}</strong>
                    {item.options && (
                      <div className="flex gap-2 my-2">
                        {item.options.map((opt) => (
                          <span key={opt.weight} className="text-xs font-semibold bg-[#ebdccb] px-2 py-1 rounded">
                            {opt.weight}
                          </span>
                        ))}
                      </div>
                    )}
                    <br />
                    <button
                      className="feature-button"
                      disabled={!item.inStock}
                      onClick={() =>
                        addToCart(item.name, priceNumber(item.price))
                      }
                    >
                      {item.inStock ? "Add to cart" : "Sold out"}
                    </button>
                  </>
                ) : (
                  <button
                    className="feature-button"
                    onClick={() =>
                      openWhatsApp(
                        division.phone ?? "",
                        `Hi ALCA, what is the price and availability of ${item.name}?`,
                      )
                    }
                  >
                    Ask price on WhatsApp
                  </button>
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
          {selected.options && (
            <div className="flex gap-2 my-4">
              {selected.options.map((opt) => (
                <div key={opt.weight} className="border p-2 rounded-lg text-center">
                  <p className="font-bold">{opt.weight}</p>
                  <p>{rupees(opt.price)}</p>
                </div>
              ))}
            </div>
          )}
          {selected.kcal && (
            <p>
              <b>Nutrition:</b> {selected.kcal} kcal · protein{" "}
              {selected.protein} g · carbs {selected.carbs} g · sugar{" "}
              {selected.sugar} g · fibre {selected.fibre} g
            </p>
          )}
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
                  `Hi ALCA, what is the price and availability of ${selected.name}?`,
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
