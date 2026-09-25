```tsx
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

  const storeGroups = site.divisions.flatMap(
    (division) =>
      division.store?.map((group) => ({
        category: group.name,
        items: group.items
          .filter((item) => item.price)
          .map((item) => item.name),
      })) ?? [],
  );

  const addItem = (name: string) => {
    if (items.length >= limit || items.includes(name)) return;
    setItems((current) => [...current, name]);
  };

  const removeItem = (name: string) => {
    setItems((current) => current.filter((item) => item !== name));
  };

  const handleBoxChange = (index: number) => {
    setSize(index);
    setItems([]);
  };

  const handleSubmit = () => {
    if (!items.length || !box || !recipient.trim() || !date) return;

    openWhatsApp(
      site.contact.mainPhone,
      `Hello ALCA, I'd like a ${box[0]} hamper.

Recipient: ${ recipient.trim() }
Required date: ${ date }
Items: ${ items.join(", ") }
Card message: ${ note.trim() || "None" } `,
    );
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="feature-panel" aria-labelledby="hamper-title">
      <div className="feature-panel-header">
        <small>GIFTING</small>

        <h3 id="hamper-title">Build a hamper</h3>

        <p className="muted">{site.hamper.note}</p>
      </div>

      <div className="feature-grid">
        {/* LEFT */}
        <div className="hamper-builder">
          {/* BOX SELECTION */}
          <div className="hamper-section">
            <div className="section-row">
              <h4>Choose your box</h4>
            </div>

            <div className="box-options">
              {site.hamper.boxes.map((b, index) => {
                const isActive = index === size;

                return (
                  <button
                    type="button"
                    key={`${ b[0] } -${ index } `}
                    className={`box - option ${
  isActive ? "box-option--active" : ""
} `}
                    aria-pressed={isActive}
                    onClick={() => handleBoxChange(index)}
                  >
                    <span className="box-option-name">{b[0]}</span>

                    <span className="box-option-meta">
                      {b[1]} items
                      {b[2] ? ` · ${ rupees(b[2]) } ` : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ITEM SELECTION */}
          <div className="hamper-section">
            <div className="section-row">
              <h4>Choose items</h4>

              <span
                className={`count - pill ${
  items.length === limit && limit > 0
    ? "count-pill--done"
    : ""
} `}
              >
                {items.length}/{limit}
              </span>
            </div>

            <div className="hamper-categories">
              {storeGroups.map((group, groupIndex) => {
                if (!group.items.length) return null;

                return (
                  <div
                    className="hamper-category"
                    key={`${ group.category } -${ groupIndex } `}
                  >
                    <h6 className="hamper-form-label">
                      {group.category}
                    </h6>

                    <div className="hamper-item-grid">
                      {group.items.map((name) => {
                        const isSelected = items.includes(name);
                        const isDisabled =
                          items.length >= limit && !isSelected;

                        return (
                          <button
                            type="button"
                            key={name}
                            className={`item - chip ${
  isSelected ? "item-chip--active" : ""
} `}
                            aria-pressed={isSelected}
                            disabled={isDisabled}
                            onClick={() =>
                              isSelected
                                ? removeItem(name)
                                : addItem(name)
                            }
                          >
                            <span>{name}</span>

                            {isSelected && (
                              <span
                                className="item-chip-remove"
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="feature-card hamper-summary">
          <div className="hamper-summary-header">
            <div>
              <small>YOUR SELECTION</small>
              <h4>Your hamper</h4>
            </div>

            <span className="count-pill">
              {items.length}/{limit}
            </span>
          </div>

          {/* SELECTED ITEMS */}
          <div className="hamper-selected-items">
            {items.length > 0 ? (
              <ul className="summary-list">
                {items.map((item) => (
                  <li key={item} className="summary-list-item">
                    <span>{item}</span>

                    <button
                      type="button"
                      className="summary-remove-button"
                      aria-label={`Remove ${ item } `}
                      onClick={() => removeItem(item)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="hamper-empty-state">
                <p>No items selected yet.</p>

                <span>
                  Choose items from the left to fill your hamper.
                </span>
              </div>
            )}
          </div>

          {/* FORM */}
          <div className="hamper-form-section">
            <label className="hamper-form-label">
              <span>
                Recipient name <b>*</b>
              </span>

              <input
                className="hamper-form-input"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient name"
                autoComplete="name"
              />
            </label>

            <label className="hamper-form-label">
              <span>
                Needed by <b>*</b>
              </span>

              <input
                className="hamper-form-input"
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            <label className="hamper-form-label">
              <span>Card message</span>

              <textarea
                className="hamper-form-textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                placeholder="Write a personal message for the card..."
              />
            </label>
          </div>

          {/* WHATSAPP */}
          <button
            type="button"
            className="hamper-request-button"
            disabled={!items.length || !recipient.trim() || !date}
            onClick={handleSubmit}
          >
            Request hamper on WhatsApp
          </button>

          <p className="hamper-helper-text">
            We'll confirm availability, pricing and delivery details with you
            on WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}
```

  ```css
/* =========================================
   HAMPER BUILDER
========================================= */

.hamper-builder {
  min-width: 0;
}

.hamper-section {
  margin-bottom: 32px;
}

.hamper-section:last-child {
  margin-bottom: 0;
}

/* =========================================
   BOX OPTIONS
========================================= */

.box-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.box-option {
  width: 100%;
  min-height: 78px;
  padding: 14px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  background: #fff;
  color: inherit;
  cursor: pointer;
  text-align: left;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.box-option:hover {
  border-color: #bbb;
  transform: translateY(-1px);
}

.box-option--active {
  border-color: #222;
  background: #f7f7f7;
}

.box-option-name {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
}

.box-option-meta {
  display: block;
  font-size: 0.8rem;
  color: #777;
}

/* =========================================
   ITEM CATEGORIES
========================================= */

.hamper-categories {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hamper-category {
  min-width: 0;
}

.hamper-category .hamper-form-label {
  margin-bottom: 10px;
}

.hamper-item-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* =========================================
   ITEM CHIPS
========================================= */

.item-chip {
  min-height: 38px;
  padding: 8px 13px;
  border: 1px solid #e2e2e2;
  border-radius: 999px;
  background: #fff;
  color: #222;

  font-size: 0.85rem;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease;
}

.item-chip:hover:not(:disabled) {
  border-color: #222;
}

.item-chip--active {
  background: #222;
  border-color: #222;
  color: #fff;
}

.item-chip:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.item-chip-remove {
  font-size: 0.75rem;
}

/* =========================================
   SUMMARY CARD
========================================= */

.hamper-summary {
  min-width: 0;
}

.hamper-summary-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.hamper-summary-header small {
  display: block;
  margin-bottom: 4px;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: #888;
}

.hamper-summary-header h4 {
  margin: 0;
}

/* =========================================
   SELECTED ITEMS
========================================= */

.hamper-selected-items {
  min-height: 80px;
  margin-bottom: 24px;
}

.summary-list {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 0;
  margin: 0;

  list-style: none;
}

.summary-list-item {
  min-height: 42px;
  padding: 8px 10px 8px 14px;

  border: 1px solid #e8e8e8;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  background: #fafafa;
}

.summary-remove-button {
  width: 28px;
  height: 28px;
  flex: 0 0 28px;

  padding: 0;
  border: 0;
  border-radius: 50%;

  background: transparent;
  color: #777;

  font-size: 1.15rem;
  line-height: 1;

  cursor: pointer;
}

.summary-remove-button:hover {
  background: #eee;
  color: #111;
}

/* =========================================
   EMPTY STATE
========================================= */

.hamper-empty-state {
  padding: 20px;

  border: 1px dashed #ddd;
  border-radius: 12px;

  text-align: center;
}

.hamper-empty-state p {
  margin: 0 0 5px;

  font-size: 0.9rem;
  font-weight: 600;
}

.hamper-empty-state span {
  display: block;

  color: #888;
  font-size: 0.8rem;
}

/* =========================================
   FORM
========================================= */

.hamper-form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hamper-form-label {
  display: flex;
  flex-direction: column;
  gap: 7px;

  font-size: 0.82rem;
  font-weight: 600;
  color: #333;
}

.hamper-form-label b {
  color: #b42318;
  font-weight: 600;
}

/* =========================================
   INPUTS
========================================= */

.hamper-form-input,
.hamper-form-textarea {
  width: 100%;
  box-sizing: border-box;

  border: 1px solid #ddd;
  border-radius: 10px;

  background: #fff;
  color: #222;

  font-family: inherit;
  font-size: 0.88rem;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.hamper-form-input {
  height: 46px;
  padding: 0 13px;
}

.hamper-form-textarea {
  min-height: 100px;
  padding: 12px 13px;

  resize: vertical;
  line-height: 1.5;
}

.hamper-form-input::placeholder,
.hamper-form-textarea::placeholder {
  color: #aaa;
  opacity: 1;
}

.hamper-form-input:hover,
.hamper-form-textarea:hover {
  border-color: #bbb;
}

.hamper-form-input:focus,
.hamper-form-textarea:focus {
  border-color: #222;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
}

.hamper-form-input[type="date"] {
  color-scheme: light;
}

/* =========================================
   REQUEST BUTTON
========================================= */

.hamper-request-button {
  width: 100%;
  min-height: 48px;

  margin-top: 22px;
  padding: 12px 18px;

  border: 0;
  border-radius: 10px;

  background: #222;
  color: #fff;

  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.hamper-request-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.hamper-request-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.hamper-helper-text {
  margin: 10px 0 0;

  color: #888;
  font-size: 0.72rem;
  line-height: 1.5;

  text-align: center;
}

/* =========================================
   COUNT PILL
========================================= */

.count-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 38px;
  height: 28px;
  padding: 0 9px;

  border-radius: 999px;

  background: #f1f1f1;
  color: #555;

  font-size: 0.72rem;
  font-weight: 600;
}

.count-pill--done {
  background: #222;
  color: #fff;
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 768px) {
  .box-options {
    grid-template-columns: 1fr;
  }

  .box-option {
    min-height: 64px;
  }

  .hamper-summary {
    margin-top: 8px;
  }

  .hamper-section {
    margin-bottom: 26px;
  }
}

@media (max-width: 480px) {
  .hamper-item-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .item-chip {
    width: 100%;
  }

  .hamper-summary-header {
    align-items: center;
  }

  .hamper-form-input {
    height: 44px;
  }
}
```
