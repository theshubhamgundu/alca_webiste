-- =========================================================================
-- ALCA MULTI-TENANT E-COMMERCE PLATFORM SCHEMA (SUPABASE POSTGRESQL)
-- =========================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TENANT BUSINESSES TABLE
CREATE TABLE IF NOT EXISTS public.tenants (
  id TEXT PRIMARY KEY, -- e.g. 'bites', 'gifts', 'studio', 'supply', 'celebrations', 'beauty', 'catering'
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT,
  description TEXT,
  emoji TEXT,
  logo_url TEXT,
  banner_url TEXT,
  theme_color TEXT DEFAULT '#1E4D0A',
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  storefront_url TEXT,
  custom_fields JSONB DEFAULT '[]'::jsonb,
  settings JSONB DEFAULT '{
    "currencySymbol": "₹",
    "lowStockThreshold": 5,
    "allowBackorders": false,
    "autoHideOutOfStock": false,
    "deliveryFeeDefault": 50
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. BUSINESS-OWNED CATEGORIES TABLE (Hierarchical / Self-referencing)
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  display_order INT DEFAULT 1,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(business_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_categories_business ON public.categories(business_id);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON public.categories(parent_id);

-- 4. BUSINESS-SCOPED PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  subcategory_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  sku TEXT,
  short_description TEXT,
  description TEXT,
  price NUMERIC(12, 2) NOT NULL DEFAULT 0,
  compare_at_price NUMERIC(12, 2),
  cost_price NUMERIC(12, 2),
  stock_quantity INT DEFAULT 0,
  track_inventory BOOLEAN DEFAULT TRUE,
  low_stock_threshold INT DEFAULT 5,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft', 'archived')),
  images TEXT[] DEFAULT '{}',
  emoji TEXT,
  tags TEXT[] DEFAULT '{}',
  variants JSONB DEFAULT '[]'::jsonb,
  custom_attributes JSONB DEFAULT '{}'::jsonb, -- Flexible fields for Food, Apparel, Crafts, Manufacturing
  is_featured BOOLEAN DEFAULT FALSE,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(business_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_products_business ON public.products(business_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);

-- 5. ORDERS TABLE (Tenant Scoped)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  business_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  customer JSONB NOT NULL, -- { name, phone, email, address, city, notes }
  items JSONB NOT NULL,    -- Array of [{ productId, name, variantName, price, quantity, subtotal }]
  subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0,
  discount NUMERIC(12, 2) DEFAULT 0,
  delivery_fee NUMERIC(12, 2) DEFAULT 0,
  total NUMERIC(12, 2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  payment_method TEXT DEFAULT 'WhatsApp / Cash on Delivery',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_business ON public.orders(business_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- 6. STAFF & ROLE-BASED ACCESS
CREATE TABLE IF NOT EXISTS public.tenant_staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id TEXT NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'staff' CHECK (role IN ('owner', 'manager', 'staff')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  permissions TEXT[] DEFAULT '{"products:read", "products:write", "orders:read"}'::text[],
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(business_id, email)
);

-- 7. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_staff ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access for Storefronts (published items only)
CREATE POLICY "Public can view active businesses" ON public.tenants
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view active categories" ON public.categories
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view published products" ON public.products
  FOR SELECT USING (status = 'published');

-- Authenticated Admin Policies (Full access for authenticated admins)
CREATE POLICY "Admins have full access to tenants" ON public.tenants
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to categories" ON public.categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to products" ON public.products
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to orders" ON public.orders
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins have full access to staff" ON public.tenant_staff
  FOR ALL USING (auth.role() = 'authenticated');
