export type ImageKey =
  "figurine" | "idol" | "gift" | "wow" | "apricot" | "trays";

export interface SiteAnnouncement {
  on: boolean;
  text: string;
}

export interface SiteHero {
  eyebrow: string;
  text: string;
}

export interface SiteContact {
  ordersPhone: string;
  mainPhone: string;
  ig1: string;
  ig2: string;
  place: string;
  address: string;
  map: string;
}

export type MenuItem = [name: string, price: string, description?: string];
export type MenuGroup = [name: string, items: MenuItem[]];
export type LunchPlan = [name: string, price: string, description: string];
export type Feature = [name: string, price: string, description: string];
export type Service = [name: string, description: string];
export type Photo = [image: ImageKey, caption: string];
export type Combo = [
  name: string,
  description: string,
  price: string,
  oldPrice: string,
  images: string,
];
export type HamperBox = [name: string, capacity: string, price: string];
export type FAQ = [question: string, answer: string];
export type Review = [author: string, text: string, rating?: string];

export interface Juice {
  name: string;
  emoji: string;
  image: string;
  price: string;
  size: string;
  inStock: boolean;
  kcal: string;
  protein: string;
  carbs: string;
  sugar: string;
  fibre: string;
  ingredients: string;
  goodFor: string;
  vitamins: string;
  about: string;
  bestWithin: string;
  color: string;
  color2: string;
}

export interface StoreItem {
  name: string;
  emoji: string;
  price: string;
  weight: string;
  options?: { weight: string; price: string }[];
  inStock: boolean;
  kcal: string;
  protein: string;
  carbs: string;
  sugar: string;
  fibre: string;
  ingredients: string;
  goodFor: string;
  vitamins: string;
  about: string;
  bestWithin: string;
  color: string;
}

export interface StoreGroup {
  name: string;
  emoji: string;
  items: StoreItem[];
}

export interface Division {
  id: string;
  c: string;
  name: string;
  short: string;
  phone?: string;
  ig?: string;
  waText?: string;
  fruit?: boolean;
  lead: string;
  tags?: string[];
  lunch?: LunchPlan[];
  drinks?: Juice[];
  menu?: MenuGroup[];
  feature?: Feature[];
  s?: Service[];
  photos?: Photo[];
  hidden: boolean;
  store?: StoreGroup[];
  /** Browser-only photos added by the admin editor: [data URL, caption]. */
  uploads?: [string, string][];
}

export interface SiteOffers {
  on: boolean;
  special: string;
  combos: Combo[];
}

export interface SiteHamper {
  on: boolean;
  note: string;
  boxes: HamperBox[];
}

export interface SiteQuote {
  on: boolean;
  types: string;
  vegPlate: string;
  nonvegPlate: string;
  minGuests: string;
  addons: string;
}

export interface SiteData {
  announce: SiteAnnouncement;
  hero: SiteHero;
  contact: SiteContact;
  footer: string;
  divisions: Division[];
  offers: SiteOffers;
  hamper: SiteHamper;
  quote: SiteQuote;
  reviews: Review[];
  faq: FAQ[];
}
