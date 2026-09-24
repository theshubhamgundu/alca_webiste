import { useEffect, useState } from 'react'

const images = {
  hero:
    'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=2200&q=90',
  bridal:
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=90',
  makeup:
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=90',
  skincare:
    'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1400&q=90',
  beauty:
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=90',
  hair:
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1400&q=90',
  product:
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1400&q=90',
}

const services = [
  {
    number: '01',
    title: 'Bridal',
    subtitle: 'Your most unforgettable look.',
    image: images.bridal,
  },
  {
    number: '02',
    title: 'Makeup',
    subtitle: 'Soft, bold or beautifully understated.',
    image: images.makeup,
  },
  {
    number: '03',
    title: 'Hair',
    subtitle: 'Designed around your face & occasion.',
    image: images.hair,
  },
  {
    number: '04',
    title: 'Skincare',
    subtitle: 'Botanical care for your natural glow.',
    image: images.skincare,
  },
]

const treatments = [
  {
    title: 'Bridal Makeup',
    description:
      'Traditional, modern, HD and airbrush bridal artistry designed around your features, outfit and celebration.',
  },
  {
    title: 'Party Makeup',
    description:
      'Polished looks for receptions, sangeet, mehendi, cocktail nights and every celebration in between.',
  },
  {
    title: 'Hair Artistry',
    description:
      'Elegant updos, braids, curls, blowouts and contemporary styling crafted for your face shape.',
  },
  {
    title: 'Natural Skincare',
    description:
      'Handmade soaps, moisturisers, masks and botanical care created with skin-loving ingredients.',
  },
  {
    title: 'Lip Care',
    description:
      'Coconut, rose and fruit-infused balms designed to nourish and protect naturally.',
  },
  {
    title: 'Luxury Makeup',
    description:
      'Premium products, long-wearing formulas and a camera-ready finish for special occasions.',
  },
]

