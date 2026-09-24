import { useState } from "react";
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
  const total = guests * Number(food === "Veg" ? q.vegPlate : q.nonvegPlate);
  return (
    <section className="feature-panel" aria-labelledby="quote-title">
      <small>EVENTS</small>
      <h3 id="quote-title">Quick quote estimate</h3>
      <div className="feature-grid">
        <div>
          <label>
            Event type
            <select value={event} onChange={(e) => setEvent(e.target.value)}>
              <option value="">Choose an event</option>
              {types.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Event date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <fieldset>
            <legend>Food</legend>
            <button
              className="feature-button"
              onClick={() => setFood("Veg")}
              aria-pressed={food === "Veg"}
            >
              Veg · {rupees(q.vegPlate)}/plate
            </button>{" "}
            <button
              className="feature-button"
              onClick={() => setFood("Non-veg")}
              aria-pressed={food === "Non-veg"}
            >
              Non-veg · {rupees(q.nonvegPlate)}/plate
            </button>
          </fieldset>
          <label>
            Guests: <b>{guests}</b>
            <input
              aria-label="Number of guests"
              type="range"
              min={Number(q.minGuests) || 50}
              max="1000"
              step="10"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </label>
          <fieldset>
            <legend>Add-ons</legend>
            {options.map((x) => (
              <label key={x}>
                <input
                  type="checkbox"
                  checked={addons.includes(x)}
                  onChange={(e) =>
                    setAddons((a) =>
                      e.target.checked ? [...a, x] : a.filter((y) => y !== x),
                    )
                  }
                />{" "}
                {x}
              </label>
            ))}
          </fieldset>
        </div>
        <div className="feature-card">
          <small>ESTIMATED FOOD TOTAL</small>
          <h4 style={{ fontSize: "2rem" }}>{rupees(total)}</h4>
          <p className="muted">Add-ons will be quoted based on your event.</p>
          <button
            className="feature-button"
            onClick={() =>
              openWhatsApp(
                site.contact.mainPhone,
                `Hello ALCA, I would like an event quote.\nEvent: ${event || "Not selected"}\nDate: ${date || "Not selected"}\nGuests: ${guests}\nFood: ${food} · ${rupees(total)}\nAdd-ons: ${addons.length ? addons.join(", ") : "None"}`,
              )
            }
          >
            Request quote on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
