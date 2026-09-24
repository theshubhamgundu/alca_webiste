import { useState } from "react";
import type { SiteData } from "../types/site";
import { waLink } from "../lib/whatsapp";

export function SwapConcierge({ site }: { site: SiteData }) {
  const [alt, setAlt] = useState(false);
  const types = site.quote?.types
    ?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) || ["Wedding", "Birthday", "Corporate event", "Festival"];

  const foodSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = `Hello ALCA, I want to order food.\nName: ${fd.get("name")}\nPhone: ${fd.get("phone")}\nDelivery area: ${fd.get("area")}\nWhat I need: ${fd.get("need")}`;
    window.open(
      waLink(site.contact.ordersPhone, text),
      "_blank",
      "noopener,noreferrer",
    );
  };

  const eventSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const text = `Hello ALCA, I want to plan an event.\nName: ${fd.get("name")}\nPhone: ${fd.get("phone")}\nEvent type: ${fd.get("evt")}\nDate: ${fd.get("date")}\nGuests: ${fd.get("guests")}`;
    window.open(
      waLink(site.contact.mainPhone, text),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className={`swap rv ${alt ? "alt" : ""}`} id="swap">
      <div className="sw-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={!alt}
          onClick={() => setAlt(false)}
        >
          Order food
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={alt}
          onClick={() => setAlt(true)}
        >
          Plan an event
        </button>
      </div>

      <form className="sw-form sw-food" onSubmit={foodSubmit}>
        <div>
          <h3>Order food &amp; snacks</h3>
          <p>Tell us what you need. We'll confirm on WhatsApp.</p>
        </div>
        <label>
          Your name <input name="name" required />
        </label>
        <label>
          Phone number <input type="tel" name="phone" required />
        </label>
        <label>
          Delivery area (or pickup) <input name="area" required />
        </label>
        <label>
          What do you need?{" "}
          <input
            name="need"
            required
            placeholder="e.g. 5 juice bottles, 2 kg almonds"
          />
        </label>
        <button type="submit" className="btn">
          Send on WhatsApp <span className="arrow">→</span>
        </button>
      </form>

      <form className="sw-form sw-event" onSubmit={eventSubmit}>
        <div>
          <h3>Plan an event</h3>
          <p>Catering, décor and management. Let's make it beautiful.</p>
        </div>
        <label>
          Your name <input name="name" required />
        </label>
        <label>
          Phone number <input type="tel" name="phone" required />
        </label>
        <label>
          Event type
          <select name="evt">
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <label>
            Date <input type="date" name="date" required />
          </label>
          <label>
            Guests{" "}
            <input
              type="number"
              name="guests"
              min="10"
              defaultValue="100"
              required
            />
          </label>
        </div>
        <button type="submit" className="btn">
          Send on WhatsApp <span className="arrow">→</span>
        </button>
      </form>

      <div className="sw-over">
        <div className="ov ov-a">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <rect
              x="12"
              y="34"
              width="40"
              height="20"
              rx="6"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
            />
            <path
              d="M12 40h40M22 34V20M42 34V20"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
            />
            <circle
              cx="32"
              cy="14"
              r="6"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
            />
          </svg>
          <h3>Or plan an event?</h3>
          <p>Weddings, birthdays, corporate catering and celebrations.</p>
          <button type="button" onClick={() => setAlt(true)}>
            Plan an event
          </button>
        </div>
        <div className="ov ov-b">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path
              d="M16 20h32l-4 30H20z"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M22 20c0-8 20-8 20 0"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
            />
            <path
              d="M24 32v10M32 32v10M40 32v10"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <h3>Or order food?</h3>
          <p>Healthy snacks, cold-pressed juices and office lunch boxes.</p>
          <button type="button" onClick={() => setAlt(false)}>
            Order food
          </button>
        </div>
        <i
          className="bub"
          style={{ width: 120, height: 120, left: "-20%", top: "-20%" }}
        ></i>
        <i
          className="bub"
          style={{
            width: 80,
            height: 80,
            right: "10%",
            bottom: "-10%",
            animationDelay: "-4s",
          }}
        ></i>
      </div>
    </div>
  );
}
