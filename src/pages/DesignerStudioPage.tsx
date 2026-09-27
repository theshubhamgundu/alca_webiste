import { useState, useMemo } from 'react'
import { useSiteData } from '../hooks/useSiteData'
import { getProductsForDivision, getCategoriesForDivision, type UnifiedProduct } from '../lib/catalog'
import { rupees } from '../lib/format'

export default function DesignerStudioPage() {
  const { site } = useSiteData()
  const division = site.divisions.find((d) => d.id === 'studio') || site.divisions[0]
  const phone = division.phone || '9010995180'

  // Dynamic products & categories from SiteData / Admin Dashboard
  const allProducts = useMemo(() => {
    return getProductsForDivision(site, 'studio')
  }, [site])

  const dynamicCategories = useMemo(() => {
    const cats = getCategoriesForDivision(site, 'studio')
    return ['All Collections', ...cats]
  }, [site])

  const [selectedCategory, setSelectedCategory] = useState<string>('All Collections')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedProductModal, setSelectedProductModal] = useState<UnifiedProduct | null>(null)

  // Bespoke Fitting & Stitching Consultation State
  const [consultOutfitType, setConsultOutfitType] = useState('Royal Zardosi Bridal Blouse')
  const [consultFabricSource, setConsultFabricSource] = useState('Studio Sourced Pure Raw Silk')
  const [consultFittingType, setConsultFittingType] = useState('In-Studio Consultation (LB Nagar)')
  const [consultEventDate, setConsultEventDate] = useState('')
  const [consultClientName, setConsultClientName] = useState('')
  const [consultNotes, setConsultNotes] = useState('')

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

  const handleWhatsAppCouture = (product: UnifiedProduct, customNote?: string) => {
    const noteStr = customNote ? `%0A📝 *Custom Note:* ${encodeURIComponent(customNote)}` : ''
    const priceStr = product.price ? `%0A💰 *Studio Price:* ₹${product.price}` : ''
    const text = `👗 *Hi ALCA Designer Studio & Couture!*%0AI would like to inquire about customized tailoring & couture:%0A%0A✨ *Outfit:* ${encodeURIComponent(product.name)}%0A📂 *Category:* ${encodeURIComponent(product.category)}${priceStr}${noteStr}%0A%0APlease share available stitching slots, fabric guidance, and trial scheduling. Thank you! ✨`
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
  }

  const handleConsultationWhatsApp = () => {
    const nameStr = consultClientName ? `Name: *${encodeURIComponent(consultClientName)}*%0A` : ''
    const dateStr = consultEventDate ? `Event Date: *${encodeURIComponent(consultEventDate)}*%0A` : ''
    const text = `✂️ *Hi ALCA Designer Studio (Bespoke Consultation)!*%0A${nameStr}I would like to book a couture / stitching appointment:%0A%0A✨ *Outfit Type:* ${encodeURIComponent(consultOutfitType)}%0A🧵 *Fabric Preference:* ${encodeURIComponent(consultFabricSource)}%0A📍 *Consultation Mode:* ${encodeURIComponent(consultFittingType)}%0A${dateStr}📝 *Notes/Saree details:* ${encodeURIComponent(consultNotes || 'Custom bridal styling')}%0A%0APlease confirm available consultation slots. Thank you! ✨`
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-slate-900 selection:bg-[#92704E] selection:text-white pb-24 lg:pb-12">
      {/* ───────────────── TOP LUXURY BANNER & BRANDING ───────────────── */}
      <header className="border-b border-[#92704E]/15 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 group">
              <img
                src="/images/alca-logo-1.webp"
                alt="ALCA Logo"
                className="h-10 w-10 rounded-full object-cover shadow-sm border border-[#92704E]/20 transition group-hover:scale-105"
              />
              <div>
                <div className="font-serif text-base font-bold tracking-tight text-slate-900 leading-none">
                  ALCA <span className="text-[#92704E]">DESIGNER STUDIO</span>
                </div>
                <div className="text-[10px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
                  Haute Couture & Bridal Tailoring · Hyderabad
                </div>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#consultation"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#92704E]/20 bg-[#FAF4ED] px-3 py-1.5 text-xs font-semibold text-[#7A5B3B] transition hover:bg-[#F5EBE0]"
            >
              <span>✂️</span>
              <span>Book Fitting Trial</span>
            </a>
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Hi ALCA Designer Studio, I would like to inquire about bridal couture and custom tailoring.')}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-[#92704E] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#7D5F41] active:scale-95"
            >
              Couture Desk ↗
            </a>
          </div>
        </div>
      </header>

      {/* ───────────────── HERO SHOWCASE ───────────────── */}
      <section className="relative overflow-hidden border-b border-[#92704E]/10 bg-gradient-to-b from-white via-[#FAF8F5] to-[#F3EDE4] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F5EBE0] px-3.5 py-1 text-xs font-semibold text-[#7A5B3B] border border-[#92704E]/20 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#92704E] animate-pulse" />
              In-House Master Karigars · Double Trial Fit Guarantee
            </div>

            <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.14]">
              Crafted for Distinction.
              <br />
              <span className="text-[#92704E] italic">Tailored to Perfection.</span>
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
              From bespoke bridal couture and custom blouses to contemporary designer party wear and heritage ethnic attire—every creation is designed, hand-embroidered, and master-tailored with obsessive attention to silhouette.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#catalog"
                className="rounded-lg bg-[#92704E] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#7D5F41] active:scale-95"
              >
                View Studio Portfolio ({allProducts.length}) ↓
              </a>
              <a
                href="#consultation"
                className="rounded-lg border border-[#92704E]/25 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-800 shadow-sm transition hover:bg-[#FAF4ED]"
              >
                Schedule Fitting Appointment ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── COUTURE & TAILORING CATALOG (DYNAMIC FROM ADMIN) ───────────────── */}
      <section id="catalog" className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#92704E]/15 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#92704E]">
                Couture Catalog
              </span>
              <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-4xl">
                Designer Collections & Tailoring Services
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Explore custom bridal couture, festive coordinates, and master tailoring synced live with our studio.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blouses, lehengas, gowns..."
                className="w-full rounded-lg border border-[#92704E]/20 bg-white px-4 py-2 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:border-[#92704E] focus:outline-none focus:ring-1 focus:ring-[#92704E]"
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
                    ? 'bg-[#92704E] text-white shadow-sm'
                    : 'border border-[#92704E]/15 bg-white text-slate-700 hover:bg-[#FAF4ED]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-[#92704E]/25 bg-white p-12 text-center">
              <div className="text-3xl">👗</div>
              <h3 className="mt-3 font-serif text-lg font-bold text-slate-800">No couture designs found</h3>
              <p className="mt-1 text-xs text-slate-500">Try adjusting your search terms or category filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Collections')
                  setSearchQuery('')
                }}
                className="mt-4 rounded-lg bg-[#92704E] px-4 py-2 text-xs font-bold text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const img = product.image || '/media/studio-960.webp'
                const displayPrice = product.price && !isNaN(Number(product.price)) ? rupees(Number(product.price)) : product.price

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#92704E]/15 bg-white shadow-sm transition-all duration-300 hover:border-[#92704E]/40 hover:shadow-xl"
                  >
                    <div>
                      {/* Product Image Box */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF4ED]">
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
                            Tailoring Open
                          </div>
                        ) : (
                          <div className="absolute right-3 top-3 rounded-md bg-amber-600/90 px-2 py-0.5 text-[10px] font-bold uppercase text-white shadow-sm">
                            Slot Booking
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center justify-between text-[11px] font-medium text-[#92704E]">
                          <span>{product.emoji || '✨'} Bespoke Handcrafted</span>
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
                          <div className="mt-3 rounded-md bg-[#FAF4ED] p-2 text-[10px] text-[#7A5B3B] border border-[#92704E]/15">
                            <span className="font-bold">Occasion:</span> {product.goodFor}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer & Actions */}
                    <div className="border-t border-[#92704E]/10 bg-[#FAF8F5] p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] uppercase font-semibold text-slate-400">
                            Studio Pricing
                          </span>
                          <span className="font-serif text-lg font-bold text-[#7A5B3B]">
                            {displayPrice ? `${displayPrice}` : 'Custom Estimate'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedProductModal(product)}
                            className="rounded-lg border border-[#92704E]/20 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-[#FAF4ED]"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleWhatsAppCouture(product)}
                            className="rounded-lg bg-[#92704E] px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#7D5F41] active:scale-95"
                          >
                            Consult ↗
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

      {/* ───────────────── BESPOKE FITTING & CONSULTATION STUDIO ───────────────── */}
      <section id="consultation" className="border-y border-[#92704E]/15 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#92704E]">
              Studio Appointments
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-4xl">
              Book a Couture & Fitting Consultation
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Schedule a one-on-one session with our senior designer and master tailors in LB Nagar, Hyderabad or request doorstep measurement services.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-[#92704E]/15 bg-[#FAF8F5] p-6 sm:p-10 shadow-lg">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={consultClientName}
                  onChange={(e) => setConsultClientName(e.target.value)}
                  placeholder="e.g. Ananya Reddy"
                  className="mt-1.5 w-full rounded-lg border border-[#92704E]/20 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#92704E] focus:outline-none focus:ring-1 focus:ring-[#92704E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target Wedding / Event Date
                </label>
                <input
                  type="date"
                  value={consultEventDate}
                  onChange={(e) => setConsultEventDate(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#92704E]/20 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-[#92704E] focus:outline-none focus:ring-1 focus:ring-[#92704E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Outfit Type
                </label>
                <select
                  value={consultOutfitType}
                  onChange={(e) => setConsultOutfitType(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#92704E]/20 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-[#92704E] focus:outline-none focus:ring-1 focus:ring-[#92704E]"
                >
                  <option value="Royal Zardosi Bridal Blouse">Royal Zardosi Bridal Blouse</option>
                  <option value="Heritage Multi-Flared Bridal Lehenga">Heritage Multi-Flared Bridal Lehenga</option>
                  <option value="Indo-Western Party Ball Gown">Indo-Western Party Ball Gown</option>
                  <option value="Kalidar Georgette Anarkali Set">Kalidar Georgette Anarkali Set</option>
                  <option value="Groom Royal Sherwani & Kurta">Groom Royal Sherwani & Kurta</option>
                  <option value="Coordinated Couple Muhurtham Wear">Coordinated Couple Muhurtham Wear</option>
                  <option value="Saree Tassels (Kuchu) & Fall Pico">Saree Tassels (Kuchu) & Fall Pico</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Fabric Sourcing Preference
                </label>
                <select
                  value={consultFabricSource}
                  onChange={(e) => setConsultFabricSource(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#92704E]/20 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-[#92704E] focus:outline-none focus:ring-1 focus:ring-[#92704E]"
                >
                  <option value="Studio Sourced Pure Raw Silk">Studio Sourced Pure Raw Silk</option>
                  <option value="Client Provided Saree / Material">Client Provided Saree / Material</option>
                  <option value="Banarasi Brocade & Kanjeevaram">Banarasi Brocade & Kanjeevaram</option>
                  <option value="Pure Viscose Georgette / Organza">Pure Viscose Georgette / Organza</option>
                  <option value="Velvet & Tussar Silk">Velvet & Tussar Silk</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Consultation & Measurement Preference
                </label>
                <select
                  value={consultFittingType}
                  onChange={(e) => setConsultFittingType(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#92704E]/20 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-[#92704E] focus:outline-none focus:ring-1 focus:ring-[#92704E]"
                >
                  <option value="In-Studio Consultation (LB Nagar)">In-Studio Consultation (LB Nagar Workshop)</option>
                  <option value="Doorstep Master Tailor Measurement (Hyderabad)">Doorstep Master Tailor Measurement (Hyderabad)</option>
                  <option value="Online Video Call Measurement Guide">Online Video Call Measurement Guide</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Design Preferences, Neckline Style or Reference Notes
              </label>
              <textarea
                rows={3}
                value={consultNotes}
                onChange={(e) => setConsultNotes(e.target.value)}
                placeholder="Mention neckline preferences (e.g. sweetheart, boat neck, deep back), embroidery motifs (peacock, lotus, temple), or urgent delivery needs..."
                className="mt-1.5 w-full rounded-lg border border-[#92704E]/20 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-[#92704E] focus:outline-none focus:ring-1 focus:ring-[#92704E]"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#92704E]/15 pt-6">
              <div className="text-xs text-slate-600">
                ✂️ Includes 2 precision fitting trials · Free alterations within 30 days of delivery.
              </div>
              <button
                onClick={handleConsultationWhatsApp}
                className="w-full sm:w-auto rounded-lg bg-[#92704E] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#7D5F41] active:scale-95"
              >
                Book Appointment on WhatsApp ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── PRODUCT DETAIL MODAL ───────────────── */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-[#92704E]/20 bg-white p-6 shadow-2xl text-slate-900 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-md bg-[#FAF4ED] px-2.5 py-1 text-[10px] font-bold uppercase text-[#7A5B3B] border border-[#92704E]/20">
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

            <div className="mt-4 relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#FAF4ED] border border-[#92704E]/15">
              <img
                src={selectedProductModal.image || '/media/studio-960.webp'}
                alt={selectedProductModal.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Customization & Fitting:</span>
                <span className="font-bold text-slate-800">{selectedProductModal.weight || 'Custom Tailored to Fit'}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Slot Availability:</span>
                <span className="font-bold text-emerald-700">
                  {selectedProductModal.inStock ? 'Ready for Measurement & Trials (4-7 Days)' : 'Book Early for Wedding Muhurtham'}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-600">
              {selectedProductModal.description || selectedProductModal.about}
            </p>

            {selectedProductModal.goodFor && (
              <div className="mt-4 rounded-xl bg-[#FAF4ED] border border-[#92704E]/20 p-3.5 text-xs text-[#7A5B3B]">
                <span className="font-bold">Ideal For:</span> {selectedProductModal.goodFor}
              </div>
            )}

            <div className="mt-6 flex items-center justify-between border-t border-[#92704E]/15 pt-4">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  Studio Price
                </span>
                <div className="font-serif text-xl font-bold text-[#7A5B3B]">
                  {selectedProductModal.price ? `₹${selectedProductModal.price}` : 'Custom Estimate'}
                </div>
              </div>
              <button
                onClick={() => {
                  handleWhatsAppCouture(selectedProductModal)
                  setSelectedProductModal(null)
                }}
                className="rounded-lg bg-[#92704E] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#7D5F41]"
              >
                Inquire on WhatsApp ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────── FLOATING SIDE DOCK (CALL & WHATSAPP) ───────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
        <a
          href={`tel:+91${phone}`}
          className="group flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xl border border-slate-200 transition-all duration-300 hover:scale-105 hover:border-[#92704E]/40 hover:text-[#92704E] active:scale-95"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FAF4ED] text-[#92704E] text-xs font-normal">
            📞
          </span>
          <span className="hidden sm:inline">Call +91 {phone}</span>
          <span className="sm:hidden">Call</span>
        </a>

        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent('Hi ALCA Designer Studio! I would like to inquire about custom tailoring & bridal couture.')}`}
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