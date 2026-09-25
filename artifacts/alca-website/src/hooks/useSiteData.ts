import { useCallback, useState } from "react";
import { siteData as initialSiteData } from "../data/siteData";
import type { SiteData } from "../types/site";

// Browser edits apply only to the version of the defaults they were made against.
// Changing siteData.ts gives the homepage fresh defaults instead of leaving an
// older locally saved copy in front of the new source content.
const defaults = JSON.stringify(initialSiteData);
let fingerprint = 2166136261;
for (let i = 0; i < defaults.length; i++) {
  fingerprint = Math.imul(fingerprint ^ defaults.charCodeAt(i), 16777619);
}
const STORAGE_KEY = `alca-site-data-${(fingerprint >>> 0).toString(16)}`;

function readSite(): SiteData {
  if (typeof window === "undefined") return initialSiteData;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SiteData) : initialSiteData;
  } catch {
    return initialSiteData;
  }
}

export function useSiteData(): {
  site: SiteData;
  setSite: (site: SiteData) => void;
  resetSite: () => void;
} {
  const [site, setSiteState] = useState<SiteData>(readSite);
  const setSite = useCallback((next: SiteData) => {
    // Persist before updating the page so a failed quota write cannot appear saved.
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSiteState(next);
  }, []);
  const resetSite = useCallback(() => {
    setSiteState(initialSiteData);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* private browsing */
    }
  }, []);
  return { site, setSite, resetSite };
}

export default useSiteData;
