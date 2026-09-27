import { useState, useMemo, useEffect } from 'react';
import { Link } from 'wouter';
import { TenantStore } from '../lib/tenantStore';
import type {
  TenantBusiness,
  TenantCategory,
  TenantProduct,
  TenantOrder,
  TenantStaff,
  AuthSession,
  ProductVariant,
} from '../types/tenant';
import './AdminDashboard.css';

type ActiveNav = 'overview' | 'categories' | 'products' | 'orders' | 'inventory' | 'custom_fields' | 'settings' | 'platform';

export function AdminDashboard() {
  // ───────────────── MULTI-TENANT CONTEXT ─────────────────
  const [session, setSession] = useState<AuthSession>(() => TenantStore.getSession());
  const [businesses, setBusinesses] = useState<TenantBusiness[]>(() => TenantStore.getBusinesses());
  const [activeTenantId, setActiveTenantId] = useState<string>(() => {
    return session.businessId || 'gifts';
  });
  const [isTenantMenuOpen, setIsTenantMenuOpen] = useState(false);

  // Active Business Object
  const currentBusiness = useMemo(() => {
    return businesses.find((b) => b.id === activeTenantId) || businesses[0];
  }, [businesses, activeTenantId]);

  // Active Navigation Tab
  const [activeNav, setActiveNav] = useState<ActiveNav>('overview');

  // Tenant-Scoped Data State
  const [categories, setCategories] = useState<TenantCategory[]>([]);
  const [products, setProducts] = useState<TenantProduct[]>([]);
  const [orders, setOrders] = useState<TenantOrder[]>([]);
  const [staff, setStaff] = useState<TenantStaff[]>([]);

  // Notifications
  const [toastMsg, setToastMsg] = useState<string>('');
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Reload current tenant data
  const reloadTenantData = () => {
    if (!activeTenantId) return;
    setCategories(TenantStore.getCategories(activeTenantId));
    setProducts(TenantStore.getProducts(activeTenantId));
    setOrders(TenantStore.getOrders(activeTenantId));
    setStaff(TenantStore.getStaff(activeTenantId));
  };

  useEffect(() => {
    reloadTenantData();
  }, [activeTenantId]);

  // Category Tree
  const categoryTree = useMemo(() => {
    return TenantStore.getCategoryTree(activeTenantId);
  }, [categories, activeTenantId]);

  // ───────────────── STATS COMPUTATION ─────────────────
  const stats = useMemo(() => {
    const totalRev = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + (o.total || 0), 0);
    const lowStock = products.filter(
      (p) => p.trackInventory && p.stockQuantity <= (p.lowStockThreshold || currentBusiness.settings.lowStockThreshold)
    );
    const published = products.filter((p) => p.status === 'published');
    const pendingOrders = orders.filter((o) => o.status === 'pending');

    return {
      revenue: totalRev,
      totalProducts: products.length,
      publishedProducts: published.length,
      totalOrders: orders.length,
      pendingOrdersCount: pendingOrders.length,
      lowStockCount: lowStock.length,
    };
  }, [orders, products, currentBusiness]);

  // ───────────────── CATEGORY MANAGEMENT MODAL ─────────────────
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TenantCategory | null>(null);
  const [catFormData, setCatFormData] = useState({
    name: '',
    slug: '',
    parentId: '',
    description: '',
    icon: '✨',
    metaTitle: '',
    metaDescription: '',
    status: 'active' as 'active' | 'inactive',
  });

  const openAddCategoryModal = (parentId?: string) => {
    setEditingCategory(null);
    setCatFormData({
      name: '',
      slug: '',
      parentId: parentId || '',
      description: '',
      icon: '✨',
      metaTitle: '',
      metaDescription: '',
      status: 'active',
    });
    setIsCategoryModalOpen(true);
  };

  const openEditCategoryModal = (cat: TenantCategory) => {
    setEditingCategory(cat);
    setCatFormData({
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId || '',
      description: cat.description || '',
      icon: cat.icon || '✨',
      metaTitle: cat.metaTitle || '',
      metaDescription: cat.metaDescription || '',
      status: cat.status,
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catFormData.name.trim()) return;

    const slug = catFormData.slug.trim() || catFormData.name.toLowerCase().replace(/[^\w-]+/g, '-');
    const newCat: TenantCategory = {
      id: editingCategory ? editingCategory.id : `cat_${Date.now()}`,
      businessId: activeTenantId,
      parentId: catFormData.parentId || null,
      name: catFormData.name.trim(),
      slug,
      description: catFormData.description.trim(),
      icon: catFormData.icon.trim() || '📁',
      displayOrder: editingCategory ? editingCategory.displayOrder : categories.length + 1,
      status: catFormData.status,
      metaTitle: catFormData.metaTitle,
      metaDescription: catFormData.metaDescription,
      createdAt: editingCategory ? editingCategory.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    TenantStore.saveCategory(newCat);
    reloadTenantData();
    setIsCategoryModalOpen(false);
    showToast(`✅ Category "${newCat.name}" saved successfully!`);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete category "${name}" and its subcategories?`)) {
      TenantStore.deleteCategory(id);
      reloadTenantData();
      showToast(`Category "${name}" deleted.`);
    }
  };

  // ───────────────── PRODUCT MANAGEMENT & MODAL ─────────────────
  const [productSearch, setProductSearch] = useState('');
  const [productFilterCat, setProductFilterCat] = useState('all');
  const [productFilterStatus, setProductFilterStatus] = useState('all');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (productFilterCat !== 'all' && p.categoryId !== productFilterCat && p.subcategoryId !== productFilterCat) {
        return false;
      }
      if (productFilterStatus !== 'all' && p.status !== productFilterStatus) {
        return false;
      }
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSku = p.sku?.toLowerCase().includes(q);
        const matchTag = (p.tags || []).some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchSku && !matchTag) return false;
      }
      return true;
    });
  }, [products, productFilterCat, productFilterStatus, productSearch]);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TenantProduct | null>(null);
  const [productTab, setProductTab] = useState<'basic' | 'pricing' | 'variants' | 'custom' | 'media' | 'seo'>('basic');

  const [prodFormData, setProdFormData] = useState<{
    name: string;
    slug: string;
    sku: string;
    categoryId: string;
    subcategoryId: string;
    shortDescription: string;
    description: string;
    price: number;
    compareAtPrice: number;
    costPrice: number;
    stockQuantity: number;
    trackInventory: boolean;
    lowStockThreshold: number;
    status: 'published' | 'draft' | 'archived';
    images: string[];
    emoji: string;
    tags: string[];
    variants: ProductVariant[];
    customAttributes: Record<string, any>;
    isFeatured: boolean;
    metaTitle: string;
    metaDescription: string;
  }>({
    name: '',
    slug: '',
    sku: '',
    categoryId: '',
    subcategoryId: '',
    shortDescription: '',
    description: '',
    price: 0,
    compareAtPrice: 0,
    costPrice: 0,
    stockQuantity: 10,
    trackInventory: true,
    lowStockThreshold: 5,
    status: 'published',
    images: [],
    emoji: '✨',
    tags: [],
    variants: [],
    customAttributes: {},
    isFeatured: false,
    metaTitle: '',
    metaDescription: '',
  });

  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductTab('basic');
    setProdFormData({
      name: '',
      slug: '',
      sku: `SKU-${Date.now().toString().slice(-5)}`,
      categoryId: categories[0]?.id || '',
      subcategoryId: '',
      shortDescription: '',
      description: '',
      price: 999,
      compareAtPrice: 0,
      costPrice: 0,
      stockQuantity: 25,
      trackInventory: true,
      lowStockThreshold: 5,
      status: 'published',
      images: ['/images/gift.webp'],
      emoji: '🎁',
      tags: ['Handcrafted', 'Bestseller'],
      variants: [],
      customAttributes: {},
      isFeatured: false,
      metaTitle: '',
      metaDescription: '',
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: TenantProduct) => {
    setEditingProduct(prod);
    setProductTab('basic');
    setProdFormData({
      name: prod.name,
      slug: prod.slug,
      sku: prod.sku || '',
      categoryId: prod.categoryId,
      subcategoryId: prod.subcategoryId || '',
      shortDescription: prod.shortDescription || '',
      description: prod.description || '',
      price: prod.price,
      compareAtPrice: prod.compareAtPrice || 0,
      costPrice: prod.costPrice || 0,
      stockQuantity: prod.stockQuantity,
      trackInventory: prod.trackInventory,
      lowStockThreshold: prod.lowStockThreshold || 5,
      status: prod.status,
      images: prod.images || [],
      emoji: prod.emoji || '✨',
      tags: prod.tags || [],
      variants: prod.variants || [],
      customAttributes: prod.customAttributes || {},
      isFeatured: prod.isFeatured || false,
      metaTitle: prod.metaTitle || '',
      metaDescription: prod.metaDescription || '',
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodFormData.name.trim()) return;

    const slug = prodFormData.slug.trim() || prodFormData.name.toLowerCase().replace(/[^\w-]+/g, '-');
    const productObj: TenantProduct = {
      id: editingProduct ? editingProduct.id : `prod_${Date.now()}`,
      businessId: activeTenantId,
      categoryId: prodFormData.categoryId,
      subcategoryId: prodFormData.subcategoryId || null,
      name: prodFormData.name.trim(),
      slug,
      sku: prodFormData.sku.trim(),
      shortDescription: prodFormData.shortDescription.trim(),
      description: prodFormData.description.trim(),
      price: Number(prodFormData.price) || 0,
      compareAtPrice: Number(prodFormData.compareAtPrice) || undefined,
      costPrice: Number(prodFormData.costPrice) || undefined,
      stockQuantity: Number(prodFormData.stockQuantity) || 0,
      trackInventory: prodFormData.trackInventory,
      lowStockThreshold: Number(prodFormData.lowStockThreshold) || 5,
      status: prodFormData.status,
      images: prodFormData.images.filter(Boolean),
      emoji: prodFormData.emoji.trim() || '✨',
      tags: prodFormData.tags,
      variants: prodFormData.variants,
      customAttributes: prodFormData.customAttributes,
      isFeatured: prodFormData.isFeatured,
      metaTitle: prodFormData.metaTitle,
      metaDescription: prodFormData.metaDescription,
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    TenantStore.saveProduct(productObj);
    reloadTenantData();
    setIsProductModalOpen(false);
    showToast(`✅ Product "${productObj.name}" saved successfully!`);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Delete product "${name}"?`)) {
      TenantStore.deleteProduct(id);
      reloadTenantData();
      showToast(`Product "${name}" deleted.`);
    }
  };

  // ───────────────── ORDER & INVOICE MODAL ─────────────────
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<TenantOrder | null>(null);

  const handleUpdateOrderStatus = (orderId: string, status: TenantOrder['status']) => {
    TenantStore.updateOrderStatus(orderId, status);
    reloadTenantData();
    showToast(`Order status updated to "${status.toUpperCase()}".`);
  };

  const handleWhatsAppOrderMessage = (order: TenantOrder) => {
    const customer = order.customer;
    const itemsList = order.items.map((i) => `• ${i.name} (x${i.quantity}) - ₹${i.subtotal}`).join('%0A');
    const msg = `✨ *Update from ${encodeURIComponent(currentBusiness.name)}* ✨%0A%0AHello *${encodeURIComponent(customer.name)}*,%0AYour order *#${order.orderNumber}* is now *${order.status.toUpperCase()}*.%0A%0A🛍️ *Items:*%0A${itemsList}%0A%0A💰 *Total Amount:* ₹${order.total}%0A🚚 *Delivery to:* ${encodeURIComponent(customer.address || 'Hyderabad')}%0A%0AThank you for shopping with us! If you have any questions, reply directly here. ✨`;
    window.open(`https://wa.me/${customer.phone.replace(/[^\d]/g, '')}?text=${msg}`, '_blank');
  };

  // ───────────────── CSV EXPORT ─────────────────
  const handleExportCSV = () => {
    const csvContent = TenantStore.exportProductsToCSV(activeTenantId);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${currentBusiness.slug}-products-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 Products exported to CSV.');
  };

  return (
    <div className="m-admin-app">
      {/* ───────────────── TOP HEADER BAR ───────────────── */}
      <header className="m-admin-header">
        <div className="m-header-left">
          <Link href="/" className="m-brand-badge">
            <div className="m-brand-logo" style={{ background: currentBusiness.themeColor }}>
              {currentBusiness.emoji}
            </div>
            <div>
              <div className="m-brand-name">{currentBusiness.name}</div>
              <div className="text-[10px] text-slate-400">Multi-Tenant Commerce Engine</div>
            </div>
          </Link>

          {/* Business Switcher Dropdown */}
          <div className="m-tenant-selector">
            <button
              onClick={() => setIsTenantMenuOpen(!isTenantMenuOpen)}
              className="m-tenant-dropdown-btn"
              title="Switch between business stores"
            >
              <span>{currentBusiness.emoji}</span>
              <span>{currentBusiness.name}</span>
              <span className="text-xs text-slate-400">▾</span>
            </button>

            {isTenantMenuOpen && (
              <div className="m-tenant-menu">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/10">
                  Select Business Store
                </div>
                {businesses.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      setActiveTenantId(b.id);
                      setIsTenantMenuOpen(false);
                      showToast(`Switched workspace to ${b.name}`);
                    }}
                    className={`m-tenant-option ${b.id === activeTenantId ? 'active' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{b.emoji}</span>
                      <div>
                        <div className="text-xs font-bold">{b.name}</div>
                        <div className="text-[10px] text-slate-400">{b.city}</div>
                      </div>
                    </div>
                    {b.id === activeTenantId && <span className="text-xs text-emerald-400 font-bold">Active</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="m-header-right">
          <a
            href={currentBusiness.storefrontUrl}
            target="_blank"
            rel="noreferrer"
            className="m-storefront-link"
          >
            <span>Live Storefront ↗</span>
          </a>

          <div className="m-role-pill">
            {session.role === 'super_admin' ? '👑 Super-Admin' : '🏬 Store Owner'}
          </div>
        </div>
      </header>

      {/* ───────────────── DASHBOARD BODY ───────────────── */}
      <div className="m-admin-body">
        {/* Sidebar */}
        <aside className="m-admin-sidebar">
          <div>
            <div className="m-nav-group-title">Store Management</div>
            <ul className="m-nav-list">
              <li
                className={`m-nav-item ${activeNav === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveNav('overview')}
              >
                <div className="m-nav-item-icon">
                  <span>📊</span>
                  <span>Dashboard</span>
                </div>
              </li>
              <li
                className={`m-nav-item ${activeNav === 'categories' ? 'active' : ''}`}
                onClick={() => setActiveNav('categories')}
              >
                <div className="m-nav-item-icon">
                  <span>📂</span>
                  <span>Categories</span>
                </div>
                <span className="m-nav-badge">{categories.length}</span>
              </li>
              <li
                className={`m-nav-item ${activeNav === 'products' ? 'active' : ''}`}
                onClick={() => setActiveNav('products')}
              >
                <div className="m-nav-item-icon">
                  <span>📦</span>
                  <span>Products</span>
                </div>
                <span className="m-nav-badge">{products.length}</span>
              </li>
              <li
                className={`m-nav-item ${activeNav === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveNav('orders')}
              >
                <div className="m-nav-item-icon">
                  <span>🛍️</span>
                  <span>Orders & Invoices</span>
                </div>
                {stats.pendingOrdersCount > 0 && (
                  <span className="m-nav-badge danger">{stats.pendingOrdersCount}</span>
                )}
              </li>
              <li
                className={`m-nav-item ${activeNav === 'inventory' ? 'active' : ''}`}
                onClick={() => setActiveNav('inventory')}
              >
                <div className="m-nav-item-icon">
                  <span>📋</span>
                  <span>Inventory Control</span>
                </div>
                {stats.lowStockCount > 0 && (
                  <span className="m-nav-badge danger">{stats.lowStockCount}</span>
                )}
              </li>
            </ul>

            <div className="m-nav-group-title">Configuration</div>
            <ul className="m-nav-list">
              <li
                className={`m-nav-item ${activeNav === 'custom_fields' ? 'active' : ''}`}
                onClick={() => setActiveNav('custom_fields')}
              >
                <div className="m-nav-item-icon">
                  <span>⚙️</span>
                  <span>Custom Attributes</span>
                </div>
                <span className="m-nav-badge">{currentBusiness.customFields?.length || 0}</span>
              </li>
              <li
                className={`m-nav-item ${activeNav === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveNav('settings')}
              >
                <div className="m-nav-item-icon">
                  <span>🎨</span>
                  <span>Store Settings</span>
                </div>
              </li>
              {session.role === 'super_admin' && (
                <li
                  className={`m-nav-item ${activeNav === 'platform' ? 'active' : ''}`}
                  onClick={() => setActiveNav('platform')}
                >
                  <div className="m-nav-item-icon">
                    <span>👑</span>
                    <span>Platform Hub</span>
                  </div>
                  <span className="m-nav-badge">{businesses.length} Stores</span>
                </li>
              )}
            </ul>
          </div>

          <div className="m-sidebar-footer">
            <div className="m-tenant-info-card">
              <div className="text-[11px] font-bold text-slate-300">{currentBusiness.name}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">WhatsApp: {currentBusiness.whatsapp}</div>
            </div>
          </div>
        </aside>

        {/* ───────────────── MAIN CONTENT AREA ───────────────── */}
        <main className="m-admin-content">
          {/* TAB 1: OVERVIEW */}
          {activeNav === 'overview' && (
            <div>
              <div className="m-page-header">
                <div>
                  <h1 className="m-page-title">
                    <span>{currentBusiness.emoji}</span>
                    <span>{currentBusiness.name}</span>
                  </h1>
                  <p className="m-page-subtitle">{currentBusiness.tagline}</p>
                </div>
                <div className="m-actions-row">
                  <button onClick={openAddProductModal} className="m-btn m-btn-primary">
                    <span>+</span>
                    <span>Add New Product</span>
                  </button>
                  <button onClick={() => openAddCategoryModal()} className="m-btn m-btn-secondary">
                    <span>+</span>
                    <span>New Category</span>
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="m-stats-grid">
                <div className="m-stat-card">
                  <div className="m-stat-header">
                    <span className="m-stat-title">Gross Revenue</span>
                    <div className="m-stat-icon text-emerald-400">💰</div>
                  </div>
                  <div className="m-stat-value">₹{stats.revenue.toLocaleString('en-IN')}</div>
                  <div className="m-stat-foot text-emerald-400">From {stats.totalOrders} total orders</div>
                </div>

                <div className="m-stat-card">
                  <div className="m-stat-header">
                    <span className="m-stat-title">Catalog Size</span>
                    <div className="m-stat-icon text-indigo-400">📦</div>
                  </div>
                  <div className="m-stat-value">{stats.totalProducts}</div>
                  <div className="m-stat-foot">{stats.publishedProducts} published on storefront</div>
                </div>

                <div className="m-stat-card">
                  <div className="m-stat-header">
                    <span className="m-stat-title">Categories</span>
                    <div className="m-stat-icon text-amber-400">📂</div>
                  </div>
                  <div className="m-stat-value">{categories.length}</div>
                  <div className="m-stat-foot">Hierarchical & nested</div>
                </div>

                <div className="m-stat-card">
                  <div className="m-stat-header">
                    <span className="m-stat-title">Inventory Alerts</span>
                    <div className="m-stat-icon text-rose-400">⚠️</div>
                  </div>
                  <div className="m-stat-value">{stats.lowStockCount}</div>
                  <div className="m-stat-foot text-rose-400">Items below threshold</div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="m-card">
                <div className="m-card-header">
                  <div className="m-card-title">Recent Customer Orders</div>
                  <button onClick={() => setActiveNav('orders')} className="m-btn m-btn-secondary m-btn-sm">
                    View All Orders →
                  </button>
                </div>
                {orders.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <div className="text-3xl mb-2">🛍️</div>
                    <div className="font-bold text-sm">No orders received yet</div>
                    <p className="text-xs text-slate-500 mt-1">Orders placed via storefront or WhatsApp will appear here.</p>
                  </div>
                ) : (
                  <div className="m-table-wrap">
                    <table className="m-table">
                      <thead>
                        <tr>
                          <th>Order #</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((o) => (
                          <tr key={o.id}>
                            <td className="font-mono font-bold text-xs">{o.orderNumber}</td>
                            <td>
                              <div className="font-bold text-xs">{o.customer.name}</div>
                              <div className="text-[11px] text-slate-400">{o.customer.phone}</div>
                            </td>
                            <td className="text-xs">{o.items.length} items</td>
                            <td className="font-bold text-xs">₹{o.total}</td>
                            <td>
                              <span className={`m-badge m-badge-${o.status === 'delivered' ? 'success' : o.status === 'pending' ? 'warning' : 'info'}`}>
                                {o.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="text-xs text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                            <td>
                              <button onClick={() => handleWhatsAppOrderMessage(o)} className="m-btn m-btn-secondary m-btn-sm">
                                WhatsApp ↗
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CATEGORIES */}
          {activeNav === 'categories' && (
            <div>
              <div className="m-page-header">
                <div>
                  <h1 className="m-page-title">Category Architecture</h1>
                  <p className="m-page-subtitle">
                    Manage hierarchical categories, subcategories, display order, and SEO attributes.
                  </p>
                </div>
                <button onClick={() => openAddCategoryModal()} className="m-btn m-btn-primary">
                  <span>+</span>
                  <span>Create Category</span>
                </button>
              </div>

              {categoryTree.length === 0 ? (
                <div className="m-card text-center py-16">
                  <div className="text-4xl mb-3">📂</div>
                  <h3 className="text-base font-bold text-white">No categories created yet</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-6">
                    Categories are fully business-owned. Create your first parent category (e.g., "Sculptures", "Sarees", or "Dehydrated Snacks") to organize your products.
                  </p>
                  <button onClick={() => openAddCategoryModal()} className="m-btn m-btn-primary">
                    + Add Your First Category
                  </button>
                </div>
              ) : (
                <div className="m-category-tree">
                  {categoryTree.map((cat) => (
                    <div key={cat.id} className="m-category-node">
                      <div className="m-category-header">
                        <div className="m-category-left">
                          <div className="m-category-icon">{cat.icon || '📁'}</div>
                          <div>
                            <div className="m-category-title">{cat.name}</div>
                            <div className="m-category-slug">/{cat.slug} · Order: {cat.displayOrder}</div>
                          </div>
                          <span className={`m-badge m-badge-${cat.status === 'active' ? 'success' : 'neutral'}`}>
                            {cat.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => openAddCategoryModal(cat.id)} className="m-btn m-btn-secondary m-btn-sm">
                            + Subcategory
                          </button>
                          <button onClick={() => openEditCategoryModal(cat)} className="m-btn m-btn-secondary m-btn-sm">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteCategory(cat.id, cat.name)} className="m-btn m-btn-danger m-btn-sm">
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Subcategories */}
                      {cat.children && cat.children.length > 0 && (
                        <div className="m-subcategories-wrap">
                          {cat.children.map((sub) => (
                            <div key={sub.id} className="m-subcat-item">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500">↳</span>
                                <span className="font-bold text-xs">{sub.name}</span>
                                <span className="text-[10px] text-slate-500 font-mono">/{sub.slug}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button onClick={() => openEditCategoryModal(sub)} className="m-btn m-btn-secondary m-btn-sm">
                                  Edit
                                </button>
                                <button onClick={() => handleDeleteCategory(sub.id, sub.name)} className="m-btn m-btn-danger m-btn-sm">
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRODUCTS */}
          {activeNav === 'products' && (
            <div>
              <div className="m-page-header">
                <div>
                  <h1 className="m-page-title">Product Catalog</h1>
                  <p className="m-page-subtitle">
                    Add, edit, track inventory, and manage product variants and custom attributes.
                  </p>
                </div>
                <div className="m-actions-row">
                  <button onClick={handleExportCSV} className="m-btn m-btn-secondary">
                    Export CSV
                  </button>
                  <button onClick={openAddProductModal} className="m-btn m-btn-primary">
                    <span>+</span>
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="m-card mb-6 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Search by product name, SKU, or tag..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="m-input"
                  />
                  <select
                    value={productFilterCat}
                    onChange={(e) => setProductFilterCat(e.target.value)}
                    className="m-select"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={productFilterStatus}
                    onChange={(e) => setProductFilterStatus(e.target.value)}
                    className="m-select"
                  >
                    <option value="all">All Statuses</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Products Table */}
              <div className="m-card">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-4xl mb-3">📦</div>
                    <h3 className="text-base font-bold text-white">No products found</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-6">
                      Add your first product to this store or try adjusting your search filters.
                    </p>
                    <button onClick={openAddProductModal} className="m-btn m-btn-primary">
                      + Add New Product
                    </button>
                  </div>
                ) : (
                  <div className="m-table-wrap">
                    <table className="m-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((p) => {
                          const catName = categories.find((c) => c.id === p.categoryId)?.name || 'Uncategorized';
                          const isLow = p.trackInventory && p.stockQuantity <= (p.lowStockThreshold || 5);
                          return (
                            <tr key={p.id}>
                              <td>
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0 flex items-center justify-center">
                                    {p.images && p.images[0] ? (
                                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                                    ) : (
                                      <span className="text-lg">{p.emoji || '📦'}</span>
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-bold text-xs text-white">{p.name}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">SKU: {p.sku || 'N/A'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-xs text-slate-300">{catName}</td>
                              <td>
                                <div className="font-bold text-xs">₹{p.price}</div>
                                {p.compareAtPrice && (
                                  <div className="text-[10px] text-slate-500 line-through">₹{p.compareAtPrice}</div>
                                )}
                              </td>
                              <td>
                                <div className={`font-bold text-xs ${isLow ? 'text-rose-400' : 'text-slate-200'}`}>
                                  {p.stockQuantity} in stock
                                </div>
                                {isLow && <span className="text-[9px] text-rose-400 font-bold uppercase">Low Stock</span>}
                              </td>
                              <td>
                                <span className={`m-badge m-badge-${p.status === 'published' ? 'success' : p.status === 'draft' ? 'warning' : 'neutral'}`}>
                                  {p.status}
                                </span>
                              </td>
                              <td>
                                <div className="flex items-center gap-1.5">
                                  <button onClick={() => openEditProductModal(p)} className="m-btn m-btn-secondary m-btn-sm">
                                    Edit
                                  </button>
                                  <button onClick={() => handleDeleteProduct(p.id, p.name)} className="m-btn m-btn-danger m-btn-sm">
                                    ✕
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS */}
          {activeNav === 'orders' && (
            <div>
              <div className="m-page-header">
                <div>
                  <h1 className="m-page-title">Orders & Invoices</h1>
                  <p className="m-page-subtitle">Track incoming orders, update dispatch status, and launch WhatsApp communication.</p>
                </div>
              </div>

              <div className="m-card">
                {orders.length === 0 ? (
                  <div className="py-16 text-center text-slate-400">
                    <div className="text-4xl mb-2">🛍️</div>
                    <div className="font-bold text-base text-white">No orders yet</div>
                    <p className="text-xs text-slate-500 mt-1">Customer orders placed online or via WhatsApp will appear in real time.</p>
                  </div>
                ) : (
                  <div className="m-table-wrap">
                    <table className="m-table">
                      <thead>
                        <tr>
                          <th>Order #</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Subtotal / Total</th>
                          <th>Payment</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o.id}>
                            <td className="font-mono font-bold text-xs">{o.orderNumber}</td>
                            <td>
                              <div className="font-bold text-xs text-white">{o.customer.name}</div>
                              <div className="text-[11px] text-slate-400">{o.customer.phone}</div>
                              <div className="text-[10px] text-slate-500">{o.customer.address}</div>
                            </td>
                            <td className="text-xs">
                              {o.items.map((i, idx) => (
                                <div key={idx}>
                                  {i.name} (x{i.quantity})
                                </div>
                              ))}
                            </td>
                            <td>
                              <div className="font-bold text-xs">₹{o.total}</div>
                              <div className="text-[10px] text-slate-500">Disc: ₹{o.discount || 0}</div>
                            </td>
                            <td>
                              <span className={`m-badge m-badge-${o.paymentStatus === 'paid' ? 'success' : 'warning'}`}>
                                {o.paymentStatus}
                              </span>
                            </td>
                            <td>
                              <select
                                value={o.status}
                                onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as TenantOrder['status'])}
                                className="m-select text-xs py-1"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td>
                              <div className="flex items-center gap-2">
                                <button onClick={() => handleWhatsAppOrderMessage(o)} className="m-btn m-btn-primary m-btn-sm">
                                  WhatsApp ↗
                                </button>
                                <button onClick={() => setSelectedOrderForInvoice(o)} className="m-btn m-btn-secondary m-btn-sm">
                                  Invoice
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: INVENTORY */}
          {activeNav === 'inventory' && (
            <div>
              <div className="m-page-header">
                <div>
                  <h1 className="m-page-title">Inventory Control</h1>
                  <p className="m-page-subtitle">Live stock count management and threshold warnings.</p>
                </div>
              </div>

              <div className="m-card">
                <div className="m-table-wrap">
                  <table className="m-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Current Quantity</th>
                        <th>Threshold</th>
                        <th>Status</th>
                        <th>Adjust Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => {
                        const isLow = p.trackInventory && p.stockQuantity <= (p.lowStockThreshold || 5);
                        return (
                          <tr key={p.id}>
                            <td className="font-bold text-xs text-white">{p.name}</td>
                            <td className="font-mono text-xs text-slate-400">{p.sku || 'N/A'}</td>
                            <td>
                              <span className="font-extrabold text-sm text-white">{p.stockQuantity}</span>
                            </td>
                            <td className="text-xs text-slate-400">{p.lowStockThreshold || 5} units</td>
                            <td>
                              <span className={`m-badge m-badge-${p.stockQuantity === 0 ? 'danger' : isLow ? 'warning' : 'success'}`}>
                                {p.stockQuantity === 0 ? 'Out of Stock' : isLow ? 'Low Stock' : 'Optimal'}
                              </span>
                            </td>
                            <td>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => {
                                    TenantStore.adjustProductStock(p.id, Math.max(0, p.stockQuantity - 1));
                                    reloadTenantData();
                                  }}
                                  className="m-btn m-btn-secondary m-btn-sm px-2.5"
                                >
                                  -1
                                </button>
                                <button
                                  onClick={() => {
                                    TenantStore.adjustProductStock(p.id, p.stockQuantity + 5);
                                    reloadTenantData();
                                  }}
                                  className="m-btn m-btn-secondary m-btn-sm px-2.5"
                                >
                                  +5
                                </button>
                                <button
                                  onClick={() => {
                                    TenantStore.adjustProductStock(p.id, p.stockQuantity + 25);
                                    reloadTenantData();
                                  }}
                                  className="m-btn m-btn-secondary m-btn-sm px-2.5"
                                >
                                  +25
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOM ATTRIBUTES */}
          {activeNav === 'custom_fields' && (
            <div>
              <div className="m-page-header">
                <div>
                  <h1 className="m-page-title">Business Custom Attributes</h1>
                  <p className="m-page-subtitle">
                    Configure specialized product specifications tailored for {currentBusiness.name} (e.g., Fabric type, Expiry, MOQ, Personalization options).
                  </p>
                </div>
              </div>

              <div className="m-card">
                <div className="m-card-title mb-4">Configured Field Schema for {currentBusiness.name}</div>
                <div className="space-y-3">
                  {currentBusiness.customFields?.map((f, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-xs text-white">{f.label}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Key: {f.key} · Type: {f.type}</div>
                      </div>
                      <span className="m-badge m-badge-info">{f.type.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: STORE SETTINGS */}
          {activeNav === 'settings' && (
            <div>
              <div className="m-page-header">
                <div>
                  <h1 className="m-page-title">Storefront Settings & Staff</h1>
                  <p className="m-page-subtitle">Manage store identity, theme accent, contact numbers, and staff access.</p>
                </div>
              </div>

              <div className="m-card max-w-2xl">
                <div className="m-form-grid">
                  <div className="m-form-group col-span-2">
                    <label className="m-label">Business Name</label>
                    <input
                      type="text"
                      value={currentBusiness.name}
                      onChange={(e) => {
                        const updated = { ...currentBusiness, name: e.target.value };
                        TenantStore.saveBusiness(updated);
                        setBusinesses(TenantStore.getBusinesses());
                      }}
                      className="m-input"
                    />
                  </div>
                  <div className="m-form-group">
                    <label className="m-label">WhatsApp Order Number</label>
                    <input
                      type="text"
                      value={currentBusiness.whatsapp}
                      onChange={(e) => {
                        const updated = { ...currentBusiness, whatsapp: e.target.value };
                        TenantStore.saveBusiness(updated);
                        setBusinesses(TenantStore.getBusinesses());
                      }}
                      className="m-input"
                    />
                  </div>
                  <div className="m-form-group">
                    <label className="m-label">Theme Color Accent</label>
                    <input
                      type="color"
                      value={currentBusiness.themeColor}
                      onChange={(e) => {
                        const updated = { ...currentBusiness, themeColor: e.target.value };
                        TenantStore.saveBusiness(updated);
                        setBusinesses(TenantStore.getBusinesses());
                      }}
                      className="m-input h-10 p-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: PLATFORM HUB (SUPER-ADMIN ONLY) */}
          {activeNav === 'platform' && session.role === 'super_admin' && (
            <div>
              <div className="m-page-header">
                <div>
                  <h1 className="m-page-title">👑 Super-Admin Platform Hub</h1>
                  <p className="m-page-subtitle">Global overview across all independent business tenants.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businesses.map((b) => (
                  <div key={b.id} className="m-card flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{b.emoji}</span>
                        <span className={`m-badge m-badge-${b.status === 'active' ? 'success' : 'danger'}`}>
                          {b.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white">{b.name}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{b.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setActiveTenantId(b.id);
                          setActiveNav('overview');
                          showToast(`Switched workspace to ${b.name}`);
                        }}
                        className="m-btn m-btn-primary m-btn-sm"
                      >
                        Enter Workspace →
                      </button>
                      <button
                        onClick={() => {
                          TenantStore.toggleBusinessStatus(b.id);
                          setBusinesses(TenantStore.getBusinesses());
                        }}
                        className="m-btn m-btn-secondary m-btn-sm"
                      >
                        {b.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ───────────────── CATEGORY CREATE/EDIT MODAL ───────────────── */}
      {isCategoryModalOpen && (
        <div className="m-modal-backdrop" onClick={() => setIsCategoryModalOpen(false)}>
          <div className="m-modal-card max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="m-modal-header">
              <div className="m-modal-title">{editingCategory ? 'Edit Category' : 'Create New Category'}</div>
              <button onClick={() => setIsCategoryModalOpen(false)} className="m-modal-close">✕</button>
            </div>
            <form onSubmit={handleSaveCategory}>
              <div className="m-modal-body space-y-4">
                <div className="m-form-group">
                  <label className="m-label">Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sculptures & Idols / Silk Sarees"
                    value={catFormData.name}
                    onChange={(e) => setCatFormData({ ...catFormData, name: e.target.value })}
                    className="m-input"
                  />
                </div>

                <div className="m-form-group">
                  <label className="m-label">Parent Category (For Subcategories)</label>
                  <select
                    value={catFormData.parentId}
                    onChange={(e) => setCatFormData({ ...catFormData, parentId: e.target.value })}
                    className="m-select"
                  >
                    <option value="">None (Top-Level Category)</option>
                    {categories
                      .filter((c) => !c.parentId && (!editingCategory || c.id !== editingCategory.id))
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="m-form-group">
                    <label className="m-label">Icon / Emoji</label>
                    <input
                      type="text"
                      placeholder="e.g. 🎁"
                      value={catFormData.icon}
                      onChange={(e) => setCatFormData({ ...catFormData, icon: e.target.value })}
                      className="m-input"
                    />
                  </div>
                  <div className="m-form-group">
                    <label className="m-label">Status</label>
                    <select
                      value={catFormData.status}
                      onChange={(e) => setCatFormData({ ...catFormData, status: e.target.value as 'active' | 'inactive' })}
                      className="m-select"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="m-form-group">
                  <label className="m-label">Description</label>
                  <textarea
                    placeholder="Short summary of this collection..."
                    value={catFormData.description}
                    onChange={(e) => setCatFormData({ ...catFormData, description: e.target.value })}
                    className="m-textarea h-20"
                  />
                </div>
              </div>
              <div className="m-modal-footer">
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="m-btn m-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="m-btn m-btn-primary">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ───────────────── PRODUCT CREATE/EDIT FULL MODAL ───────────────── */}
      {isProductModalOpen && (
        <div className="m-modal-backdrop" onClick={() => setIsProductModalOpen(false)}>
          <div className="m-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="m-modal-header">
              <div className="m-modal-title">{editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Product'}</div>
              <button onClick={() => setIsProductModalOpen(false)} className="m-modal-close">✕</button>
            </div>

            {/* Modal Tabs */}
            <div className="m-modal-tabs">
              <button
                type="button"
                className={`m-modal-tab ${productTab === 'basic' ? 'active' : ''}`}
                onClick={() => setProductTab('basic')}
              >
                1. Basic Info
              </button>
              <button
                type="button"
                className={`m-modal-tab ${productTab === 'pricing' ? 'active' : ''}`}
                onClick={() => setProductTab('pricing')}
              >
                2. Pricing & Stock
              </button>
              <button
                type="button"
                className={`m-modal-tab ${productTab === 'custom' ? 'active' : ''}`}
                onClick={() => setProductTab('custom')}
              >
                3. Business Attributes ({currentBusiness.name})
              </button>
              <button
                type="button"
                className={`m-modal-tab ${productTab === 'media' ? 'active' : ''}`}
                onClick={() => setProductTab('media')}
              >
                4. Images & Media
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              <div className="m-modal-body">
                {productTab === 'basic' && (
                  <div className="m-form-grid">
                    <div className="m-form-group col-span-2">
                      <label className="m-label">Product Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pure Zardosi Bridal Blouse / Lord Ganesha Idol"
                        value={prodFormData.name}
                        onChange={(e) => setProdFormData({ ...prodFormData, name: e.target.value })}
                        className="m-input"
                      />
                    </div>

                    <div className="m-form-group">
                      <label className="m-label">Category *</label>
                      <select
                        required
                        value={prodFormData.categoryId}
                        onChange={(e) => setProdFormData({ ...prodFormData, categoryId: e.target.value })}
                        className="m-select"
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="m-form-group">
                      <label className="m-label">SKU / Product Code</label>
                      <input
                        type="text"
                        value={prodFormData.sku}
                        onChange={(e) => setProdFormData({ ...prodFormData, sku: e.target.value })}
                        className="m-input"
                      />
                    </div>

                    <div className="m-form-group col-span-2">
                      <label className="m-label">Short Description</label>
                      <textarea
                        placeholder="Key highlights and specifications..."
                        value={prodFormData.shortDescription}
                        onChange={(e) => setProdFormData({ ...prodFormData, shortDescription: e.target.value })}
                        className="m-textarea h-20"
                      />
                    </div>

                    <div className="m-form-group">
                      <label className="m-label">Publish Status</label>
                      <select
                        value={prodFormData.status}
                        onChange={(e) => setProdFormData({ ...prodFormData, status: e.target.value as 'published' | 'draft' | 'archived' })}
                        className="m-select"
                      >
                        <option value="published">Published (Live on Storefront)</option>
                        <option value="draft">Draft (Hidden)</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                )}

                {productTab === 'pricing' && (
                  <div className="m-form-grid">
                    <div className="m-form-group">
                      <label className="m-label">Selling Price (₹) *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={prodFormData.price}
                        onChange={(e) => setProdFormData({ ...prodFormData, price: Number(e.target.value) })}
                        className="m-input"
                      />
                    </div>

                    <div className="m-form-group">
                      <label className="m-label">Compare-at Price (₹)</label>
                      <input
                        type="number"
                        min="0"
                        placeholder="Original MRP if discounted"
                        value={prodFormData.compareAtPrice}
                        onChange={(e) => setProdFormData({ ...prodFormData, compareAtPrice: Number(e.target.value) })}
                        className="m-input"
                      />
                    </div>

                    <div className="m-form-group">
                      <label className="m-label">Stock Quantity</label>
                      <input
                        type="number"
                        min="0"
                        value={prodFormData.stockQuantity}
                        onChange={(e) => setProdFormData({ ...prodFormData, stockQuantity: Number(e.target.value) })}
                        className="m-input"
                      />
                    </div>

                    <div className="m-form-group">
                      <label className="m-label">Low Stock Alert Threshold</label>
                      <input
                        type="number"
                        min="0"
                        value={prodFormData.lowStockThreshold}
                        onChange={(e) => setProdFormData({ ...prodFormData, lowStockThreshold: Number(e.target.value) })}
                        className="m-input"
                      />
                    </div>
                  </div>
                )}

                {productTab === 'custom' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-400 mb-2">
                      Custom fields configured specifically for <strong>{currentBusiness.name}</strong>:
                    </div>
                    {currentBusiness.customFields?.map((f) => (
                      <div key={f.key} className="m-form-group">
                        <label className="m-label">{f.label}</label>
                        {f.type === 'select' ? (
                          <select
                            value={prodFormData.customAttributes[f.key] || ''}
                            onChange={(e) =>
                              setProdFormData({
                                ...prodFormData,
                                customAttributes: {
                                  ...prodFormData.customAttributes,
                                  [f.key]: e.target.value,
                                },
                              })
                            }
                            className="m-select"
                          >
                            <option value="">Select option</option>
                            {f.options?.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : f.type === 'textarea' ? (
                          <textarea
                            placeholder={f.placeholder}
                            value={prodFormData.customAttributes[f.key] || ''}
                            onChange={(e) =>
                              setProdFormData({
                                ...prodFormData,
                                customAttributes: {
                                  ...prodFormData.customAttributes,
                                  [f.key]: e.target.value,
                                },
                              })
                            }
                            className="m-textarea h-20"
                          />
                        ) : (
                          <input
                            type={f.type}
                            placeholder={f.placeholder}
                            value={prodFormData.customAttributes[f.key] || ''}
                            onChange={(e) =>
                              setProdFormData({
                                ...prodFormData,
                                customAttributes: {
                                  ...prodFormData.customAttributes,
                                  [f.key]: e.target.value,
                                },
                              })
                            }
                            className="m-input"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {productTab === 'media' && (
                  <div className="space-y-4">
                    <div className="m-form-group">
                      <label className="m-label">Primary Image URL</label>
                      <input
                        type="text"
                        placeholder="https://... or /images/..."
                        value={prodFormData.images[0] || ''}
                        onChange={(e) =>
                          setProdFormData({
                            ...prodFormData,
                            images: [e.target.value, ...prodFormData.images.slice(1)],
                          })
                        }
                        className="m-input"
                      />
                    </div>
                    {prodFormData.images[0] && (
                      <div className="w-32 h-32 rounded-lg overflow-hidden border border-white/10 bg-slate-900">
                        <img src={prodFormData.images[0]} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="m-modal-footer">
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="m-btn m-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="m-btn m-btn-primary">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ───────────────── PRINTABLE INVOICE MODAL ───────────────── */}
      {selectedOrderForInvoice && (
        <div className="m-modal-backdrop" onClick={() => setSelectedOrderForInvoice(null)}>
          <div className="m-modal-card max-w-xl bg-white text-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-start border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold">{currentBusiness.name}</h2>
                  <div className="text-xs text-slate-500">{currentBusiness.address}, {currentBusiness.city}</div>
                  <div className="text-xs text-slate-500">Phone: {currentBusiness.phone}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-400 uppercase">Tax Invoice</div>
                  <div className="text-sm font-mono font-bold">#{selectedOrderForInvoice.orderNumber}</div>
                  <div className="text-xs text-slate-500">{new Date(selectedOrderForInvoice.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="mt-4 border-b pb-4">
                <div className="text-xs font-bold uppercase text-slate-400">Billed To</div>
                <div className="font-bold text-sm">{selectedOrderForInvoice.customer.name}</div>
                <div className="text-xs text-slate-600">{selectedOrderForInvoice.customer.phone}</div>
                <div className="text-xs text-slate-600">{selectedOrderForInvoice.customer.address}</div>
              </div>

              <div className="mt-4">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b text-slate-500">
                      <th className="py-2">Item</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Price</th>
                      <th className="py-2 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrderForInvoice.items.map((it, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2 font-medium">{it.name}</td>
                        <td className="py-2 text-center">{it.quantity}</td>
                        <td className="py-2 text-right">₹{it.price}</td>
                        <td className="py-2 text-right font-bold">₹{it.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="w-48 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrderForInvoice.subtotal}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm pt-2 border-t">
                    <span>Total:</span>
                    <span>₹{selectedOrderForInvoice.total}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t text-center text-[10px] text-slate-400">
                Thank you for your business · {currentBusiness.tagline}
              </div>
            </div>

            <div className="bg-slate-100 p-4 flex justify-end gap-2 border-t">
              <button onClick={() => window.print()} className="m-btn m-btn-primary m-btn-sm">
                Print Invoice
              </button>
              <button onClick={() => setSelectedOrderForInvoice(null)} className="m-btn m-btn-secondary m-btn-sm text-slate-800">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────── TOAST NOTIFICATION ───────────────── */}
      {toastMsg && <div className="m-toast">{toastMsg}</div>}
    </div>
  );
}

export default AdminDashboard;
