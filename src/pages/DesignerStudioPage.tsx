import { useState } from 'react'

const images = {
  hero:
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=2400&q=90',

  bridal:
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1600&q=90',

  saree:
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=90',

  embroidery:
    'https://images.unsplash.com/photo-1610189012906-6f3d8c2c5a0e?auto=format&fit=crop&w=1600&q=90',

  tailoring:
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=90',

  fashion:
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=90',

  fabric:
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=90',
}

const collections = [
  {
    number: '01',
    title: 'Bridal',
    subtitle: 'For the woman at the centre of the moment.',
    image: images.bridal,
  },
  {
    number: '02',
    title: 'Festive',
    subtitle: 'Colour, craft and celebration.',
    image: images.saree,
  },
  {
    number: '03',
    title: 'Designer',
    subtitle: 'One piece. One story.',
    image: images.fashion,
  },
  {
    number: '04',
    title: 'Custom',
    subtitle: 'Designed completely around you.',
    image: images.fabric,
  },
]

const services = [
  {
    number: '01',
    title: 'Custom Stitching',
    description:
      'Expert tailoring for salwar suits, lehengas, blouses, kurtis, gowns and more — made precisely to your measurements.',
  },
  {
    number: '02',
    title: 'Embroidery',
    description:
      'Hand and machine embroidery including zari, thread work, sequins, cutwork and mirror embellishments.',
  },
  {
    number: '03',
    title: 'Perfect Fitting',
    description:
      'Detailed measurements, fitting trials and finishing adjustments to make every garment feel truly yours.',
  },
  {
    number: '04',
    title: 'Ladies Wear',
    description:
      'Kurtas, suits, lehengas, gowns and contemporary Indian silhouettes designed for the modern woman.',
  },
  {
    number: '05',
    title: 'Gents Wear',
    description:
      'Sherwanis, kurta pyjamas, Indo-western outfits and formalwear crafted for important occasions.',
  },
  {
    number: '06',
    title: 'Couple Wear',
    description:
      'Thoughtfully coordinated outfits for weddings, engagements, receptions and festive celebrations.',
  },
  {
    number: '07',
    title: 'Premium Fabrics',
    description:
      'Silks, cottons, georgettes, chiffons and designer fabrics selected for texture, movement and finish.',
  },
  {
    number: '08',
    title: 'Designer Wear',
    description:
      'Exclusive one-of-one creations where silhouette, fabric, embroidery and personality come together.',
  },
]

const occasions = [
  'Wedding',
  'Engagement',
  'Reception',
  'Festival',
  'Party',
  'Corporate',
  'Everyday',
]

