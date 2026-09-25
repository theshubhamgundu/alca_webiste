import { useEffect } from "react";
import type { CartResult } from "./useCart";
import { openWhatsApp } from "../../lib/whatsapp";
import { rupees } from "../../lib/format";
import "../features.css";
export function CartDrawer({
  cart,
  ordersPhone,
  onClose,
}: {
  cart: CartResult;
  ordersPhone: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <div
      className="feature-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Your cart"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <aside className="feature-drawer">
        <header>
          <div>
            <small>ALCA BITES</small>
            <h2>Your cart</h2>
          </div>
          <button aria-label="Close cart" onClick={onClose}>
            ×
          </button>
        </header>
        <div className="feature-scroll">
          {cart.items.length ? (
            cart.items.map((x) => (
              <div className="cart-row" key={x.id}>
                <div>
                  <b>{x.name}</b>
                  <small>{rupees(x.price)} each</small>
                </div>
                <div className="stepper">
                  <button
                    aria-label={`Remove one ${x.name}`}
                    onClick={() => cart.changeQuantity(x.id, -1)}
                  >
                    −
                  </button>
                  <span>{x.quantity}</span>
                  <button
                    aria-label={`Add one ${x.name}`}
                    onClick={() => cart.changeQuantity(x.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-button"
                  onClick={() => cart.removeItem(x.id)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="muted">Your cart is empty.</p>
          )}
        </div>
        <footer>
          <strong>
            Total <span>{rupees(cart.total)}</span>
          </strong>
          {cart.items.length > 0 && (
            <button
              className="feature-button"
              onClick={() =>
                openWhatsApp(
                  ordersPhone,
                  `Hello ALCA, I would like to order:\n${cart.items.map((x) => `${x.name} × ${x.quantity} — ${rupees(x.price * x.quantity)}`).join("\n")}\nTotal: ${rupees(cart.total)}`,
                )
              }
            >
              Order on WhatsApp
            </button>
          )}
          <button className="text-button" onClick={cart.clearCart}>
            Clear cart
          </button>
        </footer>
      </aside>
    </div>
  );
}
