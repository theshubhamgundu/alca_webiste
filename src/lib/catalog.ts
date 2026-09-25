import type { Division, Juice, SiteData, StoreGroup, StoreItem } from "../types/site";

export interface UnifiedProduct {
  id: string;
  divisionId: string;
  category: string;
  name: string;
  price: string;
  oldPrice?: string;
  emoji?: string;
  image?: string;
  inStock: boolean;
  size?: string;
  weight?: string;
  options?: { weight: string; price: string }[];
  description?: string;
  tags?: string[];
  // Nutritional / Beverage specs
  kcal?: string;
  protein?: string;
  carbs?: string;
  sugar?: string;
  fibre?: string;
  ingredients?: string;
  goodFor?: string;
  vitamins?: string;
  about?: string;
  color?: string;
}

export interface BusinessConfig {
  id: string;
  name: string;
  emoji: string;
  short: string;
  defaultCategories: string[];
}

export const ACTIVE_BUSINESSES: BusinessConfig[] = [
  {
    id: "gifts",
    name: "Crafts & Customized Gifts",
    emoji: "🎁",
    short: "Gifts & Crafts",
    defaultCategories: ["Idols & Sculptures", "Gift Hampers & Trays", "Custom Keepsakes", "Festive Gifts", "Handmade Art"],
  },
  {
    id: "bites",
    name: "Alca Bites, Juices & Dry Store",
    emoji: "🥤",
    short: "Bites & Juices",
    defaultCategories: ["Fresh Cold Juices", "Dry Fruits & Nuts", "Dry Fruits (Dehydrated)", "Dry Vegetables", "Healthy Bites & Rolls", "Lunch Plans"],
  },
  {
    id: "celebrations",
    name: "Wow Magical Celebrations",
    emoji: "🎉",
    short: "Events & Decor",
    defaultCategories: ["Wedding Packages", "Birthday & Theme Decor", "Surprise Setups", "Event Photography", "Party Props"],
  },
  {
    id: "studio",
    name: "Designer Studio & Fashion",
    emoji: "👗",
    short: "Studio & Apparel",
    defaultCategories: ["Bridal Wear", "Boutique Outfits", "Custom Tailoring", "Festive Collections", "Styling & Consult"],
  },
  {
    id: "beauty",
    name: "Luxury Beauty & Makeup",
    emoji: "💄",
    short: "Beauty & Salon",
    defaultCategories: ["Bridal Makeup Kits", "Party & Event Makeup", "Skin Care Treatments", "Hair Styling", "Modelling Packages"],
  },
  {
    id: "supply",
    name: "Supply & Manufacturing",
    emoji: "📦",
    short: "Supply & Packaging",
    defaultCategories: ["Bulk Food Supplies", "Packaging Materials", "Bakery & Hotel Supplies", "Private Labeling"],
  },
];

/**
 * Extracts all products for a specific division into a uniform product list.
 */
export function getProductsForDivision(site: SiteData, divisionId: string): UnifiedProduct[] {
  const div = site.divisions.find((d) => d.id === divisionId);
  if (!div) return [];

  const list: UnifiedProduct[] = [];

  // 1. Drinks / Juices (Bites)
  if (div.drinks && div.drinks.length > 0) {
    div.drinks.forEach((d, idx) => {
      list.push({
        id: `drink-${divisionId}-${idx}`,
        divisionId,
        category: "Fresh Cold Juices",
        name: d.name,
        price: d.price,
        emoji: d.emoji || "🥤",
        image: d.image,
        inStock: d.inStock !== false,
        size: d.size || "250 ml",
        description: d.about || d.goodFor,
        kcal: d.kcal,
        protein: d.protein,
        carbs: d.carbs,
        sugar: d.sugar,
        fibre: d.fibre,
        ingredients: d.ingredients,
        goodFor: d.goodFor,
        vitamins: d.vitamins,
        about: d.about,
        color: d.color,
      });
    });
  }

  // 2. Store Groups (Dry store / Products)
  if (div.store && div.store.length > 0) {
    div.store.forEach((group, gIdx) => {
      group.items.forEach((item, iIdx) => {
        list.push({
          id: `store-${divisionId}-${gIdx}-${iIdx}`,
          divisionId,
          category: group.name,
          name: item.name,
          price: item.price || "0",
          emoji: item.emoji || group.emoji || "📦",
          image: (item as unknown as { image?: string }).image,
          inStock: item.inStock !== false,
          weight: item.weight,
          options: item.options,
          description: item.about || item.goodFor,
          kcal: item.kcal,
          protein: item.protein,
          carbs: item.carbs,
          sugar: item.sugar,
          fibre: item.fibre,
          ingredients: item.ingredients,
          goodFor: item.goodFor,
          vitamins: item.vitamins,
          about: item.about,
          color: item.color,
        });
      });
    });
  }

  // 3. Features (Crafts, Celebrations, Catering)
  if (div.feature && div.feature.length > 0) {
    div.feature.forEach((f, fIdx) => {
      const priceClean = f[1]?.replace(/[^\d]/g, "") || "0";
      list.push({
        id: `feat-${divisionId}-${fIdx}`,
        divisionId,
        category: "Featured Products & Packages",
        name: f[0],
        price: priceClean || f[1],
        emoji: "✨",
        inStock: true,
        description: f[2],
      });
    });
  }

  // 4. Menu Items (Lunch, snacks)
  if (div.menu && div.menu.length > 0) {
    div.menu.forEach((mGroup, mIdx) => {
      mGroup[1].forEach((mItem, miIdx) => {
        list.push({
          id: `menu-${divisionId}-${mIdx}-${miIdx}`,
          divisionId,
          category: mGroup[0],
          name: mItem[0],
          price: mItem[1],
          emoji: "🍽️",
          inStock: true,
          description: mItem[2] ? `Cal: ${mItem[2]}` : undefined,
        });
      });
    });
  }

  // 5. Services / Offerings
  if (div.s && div.s.length > 0) {
    div.s.forEach((srv, sIdx) => {
      list.push({
        id: `srv-${divisionId}-${sIdx}`,
        divisionId,
        category: "Services & Custom Orders",
        name: srv[0],
        price: "Contact for Quote",
        emoji: "🛠️",
        inStock: true,
        description: srv[1],
      });
    });
  }

  return list;
}

