import { useState } from 'react'

const images = {
  hero:
    'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&w=2400&q=90',

  gifts:
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1600&q=90',

  crafts:
    'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1600&q=90',

  resin:
    'https://images.unsplash.com/photo-1582561833407-b95380302f7e?auto=format&fit=crop&w=1600&q=90',

  jewellery:
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=90',

  painting:
    'https://images.unsplash.com/photo-1577083552431-6e5fd01988d5?auto=format&fit=crop&w=1600&q=90',

  packaging:
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1600&q=90',
}

const collections = [
  {
    number: '01',
    title: 'Personalised',
    subtitle: 'Made with your story in mind.',
    image: images.gifts,
  },
  {
    number: '02',
    title: 'Resin Art',
    subtitle: 'Little pieces of art that last.',
    image: images.resin,
  },
  {
    number: '03',
    title: 'Handmade',
    subtitle: 'Crafted slowly. Made beautifully.',
    image: images.crafts,
  },
  {
    number: '04',
    title: 'Jewellery',
    subtitle: 'Wear something uniquely yours.',
    image: images.jewellery,
  },
]

const services = [
  {
    number: '01',
    title: 'Personalised Gifts',
    description:
      'Photo frames, name plaques, engraved keepsakes and thoughtful gifts designed around the person receiving them.',
  },
  {
    number: '02',
    title: 'Resin Art & Crafts',
    description:
      'Beautiful resin pieces, jewellery, decorative objects, coasters and keepsakes handcrafted with precision.',
  },
  {
    number: '03',
    title: 'Custom Painting',
    description:
      'Hand-painted portraits, bottle art and canvas pieces created from your favourite memories.',
  },
  {
    number: '04',
    title: 'Gift Hampers',
    description:
      'Curated gift boxes for birthdays, anniversaries, festivals, baby showers and corporate occasions.',
  },
  {
    number: '05',
    title: 'Handmade Jewellery',
    description:
      'Artisan necklaces, bangles, earrings and accessories created using carefully selected materials.',
  },
  {
    number: '06',
    title: 'Custom Printing',
    description:
      'Personalised T-shirts, mugs, cushions, keychains and merchandise using DTF and sublimation printing.',
  },
  {
    number: '07',
    title: 'Festival Gifts',
    description:
      'Thoughtful handcrafted collections for Diwali, Raksha Bandhan, Christmas, Eid and Indian celebrations.',
  },
  {
    number: '08',
    title: 'Occasion Décor',
    description:
      'Custom centrepieces, decorative objects and handcrafted accents that make celebrations feel personal.',
  },
]

const occasions = [
  'Birthdays',
  'Anniversaries',
  'Weddings',
  'Baby Showers',
  'Festivals',
  'Corporate',
  'House Warmings',
  'Just Because',
]

