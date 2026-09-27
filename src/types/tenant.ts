export type TenantRole = 'super_admin' | 'business_owner' | 'business_staff';

export type ProductStatus = 'published' | 'draft' | 'archived';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface CustomFieldDefinition {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'date' | 'textarea';
  required?: boolean;
  options?: string[]; // for select type
  placeholder?: string;
  helpText?: string;
  defaultValue?: any;
}

export interface TenantBusiness {
  id: string; // e.g. 'bites', 'gifts', 'studio', 'supply', 'celebrations', 'beauty', 'catering'
  name: string;
  slug: string;
  tagline: string;
  description: string;
  emoji: string;
  logoUrl?: string;
  bannerUrl?: string;
  themeColor: string; // primary accent
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  status: 'active' | 'suspended';
  storefrontUrl: string;
  customFields: CustomFieldDefinition[];
  settings: {
    currencySymbol: string;
    lowStockThreshold: number;
    allowBackorders: boolean;
    autoHideOutOfStock: boolean;
    whatsappOrderTemplate?: string;
    deliveryFeeDefault: number;
    freeDeliveryThreshold?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TenantCategory {
  id: string;
  businessId: string;
  parentId?: string | null; // For nested hierarchy (Subcategories)
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  imageUrl?: string;
  displayOrder: number;
  status: 'active' | 'inactive';
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
  children?: TenantCategory[]; // Computed for tree view
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. '500g', 'XL / Red', 'Bulk 10kg'
  sku: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  attributes: Record<string, string>; // e.g. { size: 'XL', color: 'Red' }
  imageUrl?: string;
}

export interface TenantProduct {
  id: string;
  businessId: string;
  categoryId: string;
  subcategoryId?: string | null;
  name: string;
  slug: string;
  sku: string;
  shortDescription?: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  stockQuantity: number;
  trackInventory: boolean;
  lowStockThreshold: number;
  status: ProductStatus;
  images: string[];
  emoji?: string;
  tags: string[];
  variants: ProductVariant[];
  customAttributes: Record<string, any>; // Dynamic custom fields according to business type
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  subtotal: number;
}

export interface TenantOrder {
  id: string;
  orderNumber: string;
  businessId: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    city?: string;
    notes?: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TenantStaff {
  id: string;
  businessId: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'staff';
  status: 'active' | 'inactive';
  permissions: string[]; // e.g. ['products:read', 'products:write', 'orders:read', 'orders:write', 'analytics:read']
  lastLogin?: string;
  createdAt: string;
}

export interface AuthSession {
  role: TenantRole;
  businessId?: string; // If super_admin, can switch freely; if business_owner/staff, locked to this
  user: {
    id: string;
    name: string;
    email: string;
  };
}