function Arrow({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-1 ${
        dark
          ? 'border-[#18271E]/20 text-[#18271E]'
          : 'border-white/30 text-white'
      }`}
    >
      ↗
    </span>
  )
}

export default function DesignerStudioPage() {
  const [activeCollection, setActiveCollection] = useState(0)
  const [showServices, setShowServices] = useState(false)
  const [occasion, setOccasion] = useState('Wedding')

  return (
    <main className="min-h-screen overflow-hidden bg-[#F4F0E8] text-[#18271E]">

      {/* =========================================================
          NAV
      ========================================================= */}

      <nav className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-32px)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-[#18271E]/90 px-5 py-3 text-white shadow-2xl backdrop-blur-xl">

        <a
          href="#"
          className="font-serif text-xl tracking-[0.08em]"
        >
          STUDIO<span className="text-[#B7A06B]">.</span>
        </a>

        <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.2em] md:flex">

          <a
            href="#collections"
            className="text-white/55 transition hover:text-white"
          >
            Collections
          </a>

          <a
            href="#atelier"
            className="text-white/55 transition hover:text-white"
          >
            Atelier
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
          className="rounded-full bg-[#F4F0E8] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#18271E]"
        >
          Book Consultation
        </a>

      </nav>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative min-h-[100svh] bg-[#18271E] text-white">

        <div className="absolute inset-0">

          <img
            src={images.hero}
            alt="Designer fashion"
            className="h-full w-full object-cover opacity-55"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#18271E] via-[#18271E]/55 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#18271E] via-transparent to-[#18271E]/20" />

        </div>

        {/* Editorial label */}

        <div className="absolute right-[7%] top-[30%] hidden rotate-90 text-[9px] uppercase tracking-[0.4em] text-white/45 md:block">
          Couture · Tailoring · Craft
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-20 pt-36 md:px-10 md:pb-24">

          <div className="w-full">

            <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-[#C7B47C]">

              <span className="h-px w-12 bg-[#C7B47C]" />

              Designer Studio · Bespoke Fashion

            </div>

            <h1 className="font-serif text-[18vw] font-light leading-[0.7] tracking-[-0.09em] md:text-[10rem]">

              WEAR

              <br />

              <span className="ml-[8vw] italic text-[#C7B47C]">
                your
              </span>

              <br />

              <span className="ml-[15vw]">
                STORY.
              </span>

            </h1>

            <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <p className="max-w-md text-sm leading-7 text-white/65 md:text-base">
                Bespoke silhouettes, beautiful fabrics and precise
                craftsmanship — designed around your body, your occasion and
                your way of wearing it.
              </p>

              <a
                href="#collections"
                className="group flex w-fit items-center gap-4 rounded-full bg-[#F4F0E8] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#18271E]"
              >
                Explore the Studio
                <Arrow dark />
              </a>

            </div>

          </div>

        </div>

        <div className="absolute bottom-7 right-6 hidden text-right text-[9px] uppercase tracking-[0.3em] text-white/35 md:block">
          From sketch to style
          <br />
          ↓
        </div>

      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}

      <section className="px-6 py-28 md:px-10 md:py-40">

        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[.9fr_1.1fr] md:items-end">

          <div>

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A4D2E]">
              01 — The philosophy
            </p>

            <h2 className="font-serif text-6xl font-light leading-[0.84] tracking-[-0.05em] md:text-8xl">

              Fashion

              <br />

              should feel

              <br />

              <span className="italic text-[#1A4D2E]">
                personal.
              </span>

            </h2>

          </div>

          <div className="max-w-xl">

            <p className="text-xl leading-9 text-[#5D655F] md:text-2xl md:leading-10">
              We don't believe in designing for a mannequin. We design for
              people — their proportions, personalities, celebrations and the
              way they want to feel when they enter a room.
            </p>

            <p className="mt-7 text-sm leading-7 text-[#788078]">
              Every garment begins with a conversation.
            </p>

          </div>

        </div>

      </section>

      {/* =========================================================
          COLLECTIONS
      ========================================================= */}

      <section
        id="collections"
        className="bg-[#18271E] px-6 py-24 text-[#F4F0E8] md:px-10 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C7B47C]">
                02 — Collections
              </p>

              <h2 className="font-serif text-5xl font-light leading-none tracking-[-0.04em] md:text-8xl">

                Designed

                <br />

                <span className="italic text-[#C7B47C]">
                  differently.
                </span>

              </h2>

            </div>

            <p className="max-w-xs text-sm leading-6 text-white/45">
              From bridal silhouettes to everyday elegance, discover pieces
              made to feel like they belong to you.
            </p>

          </div>

          <div className="grid gap-3 md:grid-cols-4">

            {collections.map((collection, index) => (

              <button
                key={collection.title}
                onMouseEnter={() => setActiveCollection(index)}
                onClick={() => setActiveCollection(index)}
                className={`group relative h-[440px] overflow-hidden text-left transition-all duration-500 ${
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

            <div className="absolute -left-5 -top-5 hidden h-28 w-28 rounded-full border border-[#1A4D2E]/20 md:block" />

            <img
              src={collections[activeCollection].image}
              alt={collections[activeCollection].title}
              className="h-[600px] w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 rounded-full bg-[#F4F0E8]/90 px-5 py-3 text-[10px] uppercase tracking-[0.2em] backdrop-blur">
              {collections[activeCollection].number} /{' '}
              {collections[activeCollection].title}
            </div>

          </div>

          <div className="md:pl-10">

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A4D2E]">
              Made around you
            </p>

            <h3 className="font-serif text-5xl font-light leading-[0.9] tracking-[-0.04em] md:text-7xl">

              Your body.

              <br />

              Your style.

              <br />

              <span className="italic">
                Your rules.
              </span>

            </h3>

            <p className="mt-8 text-base leading-8 text-[#657068]">
              From the first sketch to the final fitting, every detail is
              considered. Silhouette, fabric, embroidery, proportion,
              movement and finish all work together to create something that
              feels naturally yours.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3">

              {[
                'Custom silhouette',
                'Premium fabrics',
                'Precision fitting',
                'Handcrafted detail',
              ].map((item) => (

                <div
                  key={item}
                  className="border-t border-[#18271E]/15 pt-3 text-[10px] uppercase tracking-[0.14em]"
                >
                  {item}
                </div>

              ))}

            </div>

            <a
              href="tel:9010995180"
              className="group mt-10 inline-flex items-center gap-4 border-b border-[#18271E] pb-3 text-xs font-bold uppercase tracking-[0.18em]"
            >
              Book a consultation

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
        id="atelier"
        className="bg-[#D9D6C8] px-6 py-24 md:px-10 md:py-36"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 md:grid-cols-[.75fr_1.25fr]">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A4D2E]">
                03 — The occasion
              </p>

              <h2 className="font-serif text-6xl font-light leading-[0.84] tracking-[-0.05em] md:text-8xl">

                What are you

                <br />

                dressing

                <br />

                <span className="italic">
                  for?
                </span>

              </h2>

            </div>

            <div>

              <div className="flex flex-wrap gap-2">

                {occasions.map((item) => (

                  <button
                    key={item}
                    onClick={() => setOccasion(item)}
                    className={`rounded-full border px-5 py-3 text-[10px] uppercase tracking-[0.16em] transition ${
                      occasion === item
                        ? 'border-[#18271E] bg-[#18271E] text-white'
                        : 'border-[#18271E]/20 hover:border-[#18271E]'
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

              <div className="mt-12 border-t border-[#18271E]/20 pt-10">

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#1A4D2E]">
                  Your occasion
                </p>

                <h3 className="mt-3 font-serif text-5xl italic md:text-7xl">
                  {occasion}
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-7 text-[#60675F]">
                  Tell us what you're attending, what you're imagining and how
                  you want to feel. We'll help shape the silhouette, fabric,
                  detailing and finish around the occasion.
                </p>

                <a
                  href="tel:9010995180"
                  className="mt-8 inline-flex rounded-full bg-[#18271E] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                >
                  Design My Outfit
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          CRAFT / ATELIER
      ========================================================= */}

      <section
        id="craft"
        className="bg-[#F4F0E8] px-6 py-24 md:px-10 md:py-36"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-16 md:grid-cols-[.9fr_1.1fr]">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A4D2E]">
                04 — The atelier
              </p>

              <h2 className="font-serif text-6xl font-light leading-[0.84] tracking-[-0.05em] md:text-8xl">

                Where

                <br />

                fabric becomes

                <br />

                <span className="italic text-[#1A4D2E]">
                  fashion.
                </span>

              </h2>

              <p className="mt-8 max-w-sm text-sm leading-7 text-[#687068]">
                Beautiful garments aren't rushed. They are measured, cut,
                shaped, stitched, fitted and finished with patience.
              </p>

            </div>

            <div className="relative">

              <img
                src={images.tailoring}
                alt="Tailoring"
                className="h-[620px] w-full object-cover"
              />

              <div className="absolute -bottom-8 -left-4 max-w-xs bg-[#18271E] p-7 text-[#F4F0E8] md:-left-12">

                <p className="font-serif text-3xl italic leading-tight">
                  “The difference is in the details nobody notices until
                  everything feels right.”
                </p>

                <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#C7B47C]">
                  Designer Studio
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}

      <section className="bg-[#18271E] px-6 py-24 text-[#F4F0E8] md:px-10 md:py-36">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 flex items-end justify-between">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C7B47C]">
                05 — The studio
              </p>

              <h2 className="font-serif text-6xl font-light leading-none tracking-[-0.05em] md:text-8xl">

                From sketch

                <br />

                <span className="italic text-[#C7B47C]">
                  to style.
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

                  <span className="text-[10px] text-[#C7B47C]">
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

      <section className="bg-[#F4F0E8] px-6 py-24 md:px-10 md:py-28">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-14 md:grid-cols-4">

          {[
            ['100%', 'Custom designs'],
            ['5★', 'Client satisfaction'],
            ['100%', 'Precision fitting'],
            ['∞', 'Ways to express yourself'],
          ].map(([number, label]) => (

            <div
              key={label}
              className="border-l border-[#18271E]/15 pl-5"
            >

              <div className="font-serif text-5xl md:text-7xl">
                {number}
              </div>

              <div className="mt-3 max-w-[150px] text-[9px] uppercase leading-4 tracking-[0.18em] text-[#727A72]">
                {label}
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* =========================================================
          GALLERY
      ========================================================= */}

      <section className="bg-[#D9D6C8] px-6 py-24 md:px-10 md:py-36">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16">

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A4D2E]">
              06 — The look
            </p>

            <h2 className="font-serif text-6xl font-light leading-none tracking-[-0.05em] md:text-8xl">

              Crafted

              <br />

              <span className="italic">
                to be noticed.
              </span>

            </h2>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-12">

            <img
              src={images.bridal}
              alt=""
              className="h-[380px] w-full object-cover md:col-span-5 md:h-[620px]"
            />

            <div className="grid gap-3 md:col-span-3">

              <img
                src={images.saree}
                alt=""
                className="h-[270px] w-full object-cover"
              />

              <img
                src={images.embroidery}
                alt=""
                className="h-[270px] w-full object-cover"
              />

            </div>

            <img
              src={images.fashion}
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
        className="relative overflow-hidden bg-[#1A4D2E] px-6 py-28 text-[#F4F0E8] md:px-10 md:py-40"
      >

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/15" />

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl">

          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            07 — Your next piece
          </p>

          <h2 className="max-w-6xl font-serif text-[15vw] font-light leading-[0.74] tracking-[-0.08em] md:text-[9rem]">

            DON'T

            <br />

            <span className="italic">
              JUST
            </span>

            <br />

            WEAR IT.

            <br />

            <span className="text-white/55">
              OWN IT.
            </span>

          </h2>

          <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center">

            <a
              href="tel:9010995180"
              className="group flex w-fit items-center gap-5 rounded-full bg-[#F4F0E8] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#18271E]"
            >
              Book Consultation
              <Arrow dark />
            </a>

            <a
              href="https://instagram.com/aalca_com"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
            >
              @aalca_com
            </a>

          </div>

        </div>

      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="bg-[#18271E] px-6 py-10 text-[#F4F0E8] md:px-10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">

          <div>

            <div className="font-serif text-2xl tracking-[0.08em]">
              DESIGNER
              <span className="text-[#C7B47C]">.</span>
            </div>

            <p className="mt-3 text-xs text-white/35">
              Designer Studio · Fashion & Design
            </p>

          </div>

          <div className="text-left md:text-right">

            <p className="font-serif text-2xl italic text-[#C7B47C]">
              Designed with Passion · Delivered with Perfection
            </p>

            <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/25">
              © {new Date().getFullYear()} Designer Studio
            </p>

          </div>

        </div>

      </footer>

    </main>
  )
}