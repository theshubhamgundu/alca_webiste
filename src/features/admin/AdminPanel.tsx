import { useEffect, useMemo, useRef, useState } from "react";
import type { Division, FAQ, MenuItem, SiteData } from "../../types/site";
import { compressPhoto } from "../../lib/photoCompression";
import "./admin.css";

export interface AdminPanelProps {
  site: SiteData;
  onSave: (site: SiteData) => void;
  onClose: () => void;
  onPreview?: (draft: SiteData) => void;
}
type Tab = string;
type Path = (string | number)[];
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
function setAt<T>(root: T, path: Path, value: unknown): T {
  const copy = clone(root) as Record<string | number, unknown>;
  let cursor = copy;
  path.slice(0, -1).forEach((key) => {
    cursor = cursor[key] as Record<string | number, unknown>;
  });
  cursor[path[path.length - 1]] = value;
  return copy as T;
}
const bytes = (value: unknown) => new Blob([JSON.stringify(value)]).size;
type EditableObject = object &
  Partial<
    Record<
      | "name"
      | "price"
      | "description"
      | "author"
      | "text"
      | "rating"
      | "images"
      | "oldPrice"
      | "capacity"
      | "question"
      | "answer"
      | "inStock",
      unknown
    >
  >;

function Field({
  label,
  value,
  onChange,
  area = false,
}: {
  label: string;
  value: unknown;
  onChange: (v: string) => void;
  area?: boolean;
}) {
  return (
    <label>
      {label}
      {area ? (
        <textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
function Actions({
  i,
  length,
  move,
  remove,
}: {
  i: number;
  length: number;
  move: (from: number, to: number) => void;
  remove: () => void;
}) {
  return (
    <div className="item-actions">
      <button
        type="button"
        className="secondary"
        disabled={!i}
        aria-label="Move up"
        onClick={() => move(i, i - 1)}
      >
        ↑
      </button>
      <button
        type="button"
        className="secondary"
        disabled={i === length - 1}
        aria-label="Move down"
        onClick={() => move(i, i + 1)}
      >
        ↓
      </button>
      <button type="button" className="danger" onClick={remove}>
        Delete
      </button>
    </div>
  );
}
function ListEditor({
  title,
  items,
  fields,
  onChange,
}: {
  title: string;
  items: EditableObject[];
  fields: string[];
  onChange: (x: EditableObject[]) => void;
}) {
  const add = () =>
    onChange([
      ...items,
      Object.fromEntries(fields.map((f) => [f, f === "inStock" ? true : ""])),
    ]);
  return (
    <section>
      <div className="row">
        <h3>{title}</h3>
        <button type="button" onClick={add}>
          + Add
        </button>
      </div>
      {items.map((item, i) => {
        const values = item as Record<string, unknown>;
        return (
          <div className="item" key={i}>
            <div className="grid">
              {fields.map((f) =>
                f === "inStock" ? (
                  <label className="check" key={f}>
                    <input
                      type="checkbox"
                      checked={Boolean(values[f])}
                      onChange={(e) => {
                        const n = [...items];
                        n[i] = { ...values, inStock: e.target.checked };
                        onChange(n);
                      }}
                    />{" "}
                    In stock
                  </label>
                ) : (
                  <Field
                    key={f}
                    label={f}
                    value={values[f]}
                    area={[
                      "about",
                      "ingredients",
                      "goodFor",
                      "vitamins",
                      "bestWithin",
                    ].includes(f)}
                    onChange={(v) => {
                      const n = [...items];
                      n[i] = { ...values, [f]: v };
                      onChange(n);
                    }}
                  />
                ),
              )}
            </div>
            <Actions
              i={i}
              length={items.length}
              move={(a, b) => {
                const n = [...items];
                [n[a], n[b]] = [n[b], n[a]];
                onChange(n);
              }}
              remove={() => onChange(items.filter((_, j) => j !== i))}
            />
          </div>
        );
      })}
    </section>
  );
}
function MenuEditor({
  division,
  index,
  update,
}: {
  division: Division;
  index: number;
  update: (p: Path, v: unknown) => void;
}) {
  const menu = division.menu ?? [];
  return (
    <section>
      <div className="row">
        <h3>Menu groups and items</h3>
        <button
          type="button"
          onClick={() =>
            update(
              ["divisions", index, "menu"],
              [...menu, ["New group", [["New item", "", ""]]]],
            )
          }
        >
          + Add group
        </button>
      </div>
      {menu.map((group, gi) => (
        <div className="item" key={gi}>
          <div className="row">
            <Field
              label="Group name"
              value={group[0]}
              onChange={(v) => {
                const n = [...menu];
                n[gi] = [v, group[1]];
                update(["divisions", index, "menu"], n);
              }}
            />
            <Actions
              i={gi}
              length={menu.length}
              move={(a, b) => {
                const n = [...menu];
                [n[a], n[b]] = [n[b], n[a]];
                update(["divisions", index, "menu"], n);
              }}
              remove={() =>
                update(
                  ["divisions", index, "menu"],
                  menu.filter((_, j) => j !== gi),
                )
              }
            />
          </div>
          <ListEditor
            title="Items"
            fields={["name", "price", "description"]}
            items={group[1].map((x) => ({
              name: x[0],
              price: x[1],
              description: x[2],
            }))}
            onChange={(items) => {
              const n = [...menu];
              n[gi] = [
                group[0],
                items.map(
                  (x) =>
                    [
                      String(x.name ?? ""),
                      String(x.price ?? ""),
                      String(x.description ?? ""),
                    ] as MenuItem,
                ),
              ];
              update(["divisions", index, "menu"], n);
            }}
          />
        </div>
      ))}
    </section>
  );
}
function PhotoEditor({
  division,
  index,
  update,
}: {
  division: Division;
  index: number;
  update: (p: Path, v: unknown) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const uploads = division.uploads ?? [];
  const photos = division.photos ?? [];
  return (
    <section>
      <h3>Section photos</h3>
      <div className="photo-grid">
        {photos.map((p, i) => (
          <div className="upload-card" key={i}>
            <div className="photo-key">{p[0]}</div>
            <Field
              label="Caption"
              value={p[1]}
              onChange={(v) => {
                const n = [...photos];
                n[i] = [p[0], v];
                update(["divisions", index, "photos"], n);
              }}
            />
          </div>
        ))}
        {uploads.map((p, i) => (
          <div className="upload-card" key={`u${i}`}>
            <img src={p[0]} alt={p[1] || "Uploaded section photo"} />
            <Field
              label="Caption"
              value={p[1]}
              onChange={(v) => {
                const n = [...uploads] as [string, string][];
                n[i] = [p[0], v];
                update(["divisions", index, "uploads"], n);
              }}
            />
            <button
              type="button"
              className="danger"
              onClick={() =>
                update(
                  ["divisions", index, "uploads"],
                  uploads.filter((_, j) => j !== i),
                )
              }
            >
              Remove photo
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        disabled={busy}
        onClick={() =>
          document.getElementById(`upload-${division.id}`)?.click()
        }
      >
        {busy ? "Resizing photos…" : "+ Upload photos"}
      </button>
      <input
        hidden
        id={`upload-${division.id}`}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={async (e) => {
          setBusy(true);
          setError("");
          try {
            const added: [string, string][] = [];
            for (const file of Array.from(e.target.files ?? []))
              added.push([await compressPhoto(file), ""]);
            update(["divisions", index, "uploads"], [...uploads, ...added]);
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : "The photo could not be added.",
            );
          } finally {
            setBusy(false);
            e.target.value = "";
          }
        }}
      />
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}

export function AdminPanel({
  site,
  onSave,
  onClose,
  onPreview,
}: AdminPanelProps) {
  const [draft, setDraft] = useState(() => clone(site));
  const [tab, setTab] = useState<Tab>("general");
  const [message, setMessage] = useState("");
  const first = useRef<HTMLButtonElement>(null);
  const update = (path: Path, value: unknown) =>
    setDraft((d) => setAt(d, path, value));
  useEffect(() => {
    first.current?.focus();
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);
  const division = useMemo(
    () => draft.divisions.find((d) => d.id === tab),
    [draft.divisions, tab],
  );
  const save = () => {
    if (bytes(draft) > 4_500_000) {
      setMessage(
        "This draft is too large for browser storage. Remove photos and try again.",
      );
      return;
    }
    try {
      onSave(draft);
      setMessage("Saved in this browser only.");
      onClose();
    } catch {
      setMessage(
        "Unable to save in this browser. Remove some photos and try again.",
      );
    }
  };
  const editDivision = (d: Division) => {
    const i = draft.divisions.indexOf(d);
    return (
      <>
        <section>
          <div className="grid">
            {(["name", "short", "phone", "ig", "waText"] as const).map((k) => (
              <Field
                key={k}
                label={k}
                value={d[k]}
                onChange={(v) => update(["divisions", i, k], v)}
              />
            ))}
            <Field
              label="Description"
              value={d.lead}
              area
              onChange={(v) => update(["divisions", i, "lead"], v)}
            />
            <Field
              label="Tags (comma separated)"
              value={(d.tags ?? []).join(", ")}
              onChange={(v) =>
                update(
                  ["divisions", i, "tags"],
                  v
                    .split(",")
                    .map((x) => x.trim())
                    .filter(Boolean),
                )
              }
            />
          </div>
          <label className="check">
            <input
              type="checkbox"
              checked={d.hidden}
              onChange={(e) =>
                update(["divisions", i, "hidden"], e.target.checked)
              }
            />{" "}
            Hide this division
          </label>
        </section>
        {d.lunch && (
          <ListEditor
            title="Lunch plans"
            fields={["name", "price", "description"]}
            items={d.lunch.map((x) => ({
              name: x[0],
              price: x[1],
              description: x[2],
            }))}
            onChange={(a) =>
              update(
                ["divisions", i, "lunch"],
                a.map((x) => [
                  String(x.name),
                  String(x.price),
                  String(x.description),
                ]),
              )
            }
          />
        )}
        {d.menu && <MenuEditor division={d} index={i} update={update} />}
        {d.s && (
          <ListEditor
            title="Services"
            fields={["name", "description"]}
            items={d.s.map((x) => ({ name: x[0], description: x[1] }))}
            onChange={(a) =>
              update(
                ["divisions", i, "s"],
                a.map((x) => [String(x.name), String(x.description)]),
              )
            }
          />
        )}
        {d.drinks && (
          <ListEditor
            title="Drinks: details, nutrition and stock"
            fields={[
              "name",
              "emoji",
              "price",
              "size",
              "inStock",
              "kcal",
              "protein",
              "carbs",
              "sugar",
              "fibre",
              "ingredients",
              "goodFor",
              "vitamins",
              "about",
              "bestWithin",
            ]}
            items={d.drinks}
            onChange={(a) => update(["divisions", i, "drinks"], a)}
          />
        )}
        {d.store?.map((g, gi) => (
          <ListEditor
            key={gi}
            title={`${g.emoji} ${g.name}: details and stock`}
            fields={[
              "name",
              "emoji",
              "price",
              "weight",
              "inStock",
              "kcal",
              "protein",
              "carbs",
              "sugar",
              "fibre",
              "ingredients",
              "goodFor",
              "vitamins",
              "about",
              "bestWithin",
            ]}
            items={g.items}
            onChange={(a) => update(["divisions", i, "store", gi, "items"], a)}
          />
        ))}
        <PhotoEditor division={d} index={i} update={update} />
      </>
    );
  };
  return (
    <div
      className="alca-admin-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-title"
    >
      <div className="alca-admin">
        <header>
          <h2 id="admin-title">ALCA content editor</h2>
          <small>Browser-only draft</small>
          <button
            ref={first}
            type="button"
            className="secondary"
            aria-label="Close editor"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className="notice">
          Edits and photos are saved only in this browser. They are not
          published to all visitors. To publish approved catering, designer
          studio, beauty, or supply photos for everyone, use the{" "}
          <a href={`${import.meta.env.BASE_URL}admin`}>secure photo admin</a>.
        </div>
        <nav className="tabs" aria-label="Editor sections">
          {[
            ["general", "General"],
            ["offers", "Offers"],
            ["hamper", "Hamper"],
            ["quote", "Quote"],
            ["faq", "FAQ"],
            ...draft.divisions.map((d) => [d.id, d.name]),
          ].map(([id, label]) => (
            <button
              type="button"
              key={id}
              className={tab === id ? "active" : ""}
              aria-current={tab === id ? "page" : undefined}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <main>
          {tab === "general" && (
            <>
              <section>
                <h3>Announcement and hero</h3>
                <div className="grid">
                  <Field
                    label="Announcement"
                    value={draft.announce.text}
                    onChange={(v) => update(["announce", "text"], v)}
                  />
                  <Field
                    label="Hero eyebrow"
                    value={draft.hero.eyebrow}
                    onChange={(v) => update(["hero", "eyebrow"], v)}
                  />
                  <Field
                    label="Hero text"
                    value={draft.hero.text}
                    area
                    onChange={(v) => update(["hero", "text"], v)}
                  />
                  <Field
                    label="Footer"
                    value={draft.footer}
                    onChange={(v) => update(["footer"], v)}
                  />
                </div>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={draft.announce.on}
                    onChange={(e) =>
                      update(["announce", "on"], e.target.checked)
                    }
                  />{" "}
                  Show announcement
                </label>
              </section>
              <section>
                <h3>Contact details</h3>
                <div className="grid">
                  {Object.entries(draft.contact).map(([k, v]) => (
                    <Field
                      key={k}
                      label={k}
                      value={v}
                      area={k === "address"}
                      onChange={(x) => update(["contact", k], x)}
                    />
                  ))}
                </div>
              </section>
              <ListEditor
                title="Reviews"
                fields={["author", "text", "rating"]}
                items={draft.reviews.map((x) => ({
                  author: x[0],
                  text: x[1],
                  rating: x[2] ?? "",
                }))}
                onChange={(a) =>
                  update(
                    ["reviews"],
                    a.map((x) => [
                      String(x.author),
                      String(x.text),
                      String(x.rating ?? ""),
                    ]),
                  )
                }
              />
            </>
          )}
          {tab === "offers" && (
            <>
              <Field
                label="Special offer text"
                value={draft.offers.special}
                onChange={(v) => update(["offers", "special"], v)}
              />
              <label className="check">
                <input
                  type="checkbox"
                  checked={draft.offers.on}
                  onChange={(e) => update(["offers", "on"], e.target.checked)}
                />{" "}
                Show offers
              </label>
              <ListEditor
                title="Combos"
                fields={["name", "description", "price", "oldPrice", "images"]}
                items={draft.offers.combos.map((x) => ({
                  name: x[0],
                  description: x[1],
                  price: x[2],
                  oldPrice: x[3],
                  images: x[4],
                }))}
                onChange={(a) =>
                  update(
                    ["offers", "combos"],
                    a.map((x) => [
                      String(x.name),
                      String(x.description),
                      String(x.price),
                      String(x.oldPrice),
                      String(x.images),
                    ]),
                  )
                }
              />
            </>
          )}
          {tab === "hamper" && (
            <>
              <Field
                label="Hamper note"
                value={draft.hamper.note}
                onChange={(v) => update(["hamper", "note"], v)}
              />
              <label className="check">
                <input
                  type="checkbox"
                  checked={draft.hamper.on}
                  onChange={(e) => update(["hamper", "on"], e.target.checked)}
                />{" "}
                Show hamper
              </label>
              <ListEditor
                title="Hamper boxes"
                fields={["name", "capacity", "price"]}
                items={draft.hamper.boxes.map((x) => ({
                  name: x[0],
                  capacity: x[1],
                  price: x[2],
                }))}
                onChange={(a) =>
                  update(
                    ["hamper", "boxes"],
                    a.map((x) => [
                      String(x.name),
                      String(x.capacity),
                      String(x.price),
                    ]),
                  )
                }
              />
            </>
          )}
          {tab === "quote" && (
            <>
              <div className="grid">
                {(
                  [
                    "types",
                    "vegPlate",
                    "nonvegPlate",
                    "minGuests",
                    "addons",
                  ] as const
                ).map((k) => (
                  <Field
                    key={k}
                    label={k}
                    value={draft.quote[k]}
                    onChange={(v) => update(["quote", k], v)}
                  />
                ))}
              </div>
              <label className="check">
                <input
                  type="checkbox"
                  checked={draft.quote.on}
                  onChange={(e) => update(["quote", "on"], e.target.checked)}
                />{" "}
                Show quote form
              </label>
            </>
          )}
          {tab === "faq" && (
            <ListEditor
              title="Frequently asked questions"
              fields={["question", "answer"]}
              items={draft.faq.map((x) => ({ question: x[0], answer: x[1] }))}
              onChange={(a) =>
                update(
                  ["faq"],
                  a.map((x) => [String(x.question), String(x.answer)] as FAQ),
                )
              }
            />
          )}
          {division && editDivision(division)}
        </main>
        <footer>
          {message && <small role="status">{message}</small>}
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setDraft(clone(site));
              setMessage("Draft discarded.");
            }}
          >
            Discard draft
          </button>
          {onPreview && (
            <button
              type="button"
              className="secondary"
              onClick={() => onPreview(clone(draft))}
            >
              Preview draft
            </button>
          )}
          <button type="button" onClick={save}>
            Save locally
          </button>
        </footer>
      </div>
    </div>
  );
}
export default AdminPanel;
