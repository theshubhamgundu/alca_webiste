import { supabase } from './supabaseClient';
import type {
  TenantBusiness,
  TenantCategory,
  TenantProduct,
  TenantOrder,
  TenantStaff,
  AuthSession,
  ProductVariant,
} from '../types/tenant';

const STORAGE_KEY_BUSINESSES = 'alca_tenant_businesses_v2';
const STORAGE_KEY_CATEGORIES = 'alca_tenant_categories_v2';
const STORAGE_KEY_PRODUCTS = 'alca_tenant_products_v2';
const STORAGE_KEY_ORDERS = 'alca_tenant_orders_v2';
const STORAGE_KEY_STAFF = 'alca_tenant_staff_v2';
const STORAGE_KEY_SESSION = 'alca_tenant_session_v2';

// ───────────────── DEFAULT TENANT BUSINESSES ─────────────────
export const INITIAL_BUSINESSES: TenantBusiness[] = [
  {
    id: 'bites',
    name: 'Alca Bites, Juices & Dry Store',
    slug: 'bites',
    tagline: '100% Homemade Snacks, Cold-Pressed Juices & Dry Fruits',
    description: 'Wholesome snacks, zero-oil crunches, cold-pressed raw juices, and premium dry fruits crafted in Gudivada and Hyderabad.',
    emoji: '🥤',
    themeColor: '#1E4D0A',
    phone: '9010995180',
    whatsapp: '919010995180',
    email: 'bites@alca.com',
    address: 'Plot 42, LB Nagar Area',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'active',
    storefrontUrl: '/bites',
    customFields: [
      { key: 'calories', label: 'Calories (kcal)', type: 'text', placeholder: 'e.g. 140 kcal per 100g' },
      { key: 'ingredients', label: 'Key Ingredients', type: 'text', placeholder: 'e.g. 100% Sun-dried Apples, Ginger' },
      { key: 'shelf_life', label: 'Shelf Life / Expiry', type: 'text', placeholder: 'e.g. 6 Months from MFD' },
      { key: 'diet_type', label: 'Diet Type', type: 'select', options: ['100% Vegan', 'Gluten Free', 'Zero Added Sugar', 'Keto Friendly', 'Organic'] },
      { key: 'temperature', label: 'Storage Condition', type: 'select', options: ['Room Temperature', 'Keep Refrigerated (<4°C)', 'Cool & Dry Place'] },
    ],
    settings: {
      currencySymbol: '₹',
      lowStockThreshold: 10,
      allowBackorders: false,
      autoHideOutOfStock: false,
      deliveryFeeDefault: 50,
      freeDeliveryThreshold: 499,
    },
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'gifts',
    name: 'Customized Crafts & Gifts',
    slug: 'gifts',
    tagline: 'Handcrafted Devotional Idols, 3D Figurines & Keepsakes',
    description: 'Bespoke custom couple miniatures, preserved varmala floral frames, consecrated pooja mandap sculptures, and luxury festive hampers.',
    emoji: '🎁',
    themeColor: '#B45309',
    phone: '9010995180',
    whatsapp: '919010995180',
    email: 'crafts@alca.com',
    address: 'Plot 42, LB Nagar Area',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'active',
    storefrontUrl: '/gifts',
    customFields: [
      { key: 'material', label: 'Base Material', type: 'text', placeholder: 'e.g. Marble Dust & Resin / Teakwood' },
      { key: 'dimensions', label: 'Dimensions & Scale', type: 'text', placeholder: 'e.g. 8 Inches Height · 650g' },
      { key: 'lead_time', label: 'Custom Crafting Time', type: 'text', placeholder: 'e.g. 3-5 Working Days' },
      { key: 'personalization_note', label: 'Personalization Options', type: 'textarea', placeholder: 'Names, anniversary dates, or photo reference guidelines' },
      { key: 'gift_box', label: 'Packaging Style', type: 'select', options: ['Royal Velvet Keepsake Box', 'Rigid Kraft Slider', 'Pooja Tray Presentation'] },
    ],
    settings: {
      currencySymbol: '₹',
      lowStockThreshold: 5,
      allowBackorders: true,
      autoHideOutOfStock: false,
      deliveryFeeDefault: 80,
      freeDeliveryThreshold: 1999,
    },
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'studio',
    name: 'Designer Studio & Fashion',
    slug: 'studio',
    tagline: 'Bespoke Bridal Couture, Maggam Work & Tailoring',
    description: 'Custom bridal lehengas, pure zardosi Maggam blouses, contemporary cocktail gowns, groom sherwanis, and master fitting studio in Hyderabad.',
    emoji: '👗',
    themeColor: '#92704E',
    phone: '9010995180',
    whatsapp: '919010995180',
    email: 'studio@alca.com',
    address: 'Plot 42, LB Nagar Area',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'active',
    storefrontUrl: '/studio',
    customFields: [
      { key: 'fabric', label: 'Fabric / Silk Type', type: 'text', placeholder: 'e.g. Pure Kanchi Raw Silk / Viscose Organza' },
      { key: 'work_type', label: 'Embroidery Technique', type: 'select', options: ['Pure Hand Maggam Work', 'Zardosi & Cutdana', 'Aari & Threadwork', 'Mirror Cutwork', 'Computer Embroidery'] },
      { key: 'trial_count', label: 'Trial Fittings Included', type: 'select', options: ['1 Trial Fitting', '2 Trial Fittings', 'Master In-Studio Trials'] },
      { key: 'delivery_days', label: 'Stitching Turnaround', type: 'text', placeholder: 'e.g. 7-10 Days (Express 3 Days Available)' },
      { key: 'wash_care', label: 'Wash & Care', type: 'text', placeholder: 'e.g. Dry Clean Only' },
    ],
    settings: {
      currencySymbol: '₹',
      lowStockThreshold: 3,
      allowBackorders: true,
      autoHideOutOfStock: false,
      deliveryFeeDefault: 0,
    },
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'supply',
    name: 'Supply & Manufacturing',
    slug: 'supply',
    tagline: 'Wholesale Food Ingredients, Packaging & Private Labeling',
    description: 'B2B commercial bulk spices, dehydrated ingredients for bakeries, rigid custom gift boxes, and contract manufacturing for Hyderabad businesses.',
    emoji: '📦',
    themeColor: '#2563EB',
    phone: '9010995180',
    whatsapp: '919010995180',
    email: 'supply@alca.com',
    address: 'Plot 42, LB Nagar Industrial Zone',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'active',
    storefrontUrl: '/supply',
    customFields: [
      { key: 'moq', label: 'Minimum Order Quantity (MOQ)', type: 'text', placeholder: 'e.g. 50 Units / 5 kg' },
      { key: 'lead_time', label: 'Dispatch Lead Time', type: 'text', placeholder: 'e.g. 24-48 Hours locally' },
      { key: 'fssai_compliant', label: 'FSSAI / Lab Certification', type: 'select', options: ['FSSAI Commercial Grade', 'ISO 22000 Certified', 'Lab Tested Organic'] },
      { key: 'bulk_tier_pricing', label: 'Volume Tier Pricing Note', type: 'textarea', placeholder: 'e.g. 50-100 units: ₹120 | 101-500: ₹95 | 500+: Contact' },
    ],
    settings: {
      currencySymbol: '₹',
      lowStockThreshold: 50,
      allowBackorders: true,
      autoHideOutOfStock: false,
      deliveryFeeDefault: 250,
    },
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'celebrations',
    name: 'Wow Magical Celebrations',
    slug: 'celebrations',
    tagline: 'Royal Wedding Mandapams, Birthday Setups & Event Production',
    description: 'End-to-end wedding production, temple mandapams, Vedic Panthulu arrangements, 3D theme birthdays, and corporate galas.',
    emoji: '🎉',
    themeColor: '#7C3AED',
    phone: '9010995180',
    whatsapp: '919010995180',
    email: 'events@alca.com',
    address: 'Plot 42, LB Nagar Area',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'active',
    storefrontUrl: '/celebrations',
    customFields: [
      { key: 'guest_capacity', label: 'Recommended Guest Capacity', type: 'text', placeholder: 'e.g. 100 - 500 Guests' },
      { key: 'setup_duration', label: 'Setup & Teardown Time', type: 'text', placeholder: 'e.g. 4-6 Hours Before Event' },
      { key: 'inclusions', label: 'Package Key Inclusions', type: 'textarea', placeholder: 'Mandap, sound, floral canopy, priest team, etc.' },
    ],
    settings: {
      currencySymbol: '₹',
      lowStockThreshold: 1,
      allowBackorders: true,
      autoHideOutOfStock: false,
      deliveryFeeDefault: 0,
    },
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'beauty',
    name: 'Luxury Beauty & Makeup',
    slug: 'beauty',
    tagline: 'Bridal Makeup, Occasion Styling & Skin Care Salon',
    description: 'Certified luxury bridal makeup artists, HD airbrush makeup, saree draping, hairstyling, and venue makeover services in Hyderabad.',
    emoji: '💄',
    themeColor: '#DB2777',
    phone: '9010995180',
    whatsapp: '919010995180',
    email: 'beauty@alca.com',
    address: 'Plot 42, LB Nagar Area',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'active',
    storefrontUrl: '/beauty',
    customFields: [
      { key: 'service_duration', label: 'Service Duration', type: 'text', placeholder: 'e.g. 2.5 - 3 Hours' },
      { key: 'products_kit', label: 'Makeup Brands Used', type: 'text', placeholder: 'e.g. MAC, Huda Beauty, Charlotte Tilbury, NARS' },
      { key: 'location_type', label: 'Service Location', type: 'select', options: ['On-Venue / At Customer Home', 'In-Studio Salon (LB Nagar)', 'Destination Wedding Travel'] },
    ],
    settings: {
      currencySymbol: '₹',
      lowStockThreshold: 2,
      allowBackorders: true,
      autoHideOutOfStock: false,
      deliveryFeeDefault: 0,
    },
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'catering',
    name: 'Food & Telugu Catering',
    slug: 'catering',
    tagline: 'Authentic Telugu & South Indian Catering for Celebrations',
    description: 'Traditional Telugu feast catering, live dosa and sweet counters, corporate lunch boxes, and hygiene-first event dining.',
    emoji: '🍲',
    themeColor: '#DC2626',
    phone: '9010995180',
    whatsapp: '919010995180',
    email: 'catering@alca.com',
    address: 'Plot 42, LB Nagar Area',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'active',
    storefrontUrl: '/catering',
    customFields: [
      { key: 'min_guests', label: 'Minimum Guest Count', type: 'text', placeholder: 'e.g. Minimum 50 Guests' },
      { key: 'cuisine_type', label: 'Cuisine Style', type: 'select', options: ['Authentic Andhra & Telangana Feast', 'Royal Telugu Wedding Spread', 'Pure Veg Sattvic Vratam', 'South Indian Live Counters'] },
      { key: 'service_style', label: 'Service Mode', type: 'select', options: ['Buffet with Service Staff', 'Traditional Banana Leaf Service', 'Packed Meal Box Delivery'] },
    ],
    settings: {
      currencySymbol: '₹',
      lowStockThreshold: 1,
      allowBackorders: true,
      autoHideOutOfStock: false,
      deliveryFeeDefault: 0,
    },
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

// Helper to read localStorage safely
function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// Helper to write localStorage safely
function setLocal<T>(key: string, val: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error('Storage quota or private mode error:', err);
  }
}

// ───────────────── TENANT STORE CLASS ─────────────────
export class TenantStore {
  // 1. BUSINESSES (TENANTS)
  static getBusinesses(): TenantBusiness[] {
    const stored = getLocal<TenantBusiness[]>(STORAGE_KEY_BUSINESSES, []);
    if (!stored || stored.length === 0) {
      setLocal(STORAGE_KEY_BUSINESSES, INITIAL_BUSINESSES);
      return INITIAL_BUSINESSES;
    }
    return stored;
  }

  static getBusiness(id: string): TenantBusiness | undefined {
    return this.getBusinesses().find((b) => b.id === id);
  }

  static saveBusiness(business: TenantBusiness): void {
    const all = this.getBusinesses();
    const idx = all.findIndex((b) => b.id === business.id);
    if (idx >= 0) {
      all[idx] = { ...business, updatedAt: new Date().toISOString() };
    } else {
      all.push({ ...business, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    setLocal(STORAGE_KEY_BUSINESSES, all);
  }

  static toggleBusinessStatus(id: string): TenantBusiness | undefined {
    const all = this.getBusinesses();
    const b = all.find((x) => x.id === id);
    if (b) {
      b.status = b.status === 'active' ? 'suspended' : 'active';
      b.updatedAt = new Date().toISOString();
      setLocal(STORAGE_KEY_BUSINESSES, all);
      return b;
    }
    return undefined;
  }

  // 2. DYNAMIC CATEGORIES (BUSINESS SCOPED)
  static getCategories(businessId?: string): TenantCategory[] {
    const all = getLocal<TenantCategory[]>(STORAGE_KEY_CATEGORIES, []);
    if (!businessId) return all;
    return all.filter((c) => c.businessId === businessId);
  }

  static getCategoryTree(businessId: string): TenantCategory[] {
    const cats = this.getCategories(businessId);
    const topLevel = cats.filter((c) => !c.parentId);
    const children = cats.filter((c) => !!c.parentId);

    return topLevel
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((parent) => ({
        ...parent,
        children: children
          .filter((c) => c.parentId === parent.id)
          .sort((a, b) => a.displayOrder - b.displayOrder),
      }));
  }

  static saveCategory(category: TenantCategory): void {
    const all = getLocal<TenantCategory[]>(STORAGE_KEY_CATEGORIES, []);
    const idx = all.findIndex((c) => c.id === category.id);
    if (idx >= 0) {
      all[idx] = { ...category, updatedAt: new Date().toISOString() };
    } else {
      all.push({
        ...category,
        createdAt: category.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    setLocal(STORAGE_KEY_CATEGORIES, all);
  }

  static deleteCategory(categoryId: string): void {
    let all = getLocal<TenantCategory[]>(STORAGE_KEY_CATEGORIES, []);
    // Delete category and all its direct children
    all = all.filter((c) => c.id !== categoryId && c.parentId !== categoryId);
    setLocal(STORAGE_KEY_CATEGORIES, all);
  }

  static reorderCategories(businessId: string, orderedIds: string[]): void {
    const all = getLocal<TenantCategory[]>(STORAGE_KEY_CATEGORIES, []);
    orderedIds.forEach((id, index) => {
      const item = all.find((c) => c.id === id && c.businessId === businessId);
      if (item) {
        item.displayOrder = index + 1;
        item.updatedAt = new Date().toISOString();
      }
    });
    setLocal(STORAGE_KEY_CATEGORIES, all);
  }

  // 3. PRODUCTS (BUSINESS SCOPED)
  static getProducts(businessId?: string): TenantProduct[] {
    const all = getLocal<TenantProduct[]>(STORAGE_KEY_PRODUCTS, []);
    if (!businessId) return all;
    return all.filter((p) => p.businessId === businessId);
  }

  static getProduct(productId: string): TenantProduct | undefined {
    const all = getLocal<TenantProduct[]>(STORAGE_KEY_PRODUCTS, []);
    return all.find((p) => p.id === productId);
  }

  static saveProduct(product: TenantProduct): void {
    const all = getLocal<TenantProduct[]>(STORAGE_KEY_PRODUCTS, []);
    const idx = all.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      all[idx] = { ...product, updatedAt: new Date().toISOString() };
    } else {
      all.unshift({
        ...product,
        createdAt: product.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    setLocal(STORAGE_KEY_PRODUCTS, all);
  }

  static deleteProduct(productId: string): void {
    const all = getLocal<TenantProduct[]>(STORAGE_KEY_PRODUCTS, []);
    const filtered = all.filter((p) => p.id !== productId);
    setLocal(STORAGE_KEY_PRODUCTS, filtered);
  }

  static bulkUpdateProductStatus(productIds: string[], status: TenantProduct['status']): void {
    const all = getLocal<TenantProduct[]>(STORAGE_KEY_PRODUCTS, []);
    all.forEach((p) => {
      if (productIds.includes(p.id)) {
        p.status = status;
        p.updatedAt = new Date().toISOString();
      }
    });
    setLocal(STORAGE_KEY_PRODUCTS, all);
  }

  static adjustProductStock(productId: string, newStock: number): void {
    const all = getLocal<TenantProduct[]>(STORAGE_KEY_PRODUCTS, []);
    const p = all.find((x) => x.id === productId);
    if (p) {
      p.stockQuantity = Math.max(0, newStock);
      p.updatedAt = new Date().toISOString();
      setLocal(STORAGE_KEY_PRODUCTS, all);
    }
  }

  // 4. ORDERS (BUSINESS SCOPED)
  static getOrders(businessId?: string): TenantOrder[] {
    const all = getLocal<TenantOrder[]>(STORAGE_KEY_ORDERS, []);
    if (!businessId) return all;
    return all.filter((o) => o.businessId === businessId);
  }

  static saveOrder(order: TenantOrder): void {
    const all = getLocal<TenantOrder[]>(STORAGE_KEY_ORDERS, []);
    const idx = all.findIndex((o) => o.id === order.id);
    if (idx >= 0) {
      all[idx] = { ...order, updatedAt: new Date().toISOString() };
    } else {
      all.unshift({ ...order, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    setLocal(STORAGE_KEY_ORDERS, all);
  }

  static updateOrderStatus(orderId: string, status: TenantOrder['status'], paymentStatus?: TenantOrder['paymentStatus']): void {
    const all = getLocal<TenantOrder[]>(STORAGE_KEY_ORDERS, []);
    const o = all.find((x) => x.id === orderId);
    if (o) {
      o.status = status;
      if (paymentStatus) o.paymentStatus = paymentStatus;
      o.updatedAt = new Date().toISOString();
      setLocal(STORAGE_KEY_ORDERS, all);
    }
  }

  // 5. STAFF & ACCESS
  static getStaff(businessId?: string): TenantStaff[] {
    const all = getLocal<TenantStaff[]>(STORAGE_KEY_STAFF, []);
    if (!businessId) return all;
    return all.filter((s) => s.businessId === businessId);
  }

  static saveStaff(staff: TenantStaff): void {
    const all = getLocal<TenantStaff[]>(STORAGE_KEY_STAFF, []);
    const idx = all.findIndex((s) => s.id === staff.id);
    if (idx >= 0) {
      all[idx] = staff;
    } else {
      all.push({ ...staff, createdAt: new Date().toISOString() });
    }
    setLocal(STORAGE_KEY_STAFF, all);
  }

  static deleteStaff(staffId: string): void {
    const all = getLocal<TenantStaff[]>(STORAGE_KEY_STAFF, []);
    setLocal(STORAGE_KEY_STAFF, all.filter((s) => s.id !== staffId));
  }

  // 6. SESSION / AUTH
  static getSession(): AuthSession {
    return getLocal<AuthSession>(STORAGE_KEY_SESSION, {
      role: 'super_admin',
      user: {
        id: 'usr_super_admin',
        name: 'Platform Administrator',
        email: 'admin@alca.com',
      },
    });
  }

  static setSession(session: AuthSession): void {
    setLocal(STORAGE_KEY_SESSION, session);
  }

  // 7. EXPORT & IMPORT UTILITIES
  static exportProductsToCSV(businessId: string): string {
    const products = this.getProducts(businessId);
    const headers = ['ID', 'Name', 'SKU', 'Price', 'CompareAtPrice', 'Stock', 'Status', 'Category', 'Tags', 'Description'];
    const rows = products.map((p) => [
      `"${p.id}"`,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      `"${p.sku || ''}"`,
      p.price,
      p.compareAtPrice || '',
      p.stockQuantity,
      p.status,
      `"${p.categoryId}"`,
      `"${(p.tags || []).join(',')}"`,
      `"${(p.description || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  static exportTenantDataJSON(businessId: string): string {
    const business = this.getBusiness(businessId);
    const categories = this.getCategories(businessId);
    const products = this.getProducts(businessId);
    const orders = this.getOrders(businessId);
    const staff = this.getStaff(businessId);

    return JSON.stringify(
      {
        business,
        categories,
        products,
        orders,
        staff,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  }
}
