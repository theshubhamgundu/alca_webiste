import { useCallback, useState } from "react";
import { siteData as initialSiteData } from "../data/siteData";
import type { SiteData } from "../types/site";

const STORAGE_KEY = "alca-site-data-v1";

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