function Arrow({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-1 ${
        dark
          ? 'border-[#251C1C]/20 text-[#251C1C]'
          : 'border-white/30 text-white'
      }`}
    >
      ↗
    </span>
  )
}

function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    const elements = document.querySelectorAll('[data-reveal]')
    const element = elements[elements.length - 1]

    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      data-reveal
      className={`transition-all duration-1000 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function BeautyPage() {
  const [activeService, setActiveService] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F0EB] text-[#251C1C]">

      {/* ───────────────── NAV ───────────────── */}

      <nav className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-32px)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-full border border-white/20 bg-[#251C1C]/90 px-5 py-3 text-white shadow-2xl backdrop-blur-xl">

        <a
          href="#"
          className="font-serif text-xl tracking-[0.08em]"
        >
          ALKA<span className="text-[#C7899F]">.</span>
        </a>

        <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.2em] md:flex">
          <a href="#beauty" className="text-white/60 transition hover:text-white">
            Beauty
          </a>

          <a href="#services" className="text-white/60 transition hover:text-white">
            Services
          </a>

          <a href="#ritual" className="text-white/60 transition hover:text-white">
            Ritual
          </a>

          <a href="#gallery" className="text-white/60 transition hover:text-white">
            Gallery
          </a>
        </div>

        <a
          href="tel:9010995180"
          className="rounded-full bg-[#F7F0EB] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#251C1C]"
        >
          Book Appointment
        </a>
      </nav>

      {/* ───────────────── HERO ───────────────── */}

      <section className="relative min-h-[100svh] bg-[#251C1C] text-white">

        <div className="absolute inset-0">
          <img
            src={images.hero}
            alt="Luxury beauty"
            className="h-full w-full object-cover opacity-65"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#251C1C] via-[#251C1C]/55 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#251C1C] via-transparent to-[#251C1C]/20" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-20 pt-36 md:px-10 md:pb-24">

          <div className="w-full">

            <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-[#D7A7B7]">
              <span className="h-px w-12 bg-[#D7A7B7]" />
              Luxury Beauty · Makeup · Skincare
            </div>

            <h1 className="font-serif text-[18vw] font-light leading-[0.75] tracking-[-0.07em] md:text-[10rem]">

              BEAUTY

              <br />

              <span className="ml-[7vw] italic text-[#D7A7B7]">
                that
              </span>

              <br />

              <span className="ml-[14vw]">
                FEELS.
              </span>

            </h1>

            <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <p className="max-w-md text-sm leading-7 text-white/65 md:text-base">
                Natural artistry, thoughtful skincare and luxury beauty
                experiences designed to make you feel unmistakably yourself.
              </p>

              <a
                href="tel:9010995180"
                className="group flex w-fit items-center gap-4 rounded-full bg-[#F7F0EB] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#251C1C]"
              >
                Book Your Look
                <Arrow dark />
              </a>

            </div>

          </div>

        </div>

        <div className="absolute bottom-7 right-6 hidden text-right text-[9px] uppercase tracking-[0.3em] text-white/35 md:block">
          Discover your ritual
          <br />
          ↓
        </div>

      </section>

      {/* ───────────────── INTRO ───────────────── */}

      <section
        id="beauty"
        className="px-6 py-28 md:px-10 md:py-40"
      >

        <Reveal>

          <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[.9fr_1.1fr] md:items-end">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B2252]">
                01 — The philosophy
              </p>

              <h2 className="font-serif text-6xl font-light leading-[0.85] tracking-[-0.05em] md:text-8xl">

                Beauty

                <br />

                <span className="italic">
                  isn't
                </span>

                <br />

                a mask.

              </h2>

            </div>

            <div className="max-w-xl">

              <p className="text-xl leading-9 text-[#66585A] md:text-2xl md:leading-10">

                It is the feeling of looking in the mirror and recognising
                yourself — only a little more radiant, confident and
                completely you.

              </p>

              <div className="mt-10 flex flex-wrap gap-3">

                {[
                  'Skin-friendly',
                  'Premium products',
                  'Natural care',
                  'Made with love',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#251C1C]/15 px-4 py-2 text-[10px] uppercase tracking-[0.16em]"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </Reveal>

      </section>

      {/* ───────────────── SERVICE EXPERIENCE ───────────────── */}

      <section
        id="services"
        className="bg-[#251C1C] px-6 py-24 text-[#F7F0EB] md:px-10 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <div>

                <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C7899F]">
                  02 — Your beauty experience
                </p>

                <h2 className="font-serif text-5xl font-light leading-none tracking-[-0.04em] md:text-8xl">

                  Choose

                  <br />

                  your

                  <br />

                  <span className="italic text-[#C7899F]">
                    moment.
                  </span>

                </h2>

              </div>

              <p className="max-w-xs text-sm leading-6 text-white/45">
                From your wedding morning to an ordinary day that deserves
                something extraordinary.
              </p>

            </div>

          </Reveal>

          <div className="grid gap-3 md:grid-cols-4">

            {services.map((service, index) => (

              <button
                key={service.title}
                onMouseEnter={() => setActiveService(index)}
                onClick={() => setActiveService(index)}
                className={`group relative h-[440px] overflow-hidden text-left transition-all duration-500 ${
                  activeService === index
                    ? 'md:-translate-y-4'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >

                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5 text-xs text-white/50">
                  {service.number}
                </div>

                <div className="absolute bottom-6 left-5 right-5">

                  <h3 className="font-serif text-4xl italic">
                    {service.title}
                  </h3>

                  <div className="mt-2 flex items-end justify-between gap-3">

                    <p className="max-w-[180px] text-xs leading-5 text-white/60">
                      {service.subtitle}
                    </p>

                    <Arrow />

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

      </section>

      {/* ───────────────── FEATURE ───────────────── */}

      <section className="px-6 py-24 md:px-10 md:py-36">

        <Reveal>

          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.1fr_.9fr] md:items-center">

            <div className="relative">

              <div className="absolute -left-5 -top-5 hidden h-28 w-28 rounded-full border border-[#8B2252]/20 md:block" />

              <img
                src={services[activeService].image}
                alt={services[activeService].title}
                className="h-[580px] w-full object-cover"
              />

              <div className="absolute bottom-5 left-5 rounded-full bg-[#F7F0EB]/90 px-5 py-3 text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                {services[activeService].number} /{' '}
                {services[activeService].title}
              </div>

            </div>

            <div className="md:pl-10">

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B2252]">
                Designed around you
              </p>

              <h3 className="font-serif text-5xl font-light leading-[0.9] tracking-[-0.04em] md:text-7xl">

                Your face.

                <br />

                Your story.

                <br />

                <span className="italic">
                  Your beauty.
                </span>

              </h3>

              <p className="mt-8 text-base leading-8 text-[#685D5D]">
                We don't believe in one-size-fits-all beauty. Every look is
                shaped around your features, personality, outfit, occasion
                and the way you want to feel when you walk into the room.
              </p>

              <a
                href="tel:9010995180"
                className="group mt-10 inline-flex items-center gap-4 border-b border-[#251C1C] pb-3 text-xs font-bold uppercase tracking-[0.18em]"
              >
                Create your look

                <span className="transition-transform group-hover:translate-x-2">
                  →
                </span>

              </a>

            </div>

          </div>

        </Reveal>

      </section>

      {/* ───────────────── TREATMENTS ───────────────── */}

      <section
        id="ritual"
        className="bg-[#E8D7DC] px-6 py-24 md:px-10 md:py-36"
      >

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <div className="grid gap-16 md:grid-cols-[.8fr_1.2fr]">

              <div>

                <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B2252]">
                  03 — The ritual
                </p>

                <h2 className="font-serif text-6xl font-light leading-[0.85] tracking-[-0.05em] md:text-8xl">

                  More than

                  <br />

                  <span className="italic">
                    makeup.
                  </span>

                </h2>

                <p className="mt-8 max-w-sm text-sm leading-7 text-[#68545B]">
                  Beauty begins long before the final touch. Explore services
                  designed to care for you from skin to hair to the smallest
                  finishing detail.
                </p>

              </div>

              <div className="border-t border-[#251C1C]/20">

                {treatments.map((treatment, index) => (

                  <div
                    key={treatment.title}
                    className="group border-b border-[#251C1C]/15 py-6"
                  >

                    <div className="flex items-start justify-between gap-5">

                      <div className="flex gap-5">

                        <span className="pt-1 text-[10px] text-[#8B2252]">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <div>

                          <h3 className="font-serif text-2xl transition group-hover:italic md:text-3xl">
                            {treatment.title}
                          </h3>

                          <p className="mt-2 max-w-lg text-xs leading-6 text-[#705D63]">
                            {treatment.description}
                          </p>

                        </div>

                      </div>

                      <span className="text-xl transition-transform group-hover:translate-x-1">
                        ↗
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </Reveal>

        </div>

      </section>

      {/* ───────────────── BOTANICAL STORY ───────────────── */}

      <section className="bg-[#F7F0EB] px-6 py-24 md:px-10 md:py-36">

        <div className="mx-auto max-w-7xl">

          <Reveal>

            <div className="grid gap-16 md:grid-cols-[.9fr_1.1fr]">

              <div>

                <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B2252]">
                  04 — Natural care
                </p>

                <h2 className="font-serif text-6xl font-light leading-[0.85] tracking-[-0.05em] md:text-8xl">

                  Beauty

                  <br />

                  <span className="italic">
                    rooted
                  </span>

                  <br />

                  in nature.

                </h2>

              </div>

              <div className="relative">

                <img
                  src={images.product}
                  alt="Natural skincare"
                  className="h-[600px] w-full object-cover"
                />

                <div className="absolute -bottom-8 -left-4 max-w-xs bg-[#251C1C] p-7 text-[#F7F0EB] md:-left-12">

                  <p className="font-serif text-3xl italic leading-tight">
                    “Care should feel as beautiful as the result.”
                  </p>

                  <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#C7899F]">
                    Handmade beauty essentials
                  </p>

                </div>

              </div>

            </div>

          </Reveal>

        </div>

      </section>

      {/* ───────────────── NUMBERS ───────────────── */}

      <section className="bg-[#251C1C] px-6 py-24 text-[#F7F0EB] md:px-10 md:py-28">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-14 md:grid-cols-4">

          {[
            ['100%', 'Natural products'],
            ['500+', 'Happy clients'],
            ['100%', 'Skin-friendly care'],
            ['∞', 'Confidence'],
          ].map(([number, label]) => (

            <div
              key={label}
              className="border-l border-white/15 pl-5"
            >

              <div className="font-serif text-5xl md:text-7xl">
                {number}
              </div>

              <div className="mt-3 max-w-[140px] text-[9px] uppercase leading-4 tracking-[0.18em] text-white/40">
                {label}
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ───────────────── GALLERY ───────────────── */}

      <section
        id="gallery"
        className="bg-[#F7F0EB] px-6 py-24 md:px-10 md:py-36"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 flex items-end justify-between">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B2252]">
                05 — The gallery
              </p>

              <h2 className="font-serif text-6xl font-light leading-none tracking-[-0.05em] md:text-8xl">

                Beauty

                <br />

                <span className="italic">
                  in the details.
                </span>

              </h2>

            </div>

            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-[#8A777D] md:block">
              Faces · Hair · Skin · Artistry
            </span>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-12">

            <img
              src={images.beauty}
              alt=""
              className="h-[380px] w-full object-cover md:col-span-5 md:h-[620px]"
            />

            <div className="grid gap-3 md:col-span-3">

              <img
                src={images.makeup}
                alt=""
                className="h-[270px] w-full object-cover"
              />

              <img
                src={images.skincare}
                alt=""
                className="h-[270px] w-full object-cover"
              />

            </div>

            <img
              src={images.bridal}
              alt=""
              className="col-span-2 h-[320px] w-full object-cover md:col-span-4 md:h-[620px]"
            />

          </div>

        </div>

      </section>

      {/* ───────────────── CTA ───────────────── */}

      <section className="relative overflow-hidden bg-[#8B2252] px-6 py-28 text-[#F7F0EB] md:px-10 md:py-40">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/15" />

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl">

          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/55">
            06 — Your moment
          </p>

          <h2 className="max-w-6xl font-serif text-[15vw] font-light leading-[0.76] tracking-[-0.07em] md:text-[9rem]">

            FEEL

            <br />

            <span className="italic">
              BEAUTIFUL.
            </span>

            <br />

            FEEL YOU.

          </h2>

          <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center">

            <a
              href="tel:9010995180"
              className="group flex w-fit items-center gap-5 rounded-full bg-[#F7F0EB] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#251C1C]"
            >
              Book Your Appointment
              <Arrow dark />
            </a>

            <a
              href="https://instagram.com/alca_urs_emerveil_celebrations"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.18em] text-white/65 transition hover:text-white"
            >
              @alca_urs_emerveil_celebrations
            </a>

          </div>

        </div>

      </section>

      {/* ───────────────── FOOTER ───────────────── */}

      <footer className="bg-[#251C1C] px-6 py-10 text-[#F7F0EB] md:px-10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">

          <div>

            <div className="font-serif text-2xl tracking-[0.08em]">
              ALKA<span className="text-[#C7899F]">.</span>
            </div>

            <p className="mt-3 text-xs text-white/35">
              Luxury Makeup & Beauty
            </p>

          </div>

          <div className="text-left md:text-right">

            <p className="font-serif text-2xl italic text-[#C7899F]">
              Beauty That Empowers · Naturally You
            </p>

            <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/25">
              © {new Date().getFullYear()} Alka Beauty
            </p>

          </div>

        </div>

      </footer>

      {/* ───────────────── MOBILE / MENU MODAL ───────────────── */}

      {menuOpen && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#251C1C]/80 p-5 backdrop-blur-md">

          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-auto bg-[#F7F0EB] p-7 md:p-12">

            <button
              onClick={() => setMenuOpen(false)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#251C1C]/20"
            >
              ×
            </button>

            <p className="text-[10px] uppercase tracking-[0.3em] text-[#8B2252]">
              Beauty menu
            </p>

            <h2 className="mt-4 font-serif text-6xl font-light leading-none">
              Your <span className="italic">ritual.</span>
            </h2>

            <div className="mt-12 border-t border-[#251C1C]/20">

              {[
                'Bridal Makeup',
                'HD Makeup',
                'Airbrush Makeup',
                'Party Makeup',
                'Reception Makeup',
                'Hair Styling',
                'Natural Facials',
                'Handmade Skincare',
                'Lip Care',
                'Bridal Packages',
              ].map((item, index) => (

                <div
                  key={item}
                  className="flex items-center justify-between border-b border-[#251C1C]/15 py-5"
                >

                  <div className="flex gap-5">

                    <span className="text-xs text-[#8B2252]">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="font-serif text-2xl">
                      {item}
                    </span>

                  </div>

                  <span>↗</span>

                </div>

              ))}

            </div>

            <a
              href="tel:9010995180"
              className="mt-10 inline-flex rounded-full bg-[#251C1C] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white"
            >
              Enquire Now
            </a>

          </div>

        </div>

      )}

    </main>
  )
}