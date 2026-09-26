import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useSiteData } from "../hooks/useSiteData";
import {
  ACTIVE_BUSINESSES,
  getCategoriesForDivision,
  getProductsForDivision,
  saveProductToSite,
  deleteProductFromSite,
  toggleProductStock,
  type UnifiedProduct,
} from "../lib/catalog";
import { waLink } from "../lib/whatsapp";
import { compressPhoto } from "../lib/photoCompression";
import { rupees } from "../lib/format";
import "./AdminDashboard.css";

export function AdminDashboard() {
  const { site, setSite, resetSite } = useSiteData();

  // Navigation state
  const [activeNav, setActiveNav] = useState<string>("gifts"); // 'gifts' | 'bites' | 'celebrations' | 'studio' | 'beauty' | 'supply' | 'whatsapp' | 'announcements' | 'media' | 'reviews'
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [stockFilter, setStockFilter] = useState<"all" | "inStock" | "outOfStock">("all");

  // Notification state
  const [toastMsg, setToastMsg] = useState<string>("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<UnifiedProduct | null>(null);
  const [isNewProduct, setIsNewProduct] = useState<boolean>(false);
  const [productFormTab, setProductFormTab] = useState<"basic" | "variants" | "nutrition" | "media">("basic");

  // Category modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  // Delete confirmation modal
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<UnifiedProduct | null>(null);

  // Current active business configuration
  const currentBusiness = useMemo(() => {
    return ACTIVE_BUSINESSES.find((b) => b.id === activeNav);
  }, [activeNav]);

  // Categories for current business
  const businessCategories = useMemo(() => {
    if (!currentBusiness) return [];
    return getCategoriesForDivision(site, currentBusiness.id);
  }, [site, currentBusiness]);

  // Products for current business
  const allBusinessProducts = useMemo(() => {
    if (!currentBusiness) return [];
    return getProductsForDivision(site, currentBusiness.id);
  }, [site, currentBusiness]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return allBusinessProducts.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      // Stock filter
      if (stockFilter === "inStock" && !p.inStock) return false;
      if (stockFilter === "outOfStock" && p.inStock) return false;
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchDesc = p.description?.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchDesc) return false;
      }
      return true;
    });
  }, [allBusinessProducts, selectedCategory, stockFilter, searchQuery]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  const handleSave = () => {
    setSite(site);
    setHasUnsavedChanges(false);
    showToast("✅ All changes saved to live website successfully!");
  };

  const handleToggleStock = (product: UnifiedProduct) => {
    const updated = toggleProductStock(site, product);
    setSite(updated);
    setHasUnsavedChanges(true);
    showToast(`Stock updated for ${product.name}`);
  };

  const handleOpenAddProduct = () => {
    if (!currentBusiness) return;
    const defaultCat = businessCategories[0] || "General";
    setEditingProduct({
      id: `prod-${Date.now()}`,
      divisionId: currentBusiness.id,
      category: defaultCat,
      name: "",
      price: "",
      emoji: currentBusiness.emoji || "✨",
      inStock: true,
      description: "",
      options: [],
    });
    setIsNewProduct(true);
    setProductFormTab("basic");
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (product: UnifiedProduct) => {
    setEditingProduct(JSON.parse(JSON.stringify(product)));
    setIsNewProduct(false);
    setProductFormTab("basic");
    setIsProductModalOpen(true);
  };

  const handleSaveProductModal = () => {
    if (!editingProduct || !editingProduct.name.trim()) {
      alert("Please enter a product name.");
      return;
    }
    const updated = saveProductToSite(site, editingProduct, isNewProduct);
    setSite(updated);
    setIsProductModalOpen(false);
    setHasUnsavedChanges(true);
    showToast(`✅ "${editingProduct.name}" ${isNewProduct ? "added" : "updated"} successfully!`);
  };

  const handleDeleteProduct = (product: UnifiedProduct) => {
    const updated = deleteProductFromSite(site, product);
    setSite(updated);
    setDeleteConfirmProduct(null);
    setHasUnsavedChanges(true);
    showToast(`🗑️ "${product.name}" deleted.`);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim() || !currentBusiness) return;
    const div = site.divisions.find((d) => d.id === currentBusiness.id);
    if (div) {
      if (!div.store) div.store = [];
      div.store.push({
        name: newCategoryName.trim(),
        emoji: "📦",
        items: [],
      });
      setSite({ ...site });
      setHasUnsavedChanges(true);
      showToast(`Category "${newCategoryName}" created!`);
      setSelectedCategory(newCategoryName.trim());
    }
    setNewCategoryName("");
    setIsCategoryModalOpen(false);
  };

  const handleImageUpload = async (file: File) => {
    try {
      showToast("⏳ Compressing image...");
      const compressed = await compressPhoto(file);
      if (editingProduct) {
        setEditingProduct({
          ...editingProduct,
          image: compressed,
        });
        showToast("✅ Image uploaded and compressed to WebP!");
      }
    } catch {
      alert("Could not process this image. Please ensure it is a valid JPG/PNG/WebP.");
    }
  };

  return (
    <div className="alca-dashboard-app">
      {/* Toast Notification */}
      {toastMsg && <div className="alca-toast-pill">{toastMsg}</div>}

      {/* TOP HEADER */}
      <header className="alca-topbar">
        <div className="alca-topbar-left">
          <Link href="/" className="alca-brand-badge">
            <span className="alca-brand-logo">A</span>
            <div>
              <strong>ALCA CONTROL CENTER</strong>
              <small>E-Commerce Multi-Store Manager</small>
            </div>
          </Link>
        </div>

        <div className="alca-topbar-right">
          <div className="alca-phone-pill" title="Current WhatsApp Orders Target">
            <span>📲 Dispatch:</span>
            <b>{site.contact.ordersPhone || "9010995180"}</b>
          </div>

          <Link href="/" className="alca-btn alca-btn-ghost">
            👁️ View Live Store
          </Link>

          <button
            type="button"
            className="alca-btn alca-btn-secondary"
            onClick={() => {
              if (confirm("Reset all customizations back to factory default?")) {
                resetSite();
                showToast("🔄 Reset to default data.");
              }
            }}
          >
            Reset
          </button>

          <button
            type="button"
            className={`alca-btn alca-btn-primary ${hasUnsavedChanges ? "alca-pulse" : ""}`}
            onClick={handleSave}
          >
            💾 Save Changes
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="alca-layout">
        {/* LEFT SIDEBAR */}
        <aside className="alca-sidebar">
          <div className="alca-sidebar-group">
            <div className="alca-sidebar-heading">BUSINESS CATALOGS</div>
            {ACTIVE_BUSINESSES.map((b) => {
              const count = getProductsForDivision(site, b.id).length;
              const isActive = activeNav === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  className={`alca-nav-item ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setActiveNav(b.id);
                    setSelectedCategory("all");
                  }}
                >
                  <span className="alca-nav-emoji">{b.emoji}</span>
                  <span className="alca-nav-text">{b.short}</span>
                  <span className="alca-nav-count">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="alca-sidebar-group">
            <div className="alca-sidebar-heading">SITE CONTROLS</div>
            <button
              type="button"
              className={`alca-nav-item ${activeNav === "whatsapp" ? "active" : ""}`}
              onClick={() => setActiveNav("whatsapp")}
            >
              <span className="alca-nav-emoji">💬</span>
              <span className="alca-nav-text">WhatsApp & Routing</span>
            </button>

            <button
              type="button"
              className={`alca-nav-item ${activeNav === "announcements" ? "active" : ""}`}
              onClick={() => setActiveNav("announcements")}
            >
              <span className="alca-nav-emoji">📢</span>
              <span className="alca-nav-text">Hero & Announce</span>
            </button>

            <button
              type="button"
              className={`alca-nav-item ${activeNav === "reviews" ? "active" : ""}`}
              onClick={() => setActiveNav("reviews")}
            >
              <span className="alca-nav-emoji">⭐</span>
              <span className="alca-nav-text">Reviews & FAQs</span>
            </button>
          </div>
        </aside>

        {/* CONTENT MAIN */}
        <main className="alca-main-content">
          {/* A. E-COMMERCE PRODUCTS VIEW */}
          {currentBusiness && (
            <div className="alca-catalog-view">
              {/* Business Header */}
              <div className="alca-business-banner">
                <div>
                  <div className="alca-badge-tag">{currentBusiness.emoji} {currentBusiness.id.toUpperCase()}</div>
                  <h1>{currentBusiness.name}</h1>
                  <p>Manage product items, category catalogs, custom variants, pricing, and stock status.</p>
                </div>
                <button
                  type="button"
                  className="alca-btn alca-btn-add"
                  onClick={handleOpenAddProduct}
                >
                  ➕ Add New Product
                </button>
              </div>

              {/* Category Pills Bar */}
              <div className="alca-category-scroller">
                <button
                  type="button"
                  className={`alca-cat-pill ${selectedCategory === "all" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("all")}
                >
                  All Items ({allBusinessProducts.length})
                </button>
                {businessCategories.map((cat) => {
                  const catCount = allBusinessProducts.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`alca-cat-pill ${selectedCategory === cat ? "active" : ""}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat} <small>({catCount})</small>
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="alca-cat-pill alca-cat-pill-new"
                  onClick={() => setIsCategoryModalOpen(true)}
                >
                  + New Category
                </button>
              </div>

              {/* Filter and Search Bar */}
              <div className="alca-filter-bar">
                <div className="alca-search-box">
                  <span>🔍</span>
                  <input
                    type="text"
                    placeholder={`Search ${allBusinessProducts.length} items in ${currentBusiness.short}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button type="button" onClick={() => setSearchQuery("")}>
                      ✕
                    </button>
                  )}
                </div>

                <div className="alca-filter-group">
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value as "all" | "inStock" | "outOfStock")}
                    aria-label="Filter by stock status"
                  >
                    <option value="all">📦 All Stock</option>
                    <option value="inStock">✅ In Stock Only</option>
                    <option value="outOfStock">❌ Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Products Table */}
              <div className="alca-products-table-card">
                {filteredProducts.length === 0 ? (
                  <div className="alca-empty-state">
                    <span className="alca-empty-icon">📦</span>
                    <h3>No products found</h3>
                    <p>No products match your search or selected category.</p>
                    <button
                      type="button"
                      className="alca-btn alca-btn-primary"
                      onClick={handleOpenAddProduct}
                    >
                      Add First Product
                    </button>
                  </div>
                ) : (
                  <table className="alca-table">
                    <thead>
                      <tr>
                        <th>ITEM / PHOTO</th>
                        <th>CATEGORY</th>
                        <th>PRICE (₹)</th>
                        <th>VARIANTS / SPECS</th>
                        <th>STOCK STATUS</th>
                        <th style={{ textAlign: "right" }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div className="alca-product-cell">
                              {p.image ? (
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="alca-product-img"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = "none";
                                  }}
                                />
                              ) : (
                                <div className="alca-product-emoji">{p.emoji || "✨"}</div>
                              )}
                              <div>
                                <strong className="alca-product-title">{p.name}</strong>
                                {p.description && (
                                  <small className="alca-product-desc">
                                    {p.description.length > 70
                                      ? p.description.slice(0, 70) + "..."
                                      : p.description}
                                  </small>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="alca-tag-chip">{p.category}</span>
                          </td>
                          <td>
                            <div className="alca-price-cell">
                              <b>{p.price ? (p.price.startsWith("₹") ? p.price : `₹${p.price}`) : "Custom"}</b>
                              {p.oldPrice && <del>₹{p.oldPrice}</del>}
                            </div>
                          </td>
                          <td>
                            {p.options && p.options.length > 0 ? (
                              <div className="alca-variant-chips">
                                {p.options.map((opt, i) => (
                                  <span key={i} className="alca-mini-chip">
                                    {opt.weight}: ₹{opt.price}
                                  </span>
                                ))}
                              </div>
                            ) : p.size ? (
                              <span className="alca-mini-chip">{p.size}</span>
                            ) : p.weight ? (
                              <span className="alca-mini-chip">{p.weight}</span>
                            ) : (
                              <span className="muted-dash">—</span>
                            )}
                          </td>
                          <td>
                            <button
                              type="button"
                              className={`alca-stock-badge ${p.inStock ? "in-stock" : "out-stock"}`}
                              onClick={() => handleToggleStock(p)}
                              title="Click to toggle stock status"
                            >
                              {p.inStock ? "✅ In Stock" : "❌ Out of Stock"}
                            </button>
                          </td>
                          <td>
                            <div className="alca-actions-cell">
                              <button
                                type="button"
                                className="alca-icon-btn edit"
                                title="Edit Product"
                                onClick={() => handleOpenEditProduct(p)}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                type="button"
                                className="alca-icon-btn delete"
                                title="Delete Product"
                                onClick={() => setDeleteConfirmProduct(p)}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* B. WHATSAPP & ORDER ROUTING */}
          {activeNav === "whatsapp" && (
            <div className="alca-settings-view">
              <div className="alca-business-banner">
                <div>
                  <div className="alca-badge-tag">💬 ROUTING</div>
                  <h1>WhatsApp & Order Redirection</h1>
                  <p>Configure the WhatsApp account where customer orders, quotes, and custom hamper requests are dispatched.</p>
                </div>
              </div>

              <div className="alca-form-card">
                <h3>Primary Orders Phone (WhatsApp)</h3>
                <p className="alca-form-desc">This number receives all shopping cart checkout messages and orders.</p>
                <div className="alca-input-row">
                  <label>
                    <span>10-Digit Mobile Number (e.g., 9010995180)</span>
                    <input
                      type="text"
                      value={site.contact.ordersPhone}
                      onChange={(e) => {
                        site.contact.ordersPhone = e.target.value;
                        setSite({ ...site });
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </label>
                  <label>
                    <span>General Inquiry Phone</span>
                    <input
                      type="text"
                      value={site.contact.mainPhone}
                      onChange={(e) => {
                        site.contact.mainPhone = e.target.value;
                        setSite({ ...site });
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </label>
                </div>

                <hr />

                <h3>Live WhatsApp Payload Simulator</h3>
                <p className="alca-form-desc">Here is how customer orders will format when they click "Order on WhatsApp":</p>
                <div className="alca-wa-preview-box">
                  <code>
                    🛍️ *NEW ORDER — ALCA*<br />
                    ───────────────────────<br />
                    *Items Ordered:*<br />
                    • [Item 1 Name] ([Variant]) × [Qty] — ₹[Price]<br />
                    • [Item 2 Name] ([Variant]) × [Qty] — ₹[Price]<br />
                    ───────────────────────<br />
                    *Total:* ₹[Total Price]
                  </code>
                </div>

                <div style={{ marginTop: "16px" }}>
                  <button
                    type="button"
                    className="alca-btn alca-btn-secondary"
                    onClick={() => {
                      const link = waLink(
                        site.contact.ordersPhone,
                        "👋 Hello ALCA, this is a test order message from the Admin Dashboard."
                      );
                      window.open(link, "_blank");
                    }}
                  >
                    📲 Test WhatsApp Link
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* C. HERO & ANNOUNCEMENTS */}
          {activeNav === "announcements" && (
            <div className="alca-settings-view">
              <div className="alca-business-banner">
                <div>
                  <div className="alca-badge-tag">📢 GLOBAL</div>
                  <h1>Hero & Announcement Banner</h1>
                  <p>Update homepage top banner alert and hero slogans.</p>
                </div>
              </div>

              <div className="alca-form-card">
                <h3>Announcement Alert Strip</h3>
                <label className="alca-checkbox-label">
                  <input
                    type="checkbox"
                    checked={site.announce.on}
                    onChange={(e) => {
                      site.announce.on = e.target.checked;
                      setSite({ ...site });
                      setHasUnsavedChanges(true);
                    }}
                  />
                  <span>Show Announcement Banner on Homepage</span>
                </label>

                {site.announce.on && (
                  <label style={{ marginTop: "12px" }}>
                    <span>Banner Text</span>
                    <input
                      type="text"
                      value={site.announce.text}
                      onChange={(e) => {
                        site.announce.text = e.target.value;
                        setSite({ ...site });
                        setHasUnsavedChanges(true);
                      }}
                    />
                  </label>
                )}

                <hr />

                <h3>Homepage Hero Text</h3>
                <label>
                  <span>Eyebrow / Subtitle</span>
                  <input
                    type="text"
                    value={site.hero.eyebrow}
                    onChange={(e) => {
                      site.hero.eyebrow = e.target.value;
                      setSite({ ...site });
                      setHasUnsavedChanges(true);
                    }}
                  />
                </label>
                <label style={{ marginTop: "12px" }}>
                  <span>Main Headline Paragraph</span>
                  <textarea
                    rows={4}
                    value={site.hero.text}
                    onChange={(e) => {
                      site.hero.text = e.target.value;
                      setSite({ ...site });
                      setHasUnsavedChanges(true);
                    }}
                  />
                </label>
              </div>
            </div>
          )}

          {/* D. REVIEWS & FAQS */}
          {activeNav === "reviews" && (
            <div className="alca-settings-view">
              <div className="alca-business-banner">
                <div>
                  <div className="alca-badge-tag">⭐ TESTIMONIALS</div>
                  <h1>Reviews & FAQ Accordion</h1>
                  <p>Manage customer reviews and frequently asked questions.</p>
                </div>
              </div>

              <div className="alca-form-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h3>Customer Reviews ({site.reviews.length})</h3>
                  <button
                    type="button"
                    className="alca-btn alca-btn-secondary"
                    onClick={() => {
                      site.reviews.unshift(["New Customer", "Amazing service and fresh quality!", "5"]);
                      setSite({ ...site });
                      setHasUnsavedChanges(true);
                    }}
                  >
                    + Add Review
                  </button>
                </div>

                <div className="alca-reviews-list">
                  {site.reviews.map((rev, i) => (
                    <div key={i} className="alca-review-row">
                      <input
                        type="text"
                        placeholder="Author Name"
                        value={rev[0]}
                        style={{ width: "200px" }}
                        onChange={(e) => {
                          rev[0] = e.target.value;
                          setSite({ ...site });
                          setHasUnsavedChanges(true);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Review text"
                        value={rev[1]}
                        style={{ flex: 1 }}
                        onChange={(e) => {
                          rev[1] = e.target.value;
                          setSite({ ...site });
                          setHasUnsavedChanges(true);
                        }}
                      />
                      <button
                        type="button"
                        className="alca-icon-btn delete"
                        onClick={() => {
                          site.reviews.splice(i, 1);
                          setSite({ ...site });
                          setHasUnsavedChanges(true);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= MODALS ================= */}

      {/* 1. ADD / EDIT PRODUCT MODAL */}
      {isProductModalOpen && editingProduct && (
        <div className="alca-modal-overlay" onClick={() => setIsProductModalOpen(false)}>
          <div className="alca-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="alca-modal-header">
              <div>
                <h2>{isNewProduct ? "➕ Add New Product" : "✏️ Edit Product"}</h2>
                <small>{currentBusiness?.name}</small>
              </div>
              <button
                type="button"
                className="alca-modal-close"
                onClick={() => setIsProductModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="alca-modal-tabs">
              <button
                type="button"
                className={productFormTab === "basic" ? "active" : ""}
                onClick={() => setProductFormTab("basic")}
              >
                📋 General Info
              </button>
              <button
                type="button"
                className={productFormTab === "variants" ? "active" : ""}
                onClick={() => setProductFormTab("variants")}
              >
                ⚖️ Weights & Variants ({editingProduct.options?.length || 0})
              </button>
              <button
                type="button"
                className={productFormTab === "nutrition" ? "active" : ""}
                onClick={() => setProductFormTab("nutrition")}
              >
                🥗 Specs & Nutrition
              </button>
              <button
                type="button"
                className={productFormTab === "media" ? "active" : ""}
                onClick={() => setProductFormTab("media")}
              >
                🖼️ Image & Media
              </button>
            </div>

            {/* Modal Body */}
            <div className="alca-modal-body">
              {productFormTab === "basic" && (
                <div className="alca-form-grid">
                  <label className="full">
                    <span>Product Name *</span>
                    <input
                      type="text"
                      placeholder="e.g. Kashmiri Walnuts / Brass Idol"
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                    />
                  </label>

                  <label>
                    <span>Category</span>
                    <select
                      value={editingProduct.category}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, category: e.target.value })
                      }
                    >
                      {businessCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Emoji Icon</span>
                    <input
                      type="text"
                      placeholder="🎁"
                      value={editingProduct.emoji || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, emoji: e.target.value })
                      }
                    />
                  </label>

                  <label>
                    <span>Price (₹) *</span>
                    <input
                      type="text"
                      placeholder="e.g. 450"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: e.target.value })
                      }
                    />
                  </label>

                  <label>
                    <span>Compare / Original Price (₹)</span>
                    <input
                      type="text"
                      placeholder="e.g. 600"
                      value={editingProduct.oldPrice || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, oldPrice: e.target.value })
                      }
                    />
                  </label>

                  <label className="full">
                    <span>Short Description / Highlights</span>
                    <textarea
                      rows={3}
                      placeholder="Describe the product, ingredients, or occasion..."
                      value={editingProduct.description || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, description: e.target.value })
                      }
                    />
                  </label>

                  <label className="full alca-checkbox-row">
                    <input
                      type="checkbox"
                      checked={editingProduct.inStock}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, inStock: e.target.checked })
                      }
                    />
                    <span>Available / In Stock</span>
                  </label>
                </div>
              )}

              {productFormTab === "variants" && (
                <div>
                  <div className="alca-variant-header">
                    <p>Add weight options (e.g. 250g, 500g, 1kg) or sizes with separate pricing.</p>
                    <button
                      type="button"
                      className="alca-btn alca-btn-secondary"
                      onClick={() => {
                        const nextOptions = [...(editingProduct.options || [])];
                        nextOptions.push({ weight: "250g", price: "200" });
                        setEditingProduct({ ...editingProduct, options: nextOptions });
                      }}
                    >
                      + Add Variant Row
                    </button>
                  </div>

                  {(!editingProduct.options || editingProduct.options.length === 0) ? (
                    <p className="muted-box">No custom variants added. Standard price will apply.</p>
                  ) : (
                    <div className="alca-variant-list">
                      {editingProduct.options.map((opt, i) => (
                        <div key={i} className="alca-variant-row">
                          <input
                            type="text"
                            placeholder="Weight / Size (e.g. 500g)"
                            value={opt.weight}
                            onChange={(e) => {
                              const opts = [...(editingProduct.options || [])];
                              opts[i].weight = e.target.value;
                              setEditingProduct({ ...editingProduct, options: opts });
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Price (₹)"
                            value={opt.price}
                            onChange={(e) => {
                              const opts = [...(editingProduct.options || [])];
                              opts[i].price = e.target.value;
                              setEditingProduct({ ...editingProduct, options: opts });
                            }}
                          />
                          <button
                            type="button"
                            className="alca-icon-btn delete"
                            onClick={() => {
                              const opts = editingProduct.options?.filter((_, idx) => idx !== i);
                              setEditingProduct({ ...editingProduct, options: opts });
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {productFormTab === "nutrition" && (
                <div className="alca-form-grid">
                  <label>
                    <span>Bottle Size / Weight</span>
                    <input
                      type="text"
                      placeholder="e.g. 250 ml"
                      value={editingProduct.size || editingProduct.weight || ""}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          size: e.target.value,
                          weight: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    <span>Calories (kcal)</span>
                    <input
                      type="text"
                      placeholder="e.g. 90"
                      value={editingProduct.kcal || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, kcal: e.target.value })
                      }
                    />
                  </label>

                  <label>
                    <span>Protein (g)</span>
                    <input
                      type="text"
                      placeholder="e.g. 2.5"
                      value={editingProduct.protein || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, protein: e.target.value })
                      }
                    />
                  </label>

                  <label>
                    <span>Carbs (g)</span>
                    <input
                      type="text"
                      placeholder="e.g. 20"
                      value={editingProduct.carbs || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, carbs: e.target.value })
                      }
                    />
                  </label>

                  <label className="full">
                    <span>Ingredients</span>
                    <input
                      type="text"
                      placeholder="e.g. Fresh Carrot, Apple, Beetroot"
                      value={editingProduct.ingredients || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, ingredients: e.target.value })
                      }
                    />
                  </label>

                  <label className="full">
                    <span>Good For / Health Benefits</span>
                    <input
                      type="text"
                      placeholder="e.g. Vitamin A for skin & eyesight"
                      value={editingProduct.goodFor || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, goodFor: e.target.value })
                      }
                    />
                  </label>
                </div>
              )}

              {productFormTab === "media" && (
                <div className="alca-media-tab-content">
                  <div className="alca-upload-box">
                    <label className="alca-file-dropzone">
                      <span>📁 Click to Upload Local Image</span>
                      <small>Auto-compresses into WebP format</small>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                      />
                    </label>
                  </div>

                  <label style={{ marginTop: "16px" }}>
                    <span>Or Enter Image URL:</span>
                    <input
                      type="text"
                      placeholder="https://... or /images/..."
                      value={editingProduct.image || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, image: e.target.value })
                      }
                    />
                  </label>

                  {editingProduct.image && (
                    <div className="alca-image-preview-card">
                      <span>Image Preview:</span>
                      <img src={editingProduct.image} alt="Preview" />
                      <button
                        type="button"
                        className="alca-btn alca-btn-secondary"
                        onClick={() => setEditingProduct({ ...editingProduct, image: "" })}
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="alca-modal-footer">
              <button
                type="button"
                className="alca-btn alca-btn-ghost"
                onClick={() => setIsProductModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="alca-btn alca-btn-primary"
                onClick={handleSaveProductModal}
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. ADD CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="alca-modal-overlay" onClick={() => setIsCategoryModalOpen(false)}>
          <div className="alca-modal-card sm" onClick={(e) => e.stopPropagation()}>
            <div className="alca-modal-header">
              <h2>➕ Add New Category</h2>
              <button
                type="button"
                className="alca-modal-close"
                onClick={() => setIsCategoryModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="alca-modal-body">
              <label>
                <span>Category Name</span>
                <input
                  type="text"
                  placeholder="e.g. Dry Fruits & Nuts"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                />
              </label>
            </div>
            <div className="alca-modal-footer">
              <button
                type="button"
                className="alca-btn alca-btn-ghost"
                onClick={() => setIsCategoryModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="alca-btn alca-btn-primary"
                onClick={handleAddCategory}
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DELETE CONFIRMATION MODAL */}
      {deleteConfirmProduct && (
        <div className="alca-modal-overlay" onClick={() => setDeleteConfirmProduct(null)}>
          <div className="alca-modal-card sm" onClick={(e) => e.stopPropagation()}>
            <div className="alca-modal-header">
              <h2>🗑️ Confirm Delete</h2>
              <button
                type="button"
                className="alca-modal-close"
                onClick={() => setDeleteConfirmProduct(null)}
              >
                ✕
              </button>
            </div>
            <div className="alca-modal-body">
              <p>
                Are you sure you want to delete <strong>"{deleteConfirmProduct.name}"</strong>?
              </p>
            </div>
            <div className="alca-modal-footer">
              <button
                type="button"
                className="alca-btn alca-btn-ghost"
                onClick={() => setDeleteConfirmProduct(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="alca-btn alca-btn-danger"
                onClick={() => handleDeleteProduct(deleteConfirmProduct)}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
