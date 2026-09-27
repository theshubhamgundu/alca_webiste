import { useState, useMemo } from 'react'
import { useSiteData } from '../hooks/useSiteData'
import { getProductsForDivision, getCategoriesForDivision, type UnifiedProduct } from '../lib/catalog'
import { rupees } from '../lib/format'

export default function SupplyPage() {
  const { site } = useSiteData()
  const division = site.divisions.find((d) => d.id === 'supply') || site.divisions[0]
  const phone = division.phone || '9010995180'

  // Dynamic products & categories from SiteData / Admin Dashboard
  const allProducts = useMemo(() => {
    return getProductsForDivision(site, 'supply')
  }, [site])

  const dynamicCategories = useMemo(() => {
    const cats = getCategoriesForDivision(site, 'supply')
    return ['All Wholesale Categories', ...cats]
  }, [site])

  const [selectedCategory, setSelectedCategory] = useState<string>('All Wholesale Categories')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedProductModal, setSelectedProductModal] = useState<UnifiedProduct | null>(null)

  // B2B Bulk RFQ Builder State
  const [rfqCompanyName, setRfqCompanyName] = useState('')
  const [rfqContactPerson, setRfqContactPerson] = useState('')
  const [rfqCategory, setRfqCategory] = useState('Bulk Dehydrated Ingredients & Spices')
  const [rfqEstimatedVolume, setRfqEstimatedVolume] = useState('50kg - 250kg (Medium Commercial)')
  const [rfqDeliveryLocation, setRfqDeliveryLocation] = useState('Hyderabad (Same-Day / 24h Dispatch)')
  const [rfqNotes, setRfqNotes] = useState('')

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (selectedCategory !== 'All Wholesale Categories' && p.category !== selectedCategory) {
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

  const handleWhatsAppProductRFQ = (product: UnifiedProduct) => {
    const priceStr = product.price ? `%0A💰 *Wholesale Unit Ref:* ₹${product.price}` : ''
    const weightStr = product.weight ? `%0A⚖️ *Pack/MOQ:* ${encodeURIComponent(product.weight)}` : ''
    const text = `🏭 *Hi ALCA B2B Supply & Manufacturing!*%0AI would like to request a bulk wholesale quotation / samples:%0A%0A📦 *Product:* ${encodeURIComponent(product.name)}%0A📂 *Category:* ${encodeURIComponent(product.category)}${priceStr}${weightStr}%0A%0APlease share bulk pricing tiers, specification sheet, and sample availability. Thank you! ✨`
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
  }

  const handleRfqSubmitWhatsApp = () => {
    const companyStr = rfqCompanyName ? `Company / Brand: *${encodeURIComponent(rfqCompanyName)}*%0A` : ''
    const personStr = rfqContactPerson ? `Contact Person: *${encodeURIComponent(rfqContactPerson)}*%0A` : ''
    const text = `📋 *Hi ALCA B2B Wholesale & Manufacturing (RFQ Inquiry)!*%0A${companyStr}${personStr}I would like to request an enterprise supply quote:%0A%0A📦 *Supply Category:* ${encodeURIComponent(rfqCategory)}%0A📊 *Estimated Volume:* ${encodeURIComponent(rfqEstimatedVolume)}%0A📍 *Delivery Location:* ${encodeURIComponent(rfqDeliveryLocation)}%0A📝 *Specifications & Customization:* ${encodeURIComponent(rfqNotes || 'Standard commercial wholesale specs')}%0A%0APlease share quotation sheet and account manager details. Thank you! ✨`
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white pb-24 lg:pb-12">
      {/* ───────────────── TOP ENTERPRISE BANNER & BRANDING ───────────────── */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 group">
              <img
                src="/images/alca-logo-1.webp"
                alt="ALCA Logo"
                className="h-10 w-10 rounded-full object-cover shadow-sm border border-slate-200 transition group-hover:scale-105"
              />
              <div>
                <div className="font-serif text-base font-bold tracking-tight text-slate-900 leading-none">
                  ALCA <span className="text-blue-600">SUPPLY & MANUFACTURING</span>
                </div>
                <div className="text-[10px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
                  B2B Wholesale · Food Processing · Custom Packaging · Hyderabad
                </div>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#rfq-builder"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50/70 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              <span>📋</span>
              <span>Submit RFQ</span>
            </a>
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Hi ALCA B2B Supply, I would like to inquire about wholesale commercial supply and contract manufacturing.')}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
            >
              B2B WhatsApp Desk ↗
            </a>
          </div>
        </div>
      </header>

      {/* ───────────────── HERO SHOWCASE ───────────────── */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-[#F8FAFC] to-[#EFF6FF]/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200/60 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              FSSAI Certified Commercial Processing Facility
            </div>

            <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.14]">
              Enterprise Supply & Manufacturing.
              <br />
              <span className="text-blue-600 italic">Built for Scale & Reliability.</span>
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
              Direct manufacturer and commercial distributor of farm-grade spices, commercial dehydrated fruit slices & powders, custom printed luxury rigid packaging boxes, and private labeling solutions for Hyderabad hotels, cafes, cloud kitchens, and retail brands.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#catalog"
                className="rounded-lg bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-blue-700 active:scale-95"
              >
                Explore Wholesale Catalog ({allProducts.length}) ↓
              </a>
              <a
                href="#rfq-builder"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                Request Bulk Quotation (RFQ) ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── WHOLESALE CATALOG (DYNAMIC FROM ADMIN) ───────────────── */}
      <section id="catalog" className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                B2B Inventory
              </span>
              <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-4xl">
                Commercial Supply Lines & Packaging
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                View real-time wholesale availability, packaging MOQ specifications, and sample dispatch options.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spices, boxes, powders..."
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
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
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="text-3xl">📦</div>
              <h3 className="mt-3 font-serif text-lg font-bold text-slate-800">No supply items found</h3>
              <p className="mt-1 text-xs text-slate-500">Try changing your search query or category filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Wholesale Categories')
                  setSearchQuery('')
                }}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const img = product.image || '/media/supply-960.webp'
                const displayPrice = product.price && !isNaN(Number(product.price)) ? rupees(Number(product.price)) : product.price

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl"
                  >
                    <div>
                      {/* Product Image Box */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
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
                            Wholesale Ready
                          </div>
                        ) : (
                          <div className="absolute right-3 top-3 rounded-md bg-amber-600/90 px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-sm">
                            Contract Batch
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center justify-between text-[11px] font-medium text-blue-700">
                          <span>{product.emoji || '📦'} Commercial Line</span>
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
                          <div className="mt-3 rounded-md bg-blue-50/60 p-2 text-[10px] text-blue-900 border border-blue-100">
                            <span className="font-bold">Target Industry:</span> {product.goodFor}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer & Actions */}
                    <div className="border-t border-slate-100 bg-slate-50/60 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] uppercase font-semibold text-slate-400">
                            Wholesale Tier
                          </span>
                          <span className="font-serif text-lg font-bold text-slate-900">
                            {displayPrice ? `${displayPrice}` : 'RFQ Required'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedProductModal(product)}
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                          >
                            Specs
                          </button>
                          <button
                            onClick={() => handleWhatsAppProductRFQ(product)}
                            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                          >
                            RFQ ↗
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

      {/* ───────────────── B2B RFQ & BULK QUOTATION BUILDER ───────────────── */}
      <section id="rfq-builder" className="border-y border-slate-200 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Commercial Procurement
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-4xl">
              Request for Quotation (RFQ)
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Submit your bulk volume specifications for commercial ingredients, custom box fabrication, or private labeling. Our B2B commercial desk responds within 2 hours.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-10 shadow-lg">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  value={rfqCompanyName}
                  onChange={(e) => setRfqCompanyName(e.target.value)}
                  placeholder="e.g. Hyderabad Hospitality Pvt Ltd / Artisan Cafe"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Procurement Manager / Contact Name
                </label>
                <input
                  type="text"
                  value={rfqContactPerson}
                  onChange={(e) => setRfqContactPerson(e.target.value)}
                  placeholder="e.g. Ramesh Varma"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Supply Category
                </label>
                <select
                  value={rfqCategory}
                  onChange={(e) => setRfqCategory(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Bulk Dehydrated Ingredients & Spices">Bulk Dehydrated Ingredients & Spices</option>
                  <option value="Luxury Packaging & Rigid Gift Boxes">Luxury Packaging & Rigid Gift Boxes</option>
                  <option value="Commercial Kitchen & Hotel Supplies">Commercial Kitchen & Hotel Supplies</option>
                  <option value="Private Labeling & Contract Manufacturing">Private Labeling & Contract Manufacturing</option>
                  <option value="Custom Eco-Kraft Pouches & Corrugated Boxes">Custom Eco-Kraft Pouches & Corrugated Boxes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Estimated Order Volume
                </label>
                <select
                  value={rfqEstimatedVolume}
                  onChange={(e) => setRfqEstimatedVolume(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Sample / Pilot Trial Batch (5kg - 25kg / 50 Units)">Sample / Pilot Trial Batch (5kg - 25kg / 50 Units)</option>
                  <option value="Medium Commercial (50kg - 250kg / 250 Units)">Medium Commercial (50kg - 250kg / 250 Units)</option>
                  <option value="Large Enterprise (500kg+ / 1,000+ Units)">Large Enterprise (500kg+ / 1,000+ Units)</option>
                  <option value="Recurring Monthly Supply Contract">Recurring Monthly Supply Contract</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Delivery Destination
                </label>
                <select
                  value={rfqDeliveryLocation}
                  onChange={(e) => setRfqDeliveryLocation(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Hyderabad (Same-Day / 24h Dispatch)">Hyderabad (Same-Day / 24h Dispatch)</option>
                  <option value="Telangana & Andhra Pradesh Regional Hubs">Telangana & Andhra Pradesh Regional Hubs</option>
                  <option value="Pan-India Commercial Freight Delivery">Pan-India Commercial Freight Delivery</option>
                  <option value="Self-Pickup from LB Nagar Facility">Self-Pickup from LB Nagar Facility</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Detailed Product Specifications & Branding Needs
              </label>
              <textarea
                rows={3}
                value={rfqNotes}
                onChange={(e) => setRfqNotes(e.target.value)}
                placeholder="Mention required moisture percentages, mesh sizes for powders, custom foil stamping pantone codes, or target unit pricing..."
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <div className="text-xs text-slate-600">
                📋 GST invoicing provided · Sample evaluation kits dispatched upon request.
              </div>
              <button
                onClick={handleRfqSubmitWhatsApp}
                className="w-full sm:w-auto rounded-lg bg-blue-600 px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-blue-700 active:scale-95"
              >
                Send RFQ to B2B Team on WhatsApp ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── PRODUCT DETAIL MODAL ───────────────── */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-700 border border-blue-200">
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

            <div className="mt-4 relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
              <img
                src={selectedProductModal.image || '/media/supply-960.webp'}
                alt={selectedProductModal.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Packaging / MOQ:</span>
                <span className="font-bold text-slate-800">{selectedProductModal.weight || 'Custom Batch'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Commercial Status:</span>
                <span className="font-bold text-emerald-700">
                  {selectedProductModal.inStock ? 'Ready for Dispatch in Hyderabad (24-48h)' : 'Contract Manufacturing On Demand'}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-600">
              {selectedProductModal.description || selectedProductModal.about}
            </p>

            {selectedProductModal.goodFor && (
              <div className="mt-4 rounded-xl bg-blue-50/70 border border-blue-200/60 p-3.5 text-xs text-blue-950">
                <span className="font-bold">Recommended Commercial Applications:</span> {selectedProductModal.goodFor}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  Wholesale Price
                </span>
                <div className="font-serif text-xl font-bold text-slate-900">
                  {selectedProductModal.price ? `₹${selectedProductModal.price}` : 'RFQ Required'}
                </div>
              </div>
              <button
                onClick={() => {
                  handleWhatsAppProductRFQ(selectedProductModal)
                  setSelectedProductModal(null)
                }}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-blue-700"
              >
                Request Quote on WhatsApp ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────── FLOATING SIDE DOCK (CALL & WHATSAPP) ───────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
        <a
          href={`tel:+91${phone}`}
          className="group flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xl border border-slate-200 transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:text-blue-600 active:scale-95"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs font-normal">
            📞
          </span>
          <span className="hidden sm:inline">Call +91 {phone}</span>
          <span className="sm:hidden">Call</span>
        </a>

        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent('Hi ALCA Supply! I would like to inquire about commercial B2B supply.')}`}
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