/**
 * Gets unique categories for a division.
 */
export function getCategoriesForDivision(site: SiteData, divisionId: string): string[] {
  const config = ACTIVE_BUSINESSES.find((b) => b.id === divisionId);
  const products = getProductsForDivision(site, divisionId);
  const productCats = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);

  const merged = Array.from(new Set([...(config?.defaultCategories || []), ...productCats]));
  return merged;
}

/**
 * Saves or updates a unified product in the SiteData object.
 */
export function saveProductToSite(
  site: SiteData,
  product: UnifiedProduct,
  isNew: boolean
): SiteData {
  const nextSite = JSON.parse(JSON.stringify(site)) as SiteData;
  const div = nextSite.divisions.find((d) => d.id === product.divisionId);
  if (!div) return site;

  // If this is a juice
  if (product.category === "Fresh Cold Juices" && div.drinks) {
    const juiceObj: Juice = {
      name: product.name,
      emoji: product.emoji || "🥤",
      image: product.image || "/images/juice/orange.jpg",
      price: product.price,
      size: product.size || "250 ml",
      inStock: product.inStock,
      kcal: product.kcal || "",
      protein: product.protein || "",
      carbs: product.carbs || "",
      sugar: product.sugar || "",
      fibre: product.fibre || "",
      ingredients: product.ingredients || "",
      goodFor: product.goodFor || "",
      vitamins: product.vitamins || "",
      about: product.description || product.about || "",
      bestWithin: "Drink within 24 hours. Keep refrigerated.",
      color: product.color || "#F59E0B",
      color2: "#FCD34D",
    };

    if (isNew) {
      div.drinks.unshift(juiceObj);
    } else {
      const idx = div.drinks.findIndex((d) => d.name.toLowerCase() === product.name.toLowerCase());
      if (idx >= 0) {
        div.drinks[idx] = juiceObj;
      } else {
        div.drinks.push(juiceObj);
      }
    }
    return nextSite;
  }

  // Ensure store array exists for the division
  if (!div.store) {
    div.store = [];
  }

  // Find or create the store group for this category
  let group = div.store.find((g) => g.name === product.category);
  if (!group) {
    group = {
      name: product.category,
      emoji: product.emoji || "📦",
      items: [],
    };
    div.store.push(group);
  }

  const storeItem: StoreItem = {
    name: product.name,
    emoji: product.emoji || group.emoji || "✨",
    price: product.price,
    weight: product.weight || "",
    options: product.options,
    inStock: product.inStock,
    kcal: product.kcal || "",
    protein: product.protein || "",
    carbs: product.carbs || "",
    sugar: product.sugar || "",
    fibre: product.fibre || "",
    ingredients: product.ingredients || "",
    goodFor: product.goodFor || "",
    vitamins: product.vitamins || "",
    about: product.description || "",
    bestWithin: "Best before 30 days.",
    color: product.color || "#6B3E5E",
  };

  if (isNew) {
    group.items.unshift(storeItem);
  } else {
    const idx = group.items.findIndex((i) => i.name.toLowerCase() === product.name.toLowerCase());
    if (idx >= 0) {
      group.items[idx] = storeItem;
    } else {
      group.items.push(storeItem);
    }
  }

  return nextSite;
}

/**
 * Deletes a product from the SiteData.
 */
export function deleteProductFromSite(site: SiteData, product: UnifiedProduct): SiteData {
  const nextSite = JSON.parse(JSON.stringify(site)) as SiteData;
  const div = nextSite.divisions.find((d) => d.id === product.divisionId);
  if (!div) return site;

  // Check drinks
  if (div.drinks) {
    div.drinks = div.drinks.filter((d) => d.name !== product.name);
  }

  // Check store groups
  if (div.store) {
    div.store.forEach((group) => {
      group.items = group.items.filter((i) => i.name !== product.name);
    });
  }

  // Check features
  if (div.feature) {
    div.feature = div.feature.filter((f) => f[0] !== product.name);
  }

  // Check menu items
  if (div.menu) {
    div.menu.forEach((mGroup) => {
      mGroup[1] = mGroup[1].filter((mItem) => mItem[0] !== product.name);
    });
  }

  // Check services
  if (div.s) {
    div.s = div.s.filter((s) => s[0] !== product.name);
  }

  return nextSite;
}

/**
 * Toggles product in-stock status.
 */
export function toggleProductStock(site: SiteData, product: UnifiedProduct): SiteData {
  return saveProductToSite(
    site,
    {
      ...product,
      inStock: !product.inStock,
    },
    false
  );
}
