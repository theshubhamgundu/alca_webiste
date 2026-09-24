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
  const remove = (name: string) =>
    setItems((x) => x.filter((item) => item !== name));

  return (
    <section className="feature-panel" aria-labelledby="hamper-title">
      <small>GIFTING</small>
      <h3 id="hamper-title">Build a hamper</h3>
      <p className="muted">{site.hamper.note}</p>
      <div className="feature-grid">
        <div style={{ padding: "16px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "12px",
              color: "var(--ink, #3b1f2b)"
            }}>Choose your box</h4>
            <div style={{ display: "flex", gap: "12px" }}>
              {site.hamper.boxes.map((b, i) => (
                <button
                  key={b[0]}
                  onClick={() => {
                    setSize(i);
                    setItems([]);
                  }}
                  style={{
                    flex: 1,
                    minHeight: "60px",
                    border: `2px solid ${i === size ? "var(--accent)" : "var(--line, #ebdccb)"}`,
                    borderRadius: "10px",
                    padding: "12px",
                    backgroundColor: i === size
                      ? "rgba(var(--accent-rgb), 0.05)"
                      : "var(--ground, #fffcf7)",
                    color: "var(--ink, #3b1f2b)",
                    fontSize: "1rem",
                    fontWeight: i === size ? "600" : "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <span style={{
                    fontSize: "1.5rem",
                    fontWeight: "700"
                  }}>{b[0]}</span>
                  <span>{b[1]} items</span>
                  {b[2] && (
                    <span style={{
                      fontSize: "0.875rem",
                      color: "var(--muted, #7a5e66)"
                    }}>
                      · {rupees(b[2])}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h4 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "12px",
              color: "var(--ink, #3b1f2b)"
            }}>
              Choose items ({items.length}/{limit})
            </h4>
            {limit > 0 && (
              <p style={{
                fontSize: "0.875rem",
                color: "var(--muted, #7a5e66)",
                marginBottom: "12px"
              }}>
                Select up to {limit} items for your hamper
              </p>
            )}
            <div style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))"
            }}>
              {products.map((name) => {
                const isSelected = items.includes(name);
                const isDisabled = items.length >= limit && !isSelected;

                return (
                  <button
                    key={name}
                    onClick={() => {
                      if (isSelected) {
                        remove(name);
                      } else if (!isDisabled) {
                        add(name);
                      }
                    }}
                    disabled={isDisabled}
                    style={{
                      minHeight: "40px",
                      border: `2px solid ${isSelected ? "var(--accent)" : "var(--line, #ebdccb)"}`,
                      borderRadius: "8px",
                      padding: "8px 12px",
                      backgroundColor: isSelected
                        ? "rgba(var(--accent-rgb), 0.05)"
                        : "var(--ground, #fffcf7)",
                      color: isSelected ? "var(--accent)" : "var(--ink, #3b1f2b)",
                      fontSize: "0.9rem",
                      fontWeight: isSelected ? "600" : "400",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: isDisabled ? 0.6 : 1
                    }}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="feature-card" style={{ padding: "24px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "12px",
              color: "var(--ink, #3b1f2b)"
            }}>Your hamper</h4>
            {items.length > 0 ? (
              <div style={{
                backgroundColor: "var(--surface, #fff1e2)",
                borderRadius: "8px",
                padding: "16px",
                minHeight: "80px"
              }}>
                {items.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "var(--ground, #fffcf7)",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      marginBottom: "8px",
                      fontSize: "0.95rem",
                      color: "var(--ink, #3b1f2b)",
                      border: `1px solid ${index % 2 === 0 ? "var(--line, #ebdccb)" : "transparent"}`
                    }}
                  >
                    <span style={{
                      fontSize: "1.2rem",
                      marginRight: "8px"
                    }}>🎁</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted" style={{
                textAlign: "center",
                color: "var(--muted, #7a5e66)",
                fontStyle: "italic"
              }}>
                Choose items to fill your hamper.
              </p>
            )}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
                color: "var(--ink, #3b1f2b)"
              }}
            >
              Recipient name
            </label>
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--line, #ebdccb)",
                borderRadius: "6px",
                fontSize: "1rem",
                backgroundColor: "var(--ground, #fffcf7)",
                color: "var(--ink, #3b1f2b)"
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
                color: "var(--ink, #3b1f2b)"
              }}
            >
              Needed by
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--line, #ebdccb)",
                borderRadius: "6px",
                fontSize: "1rem",
                backgroundColor: "var(--ground, #fffcf7)",
                color: "var(--ink, #3b1f2b)"
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
                color: "var(--ink, #3b1f2b)"
              }}
            >
              Card message
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid var(--line, #ebdccb)",
                borderRadius: "6px",
                fontSize: "1rem",
                backgroundColor: "var(--ground, #fffcf7)",
                color: "var(--ink, #3b1f2b)",
                resize: "vertical"
              }}
            />
          </div>

          <button
            className="feature-button"
            disabled={items.length === 0}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "1.1rem",
              fontWeight: "600",
              marginTop: "8px"
            }}
            onClick={() =>
              openWhatsApp(
                site.contact.mainPhone,
                `Hello ALCA, I'd like a ${box[0]} hamper.\nRecipient: ${recipient || "Not provided"}\nRequired date: ${date || "Not provided"}\nItems: ${items.length > 0 ? items.join(", ") : "None"}\nCard message: ${note || "None"}`
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