function Arrow({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-1 ${
        dark
          ? 'border-[#211A24]/20 text-[#211A24]'
          : 'border-white/30 text-white'
      }`}
    >
      ↗
    </span>
  )
}

export default function CraftsPage() {
  const [activeCollection, setActiveCollection] = useState(0)
  const [showServices, setShowServices] = useState(false)
  const [selectedOccasion, setSelectedOccasion] = useState('Birthdays')

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F0E8] text-[#211A24]">

      {/* =========================================================
          NAV
      ========================================================= */}

      <nav className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-32px)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-[#211A24]/90 px-5 py-3 text-white shadow-2xl backdrop-blur-xl">

        <a
          href="#"
          className="font-serif text-xl tracking-[0.08em]"
        >
          ALKA<span className="text-[#B89AD2]">.</span>
        </a>

        <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.2em] md:flex">

          <a
            href="#collections"
            className="text-white/55 transition hover:text-white"
          >
            Collections
          </a>

          <a
            href="#custom"
            className="text-white/55 transition hover:text-white"
          >
            Custom
          </a>

          <a
            href="#craft"
            className="text-white/55 transition hover:text-white"
          >
            Craft
          </a>

          <a
            href="#contact"
            className="text-white/55 transition hover:text-white"
          >
            Contact
          </a>

        </div>

        <a
          href="tel:9010995180"
          className="rounded-full bg-[#F5F0E8] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#211A24]"
        >
          Create Yours
        </a>

      </nav>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative min-h-[100svh] bg-[#211A24] text-white">

        <div className="absolute inset-0">

          <img
            src={images.hero}
            alt="Handcrafted gifts"
            className="h-full w-full object-cover opacity-55"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#211A24] via-[#211A24]/55 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#211A24] via-transparent to-[#211A24]/20" />

        </div>

        {/* Decorative circle */}

        <div className="absolute right-[8%] top-[24%] hidden h-36 w-36 rounded-full border border-white/20 md:block">

          <div className="flex h-full items-center justify-center text-center text-[9px] uppercase tracking-[0.2em] text-white/60">
            Handmade
            <br />
            with
            <br />
            intention
          </div>

        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-20 pt-36 md:px-10 md:pb-24">

          <div className="w-full">

            <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-[#C2A7D7]">

              <span className="h-px w-12 bg-[#C2A7D7]" />

              Customised Crafts · Gifts · Art

            </div>

            <h1 className="font-serif text-[18vw] font-light leading-[0.73] tracking-[-0.08em] md:text-[10rem]">

              MADE

              <br />

              <span className="ml-[7vw] italic text-[#C2A7D7]">
                just
              </span>

              <br />

              <span className="ml-[14vw]">
                FOR YOU.
              </span>

            </h1>

            <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <p className="max-w-md text-sm leading-7 text-white/65 md:text-base">
                Because the best gifts aren't picked from a shelf. They're
                imagined, created and made meaningful for one person.
              </p>

              <a
                href="#collections"
                className="group flex w-fit items-center gap-4 rounded-full bg-[#F5F0E8] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#211A24]"
              >
                Explore the collection
                <Arrow dark />
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}

      <section className="px-6 py-28 md:px-10 md:py-40">

        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[.9fr_1.1fr] md:items-end">

          <div>

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#5C2D91]">
              01 — The idea
            </p>

            <h2 className="font-serif text-6xl font-light leading-[0.84] tracking-[-0.05em] md:text-8xl">

              A gift

              <br />

              should feel

              <br />

              <span className="italic text-[#5C2D91]">
                personal.
              </span>

            </h2>

          </div>

          <div className="max-w-xl">

            <p className="text-xl leading-9 text-[#665D67] md:text-2xl md:leading-10">
              We create things that carry a little piece of you — a name, a
              memory, an inside joke, a favourite colour or simply a feeling
              you want someone to remember.
            </p>

            <p className="mt-7 text-sm leading-7 text-[#817681]">
              Every piece begins with an idea and ends with something nobody
              else has quite like it.
            </p>

          </div>

        </div>

      </section>

      {/* =========================================================
          COLLECTIONS
      ========================================================= */}

      <section
        id="collections"
        className="bg-[#211A24] px-6 py-24 text-[#F5F0E8] md:px-10 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A7D7]">
                02 — Collections
              </p>

              <h2 className="font-serif text-5xl font-light leading-none tracking-[-0.04em] md:text-8xl">

                Find your

                <br />

                <span className="italic text-[#C2A7D7]">
                  kind of magic.
                </span>

              </h2>

            </div>

            <p className="max-w-xs text-sm leading-6 text-white/45">
              From tiny keepsakes to statement pieces, everything is made with
              intention.
            </p>

          </div>

          <div className="grid gap-3 md:grid-cols-4">

            {collections.map((collection, index) => (

              <button
                key={collection.title}
                onMouseEnter={() => setActiveCollection(index)}
                onClick={() => setActiveCollection(index)}
                className={`group relative h-[430px] overflow-hidden text-left transition-all duration-500 ${
                  activeCollection === index
                    ? 'md:-translate-y-4'
                    : 'opacity-55 hover:opacity-100'
                }`}
              >

                <img
                  src={collection.image}
                  alt={collection.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5 text-xs text-white/50">
                  {collection.number}
                </div>

                <div className="absolute bottom-6 left-5 right-5">

                  <h3 className="font-serif text-4xl italic">
                    {collection.title}
                  </h3>

                  <div className="mt-2 flex items-end justify-between gap-3">

                    <p className="max-w-[180px] text-xs leading-5 text-white/60">
                      {collection.subtitle}
                    </p>

                    <Arrow />

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          FEATURED COLLECTION
      ========================================================= */}

      <section className="px-6 py-24 md:px-10 md:py-36">

        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.1fr_.9fr] md:items-center">

          <div className="relative">

            <div className="absolute -left-5 -top-5 hidden h-28 w-28 rounded-full border border-[#5C2D91]/20 md:block" />

            <img
              src={collections[activeCollection].image}
              alt={collections[activeCollection].title}
              className="h-[580px] w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 rounded-full bg-[#F5F0E8]/90 px-5 py-3 text-[10px] uppercase tracking-[0.2em] backdrop-blur">
              {collections[activeCollection].number} /{' '}
              {collections[activeCollection].title}
            </div>

          </div>

          <div className="md:pl-10">

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#5C2D91]">
              Made differently
            </p>

            <h3 className="font-serif text-5xl font-light leading-[0.9] tracking-[-0.04em] md:text-7xl">

              Not mass

              <br />

              produced.

              <br />

              <span className="italic">
                Made personal.
              </span>

            </h3>

            <p className="mt-8 text-base leading-8 text-[#685F69]">
              Tell us what you have in mind. We help turn that idea into
              something tangible — choosing materials, colours, photographs,
              names, messages and details until it feels unmistakably yours.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3">

              {[
                'Personalised',
                'Handcrafted',
                'Premium materials',
                'Made to order',
              ].map((item) => (

                <div
                  key={item}
                  className="border-t border-[#211A24]/15 pt-3 text-[10px] uppercase tracking-[0.14em]"
                >
                  {item}
                </div>

              ))}

            </div>

            <a
              href="tel:9010995180"
              className="group mt-10 inline-flex items-center gap-4 border-b border-[#211A24] pb-3 text-xs font-bold uppercase tracking-[0.18em]"
            >
              Create something

              <span className="transition-transform group-hover:translate-x-2">
                →
              </span>

            </a>

          </div>

        </div>

      </section>

      {/* =========================================================
          OCCASION SELECTOR
      ========================================================= */}

      <section
        id="custom"
        className="bg-[#D9CCE0] px-6 py-24 md:px-10 md:py-36"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 md:grid-cols-[.75fr_1.25fr]">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#5C2D91]">
                03 — Choose the moment
              </p>

              <h2 className="font-serif text-6xl font-light leading-[0.84] tracking-[-0.05em] md:text-8xl">

                Who are you

                <br />

                making

                <br />

                <span className="italic">
                  smile?
                </span>

              </h2>

            </div>

            <div>

              <div className="flex flex-wrap gap-2">

                {occasions.map((occasion) => (

                  <button
                    key={occasion}
                    onClick={() => setSelectedOccasion(occasion)}
                    className={`rounded-full border px-5 py-3 text-[10px] uppercase tracking-[0.16em] transition ${
                      selectedOccasion === occasion
                        ? 'border-[#211A24] bg-[#211A24] text-white'
                        : 'border-[#211A24]/20 hover:border-[#211A24]'
                    }`}
                  >
                    {occasion}
                  </button>

                ))}

              </div>

              <div className="mt-12 border-t border-[#211A24]/20 pt-10">

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#5C2D91]">
                  Your selected occasion
                </p>

                <h3 className="mt-3 font-serif text-5xl italic md:text-7xl">
                  {selectedOccasion}
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-7 text-[#665A69]">
                  Tell us who you're celebrating and what you're imagining.
                  We'll help you create a gift or collection that feels
                  personal to that exact moment.
                </p>

                <a
                  href="tel:9010995180"
                  className="mt-8 inline-flex rounded-full bg-[#211A24] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                >
                  Design a Gift
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          CRAFT STORY
      ========================================================= */}

      <section
        id="craft"
        className="bg-[#F5F0E8] px-6 py-24 md:px-10 md:py-36"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-16 md:grid-cols-[.9fr_1.1fr]">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#5C2D91]">
                04 — The craft
              </p>

              <h2 className="font-serif text-6xl font-light leading-[0.84] tracking-[-0.05em] md:text-8xl">

                Made

                <br />

                slowly.

                <br />

                <span className="italic text-[#5C2D91]">
                  Made beautifully.
                </span>

              </h2>

              <p className="mt-8 max-w-sm text-sm leading-7 text-[#6C626D]">
                Every piece gets attention from the first sketch to the final
                ribbon. That's the difference between something bought and
                something made.
              </p>

            </div>

            <div className="relative">

              <img
                src={images.crafts}
                alt="Handmade craft"
                className="h-[600px] w-full object-cover"
              />

              <div className="absolute -bottom-8 -left-4 max-w-xs bg-[#211A24] p-7 text-[#F5F0E8] md:-left-12">

                <p className="font-serif text-3xl italic leading-tight">
                  “The best gifts carry a little piece of the person who gave
                  them.”
                </p>

                <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#C2A7D7]">
                  Artisan craftsmanship
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}

      <section className="bg-[#211A24] px-6 py-24 text-[#F5F0E8] md:px-10 md:py-36">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 flex items-end justify-between">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C2A7D7]">
                05 — What we make
              </p>

              <h2 className="font-serif text-6xl font-light leading-none tracking-[-0.05em] md:text-8xl">

                One idea.

                <br />

                <span className="italic text-[#C2A7D7]">
                  Infinite forms.
                </span>

              </h2>

            </div>

            <button
              onClick={() => setShowServices(!showServices)}
              className="hidden rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.18em] md:block"
            >
              {showServices ? 'Collapse' : 'View all'}
            </button>

          </div>

          <div className="border-t border-white/15">

            {services.map((service, index) => (

              <div
                key={service.title}
                className={`group border-b border-white/10 py-7 ${
                  !showServices && index > 3 ? 'hidden' : ''
                }`}
              >

                <div className="grid gap-5 md:grid-cols-[70px_1fr_1fr_50px] md:items-center">

                  <span className="text-[10px] text-[#C2A7D7]">
                    {service.number}
                  </span>

                  <h3 className="font-serif text-3xl transition group-hover:italic md:text-4xl">
                    {service.title}
                  </h3>

                  <p className="max-w-md text-xs leading-6 text-white/45">
                    {service.description}
                  </p>

                  <span className="text-xl transition-transform group-hover:translate-x-1">
                    ↗
                  </span>

                </div>

              </div>

            ))}

          </div>

          <button
            onClick={() => setShowServices(!showServices)}
            className="mt-7 rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.18em] md:hidden"
          >
            {showServices ? 'Show less' : 'View all services'}
          </button>

        </div>

      </section>

      {/* =========================================================
          STATS
      ========================================================= */}

      <section className="bg-[#F5F0E8] px-6 py-24 md:px-10 md:py-28">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-14 md:grid-cols-4">

          {[
            ['100%', 'Handmade'],
            ['∞', 'Custom options'],
            ['20+', 'Occasion types'],
            ['1/1', 'Made for you'],
          ].map(([number, label]) => (

            <div
              key={label}
              className="border-l border-[#211A24]/15 pl-5"
            >

              <div className="font-serif text-5xl md:text-7xl">
                {number}
              </div>

              <div className="mt-3 max-w-[140px] text-[9px] uppercase leading-4 tracking-[0.18em] text-[#756A75]">
                {label}
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =========================================================
          GALLERY
      ========================================================= */}

      <section className="bg-[#D9CCE0] px-6 py-24 md:px-10 md:py-36">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16">

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#5C2D91]">
              06 — Made with feeling
            </p>

            <h2 className="font-serif text-6xl font-light leading-none tracking-[-0.05em] md:text-8xl">

              Little things.

              <br />

              <span className="italic">
                Big feelings.
              </span>

            </h2>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-12">

            <img
              src={images.gifts}
              alt=""
              className="h-[380px] w-full object-cover md:col-span-5 md:h-[620px]"
            />

            <div className="grid gap-3 md:col-span-3">

              <img
                src={images.resin}
                alt=""
                className="h-[270px] w-full object-cover"
              />

              <img
                src={images.jewellery}
                alt=""
                className="h-[270px] w-full object-cover"
              />

            </div>

            <img
              src={images.painting}
              alt=""
              className="col-span-2 h-[320px] w-full object-cover md:col-span-4 md:h-[620px]"
            />

          </div>

        </div>

      </section>

      {/* =========================================================
          CTA
      ========================================================= */}

      <section
        id="contact"
        className="relative overflow-hidden bg-[#5C2D91] px-6 py-28 text-[#F5F0E8] md:px-10 md:py-40"
      >

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/15" />

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl">

          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            07 — Make it personal
          </p>

          <h2 className="max-w-6xl font-serif text-[15vw] font-light leading-[0.74] tracking-[-0.08em] md:text-[9rem]">

            DON'T

            <br />

            <span className="italic">
              JUST
            </span>

            <br />

            GIFT.

            <br />

            <span className="text-white/60">
              MEAN IT.
            </span>

          </h2>

          <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center">

            <a
              href="tel:9010995180"
              className="group flex w-fit items-center gap-5 rounded-full bg-[#F5F0E8] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#211A24]"
            >
              Create My Gift
              <Arrow dark />
            </a>

            <a
              href="https://instagram.com/alca_urs_emerveil_celebrations"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
            >
              @alca_urs_emerveil_celebrations
            </a>

          </div>

        </div>

      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-[#211A24] px-6 py-10 text-[#F5F0E8] md:px-10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">

          <div>

            <div className="font-serif text-2xl tracking-[0.08em]">
              ALKA<span className="text-[#C2A7D7]">.</span>
            </div>

            <p className="mt-3 text-xs text-white/35">
              Customised Crafts & Gifts
            </p>

          </div>

          <div className="text-left md:text-right">

            <p className="font-serif text-2xl italic text-[#C2A7D7]">
              Unique Crafts · Meaningful Gifts · Beautiful Memories
            </p>

            <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/25">
              © {new Date().getFullYear()} Alka Crafts & Gifts
            </p>

          </div>

        </div>

      </footer>

    </main>
  )
}