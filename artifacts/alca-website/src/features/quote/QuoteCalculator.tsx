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
        <div style={{ padding: "16px" }}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
                color: "var(--ink, #3b1f2b)"
              }}
            >
              Event type
            </label>
            <select
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--line, #ebdccb)",
                borderRadius: "8px",
                fontSize: "1rem",
                backgroundColor: "var(--ground, #fffcf7)",
                color: "var(--ink, #3b1f2b)"
              }}
            >
              <option value="">Choose an event</option>
              {types.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
                color: "var(--ink, #3b1f2b)"
              }}
            >
              Event date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--line, #ebdccb)",
                borderRadius: "8px",
                fontSize: "1rem",
                backgroundColor: "var(--ground, #fffcf7)",
                color: "var(--ink, #3b1f2b)"
              }}
            />
          </div>

          <fieldset
            style={{
              border: "1px solid var(--line, #ebdccb)",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "20px"
            }}
          >
            <legend
              style={{
                fontWeight: "600",
                color: "var(--ink, #3b1f2b)",
                padding: "0 8px",
                fontSize: "1.1rem"
              }}
            >
              Food
            </legend>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setFood("Veg")}
                aria-pressed={food === "Veg"}
                style={{
                  flex: 1,
                  padding: "14px",
                  border: "2px solid",
                  borderColor: food === "Veg" ? "var(--accent)" : "var(--line, #ebdccb)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: food === "Veg" ? "var(--accent)" : "var(--ink, #3b1f2b)",
                  backgroundColor: food === "Veg" ? "rgba(var(--accent-rgb), 0.1)" : "var(--ground, #fffcf7)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                Veg · {rupees(q.vegPlate)}/plate
              </button>
              <button
                onClick={() => setFood("Non-veg")}
                aria-pressed={food === "Non-veg"}
                style={{
                  flex: 1,
                  padding: "14px",
                  border: "2px solid",
                  borderColor: food === "Non-veg" ? "var(--accent)" : "var(--line, #ebdccb)",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: food === "Non-veg" ? "var(--accent)" : "var(--ink, #3b1f2b)",
                  backgroundColor: food === "Non-veg" ? "rgba(var(--accent-rgb), 0.1)" : "var(--ground, #fffcf7)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                Non-veg · {rupees(q.nonvegPlate)}/plate
              </button>
            </div>
          </fieldset>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "var(--ink, #3b1f2b)"
              }}
            >
              Guests: <b>{guests}</b>
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <input
                aria-label="Number of guests"
                type="range"
                min={Number(q.minGuests) || 50}
                max="1000"
                step="10"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                style={{
                  width: "200px"
                }}
              />
              <span style={{ fontSize: "0.9rem", color: "var(--muted, #7a5e66)" }}>
                {Number(q.minGuests) || 50} - 1000
              </span>
            </div>
          </div>

          <fieldset
            style={{
              border: "1px solid var(--line, #ebdccb)",
              borderRadius: "8px",
              padding: "16px"
            }}
          >
            <legend
              style={{
                fontWeight: "600",
                color: "var(--ink, #3b1f2b)",
                padding: "0 8px",
                fontSize: "1.1rem"
              }}
            >
              Add-ons
            </legend>
            <div style={{ display: "grid", gap: "12px" }}>
              {options.map((x) => (
                <label
                  key={x}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "10px",
                    border: "1px solid var(--line, #ebdccb)",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                    backgroundColor: addons.includes(x)
                      ? "rgba(var(--accent-rgb), 0.05)"
                      : "var(--ground, #fffcf7)"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={addons.includes(x)}
                    onChange={(e) =>
                      setAddons((a) =>
                        e.target.checked ? [...a, x] : a.filter((y) => y !== x)
                      )
                    }
                    style={{ width: "16px", height: "16px" }}
                  />
                  <span>{x}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="feature-card" style={{ padding: "24px" }}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <small style={{
              display: "block",
              fontSize: "0.9rem",
              color: "var(--muted, #7a5e66)"
            }}>ESTIMATED FOOD TOTAL</small>
            <h4
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "var(--accent)",
                margin: "8px 0"
              }}
            >{rupees(total)}</h4>
            <p className="muted" style={{
              fontSize: "0.9rem",
              maxWidth: "280px"
            }}>
              Add-ons will be quoted based on your event.
            </p>
          </div>
          <button
            className="feature-button"
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "1.1rem",
              fontWeight: "700"
            }}
            onClick={() =>
              openWhatsApp(
                site.contact.mainPhone,
                `Hello ALCA, I would like an event quote.\nEvent: ${event || "Not selected"}\nDate: ${date || "Not selected"}\nGuests: ${guests}\nFood: ${food} · ${rupees(total)}\nAdd-ons: ${addons.length ? addons.join(", ") : "None"}`
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
