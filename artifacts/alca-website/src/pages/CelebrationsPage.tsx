import { useState } from 'react'

const images = {
  hero:
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2400&q=90',

  wedding:
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=90',

  birthday:
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=90',

  decor:
    'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=90',

  flowers:
    'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1600&q=90',

  celebration:
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=90',

  venue:
    'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1600&q=90',
}

const experiences = [
  {
    number: '01',
    title: 'Weddings',
    subtitle: 'A beginning worth remembering.',
    image: images.wedding,
  },
  {
    number: '02',
    title: 'Birthdays',
    subtitle: 'Make their moment magical.',
    image: images.birthday,
  },
  {
    number: '03',
    title: 'Corporate',
    subtitle: 'Events with an impression.',
    image: images.celebration,
  },
  {
    number: '04',
    title: 'Milestones',
    subtitle: 'Because some moments deserve more.',
    image: images.decor,
  },
]

const services = [
  {
    number: '01',
    title: 'Wedding & Engagements',
    description:
      'Grand ceremonies, intimate rituals and unforgettable receptions brought together through thoughtful styling, floral artistry and immersive lighting.',
  },
  {
    number: '02',
    title: 'Birthdays & Anniversaries',
    description:
      'Personalised themes, surprise elements, balloons, florals and beautiful details designed around the person you are celebrating.',
  },
  {
    number: '03',
    title: 'Corporate Events',
    description:
      'Professional environments for launches, award nights, conferences, celebrations and experiences that represent your brand.',
  },
  {
    number: '04',
    title: 'Baby Showers',
    description:
      'Soft, beautiful and heartfelt setups with pastel palettes, florals, personalised details and precious keepsakes.',
  },
  {
    number: '05',
    title: 'Floral & Balloon Decor',
    description:
      'Custom installations created around your venue, colour palette, theme and the atmosphere you want your guests to feel.',
  },
  {
    number: '06',
    title: 'Photo & Videography',
    description:
      'Professional coverage designed to preserve the little moments, big emotions and everything in between.',
  },
  {
    number: '07',
    title: 'Special Effects',
    description:
      'Confetti, cold pyro, sparklers, theatrical lighting and carefully choreographed effects that turn a moment into a memory.',
  },
  {
    number: '08',
    title: 'House Warmings',
    description:
      'Beautiful traditional celebrations with pooja setups, floral styling and warm details for your new beginning.',
  },
]

