import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { PhotoAdmin } from "./pages/PhotoAdmin";
import CateringPage from "./pages/CateringPage";
import CelebrationsPage from "./pages/CelebrationsPage";
import CraftsGiftsPage from "./pages/CraftsGiftsPage";
import DesignerStudioPage from "./pages/DesignerStudioPage";
import MakeupBeautyPage from "./pages/MakeupBeautyPage";
import SupplyPage from "./pages/SupplyPage";
import "./features/features.css";
import "./features/admin/admin.css";
import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { Marquee } from "./sections/Marquee";
import { Gallery } from "./sections/Gallery";
import { JumpMenu } from "./sections/JumpMenu";
import { DivisionSection } from "./sections/DivisionSection";
import { SwapConcierge } from "./sections/SwapConcierge";
import { ReviewsFaq } from "./sections/ReviewsFaq";
import { ContactFooter } from "./sections/ContactFooter";
import { useSiteData } from "./hooks/useSiteData";
import { useCart } from "./features/cart/useCart";
import { CartDrawer } from "./features/cart/CartDrawer";
import { AdminPanel } from "./features/admin/AdminPanel";
import type { SiteData } from "./types/site";

function SiteHome() {
  const { site: savedSite, setSite } = useSiteData();
  const [previewSite, setPreviewSite] = useState<SiteData | null>(null);
  const [previewError, setPreviewError] = useState("");
  const site = previewSite ?? savedSite;
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Reveal-on-scroll: guarantees every .rv block fully appears, even tall ones.
  useEffect(() => {
    const revealAll = () => {
      const els = document.querySelectorAll<HTMLElement>(".rv");
      els.forEach((el) => el.classList.add("in"));
    };

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    const observe = () => {
      document
        .querySelectorAll<HTMLElement>(".rv:not(.in)")
        .forEach((el) => io.observe(el));
    };

    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    // Safety net: never leave content hidden.
    const fallback = window.setTimeout(revealAll, 1500);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  // Hidden admin panel shortcut: #admin in URL hash
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#admin") {
        setAdminOpen(true);
        // Clear hash so it doesn't stay in URL and we can trigger it again if needed
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <>
      {site.announce.on && (
        <div
          style={{
            background: "var(--red)",
            color: "var(--btn-ink)",
            textAlign: "center",
            padding: "10px 16px",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          {site.announce.text}
        </div>
      )}

      <Nav site={site} />
      <Hero site={site} />
      <Marquee site={site} />
      <Gallery site={site} />

      <div className="wrap">
        <JumpMenu site={site} />
        <main id="services">
          {site.divisions.map((div) => (
            <DivisionSection
              key={div.id}
              div={div}
              site={site}
              addToCart={(name, price) => {
                cart.addToCart(name, price);
                setCartOpen(true);
              }}
            />
          ))}
        </main>

        <div id="swapbox">
          <SwapConcierge site={site} />
        </div>

        <ReviewsFaq site={site} />
        <ContactFooter site={site} />
      </div>

      <button
        className="cart-btn"
        id="cart-open"
        type="button"
        aria-label="Open cart"
        onClick={() => setCartOpen(true)}
        style={{ display: cart.items.length > 0 ? "flex" : "none" }}
      >
        <span aria-hidden="true">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </span>
        Cart <b id="cart-count">{cart.count}</b>
      </button>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          ordersPhone={site.contact.ordersPhone}
          onClose={() => setCartOpen(false)}
        />
      )}

      {previewSite && (
        <div className="pvbar" role="status">
          <span>
            Previewing your draft. Other visitors cannot see these changes.
          </span>
          <button
            type="button"
            className="abtn ghost"
            onClick={() => {
              setPreviewSite(null);
              setPreviewError("");
            }}
          >
            Keep editing
          </button>
          <button
            type="button"
            className="abtn ghost"
            onClick={() => {
              setPreviewSite(null);
              setAdminOpen(false);
              setPreviewError("");
            }}
          >
            Discard draft
          </button>
          <button
            type="button"
            className="abtn"
            onClick={() => {
              try {
                setSite(previewSite);
                setPreviewSite(null);
                setAdminOpen(false);
                setPreviewError("");
              } catch {
                setPreviewError(
                  "Could not save in this browser. Remove some photos and try again.",
                );
              }
            }}
          >
            Save locally
          </button>
          {previewError && <span role="alert">{previewError}</span>}
        </div>
      )}
      {adminOpen && (
        <div style={previewSite ? { display: "none" } : undefined}>
          <AdminPanel
            site={savedSite}
            onSave={setSite}
            onPreview={(draft) => {
              setPreviewSite(draft);
              setPreviewError("");
            }}
            onClose={() => {
              setAdminOpen(false);
              setPreviewSite(null);
            }}
          />
        </div>
      )}
    </>
  );
}

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function SiteRoutes() {
  return (
    <Switch>
      <Route path="/" component={SiteHome} />
      <Route path="/catering" component={CateringPage} />
      <Route path="/celebrations" component={CelebrationsPage} />
      <Route path="/crafts-gifts" component={CraftsGiftsPage} />
      <Route path="/designer-studio" component={DesignerStudioPage} />
      <Route path="/makeup-beauty" component={MakeupBeautyPage} />
      <Route path="/supply" component={SupplyPage} />
      <Route path="/admin" component={PhotoAdmin} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={basePath}>
        <SiteRoutes />
      </WouterRouter>
    </QueryClientProvider>
  );
}
