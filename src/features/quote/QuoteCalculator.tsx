import { useMemo, useState } from "react";
import type { SiteData } from "../../types/site";
import { openWhatsApp } from "../../lib/whatsapp";
import { rupees } from "../../lib/format";
import "../features.css";

export function QuoteCalculator({ site }: { site: SiteData }) {
  const q = site.quote;
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(Number(q.minGuests) || 50);
  const [food, setFood] = useState<"Veg" | "Non-veg">("Veg");
  const [addons, setAddons] = useState<string[]>([]);

  if (!q.on) return null;

  const types = q.types
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  const options = q.addons
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  const subtotal = guests * Number(food === "Veg" ? q.vegPlate : q.nonvegPlate);
  const ready = Boolean(event.trim() && date.trim());
  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const quoteMessage = useMemo(
    () =>
      `Hello ALCA, I would like an event quote.\nEvent: ${event || "Not selected"}\nDate: ${date || "Not selected"}\nGuests: ${guests}\nFood: ${food} · ${rupees(subtotal)}\nAdd-ons: ${addons.length ? addons.join(", ") : "None"}`,
    [addons, date, event, food, guests, subtotal],
  );

  return (
    <section className="feature-panel quote-panel" aria-labelledby="quote-title">
      <div className="quote-header">
        <div>
          <small>EVENTS</small>
          <h3 id="quote-title">Quick quote estimate</h3>
        </div>
        <span className="quote-chip">Catering</span>
      </div>

      <div className="feature-grid quote-grid">
        <div className="quote-form">
          <label className="quote-field">
            <span>Event type</span>
            <select value={event} onChange={(e) => setEvent(e.target.value)}>
              <option value="">Choose an event</option>
              {types.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </label>

          <label className="quote-field">
            <span>Event date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <div className="quote-field">
            <span>Food preference</span>
            <div className="quote-toggle-row">
              <button
                type="button"
                className={`quote-toggle ${food === "Veg" ? "active" : ""}`}
                onClick={() => setFood("Veg")}
                aria-pressed={food === "Veg"}
              >
                Veg · {rupees(q.vegPlate)}/plate
              </button>
              <button
                type="button"
                className={`quote-toggle ${food === "Non-veg" ? "active" : ""}`}
                onClick={() => setFood("Non-veg")}
                aria-pressed={food === "Non-veg"}
              >
                Non-veg · {rupees(q.nonvegPlate)}/plate
              </button>
            </div>
          </div>

          <div className="quote-field">
            <div className="quote-inline-label">
              <span>Guests</span>
              <strong>{guests}</strong>
            </div>
            <input
              aria-label="Number of guests"
              type="range"
              min={Number(q.minGuests) || 50}
              max="1000"
              step="10"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </div>

          <div className="quote-field">
            <span>Add-ons</span>
            <div className="quote-addon-grid">
              {options.map((x) => (
                <label key={x} className="quote-check">
                  <input
                    type="checkbox"
                    checked={addons.includes(x)}
                    onChange={(e) =>
                      setAddons((a) =>
                        e.target.checked ? [...a, x] : a.filter((y) => y !== x),
                      )
                    }
                  />
                  <span>{x}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="feature-card quote-summary">
          <small>ESTIMATED FOOD TOTAL</small>
          <h4 className="quote-total">{rupees(subtotal)}</h4>
          <p className="muted">
            {ready
              ? "Add-ons will be quoted based on your event."
              : "Pick an event type and date to continue"}
          </p>

          {ready && (
            <div className="quote-meta">
              <span>{event}</span>
              <span>{formattedDate}</span>
            </div>
          )}

          <button
            type="button"
            className="feature-button quote-cta"
            onClick={() => openWhatsApp(site.contact.mainPhone, quoteMessage)}
            disabled={!ready}
          >
            Request quote on WhatsApp
          </button>
        </aside>
      </div>
    </section>
  );
}
