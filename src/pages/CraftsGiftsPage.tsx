import { useState, useMemo } from 'react'
import { useSiteData } from '../hooks/useSiteData'
import { getProductsForDivision, getCategoriesForDivision, type UnifiedProduct } from '../lib/catalog'
import { rupees } from '../lib/format'

export default function CraftsGiftsPage() {
  const { site } = useSiteData()
  const division = site.divisions.find((d) => d.id === 'gifts') || site.divisions[0]
  const phone = division.phone || '9010995180'

  // Dynamic products & categories from SiteData / Admin Dashboard
  const allProducts = useMemo(() => {
    return getProductsForDivision(site, 'gifts')
  }, [site])

  const dynamicCategories = useMemo(() => {
    const cats = getCategoriesForDivision(site, 'gifts')
    return ['All Collections', ...cats]
  }, [site])

  const [selectedCategory, setSelectedCategory] = useState<string>('All Collections')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedProductModal, setSelectedProductModal] = useState<UnifiedProduct | null>(null)

  // Custom Commission Studio State
  const [commissionType, setCommissionType] = useState('3D Couple & Family Figurine')
  const [commissionNames, setCommissionNames] = useState('')
  const [commissionOccasion, setCommissionOccasion] = useState('Wedding Anniversary')
  const [commissionNotes, setCommissionNotes] = useState('')
  const [commissionPackaging, setCommissionPackaging] = useState('Royal Velvet Keepsake Box')

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (selectedCategory !== 'All Collections' && p.category !== selectedCategory) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = p.name.toLowerCase().includes(q)
        const matchCat = p.category.toLowerCase().includes(q)
        const matchDesc = p.description?.toLowerCase().includes(q)
        if (!matchName && !matchCat && !matchDesc) return false
      }
      return true
    })
  }, [allProducts, selectedCategory, searchQuery])

  const handleWhatsAppOrder = (product: UnifiedProduct, customNote?: string) => {
    const noteStr = customNote ? `%0A📝 *Custom Note:* ${encodeURIComponent(customNote)}` : ''
    const priceStr = product.price ? `%0A💰 *Price:* ₹${product.price}` : ''
    const text = `🎁 *Hi ALCA Crafts & Customized Gifts!*%0AI would like to order/customize:%0A%0A✨ *Item:* ${encodeURIComponent(product.name)}%0A📂 *Category:* ${encodeURIComponent(product.category)}${priceStr}${noteStr}%0A%0APlease let me know the personalization process, dispatch timeline, and payment details. Thank you! ✨`
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
  }

  const handleCustomCommissionWhatsApp = () => {
    const text = `🎨 *Hi ALCA Bespoke Craft Studio!*%0AI would like to commission a custom handcrafted piece:%0A%0A✨ *Craft Type:* ${encodeURIComponent(commissionType)}%0A🎉 *Occasion:* ${encodeURIComponent(commissionOccasion)}%0A✍️ *Names / Inscription:* ${encodeURIComponent(commissionNames || 'To be shared')}%0A🎁 *Packaging:* ${encodeURIComponent(commissionPackaging)}%0A📝 *Design Notes:* ${encodeURIComponent(commissionNotes || 'Standard bespoke design')}%0A%0APlease guide me with reference requirements, timeline, and quote estimate. Thank you! ✨`
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-slate-900 selection:bg-amber-700 selection:text-white pb-24 lg:pb-12">
      {/* ───────────────── TOP LUXURY BANNER & BRANDING ───────────────── */}
      <header className="border-b border-amber-900/10 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 group">
              <img
                src="/images/alca-logo-1.webp"
                alt="ALCA Logo"
                className="h-10 w-10 rounded-full object-cover shadow-sm border border-amber-900/15 transition group-hover:scale-105"
              />
              <div>
                <div className="font-serif text-base font-bold tracking-tight text-slate-900 leading-none">
                  ALCA <span className="text-amber-700">CRAFTS & GIFTS</span>
                </div>
                <div className="text-[10px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
                  Bespoke Keepsakes & Devotional Art · Hyderabad
                </div>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#custom-studio"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-amber-800/20 bg-amber-50/60 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-100"
            >
              <span>✨</span>
              <span>Bespoke Studio</span>
            </a>
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Hi ALCA, I have an enquiry about your customized crafts and gifts.')}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-amber-700 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-amber-800 active:scale-95"
            >
              Inquire on WhatsApp ↗
            </a>
          </div>
        </div>
      </header>

      {/* ───────────────── HERO SHOWCASE ───────────────── */}
      <section className="relative overflow-hidden border-b border-amber-900/10 bg-gradient-to-b from-white via-[#FAF7F2] to-[#F5EFEB] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-3.5 py-1 text-xs font-semibold text-amber-900 border border-amber-200/60 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse" />
              Handcrafted in Hyderabad · Bespoke Personalization
            </div>

            <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.14]">
              Handcrafted Memories.
              <br />
              <span className="text-amber-800 italic">Curated with Emotion.</span>
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
              We design and handcraft exquisite personalized 3D couple figurines, preserved varmala resin keepsakes, consecrated devotional idols, and luxury trousseau gift hampers—crafted to celebrate life’s sacred milestones.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#catalog"
                className="rounded-lg bg-amber-800 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-amber-900 active:scale-95"
              >
                Explore Collections ({allProducts.length}) ↓
              </a>
              <a
                href="#custom-studio"
                className="rounded-lg border border-amber-900/20 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-800 shadow-sm transition hover:bg-amber-50"
              >
                Bespoke Order Studio ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── PRODUCT CATALOG (DYNAMIC FROM ADMIN) ───────────────── */}
      <section id="catalog" className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-amber-900/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Artisan Catalog
              </span>
              <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-4xl">
                Featured Collections & Handmade Crafts
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Browse our real-time inventory synced with our studio workshop in Hyderabad.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search idols, figurines, hampers..."
                className="w-full rounded-lg border border-amber-900/20 bg-white px-4 py-2 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-6 flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none">
            {dynamicCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-amber-800 text-white shadow-sm'
                    : 'border border-amber-900/15 bg-white text-slate-700 hover:bg-amber-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-amber-900/20 bg-white p-12 text-center">
              <div className="text-3xl">🎁</div>
              <h3 className="mt-3 font-serif text-lg font-bold text-slate-800">No craft items found</h3>
              <p className="mt-1 text-xs text-slate-500">Try changing your search query or category filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Collections')
                  setSearchQuery('')
                }}
                className="mt-4 rounded-lg bg-amber-800 px-4 py-2 text-xs font-bold text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const img = product.image || '/images/gift.webp'
                const displayPrice = product.price && !isNaN(Number(product.price)) ? rupees(Number(product.price)) : product.price

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition-all duration-300 hover:border-amber-700/30 hover:shadow-xl"
                  >
                    <div>
                      {/* Product Image Box */}
                      <div className="relative aspect-square w-full overflow-hidden bg-amber-50/50">
                        <img
                          src={img}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute left-3 top-3 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                          {product.category}
                        </div>
                        {product.inStock ? (
                          <div className="absolute right-3 top-3 rounded-md bg-emerald-600/90 px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-sm">
                            In Stock
                          </div>
                        ) : (
                          <div className="absolute right-3 top-3 rounded-md bg-rose-600/90 px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-sm">
                            Made to Order
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center justify-between text-[11px] font-medium text-amber-800">
                          <span>{product.emoji || '✨'} Handcrafted</span>
                          {product.weight && <span>{product.weight}</span>}
                        </div>

                        <h3 className="mt-1 font-serif text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                          {product.name}
                        </h3>

                        {product.description && (
                          <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2">
                            {product.description}
                          </p>
                        )}

                        {product.goodFor && (
                          <div className="mt-3 rounded-md bg-amber-50/70 p-2 text-[10px] text-amber-900 border border-amber-100">
                            <span className="font-bold">Ideal for:</span> {product.goodFor}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer & Actions */}
                    <div className="border-t border-amber-900/10 bg-amber-50/30 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] uppercase font-semibold text-slate-400">
                            Studio Price
                          </span>
                          <span className="font-serif text-lg font-bold text-amber-900">
                            {displayPrice ? `${displayPrice}` : 'Custom Quote'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedProductModal(product)}
                            className="rounded-lg border border-amber-900/20 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-amber-50"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleWhatsAppOrder(product)}
                            className="rounded-lg bg-amber-800 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-amber-900 active:scale-95"
                          >
                            Order ↗
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ───────────────── BESPOKE COMMISSION STUDIO (CUSTOM ORDERS) ───────────────── */}
      <section id="custom-studio" className="border-y border-amber-900/10 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Personalized Crafting
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-4xl">
              Bespoke Custom Order Studio
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Have a specific vision, photo reference, or couple milestone in mind? Our artisans will customize your piece with custom names, dates, and luxury gift presentation.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-amber-900/15 bg-[#FAF7F2] p-6 sm:p-10 shadow-lg">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Select Craft Type
                </label>
                <select
                  value={commissionType}
                  onChange={(e) => setCommissionType(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-amber-900/20 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
                >
                  <option value="3D Couple & Family Figurine">3D Couple & Family Figurine</option>
                  <option value="Preserved Wedding Varmala Resin Frame">Preserved Wedding Varmala Resin Frame</option>
                  <option value="Consecrated Lord Ganesha / Balaji Deity">Consecrated Lord Ganesha / Balaji Deity</option>
                  <option value="Ocean Wave Teakwood Resin Clock">Ocean Wave Teakwood Resin Clock</option>
                  <option value="Royal Trousseau Wedding Tray Set">Royal Trousseau Wedding Tray Set</option>
                  <option value="Bulk Wedding Return Gifts / Souvenirs">Bulk Wedding Return Gifts / Souvenirs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Occasion Type
                </label>
                <select
                  value={commissionOccasion}
                  onChange={(e) => setCommissionOccasion(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-amber-900/20 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
                >
                  <option value="Wedding / Reception">Wedding / Reception</option>
                  <option value="Wedding Anniversary">Wedding Anniversary</option>
                  <option value="Gruhapravesam (Housewarming)">Gruhapravesam (Housewarming)</option>
                  <option value="1st Birthday / Milestone">1st Birthday / Milestone</option>
                  <option value="Diwali / Festive Corporate">Diwali / Festive Corporate</option>
                  <option value="Half-Saree / Sreemantham">Half-Saree / Sreemantham</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Names / Dates for Engraving
                </label>
                <input
                  type="text"
                  value={commissionNames}
                  onChange={(e) => setCommissionNames(e.target.value)}
                  placeholder="e.g. Sravya & Rohit · 24.11.2026"
                  className="mt-1.5 w-full rounded-lg border border-amber-900/20 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Gift Packaging Style
                </label>
                <select
                  value={commissionPackaging}
                  onChange={(e) => setCommissionPackaging(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-amber-900/20 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
                >
                  <option value="Royal Velvet Keepsake Box">Royal Velvet Keepsake Box</option>
                  <option value="Handcrafted Pine Wood Box with Monogram">Handcrafted Pine Wood Box with Monogram</option>
                  <option value="Handwoven Bamboo & Cane Basket">Handwoven Bamboo & Cane Basket</option>
                  <option value="Signature Ribbon Gift Wrap with Custom Card">Signature Ribbon Gift Wrap with Custom Card</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Special Customization Notes & Reference Details
              </label>
              <textarea
                rows={3}
                value={commissionNotes}
                onChange={(e) => setCommissionNotes(e.target.value)}
                placeholder="Mention reference photos, saree colors, resin color palette, or specific dimensions..."
                className="mt-1.5 w-full rounded-lg border border-amber-900/20 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-900/10 pt-6">
              <div className="text-xs text-slate-600">
                ✨ Direct consultation with our artisan team · No advance commitment needed to inquire.
              </div>
              <button
                onClick={handleCustomCommissionWhatsApp}
                className="w-full sm:w-auto rounded-lg bg-amber-800 px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-amber-900 active:scale-95"
              >
                Send Custom Request on WhatsApp ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── PRODUCT DETAIL MODAL ───────────────── */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-amber-900/15 bg-white p-6 shadow-2xl text-slate-900 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-md bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-800 border border-amber-200/60">
                  {selectedProductModal.category}
                </span>
                <h3 className="mt-2 font-serif text-2xl font-bold text-slate-900">
                  {selectedProductModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProductModal(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 relative aspect-square w-full overflow-hidden rounded-xl bg-amber-50 border border-amber-900/10">
              <img
                src={selectedProductModal.image || '/images/gift.webp'}
                alt={selectedProductModal.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Dimensions / Weight:</span>
                <span className="font-bold text-slate-800">{selectedProductModal.weight || 'Custom Crafted'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Availability:</span>
                <span className="font-bold text-emerald-700">
                  {selectedProductModal.inStock ? 'In Stock (Ready to dispatch/customize)' : 'Handcrafted Made to Order (3-5 Days)'}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-600">
              {selectedProductModal.description || selectedProductModal.about}
            </p>

            {selectedProductModal.goodFor && (
              <div className="mt-4 rounded-xl bg-amber-50/70 border border-amber-200/60 p-3.5 text-xs text-amber-950">
                <span className="font-bold">Recommended Occasions:</span> {selectedProductModal.goodFor}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-amber-900/10 pt-4">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  Price
                </span>
                <div className="font-serif text-xl font-bold text-amber-900">
                  {selectedProductModal.price ? `₹${selectedProductModal.price}` : 'Custom Quote'}
                </div>
              </div>
              <button
                onClick={() => {
                  handleWhatsAppOrder(selectedProductModal)
                  setSelectedProductModal(null)
                }}
                className="rounded-lg bg-amber-800 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-amber-900"
              >
                Order on WhatsApp ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────── FLOATING SIDE DOCK (CALL & WHATSAPP) ───────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
        <a
          href={`tel:+91${phone}`}
          className="group flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xl border border-slate-200 transition-all duration-300 hover:scale-105 hover:border-amber-300 hover:text-amber-800 active:scale-95"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-amber-800 text-xs font-normal">
            📞
          </span>
          <span className="hidden sm:inline">Call +91 {phone}</span>
          <span className="sm:hidden">Call</span>
        </a>

        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent('Hi ALCA Crafts & Gifts! I would like to inquire about customized gifts.')}`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-xs font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] active:scale-95"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white text-sm">
            💬
          </span>
          <span>WhatsApp Chat</span>
        </a>
      </div>
    </main>
  )
}
