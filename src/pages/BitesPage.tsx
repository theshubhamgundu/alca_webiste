import { useState, useMemo } from 'react'
import { useSiteData } from '../hooks/useSiteData'
import { getProductsForDivision, getCategoriesForDivision, type UnifiedProduct } from '../lib/catalog'
import { rupees } from '../lib/format'

export default function BitesPage() {
  const { site } = useSiteData()
  const division = site.divisions.find((d) => d.id === 'bites') || site.divisions[0]
  const phone = division.phone || '9010995180'

  // Dynamic products & categories from SiteData
  const allProducts = useMemo(() => {
    return getProductsForDivision(site, 'bites')
  }, [site])

  const dynamicCategories = useMemo(() => {
    const cats = getCategoriesForDivision(site, 'bites')
    return ['All Products', ...cats]
  }, [site])

  const [selectedCategory, setSelectedCategory] = useState<string>('All Products')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedProductModal, setSelectedProductModal] = useState<UnifiedProduct | null>(null)

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      if (selectedCategory !== 'All Products' && p.category !== selectedCategory) {
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

  const handleWhatsAppOrder = (product: UnifiedProduct) => {
    const priceStr = product.price ? `%0A💰 *Price:* ₹${product.price}` : ''
    const text = `🥤 *Hi ALCA Bites & Juices!*%0AI would like to order:%0A%0A✨ *Item:* ${encodeURIComponent(product.name)}%0A📂 *Category:* ${encodeURIComponent(product.category)}${priceStr}%0A%0APlease let me know the availability and delivery options. Thank you! ✨`
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-slate-900 selection:bg-amber-700 selection:text-white pb-24 lg:pb-12">
      {/* TOP HEADER */}
      <header className="border-b border-amber-900/10 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 group">
              <img
                src="/images/logo.jpeg"
                alt="ALCA Logo"
                className="h-10 w-10 rounded-full object-cover shadow-sm border border-amber-900/15 transition group-hover:scale-105"
                onError={(e) => {
                    // fallback to standard logo if logo.jpeg isn't loaded right
                    (e.target as HTMLImageElement).src = '/logo.svg';
                }}
              />
              <div>
                <div className="font-serif text-base font-bold tracking-tight text-slate-900 leading-none">
                  ALCA <span className="text-amber-700">BITES & JUICES</span>
                </div>
                <div className="text-[10px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
                  100% Natural · Fresh · Homemade
                </div>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent('Hi ALCA, I have an enquiry about your healthy snacks and fresh juices.')}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-amber-700 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-amber-800 active:scale-95"
            >
              Order on WhatsApp ↗
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-amber-900/10 bg-gradient-to-b from-white via-[#FAF7F2] to-[#F5EFEB] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-3.5 py-1 text-xs font-semibold text-amber-900 border border-amber-200/60 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse" />
              Fresh & Hygienic · Zero Preservatives
            </div>

            <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.14]">
              Healthy Snacks &
              <br />
              <span className="text-amber-800 italic">Fresh Cold Juices.</span>
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
              From our kitchen to your heart. We offer 100% homemade dehydrated fruits, zero-oil vegetable chips, premium handpicked dry fruits, cold-pressed fresh juices, and nutritious bites.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#catalog"
                className="rounded-lg bg-amber-800 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-amber-900 active:scale-95"
              >
                View Menu ({allProducts.length}) ↓
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATALOG */}
      <section id="catalog" className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-amber-900/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Fresh Catalog
              </span>
              <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-4xl">
                Nuts, Juices & Chips
              </h2>
            </div>

            <div className="w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search almonds, juice, chips..."
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
              <div className="text-3xl">🥤</div>
              <h3 className="mt-3 font-serif text-lg font-bold text-slate-800">No products found</h3>
              <p className="mt-1 text-xs text-slate-500">Try changing your search query or category filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Products')
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
                const img = product.image || '/bites/orange juice.jpeg'
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
                            Sold Out
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center justify-between text-[11px] font-medium text-amber-800">
                          <span>{product.emoji || '🥤'} Fresh</span>
                          {product.weight && <span>{product.weight}</span>}
                        </div>

                        <h3 className="mt-1 font-serif text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    {/* Footer & Actions */}
                    <div className="border-t border-amber-900/10 bg-amber-50/30 p-4">
                      <div className="flex items-center justify-between">
                         <div>
                          <span className="block text-[10px] uppercase font-semibold text-slate-400">
                            Price
                          </span>
                          <span className="font-serif text-lg font-bold text-amber-900">
                            {displayPrice ? `${displayPrice}` : 'Ask Price'}
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

      {/* MODAL */}
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
                src={selectedProductModal.image || '/bites/orange juice.jpeg'}
                alt={selectedProductModal.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-4 space-y-2">
               <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Availability:</span>
                <span className="font-bold text-emerald-700">
                  {selectedProductModal.inStock ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-amber-900/10 pt-4">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  Price
                </span>
                <div className="font-serif text-xl font-bold text-amber-900">
                  {selectedProductModal.price ? `₹${selectedProductModal.price}` : 'Ask Price'}
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
    </main>
  )
}