function Arrow({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-1 ${
        dark
          ? 'border-[#201818]/20 text-[#201818]'
          : 'border-white/30 text-white'
      }`}
    >
      ↗
    </span>
  )
}

export default function CelebrationsPage() {
  const [activeExperience, setActiveExperience] = useState(0)
  const [showServices, setShowServices] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#F4EEE8] text-[#201818]">

      {/* =========================================================
          NAVIGATION
      ========================================================= */}

      <nav className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-32px)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-[#201818]/90 px-5 py-3 text-white shadow-2xl backdrop-blur-xl">

        <a
          href="#"
          className="font-serif text-xl tracking-[0.08em]"
        >
          WOW<span className="text-[#D7A15D]">.</span>
        </a>

        <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.2em] md:flex">
          <a
            href="#experiences"
            className="text-white/55 transition hover:text-white"
          >
            Experiences
          </a>

          <a
            href="#moments"
            className="text-white/55 transition hover:text-white"
          >
            Moments
          </a>

          <a
            href="#services"
            className="text-white/55 transition hover:text-white"
          >
            Services
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
          className="rounded-full bg-[#F4EEE8] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#201818]"
        >
          Plan Your Event
        </a>

      </nav>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative min-h-[100svh] bg-[#201818] text-white">

        <div className="absolute inset-0">

          <img
            src={images.hero}
            alt="Celebration"
            className="h-full w-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#201818] via-[#201818]/55 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#201818] via-transparent to-[#201818]/20" />

        </div>

        {/* Floating badge */}

        <div className="absolute right-[7%] top-[28%] hidden h-32 w-32 rotate-12 items-center justify-center rounded-full border border-white/30 text-center text-[9px] uppercase tracking-[0.2em] md:flex">
          Create
          <br />
          something
          <br />
          unforgettable
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-20 pt-36 md:px-10 md:pb-24">

          <div className="w-full">

            <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-[#D7A15D]">

              <span className="h-px w-12 bg-[#D7A15D]" />

              Magical Celebrations · Events · Decor

            </div>

            <h1 className="font-serif text-[18vw] font-light leading-[0.73] tracking-[-0.08em] md:text-[10rem]">

              MAKE

              <br />

              <span className="ml-[8vw] italic text-[#D7A15D]">
                it
              </span>

              <br />

              <span className="ml-[15vw]">
                WOW.
              </span>

            </h1>

            <div className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <p className="max-w-md text-sm leading-7 text-white/65 md:text-base">
                We turn ordinary occasions into extraordinary memories —
                through design, emotion, detail and a little bit of magic.
              </p>

              <a
                href="#experiences"
                className="group flex w-fit items-center gap-4 rounded-full bg-[#F4EEE8] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#201818]"
              >
                Explore Experiences
                <Arrow dark />
              </a>

            </div>

          </div>

        </div>

        <div className="absolute bottom-7 right-6 hidden text-right text-[9px] uppercase tracking-[0.3em] text-white/35 md:block">
          Scroll into the celebration
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

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B1A1A]">
              01 — The philosophy
            </p>

            <h2 className="font-serif text-6xl font-light leading-[0.84] tracking-[-0.05em] md:text-8xl">

              Some moments

              <br />

              deserve

              <br />

              <span className="italic text-[#8B1A1A]">
                more.
              </span>

            </h2>

          </div>

          <div className="max-w-xl">

            <p className="text-xl leading-9 text-[#665A55] md:text-2xl md:leading-10">
              A celebration isn't just what your guests see. It is the
              anticipation before they arrive, the first reaction, the
              photographs, the laughter and the stories everyone takes home.
            </p>

            <p className="mt-7 text-sm leading-7 text-[#81736D]">
              We design every celebration around that feeling.
            </p>

          </div>

        </div>

      </section>

      {/* =========================================================
          EXPERIENCE SELECTOR
      ========================================================= */}

      <section
        id="experiences"
        className="bg-[#201818] px-6 py-24 text-[#F4EEE8] md:px-10 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D7A15D]">
                02 — Your occasion
              </p>

              <h2 className="font-serif text-5xl font-light leading-none tracking-[-0.04em] md:text-8xl">

                What are we

                <br />

                <span className="italic text-[#D7A15D]">
                  celebrating?
                </span>

              </h2>

            </div>

            <p className="max-w-xs text-sm leading-6 text-white/45">
              Tell us the occasion. We'll take care of everything that makes
              it unforgettable.
            </p>

          </div>

          <div className="grid gap-3 md:grid-cols-4">

            {experiences.map((experience, index) => (

              <button
                key={experience.title}
                onMouseEnter={() => setActiveExperience(index)}
                onClick={() => setActiveExperience(index)}
                className={`group relative h-[430px] overflow-hidden text-left transition-all duration-500 ${
                  activeExperience === index
                    ? 'md:-translate-y-4'
                    : 'opacity-55 hover:opacity-100'
                }`}
              >

                <img
                  src={experience.image}
                  alt={experience.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5 text-xs text-white/50">
                  {experience.number}
                </div>

                <div className="absolute bottom-6 left-5 right-5">

                  <h3 className="font-serif text-4xl italic">
                    {experience.title}
                  </h3>

                  <div className="mt-2 flex items-end justify-between gap-3">

                    <p className="max-w-[180px] text-xs leading-5 text-white/60">
                      {experience.subtitle}
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
          FEATURED EXPERIENCE
      ========================================================= */}

      <section className="px-6 py-24 md:px-10 md:py-36">

        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.1fr_.9fr] md:items-center">

          <div className="relative">

            <div className="absolute -left-5 -top-5 hidden h-28 w-28 rounded-full border border-[#8B1A1A]/20 md:block" />

            <img
              src={experiences[activeExperience].image}
              alt={experiences[activeExperience].title}
              className="h-[580px] w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 rounded-full bg-[#F4EEE8]/90 px-5 py-3 text-[10px] uppercase tracking-[0.2em] backdrop-blur">
              {experiences[activeExperience].number} /{' '}
              {experiences[activeExperience].title}
            </div>

          </div>

          <div className="md:pl-10">

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B1A1A]">
              Designed around your story
            </p>

            <h3 className="font-serif text-5xl font-light leading-[0.9] tracking-[-0.05em] md:text-7xl">

              Not just

              <br />

              an event.

              <br />

              <span className="italic">
                Your moment.
              </span>

            </h3>

            <p className="mt-8 text-base leading-8 text-[#685B56]">
              From the first moodboard to the final sparkler, we bring
              together styling, decor, entertainment, photography and
              production into one seamless experience.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-3">

              {[
                'Concept & Theme',
                'Venue Styling',
                'Lighting',
                'Special Effects',
              ].map((item) => (

                <div
                  key={item}
                  className="border-t border-[#201818]/15 pt-3 text-[10px] uppercase tracking-[0.14em]"
                >
                  {item}
                </div>

              ))}

            </div>

            <a
              href="tel:9010995180"
              className="group mt-10 inline-flex items-center gap-4 border-b border-[#201818] pb-3 text-xs font-bold uppercase tracking-[0.18em]"
            >
              Start planning

              <span className="transition-transform group-hover:translate-x-2">
                →
              </span>

            </a>

          </div>

        </div>

      </section>

      {/* =========================================================
          MOMENTS / VISUAL STORY
      ========================================================= */}

      <section
        id="moments"
        className="bg-[#D8C0B3] px-6 py-24 md:px-10 md:py-36"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 md:grid-cols-[.8fr_1.2fr]">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B1A1A]">
                03 — The details
              </p>

              <h2 className="font-serif text-6xl font-light leading-[0.84] tracking-[-0.05em] md:text-8xl">

                Magic

                <br />

                lives in

                <br />

                <span className="italic">
                  the details.
                </span>

              </h2>

              <p className="mt-8 max-w-sm text-sm leading-7 text-[#66534C]">
                A floral arch. A perfectly timed entrance. The right light.
                Confetti at exactly the right second. These are the details
                guests remember.
              </p>

            </div>

            <div className="relative">

              <img
                src={images.flowers}
                alt="Event flowers"
                className="h-[600px] w-full object-cover"
              />

              <div className="absolute -bottom-8 -left-4 max-w-xs bg-[#201818] p-7 text-[#F4EEE8] md:-left-12">

                <p className="font-serif text-3xl italic leading-tight">
                  “The little details create the big memories.”
                </p>

                <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-[#D7A15D]">
                  WOW Celebrations
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}

      <section
        id="services"
        className="bg-[#F4EEE8] px-6 py-24 md:px-10 md:py-36"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 flex items-end justify-between">

            <div>

              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B1A1A]">
                04 — What we create
              </p>

              <h2 className="font-serif text-6xl font-light leading-none tracking-[-0.05em] md:text-8xl">

                One team.

                <br />

                <span className="italic text-[#8B1A1A]">
                  Endless possibilities.
                </span>

              </h2>

            </div>

            <button
              onClick={() => setShowServices(!showServices)}
              className="hidden rounded-full border border-[#201818]/20 px-5 py-3 text-[10px] uppercase tracking-[0.18em] md:block"
            >
              {showServices ? 'Collapse' : 'View all'}
            </button>

          </div>

          <div className="border-t border-[#201818]/20">

            {services.map((service, index) => (

              <div
                key={service.title}
                className={`group border-b border-[#201818]/15 py-7 transition-all ${
                  !showServices && index > 3 ? 'hidden' : ''
                }`}
              >

                <div className="grid gap-5 md:grid-cols-[70px_1fr_1fr_50px] md:items-center">

                  <span className="text-[10px] text-[#8B1A1A]">
                    {service.number}
                  </span>

                  <h3 className="font-serif text-3xl transition group-hover:italic md:text-4xl">
                    {service.title}
                  </h3>

                  <p className="max-w-md text-xs leading-6 text-[#756760]">
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
            className="mt-7 rounded-full border border-[#201818]/20 px-5 py-3 text-[10px] uppercase tracking-[0.18em] md:hidden"
          >
            {showServices ? 'Show less' : 'View all services'}
          </button>

        </div>

      </section>

      {/* =========================================================
          NUMBERS
      ========================================================= */}

      <section className="bg-[#201818] px-6 py-24 text-[#F4EEE8] md:px-10 md:py-28">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-14 md:grid-cols-4">

          {[
            ['500+', 'Events executed'],
            ['100%', 'Customised setups'],
            ['8+', 'Occasion types'],
            ['∞', 'Memories created'],
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

      {/* =========================================================
          GALLERY
      ========================================================= */}

      <section className="bg-[#F4EEE8] px-6 py-24 md:px-10 md:py-36">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16">

            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B1A1A]">
              05 — Moments we've made
            </p>

            <h2 className="font-serif text-6xl font-light leading-none tracking-[-0.05em] md:text-8xl">

              See the

              <br />

              <span className="italic">
                magic.
              </span>

            </h2>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-12">

            <img
              src={images.wedding}
              alt=""
              className="h-[380px] w-full object-cover md:col-span-5 md:h-[620px]"
            />

            <div className="grid gap-3 md:col-span-3">

              <img
                src={images.birthday}
                alt=""
                className="h-[270px] w-full object-cover"
              />

              <img
                src={images.flowers}
                alt=""
                className="h-[270px] w-full object-cover"
              />

            </div>

            <img
              src={images.celebration}
              alt=""
              className="col-span-2 h-[320px] w-full object-cover md:col-span-4 md:h-[620px]"
            />

          </div>

        </div>

      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section
        id="contact"
        className="relative overflow-hidden bg-[#8B1A1A] px-6 py-28 text-[#F4EEE8] md:px-10 md:py-40"
      >

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/15" />

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl">

          <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            06 — Let's create something
          </p>

          <h2 className="max-w-6xl font-serif text-[15vw] font-light leading-[0.74] tracking-[-0.08em] md:text-[9rem]">

            YOUR

            <br />

            <span className="italic">
              MOMENT.
            </span>

            <br />

            OUR MAGIC.

          </h2>

          <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center">

            <a
              href="tel:9010995180"
              className="group flex w-fit items-center gap-5 rounded-full bg-[#F4EEE8] px-7 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#201818]"
            >
              Plan My Celebration
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

      <footer className="bg-[#201818] px-6 py-10 text-[#F4EEE8] md:px-10">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">

          <div>

            <div className="font-serif text-2xl tracking-[0.08em]">
              WOW<span className="text-[#D7A15D]">.</span>
            </div>

            <p className="mt-3 text-xs text-white/35">
              WOW Magical Celebrations
            </p>

          </div>

          <div className="text-left md:text-right">

            <p className="font-serif text-2xl italic text-[#D7A15D]">
              Magical Moments · Memories Forever
            </p>

            <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/25">
              Celebrate Life · © {new Date().getFullYear()}
            </p>

          </div>

        </div>

      </footer>

    </main>
  )
}