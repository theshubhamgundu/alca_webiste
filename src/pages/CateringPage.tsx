import { useMemo, useState } from 'react'

const images = {
  hero:
    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90',
  wedding:
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85',
  buffet:
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85',
  chef:
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=85',
  biryani:
    'https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=1200&q=85',
  dessert:
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=85',
  table:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=85',
  food:
    'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85',
}

const experiences = [
  {
    number: '01',
    title: 'Weddings',
    subtitle: 'A feast worthy of the occasion.',
    image: images.wedding,
  },
  {
    number: '02',
    title: 'Corporate',
    subtitle: 'Sharp service. Beautiful food.',
    image: images.buffet,
  },
  {
    number: '03',
    title: 'Celebrations',
    subtitle: 'Big flavours for big moments.',
    image: images.dessert,
  },
  {
    number: '04',
    title: 'Outdoor',
    subtitle: 'Good food, wherever you gather.',
    image: images.table,
  },
]

const menu = [
  ['Hyderabadi Biryani', 'Fragrant basmati · slow cooked'],
  ['Chicken 65', 'Crispy · spicy · classic'],
  ['Paneer Tikka', 'Charred · smoky · fresh'],
  ['Butter Chicken', 'Creamy · rich · comforting'],
  ['Live Dosa Counter', 'Crisp · hot · made to order'],
  ['Seasonal Desserts', 'Fresh · delicate · indulgent'],
]

const gallery = [
  images.biryani,
  images.food,
  images.dessert,
  images.wedding,
  images.table,
  images.chef,
]

