import { useMemo, useState } from 'react'

type Product = {
  id: number
  name: string
  category: string
  price: number
  oldPrice?: number
  unit: string
  image: string
  tag?: string
  description: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Turmeric Powder',
    category: 'Spices',
    price: 149,
    oldPrice: 179,
    unit: '250g',
    tag: 'BESTSELLER',
    image:
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1000&q=85',
    description:
      'Bright, aromatic turmeric powder sourced from premium turmeric roots and processed for maximum flavour and colour.',
  },
  {
    id: 2,
    name: 'Dehydrated Orange Slices',
    category: 'Dehydrated',
    price: 299,
    unit: '100g',
    tag: 'NATURAL',
    image:
      'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=1000&q=85',
    description:
      'Naturally dehydrated orange slices with vibrant colour and concentrated citrus flavour.',
  },
  {
    id: 3,
    name: 'Premium Mixed Seeds',
    category: 'Healthy Snacks',
    price: 249,
    oldPrice: 299,
    unit: '250g',
    tag: 'POPULAR',
    image:
      'https://images.unsplash.com/photo-1605966802076-5d6a6c1c0e6e?auto=format&fit=crop&w=1000&q=85',
    description:
      'A nutritious blend of carefully selected seeds for everyday snacking and wellness.',
  },
  {
    id: 4,
    name: 'Natural Handmade Soap',
    category: 'Personal Care',
    price: 179,
    unit: '100g',
    tag: 'HANDMADE',
    image:
      'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=1000&q=85',
    description:
      'Handcrafted soap made with botanical oils and naturally derived ingredients.',
  },
  {
    id: 5,
    name: 'Cold-Processed Coconut Oil',
    category: 'Personal Care',
    price: 349,
    unit: '500ml',
    tag: 'PURE',
    image:
      'https://images.unsplash.com/photo-1621073117412-1e4a2c5f9a74?auto=format&fit=crop&w=1000&q=85',
    description:
      'Pure coconut oil suitable for cooking, hair care and everyday natural wellness.',
  },
  {
    id: 6,
    name: 'Dried Strawberry Pieces',
    category: 'Dehydrated',
    price: 399,
    unit: '100g',
    tag: 'NEW',
    image:
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=1000&q=85',
    description:
      'Sweet, naturally dehydrated strawberry pieces with concentrated flavour and texture.',
  },
  {
    id: 7,
    name: 'Premium Chilli Powder',
    category: 'Spices',
    price: 169,
    unit: '250g',
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85',
    description:
      'Rich and aromatic chilli powder prepared from carefully selected dried chillies.',
  },
  {
    id: 8,
    name: 'Natural Lip Balm',
    category: 'Personal Care',
    price: 129,
    unit: '10g',
    tag: 'EVERYDAY',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=85',
    description:
      'Nourishing lip balm formulated with naturally derived oils and butters.',
  },
]

const categories = [
  'All',
  'Spices',
  'Dehydrated',
  'Healthy Snacks',
  'Personal Care',
]

