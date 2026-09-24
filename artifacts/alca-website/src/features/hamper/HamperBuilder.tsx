import { useState } from "react";
import type { SiteData } from "../../types/site";
import { rupees } from "../../lib/format";
import { openWhatsApp } from "../../lib/whatsapp";
import "../features.css";

export function HamperBuilder({ site }: { site: SiteData }) {
  const [size, setSize] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const [recipient, setRecipient] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  if (!site.hamper.on) return null;
  const box = site.hamper.boxes[size];
  const limit = Number(box?.[1]) || 0;
  const products = site.divisions.flatMap(
    (d) =>
      d.store?.flatMap((g) =>
        g.items.filter((i) => i.price).map((i) => i.name),
      ) ?? [],
  );
  const add = (name: string) =>
    items.length < limit && setItems((x) => [...x, name]);
  return (
    <section className="feature-panel" aria-labelledby="hamper-title">
      <small>GIFTING</small>
      <h3 id="hamper-title">Build a hamper</h3>
      <p className="muted">{site.hamper.note}</p>
      <div className="feature-grid">
        <div>
          <h4>Choose your box</h4>
          {site.hamper.boxes.map((b, i) => (
            <button
              className="feature-button"
              style={{ margin: 4, opacity: i === size ? 1 : 0.65 }}
              key={b[0]}
              onClick={() => {
                setSize(i);
                setItems([]);
              }}
            >
              {b[0]} · {b[1]} items {b[2] && `· ${rupees(b[2])}`}
            </button>
          ))}
          <h4>
            Choose items ({items.length}/{limit})
          </h4>
          <div className="feature-grid">
            {products.map((name) => (
              <button
                className="text-button"
                disabled={items.length >= limit}
                key={name}
                onClick={() => add(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        <div className="feature-card">
          <h4>Your hamper</h4>
          {items.length ? (
            <ul>
              {items.map((x, i) => (
                <li key={`${x}-${i}`}>{x}</li>
              ))}
            </ul>
          ) : (
            <p className="muted">Choose items to fill your hamper.</p>
          )}
          <label>
            Recipient name
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </label>
          <label>
            Needed by
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            Card message
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </label>
          <button
            className="feature-button"
            disabled={!items.length}
            onClick={() =>
              openWhatsApp(
                site.contact.mainPhone,
                `Hello ALCA, I'd like a ${box[0]} hamper.\nRecipient: ${recipient || "Not provided"}\nRequired date: ${date || "Not provided"}\nItems: ${items.join(", ")}\nCard message: ${note || "None"}`,
              )
            }
          >
            Request hamper on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
