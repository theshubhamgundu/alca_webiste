import { useState } from 'react'
import { useSiteData } from '../hooks/useSiteData'

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
  const { site } = useSiteData()
  const division = site.divisions.find((d) => d.id === 'gifts') || site.divisions[0]
  const [showServices, setShowServices] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#F5F0E8] text-[#211A24]">

      {/* NAV */}
      <nav className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-32px)] max-w-7xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-[#211A24]/90 px-5 py-3 text-white shadow-2xl backdrop-blur-xl">
        <a href="/" className="font-serif text-xl tracking-[0.08em]">
          ALCA<span className="text-[#B89AD2]">.</span>
        </a>
        <div className="flex gap-2">
          <a
            href={`https://instagram.com/${division.ig}`}
            className="rounded-full border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em]"
          >
            Instagram
          </a>
          <a
            href={`https://wa.me/${division.phone}?text=${encodeURIComponent(division.waText || "")}`}
            className="rounded-full bg-[#B89AD2] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#211A24]"
          >
            WhatsApp
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[60svh] bg-[#211A24] text-white pt-36 px-6 md:px-10">
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-[#C2A7D7]">
            <span className="h-px w-12 bg-[#C2A7D7]" />
            {division.name}
          </div>
          <h1 className="mb-10 font-serif text-[12vw] font-light leading-[0.9] tracking-[-0.05em] md:text-[6rem]">
            {division.lead}
          </h1>
          <a
            href={`https://wa.me/${division.phone}?text=${encodeURIComponent("Hi ALCA, I have an enquiry about your crafts and gifts.")}`}
            className="inline-block rounded-full border border-white/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-[#211A24]"
          >
            Enquiry
          </a>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#211A24] px-6 py-24 text-[#F5F0E8] md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 font-serif text-5xl font-light italic text-[#C2A7D7]">
            Our Specialities
          </h2>
          <div className="border-t border-white/15">
            {[...(division.feature || []), ...(division.s || [])].map((service, index) => (
              <div
                key={index}
                className={`group border-b border-white/10 py-7 ${
                  !showServices && index > 3 ? 'hidden' : ''
                }`}
              >
                <div className="grid gap-5 md:grid-cols-[1fr_2fr] md:items-center">
                  <h3 className="font-serif text-3xl transition group-hover:italic md:text-4xl">
                    {service[0]}
                  </h3>
                  <p className="text-xs leading-6 text-white/60">
                    {service[1]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowServices(!showServices)}
            className="mt-7 rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[0.18em]"
          >
            {showServices ? 'Show less' : 'View all'}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#211A24] px-6 py-10 text-[#F5F0E8] md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="font-serif text-2xl tracking-[0.08em]">
              ALCA<span className="text-[#C2A7D7]">.</span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/25">
              © {new Date().getFullYear()} Alka Crafts & Gifts
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
