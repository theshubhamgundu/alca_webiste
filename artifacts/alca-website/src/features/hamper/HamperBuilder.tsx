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
  const [boxNotice, setBoxNotice] = useState("");
  if (!site.hamper.on) return null;

  const box = site.hamper.boxes[size];
  const limit = Number(box?.[1]) || 0;
  const remaining = Math.max(limit - items.length, 0);
  const isFull = limit > 0 && items.length === limit;
  const now = new Date();
  const minDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const products = site.divisions.flatMap(
    (d) =>
      d.store?.flatMap((g) =>
        g.items.filter((i) => i.price).map((i) => i.name),
      ) ?? [],
  );
  const formattedDate = date
    ? new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(`${date}T00:00:00`))
    : "Not provided";

  const toggle = (name: string) => {
    setItems((prev) => {
      if (prev.includes(name)) return prev.filter((x) => x !== name);
      if (prev.length >= limit) return prev;
      return [...prev, name];
    });
  };

  const chooseSize = (i: number) => {
    const newLimit = Number(site.hamper.boxes[i]?.[1]) || 0;
    const removedCount = Math.max(items.length - newLimit, 0);
    setSize(i);
    setItems((prev) => prev.slice(0, newLimit));
    setBoxNotice(
      removedCount
        ? `${removedCount} selected ${removedCount === 1 ? "item was" : "items were"} removed to fit the ${site.hamper.boxes[i][0].toLowerCase()} hamper.`
        : `${site.hamper.boxes[i][0]} hamper selected.`,
    );
  };

  return (
    <section
      className="feature-panel gift-hamper"
      aria-labelledby="hamper-title"
    >
      <small className="gift-kicker">GIFTING · MADE PERSONAL</small>
      <h3 id="hamper-title">Build a hamper</h3>
      <p className="gift-intro">{site.hamper.note}</p>

      <div className="feature-grid">
        <div className="gift-options">
          <div className="gift-section-heading">
            <h4>Choose your box</h4>
            <p>Pick a size, then fill each spot with a favourite.</p>
          </div>
          <div className="box-grid gift-box-grid">
            {site.hamper.boxes.map((b, i) => (
              <button
                key={b[0]}
                type="button"
                className="box-option gift-box-option"
                aria-pressed={i === size}
                onClick={() => chooseSize(i)}
              >
                <span className="box-option-name">{b[0]}</span>
                <span className="box-option-meta">
                  {b[1]} items{b[2] ? ` · ${rupees(b[2])}` : ""}
                </span>
                <span className="gift-box-state">
                  {i === size ? "Selected" : "Choose size"}
                </span>
              </button>
            ))}
          </div>
          <p className="gift-box-notice" role="status" aria-live="polite">
            {boxNotice || "You can change the hamper size at any time."}
          </p>

          <div className="gift-items-heading">
            <h4>Choose items</h4>
            <div className="gift-count" aria-live="polite">
              <strong>{items.length}/{limit}</strong>
              <span>{isFull ? "Hamper full" : `${remaining} spots left`}</span>
            </div>
          </div>
          <div
            className="gift-progress"
            role="progressbar"
            aria-label="Hamper filled"
            aria-valuemin={0}
            aria-valuemax={limit}
            aria-valuenow={items.length}
          >
            <span
              style={{
                width: `${limit ? (items.length / limit) * 100 : 0}%`,
              }}
            />
          </div>
          <p className="gift-instruction">
            {isFull
              ? "All set — your hamper is ready to request."
              : `Choose ${remaining} more ${remaining === 1 ? "item" : "items"} to fill your ${box[0].toLowerCase()} hamper.`}
          </p>
          <div className="chip-grid gift-item-grid">
            {products.map((name) => {
              const active = items.includes(name);
              const disabled = !active && items.length >= limit;
              return (
                <button
                  key={name}
                  type="button"
                  className={`item-chip gift-item-chip ${active ? "item-chip--active" : ""}`}
                  aria-pressed={active}
                  disabled={disabled}
                  onClick={() => toggle(name)}
                >
                  {name}
                  <span className="gift-item-state">
                    {active ? "Added" : disabled ? "Box full" : "Add item"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="feature-card gift-summary" aria-live="polite">
          <small className="gift-summary-kicker">A LITTLE SOMETHING SPECIAL</small>
          <h4>Your hamper</h4>
          {items.length ? (
            <ul className="gift-selected-list">
              {items.map((x) => (
                <li key={x}>
                  <span>{x}</span>
                  <button
                    className="gift-remove-item"
                    type="button"
                    aria-label={`Remove ${x} from hamper`}
                    onClick={() => toggle(x)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="gift-empty">
              <span className="gift-empty-mark" aria-hidden="true">+</span>
              <p>Your hamper is empty</p>
              <small>Choose items from the list to see them here.</small>
            </div>
          )}

          <label className="gift-field">
            <span>Recipient name</span>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              autoComplete="name"
              placeholder="Enter the recipient’s name"
            />
          </label>
          <label className="gift-field">
            <span>Needed by</span>
            <input
              type="date"
              value={date}
              min={minDate}
              aria-describedby="gift-date-hint"
              onChange={(e) => setDate(e.target.value)}
            />
            <small className="gift-field-hint" id="gift-date-hint">
              Choose a delivery date · DD-MM-YYYY
            </small>
          </label>
          <label className="gift-field">
            <span>Card message <small>(optional)</small></span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Write a short message for the card"
            />
          </label>

          <button
            className="feature-button gift-submit"
            disabled={!items.length}
            onClick={() =>
              openWhatsApp(
                site.contact.mainPhone,
                `Hello ALCA, I'd like a ${box[0]} hamper.\nRecipient: ${recipient || "Not provided"}\nRequired date: ${formattedDate}\nItems: ${items.join(", ")}\nCard message: ${note || "None"}`,
              )
            }
          >
            {items.length ? "Request hamper on WhatsApp" : "Choose hamper items"}
          </button>
          <p className="gift-submit-hint">
            {!items.length
              ? "Add at least one item to send your request."
              : isFull
                ? "Your hamper is full and ready to request."
                : `You can still add ${remaining} more ${remaining === 1 ? "item" : "items"}.`}
          </p>
        </aside>
      </div>
    </section>
  );
}