function Arrow({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-300 group-hover:translate-x-1 ${
        dark
          ? 'border-[#241810] text-[#241810]'
          : 'border-white/40 text-white'
      }`}
    >
      ↗
    </span>
  )
}

export default function CateringPage() {
  const [selectedExperience, setSelectedExperience] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const activeExperience = useMemo(
    () => experiences[selectedExperience],
    [selectedExperience],
  )

  return (
    <main className="min-h-screen overflow-hidden bg-[#F4EBDD] text-[#241810]">
      {/* NAV */}
      <nav className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-32px)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-full border border-white/20 bg-[#241810]/90 px-5 py-3 text-white shadow-2xl backdrop-blur-xl">
        <a href="#" className="text-sm font-semibold tracking-[0.22em]">
          ALKA<span className="text-[#C79A62]">.</span>
        </a>

        <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.18em] md:flex">
          <a href="#experience" className="opacity-70 transition hover:opacity-100">
            Experiences
          </a>
          <a href="#menu" className="opacity-70 transition hover:opacity-100">
            Menu
          </a>
          <a href="#story" className="opacity-70 transition hover:opacity-100">
            Our Story
          </a>
          <a href="#gallery" className="opacity-70 transition hover:opacity-100">
            Gallery
          </a>
        </div>

        <a
          href="tel:9010995180"
          className="rounded-full bg-[#F4EBDD] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#241810]"
        >
          Book an Event
        </a>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[100svh] bg-[#241810] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={images.hero}
            alt="Premium catering"
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#241810] via-[#241810]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241810] via-transparent to-[#241810]/30" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-20 pt-36 md:px-10 md:pb-24">
          <div className="w-full">
            <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-[#D8B98B]">
              <span className="h-px w-12 bg-[#D8B98B]" />
              Veg & Nonveg Catering · Hyderabad
            </div>

            <h1 className="max-w-6xl font-serif text-[18vw] font-light leading-[0.76] tracking-[-0.07em] md:text-[10rem]">
              FOOD
              <br />
              <span className="ml-[8vw] italic text-[#D8B98B]">that</span>
              <br />
              <span className="ml-[16vw]">MATTERS.</span>
            </h1>

            <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <p className="max-w-md text-sm leading-7 text-white/65 md:text-base">
                Not just a meal — an experience designed around your people,
                your occasion, and the moments you want remembered.
              </p>

              <a
                href="tel:9010995180"
                className="group flex w-fit items-center gap-4 rounded-full bg-[#F4EBDD] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#241810]"
              >
                Plan Your Event
                <Arrow dark />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 right-6 hidden text-right text-[9px] uppercase tracking-[0.3em] text-white/40 md:block">
          Scroll to discover
          <br />
          ↓
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1fr_1.5fr] md:items-end">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#9A6739]">
              01 — The philosophy
            </p>
            <h2 className="font-serif text-5xl font-light leading-[0.95] tracking-[-0.04em] md:text-8xl">
              The table
              <br />
              <span className="italic">is where</span>
              <br />
              <span>memories happen.</span>
            </h2>
          </div>

          <div className="max-w-xl pb-2">
            <p className="text-xl leading-9 text-[#5E493C] md:text-2xl md:leading-10">
              We believe great catering is more than putting food on a plate.
              It is the aroma when guests arrive, the first bite, the second
              helping, and the conversation that continues long after dessert.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {['Fresh ingredients', 'Expert chefs', 'On-time service'].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#241810]/15 px-4 py-2 text-[10px] uppercase tracking-[0.16em]"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SELECTOR */}
      <section
        id="experience"
        className="bg-[#241810] px-6 py-24 text-[#F4EBDD] md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C79A62]">
                02 — Experiences
              </p>

              <h2 className="font-serif text-5xl font-light leading-none tracking-[-0.04em] md:text-8xl">
                Tell us
                <br />
                <span className="italic text-[#C79A62]">what you're</span>
                <br />
                celebrating.
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-6 text-white/50">
              Every occasion deserves its own personality. Choose yours and
              discover how we'd bring it to life.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            {experiences.map((experience, index) => (
              <button
                key={experience.title}
                onMouseEnter={() => setSelectedExperience(index)}
                onClick={() => setSelectedExperience(index)}
                className={`group relative h-[420px] overflow-hidden text-left transition-all duration-500 ${
                  selectedExperience === index
                    ? 'md:-translate-y-4'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5 text-xs text-white/60">
                  {experience.number}
                </div>

                <div className="absolute bottom-6 left-5 right-5">
                  <h3 className="font-serif text-4xl italic">
                    {experience.title}
                  </h3>

                  <div className="mt-2 flex items-end justify-between gap-3">
                    <p className="max-w-[180px] text-xs leading-5 text-white/65">
                      {experience.subtitle}
                    </p>
                    <Arrow />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.2em] text-white/35">
            <span>Currently exploring</span>
            <span>{activeExperience.title}</span>
          </div>
        </div>
      </section>

      {/* FEATURE IMAGE */}
      <section className="px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.15fr_.85fr] md:items-center">
          <div className="relative">
            <div className="absolute -left-5 -top-5 z-10 hidden h-28 w-28 rounded-full border border-[#9A6739]/30 md:block" />

            <img
              src={activeExperience.image}
              alt={activeExperience.title}
              className="h-[560px] w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 rounded-full bg-[#F4EBDD]/90 px-5 py-3 text-[10px] uppercase tracking-[0.2em] backdrop-blur">
              {activeExperience.number} / {activeExperience.title}
            </div>
          </div>

          <div className="md:pl-10">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#9A6739]">
              Made around you
            </p>

            <h3 className="font-serif text-5xl font-light leading-none tracking-[-0.04em] md:text-7xl">
              Nothing
              <br />
              <span className="italic">off the shelf.</span>
            </h3>

            <p className="mt-8 text-base leading-8 text-[#685246]">
              From intimate family gatherings to large celebrations, our menus
              are built around the people sitting at the table. Cuisine,
              portions, presentation, service and dietary preferences —
              everything can be shaped around your event.
            </p>

            <a
              href="tel:9010995180"
              className="group mt-10 inline-flex items-center gap-4 border-b border-[#241810] pb-3 text-xs font-bold uppercase tracking-[0.18em]"
            >
              Start planning
              <span className="transition-transform group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="bg-[#DCC7A8] px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#80552F]">
                03 — From our kitchen
              </p>

              <h2 className="font-serif text-6xl font-light leading-[0.85] tracking-[-0.05em] md:text-8xl">
                A menu
                <br />
                worth
                <br />
                <span className="italic">talking about.</span>
              </h2>

              <p className="mt-8 max-w-sm text-sm leading-7 text-[#614A39]">
                Traditional favourites, modern plates, regional flavours and
                live counters — crafted by our kitchen team with fresh,
                carefully selected ingredients.
              </p>
            </div>

            <div>
              <div className="border-t border-[#241810]/30">
                {menu.map(([name, description], index) => (
                  <div
                    key={name}
                    className="group flex items-center justify-between gap-5 border-b border-[#241810]/20 py-6"
                  >
                    <div className="flex gap-5">
                      <span className="pt-1 text-[10px] text-[#80552F]">
                        0{index + 1}
                      </span>

                      <div>
                        <h3 className="font-serif text-2xl transition group-hover:italic md:text-3xl">
                          {name}
                        </h3>
                        <p className="mt-1 text-xs text-[#725C4C]">
                          {description}
                        </p>
                      </div>
                    </div>

                    <span className="text-xl transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setMenuOpen(true)}
                className="mt-8 rounded-full border border-[#241810] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:bg-[#241810] hover:text-[#F4EBDD]"
              >
                Explore full menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="relative bg-[#F4EBDD] px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#9A6739]">
                04 — Behind the plate
              </p>

              <h2 className="font-serif text-6xl font-light leading-[0.85] tracking-[-0.05em] md:text-8xl">
                Good food
                <br />
                starts
                <br />
                <span className="italic">behind the scenes.</span>
              </h2>
            </div>

            <div className="relative">
              <img
                src={images.chef}
                alt="Chef preparing food"
                className="h-[620px] w-full object-cover"
              />

              <div className="absolute -bottom-8 -left-4 max-w-xs bg-[#241810] p-7 text-[#F4EBDD] md:-left-12">
                <p className="font-serif text-3xl italic leading-tight">
                  “Every plate should feel like someone cared.”
                </p>
                <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#C79A62]">
                  — Our kitchen philosophy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="bg-[#241810] px-6 py-24 text-[#F4EBDD] md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-14 md:grid-cols-4">
          {[
            ['100%', 'Natural ingredients'],
            ['50+', 'Menu possibilities'],
            ['100%', 'On-time commitment'],
            ['∞', 'Good memories'],
          ].map(([number, label]) => (
            <div key={label} className="border-l border-white/15 pl-5">
              <div className="font-serif text-5xl md:text-7xl">{number}</div>
              <div className="mt-3 max-w-[130px] text-[9px] uppercase leading-4 tracking-[0.18em] text-white/45">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="bg-[#F4EBDD] px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-end justify-between gap-8">
            <div>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#9A6739]">
                05 — Moments
              </p>

              <h2 className="font-serif text-6xl font-light leading-none tracking-[-0.05em] md:text-8xl">
                Served
                <br />
                <span className="italic">beautifully.</span>
              </h2>
            </div>

            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-[#8A7768] md:block">
              Food · People · Memories
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-12">
            <img
              src={gallery[0]}
              className="h-[360px] w-full object-cover md:col-span-5 md:h-[600px]"
              alt=""
            />

            <div className="grid gap-3 md:col-span-3">
              <img
                src={gallery[1]}
                className="h-[260px] w-full object-cover md:h-[290px]"
                alt=""
              />
              <img
                src={gallery[2]}
                className="h-[220px] w-full object-cover md:h-[290px]"
                alt=""
              />
            </div>

            <img
              src={gallery[3]}
              className="col-span-2 h-[300px] w-full object-cover md:col-span-4 md:h-[600px]"
              alt=""
            />

            <img
              src={gallery[4]}
              className="hidden h-[260px] w-full object-cover md:col-span-4 md:block"
              alt=""
            />

            <img
              src={gallery[5]}
              className="hidden h-[260px] w-full object-cover md:col-span-4 md:block"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#9A6739] px-6 py-28 text-[#F4EBDD] md:px-10 md:py-40">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/20" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl">
          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
            06 — Your table awaits
          </p>

          <h2 className="max-w-5xl font-serif text-[15vw] font-light leading-[0.76] tracking-[-0.07em] md:text-[9rem]">
            LET'S MAKE
            <br />
            <span className="italic">YOUR TABLE</span>
            <br />
            UNFORGETTABLE.
          </h2>

          <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center">
            <a
              href="tel:9010995180"
              className="group flex w-fit items-center gap-5 rounded-full bg-[#F4EBDD] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#241810]"
            >
              Plan My Event
              <Arrow dark />
            </a>

            <a
              href="https://instagram.com/alca_urs_emerveil_celebrations"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-white/70 transition hover:text-white"
            >
              @alca_urs_emerveil_celebrations
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#241810] px-6 py-10 text-[#F4EBDD] md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="text-xl font-semibold tracking-[0.15em]">
              ALKA<span className="text-[#C79A62]">.</span>
            </div>
            <p className="mt-3 text-xs text-white/40">
              Veg & Nonveg Catering
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="font-serif text-2xl italic text-[#C79A62]">
              Good Food · Good Mood · Great Memories
            </p>
            <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/30">
              © {new Date().getFullYear()} Alka Catering
            </p>
          </div>
        </div>
      </footer>

      {/* MENU MODAL */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#241810]/80 p-5 backdrop-blur-md">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-auto bg-[#F4EBDD] p-7 md:p-12">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#241810]/20 text-lg"
            >
              ×
            </button>

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#9A6739]">
              Our kitchen
            </p>

            <h2 className="mt-4 font-serif text-6xl font-light leading-none">
              The <span className="italic">Menu.</span>
            </h2>

            <div className="mt-12 border-t border-[#241810]/20">
              {[
                'Welcome Drinks',
                'Soups & Salads',
                'Starters',
                'Live Counters',
                'Main Course — Veg',
                'Main Course — Nonveg',
                'Rice & Biryani',
                'Breads',
                'Desserts',
                'Fresh & Dehydrated Fruits',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-[#241810]/15 py-5"
                >
                  <div className="flex gap-5">
                    <span className="text-xs text-[#9A6739]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-2xl">{item}</span>
                  </div>
                  <span>↗</span>
                </div>
              ))}
            </div>

            <a
              href="tel:9010995180"
              className="mt-10 inline-flex rounded-full bg-[#241810] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white"
            >
              Request Custom Menu
            </a>
          </div>
        </div>
      )}
    </main>
  )
}