export default function SupplyPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  const addToCart = (product: Product) => {
    setCart((current) => [...current, product])
  }

  return (
    <main className="min-h-screen bg-[#F4F1E8] text-[#172117]">
      {/* TOP BAR */}
      <div className="bg-[#19351D] px-5 py-3 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-[#E8DFC8]">
        Natural products · Wholesale supply · Pan-India delivery
      </div>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-40 border-b border-[#19351D]/10 bg-[#F4F1E8]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between px-5 py-5 lg:px-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#687365]">
              Supply & Manufacturing
            </p>

            <h1 className="mt-1 font-serif text-2xl tracking-tight">
              ALCA
            </h1>
          </div>

          <nav className="hidden items-center gap-9 text-xs uppercase tracking-[0.18em] lg:flex">
            <a href="#shop" className="hover:opacity-50">
              Shop
            </a>
            <a href="#collections" className="hover:opacity-50">
              Collections
            </a>
            <a href="#wholesale" className="hover:opacity-50">
              Wholesale
            </a>
            <a href="#story" className="hover:opacity-50">
              Our Story
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden h-11 w-11 items-center justify-center rounded-full border border-[#19351D]/15 md:flex">
              <SearchIcon />
            </button>

            <button className="relative flex h-11 items-center gap-2 rounded-full bg-[#19351D] px-5 text-xs uppercase tracking-widest text-white">
              <CartIcon />

              <span>Cart</span>

              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D5B66D] text-[9px] text-[#19351D]">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="grid min-h-[680px] lg:grid-cols-[1fr_1.05fr]">
          <div className="flex items-center px-6 py-20 lg:px-16 xl:px-24">
            <div className="max-w-[650px]">
              <p className="mb-7 text-xs uppercase tracking-[0.35em] text-[#75816F]">
                Naturally made · Responsibly supplied
              </p>

              <h2 className="font-serif text-[64px] leading-[0.9] tracking-[-0.045em] sm:text-[82px] lg:text-[100px]">
                GOOD
                <br />
                THINGS.
                <br />
                <span className="italic text-[#526F43]">Simply.</span>
              </h2>

              <p className="mt-9 max-w-[510px] text-[15px] leading-7 text-[#596257]">
                Natural ingredients, nourishing foods and thoughtful personal
                care products — sourced, manufactured and supplied with care.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#shop"
                  className="rounded-full bg-[#19351D] px-7 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:-translate-y-1"
                >
                  Shop products
                </a>

                <a
                  href="#wholesale"
                  className="rounded-full border border-[#19351D]/20 px-7 py-4 text-xs uppercase tracking-[0.2em] transition hover:bg-[#19351D] hover:text-white"
                >
                  Wholesale
                </a>
              </div>

              <div className="mt-14 grid max-w-[500px] grid-cols-3 border-t border-[#19351D]/10 pt-6">
                <div>
                  <p className="font-serif text-2xl">100%</p>
                  <p className="mt-1 text-[9px] uppercase tracking-widest text-[#778074]">
                    Quality focused
                  </p>
                </div>

                <div>
                  <p className="font-serif text-2xl">Bulk</p>
                  <p className="mt-1 text-[9px] uppercase tracking-widest text-[#778074]">
                    Supply ready
                  </p>
                </div>

                <div>
                  <p className="font-serif text-2xl">Pan</p>
                  <p className="mt-1 text-[9px] uppercase tracking-widest text-[#778074]">
                    India delivery
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[550px] overflow-hidden lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1800&q=90"
              alt="Natural ingredients"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#19351D]/60 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 text-white lg:bottom-12 lg:left-12">
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-70">
                From nature
              </p>
              <p className="mt-2 font-serif text-4xl">
                To your shelf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section
        id="collections"
        className="border-y border-[#19351D]/10 bg-[#E8E4D8]"
      >
        <div className="mx-auto grid max-w-[1450px] md:grid-cols-4">
          {[
            {
              title: 'Spices',
              subtitle: 'Aromatic essentials',
              image:
                'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80',
            },
            {
              title: 'Dehydrated',
              subtitle: 'Fruit & natural powders',
              image:
                'https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=700&q=80',
            },
            {
              title: 'Healthy Snacks',
              subtitle: 'Goodness between meals',
              image:
                'https://images.unsplash.com/photo-1605966802076-5d6a6c1c0e6e?auto=format&fit=crop&w=700&q=80',
            },
            {
              title: 'Personal Care',
              subtitle: 'Botanical everyday care',
              image:
                'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&w=700&q=80',
            },
          ].map((item) => (
            <a
              href="#shop"
              key={item.title}
              className="group relative min-h-[250px] overflow-hidden border-b border-[#19351D]/10 md:border-b-0 md:border-r"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover grayscale-[15%] transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-[#19351D]/45 transition group-hover:bg-[#19351D]/35" />

              <div className="absolute bottom-7 left-7 text-white">
                <p className="text-[9px] uppercase tracking-[0.25em] opacity-75">
                  {item.subtitle}
                </p>

                <h3 className="mt-2 font-serif text-3xl">
                  {item.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="mx-auto max-w-[1450px] px-5 py-24 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#71806D]">
              The collection
            </p>

            <h2 className="mt-4 font-serif text-5xl tracking-tight md:text-7xl">
              Shop the good stuff.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center rounded-full border border-[#19351D]/15 px-4 py-3 md:flex">
              <SearchIcon />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products"
                className="ml-3 w-36 bg-transparent text-xs outline-none placeholder:text-[#899087]"
              />
            </div>

            <div className="flex overflow-x-auto rounded-full border border-[#19351D]/15 p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-[10px] uppercase tracking-widest transition ${
                    activeCategory === category
                      ? 'bg-[#19351D] text-white'
                      : 'text-[#687365]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group">
              <div className="relative aspect-[0.82] overflow-hidden bg-[#E7E3D7]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {product.tag && (
                  <span className="absolute left-4 top-4 bg-[#F4F1E8] px-3 py-2 text-[8px] font-semibold tracking-[0.2em]">
                    {product.tag}
                  </span>
                )}

                <button
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 left-4 right-4 translate-y-16 bg-[#19351D] py-4 text-[10px] uppercase tracking-[0.2em] text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Add to cart
                </button>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 opacity-0 transition group-hover:opacity-100"
                >
                  <EyeIcon />
                </button>
              </div>

              <div className="pt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#788277]">
                      {product.category}
                    </p>

                    <h3 className="mt-2 font-serif text-xl">
                      {product.name}
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">₹{product.price}</p>

                    {product.oldPrice && (
                      <p className="text-xs text-[#9A9E96] line-through">
                        ₹{product.oldPrice}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-[10px] uppercase tracking-widest text-[#858D83]">
                  {product.unit}
                </p>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl">Nothing found.</p>
            <p className="mt-2 text-sm text-[#777F75]">
              Try another product or category.
            </p>
          </div>
        )}
      </section>

      {/* NATURAL STATEMENT */}
      <section
        id="story"
        className="overflow-hidden bg-[#19351D] text-[#F4F1E8]"
      >
        <div className="mx-auto grid max-w-[1450px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex items-center px-6 py-24 lg:px-16">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#B6C1AE]">
                Why ALCA
              </p>

              <h2 className="mt-7 font-serif text-5xl leading-[0.95] md:text-7xl">
                Nature is
                <br />
                <span className="italic text-[#D5B66D]">our raw material.</span>
              </h2>

              <p className="mt-8 max-w-lg text-sm leading-7 text-[#C0C8BB]">
                From carefully selected ingredients to hygienic processing and
                reliable packaging, every step is designed around quality,
                consistency and trust.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/15 pt-8">
                <div>
                  <p className="font-serif text-3xl">01</p>
                  <p className="mt-2 text-[9px] uppercase tracking-widest text-[#AAB6A5]">
                    Source responsibly
                  </p>
                </div>

                <div>
                  <p className="font-serif text-3xl">02</p>
                  <p className="mt-2 text-[9px] uppercase tracking-widest text-[#AAB6A5]">
                    Process carefully
                  </p>
                </div>

                <div>
                  <p className="font-serif text-3xl">03</p>
                  <p className="mt-2 text-[9px] uppercase tracking-widest text-[#AAB6A5]">
                    Pack hygienically
                  </p>
                </div>

                <div>
                  <p className="font-serif text-3xl">04</p>
                  <p className="mt-2 text-[9px] uppercase tracking-widest text-[#AAB6A5]">
                    Deliver reliably
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[600px]">
            <img
              src="https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=1600&q=90"
              alt="Natural ingredients"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[#19351D]/10" />

            <div className="absolute bottom-8 left-8 max-w-[320px] lg:bottom-12 lg:left-12">
              <p className="font-serif text-4xl text-white">
                Simple ingredients.
                <br />
                Serious standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHOLESALE */}
      <section id="wholesale" className="px-5 py-24 lg:px-10">
        <div className="mx-auto max-w-[1450px] overflow-hidden bg-[#D9DFCF]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="px-7 py-16 lg:px-16 lg:py-20">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#65715F]">
                For businesses
              </p>

              <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[0.95] md:text-7xl">
                Need more
                <br />
                than a
                <br />
                <span className="italic">shopping cart?</span>
              </h2>

              <p className="mt-7 max-w-lg text-sm leading-7 text-[#586253]">
                We supply restaurants, retailers, caterers, resellers,
                wellness brands and businesses with bulk quantities and
                customised requirements.
              </p>

              <button className="mt-9 rounded-full bg-[#19351D] px-7 py-4 text-xs uppercase tracking-[0.2em] text-white">
                Request wholesale pricing
              </button>
            </div>

            <div className="relative min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=85"
                alt="Wholesale natural products"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-[#19351D]/10">
        <div className="mx-auto grid max-w-[1450px] md:grid-cols-4">
          {[
            ['01', 'Quality First', 'Carefully selected ingredients'],
            ['02', 'Made Responsibly', 'Thoughtful production'],
            ['03', 'Bulk Ready', 'Wholesale quantities available'],
            ['04', 'Reliable Supply', 'Consistent delivery support'],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="border-b border-[#19351D]/10 p-8 md:border-b-0 md:border-r"
            >
              <p className="font-serif text-3xl text-[#7A866F]">{number}</p>

              <h3 className="mt-6 font-serif text-2xl">{title}</h3>

              <p className="mt-2 text-xs leading-5 text-[#7A8179]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-24 lg:px-10">
        <div className="mx-auto max-w-[1450px] text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#778174]">
            Better products start with better ingredients.
          </p>

          <h2 className="mx-auto mt-7 max-w-5xl font-serif text-6xl leading-[0.9] tracking-[-0.04em] md:text-[100px]">
            STOCK
            <br />
            SOMETHING
            <br />
            <span className="italic text-[#526F43]">GOOD.</span>
          </h2>

          <div className="mt-10 flex justify-center gap-3">
            <a
              href="#shop"
              className="rounded-full bg-[#19351D] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white"
            >
              Explore products
            </a>

            <a
              href="tel:9010995180"
              className="rounded-full border border-[#19351D]/20 px-8 py-4 text-xs uppercase tracking-[0.2em]"
            >
              Talk to us
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#19351D] px-6 py-12 text-[#F4F1E8] lg:px-10">
        <div className="mx-auto flex max-w-[1450px] flex-col justify-between gap-10 md:flex-row">
          <div>
            <p className="font-serif text-3xl">ALCA</p>
            <p className="mt-3 max-w-sm text-xs leading-6 text-[#AEB8AA]">
              Natural ingredients, nourishing products and dependable supply —
              naturally, responsibly, reliably.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-3 text-[10px] uppercase tracking-[0.2em] text-[#B6C0B2]">
            <a href="#shop">Shop</a>
            <a href="#collections">Collections</a>
            <a href="#wholesale">Wholesale</a>
            <a href="#story">Our Story</a>
            <a href="tel:9010995180">Contact</a>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-[1450px] border-t border-white/10 pt-6 text-[9px] uppercase tracking-[0.2em] text-[#7F8B7C]">
          Quality is our promise · Trust is our relationship · Naturally.
          Responsibly. Reliably.
        </div>
      </footer>

      {/* PRODUCT QUICK VIEW */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#101610]/70 p-5 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="grid max-h-[90vh] w-full max-w-4xl overflow-hidden bg-[#F4F1E8] md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-h-[350px]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative flex flex-col justify-center p-8 md:p-12">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#19351D]/15"
              >
                ×
              </button>

              <p className="text-[9px] uppercase tracking-[0.25em] text-[#778174]">
                {selectedProduct.category}
              </p>

              <h3 className="mt-4 font-serif text-4xl leading-none">
                {selectedProduct.name}
              </h3>

              <p className="mt-6 text-sm leading-7 text-[#646D62]">
                {selectedProduct.description}
              </p>

              <div className="mt-8 flex items-end gap-3">
                <span className="font-serif text-3xl">
                  ₹{selectedProduct.price}
                </span>

                {selectedProduct.oldPrice && (
                  <span className="text-sm text-[#999E95] line-through">
                    ₹{selectedProduct.oldPrice}
                  </span>
                )}

                <span className="text-[9px] uppercase tracking-widest text-[#7A8276]">
                  / {selectedProduct.unit}
                </span>
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct)
                  setSelectedProduct(null)
                }}
                className="mt-8 w-full bg-[#19351D] py-4 text-xs uppercase tracking-[0.2em] text-white"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ICONS */

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M4 5h2l2.2 10.5h9.6L20 8H7" />
      <circle cx="10" cy="19" r="1" />
      <circle cx="17" cy="19" r="1" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  )
}