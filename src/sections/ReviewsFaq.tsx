import { useState } from "react";
import type { SiteData } from "../types/site";
import { waLink } from "../lib/whatsapp";

export function ReviewsFaq({ site }: { site: SiteData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <section className="faq" id="faq">
        <div className="rinvite rv">
          <div>
            <span className="eyebrow">Good to know</span>
            <h3>Questions, answered with care.</h3>
          </div>
          <div>
            <p>
              If your question is more specific, send it over WhatsApp and the
              ALCA team will help.
            </p>
            <a
              className="btn ghost"
              href={waLink(
                site.contact.mainPhone,
                "Hello ALCA, I have a question",
              )}
              target="_blank"
              rel="noopener"
            >
              Ask a question
            </a>
          </div>
        </div>

        {site.faq && site.faq.length > 0 && (
          <div className="faq">
            {site.faq.map(([q, a], i) => (
              <details
                key={i}
                className="fq rv"
                open={openFaq === i}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFaq(openFaq === i ? null : i);
                }}
              >
                <summary>
                  {q}
                  <span className="fq-i" aria-hidden="true"></span>
                </summary>
                <div className="fq-a">
                  <p>{a}</p>
                </div>
              </details>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
