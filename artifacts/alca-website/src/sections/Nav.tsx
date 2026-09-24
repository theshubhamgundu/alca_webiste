
import type { SiteData } from "../types/site";
import { waLink } from "../lib/whatsapp";

export function Nav({ site }: { site: SiteData }) {

  return (
    <nav className="wrap">
      <a className="logo" href="#top" id="top">
        <img
          src={`${import.meta.env.BASE_URL}images/alca-logo-1.webp`}
          alt="ALCA logo"
        />
        <span className="wm">
          <b>ALCA</b>
        </span>
      </a>
      <div className="navr">


        <a
          className="btn"
          href={waLink(site.contact.ordersPhone, "Hello ALCA")}
          target="_blank"
          rel="noopener"
        >
          WhatsApp us <span className="arrow">→</span>
        </a>
      </div>
    </nav>
  );
}
