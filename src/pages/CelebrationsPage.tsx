import { useState } from 'react'

interface CelebrationTheme {
  id: string
  category: 'wedding' | 'birthday' | 'housewarming' | 'traditional' | 'corporate'
  title: string
  tagline: string
  occasionName: string
  badge?: string
  shortDesc: string
  fullDesc: string
  highlights: string[]
  idealFor: string
  image: string
}

const themesList: CelebrationTheme[] = [
  {
    id: 'complete-wedding',
    category: 'wedding',
    title: 'Complete End-to-End Wedding (Pelli)',
    tagline: 'All-Inclusive: Mandapam, Panthulu, Decor, Lighting, Nadaswaram & Cinema',
    occasionName: 'Grand Telugu & Indian Wedding',
    badge: '360° All-Inclusive',
    shortDesc: 'Complete wedding orchestration—temple pillar mandapam, certified Vedic Panthulu (Purohit) team, Nadaswaram troupe, Haldi/Sangeet decor, 4K cinema, and on-ground hospitality.',
    fullDesc:
      'We take care of your entire wedding from sacred muhurtham rituals to grand reception. Includes authentic temple mandapam fabrication, certified Vedic Panthulu for all rituals & homams, Nadaswaram/Shehnai artists, fresh Bangalore flower canopies, 4K cinematography & drone coverage, stage sound/lighting, and dedicated event coordinators so your family enjoys stress-free.',
    highlights: [
      'Certified Vedic Panthulu (Priest) Team & Muhurtham Pooja Samagri',
      'Authentic Temple Arch & Pillar Mandap with Fresh Floral Canopies',
      'Live Nadaswaram / Shehnai & Mangala Vadyam Troupe',
      'Haldi, Sangeet & Reception Stage Production & Sound',
      '4K Cinema Photo/Video Team & Drone Aerial Feeds',
      'Senior Production Director & On-Site Logistics Crew',
    ],
    idealFor: 'Grand Weddings, Convention Centers & Star Resorts',
    image: '/wow/Royal%20Mandapam%20&%20Stage%20Architecture.jpg',
  },
  {
    id: 'housewarming-pooja',
    category: 'housewarming',
    title: 'Housewarming (Gruhapravesam) & Sacred Homam',
    tagline: 'Vedic Panthulu, Navagraha Homam, Fresh Mango Thoranam & Brass Deepams',
    occasionName: 'Gruhapravesam & Vratam',
    badge: 'Sacred Vedic',
    shortDesc: 'Complete Vedic rituals and auspicious decor: experienced Panthulu for Vastu & Ganapathi Homam, fresh mango leaf thoranam, pooja mandapam, and entrance flower rangoli.',
    fullDesc:
      'Start your new home on an auspicious note with complete all-inclusive Vedic arrangements. We provide revered Telugu/Vedic Panthulu with all sacred homa dravyas & samagri, fresh mango leaf & marigold door thoranams, decorated pooja mandap backdrop with kalasam, brass deepam pillars, plantain banana trees, and welcoming flower rangoli.',
    highlights: [
      'Revered Vedic Panthulu (Purohit) for Vastu, Ganapathi & Navagraha Homam',
      'Complete Sacred Pooja & Homam Samagri Provided',
      'Fresh Mango Leaves & Bangalore Marigold Main Door Thoranam',
      'Traditional Pooja Stage Backdrop with Kalasam & Silk Drapes',
      'Auspicious Banana Trees & Brass Deepam Pillar Setup',
      'Intricate Fresh Flower Petal Rangoli at Threshold',
    ],
    idealFor: 'New Apartments, Independent Houses, Villas & Farmhouses',
    image: '/wow/Housewarming%20(Gruhapravesam)%20&%20Sacred%20Homam.webp',
  },
  {
    id: 'birthday-milestone',
    category: 'birthday',
    title: 'Grand Birthday & Kids Milestone Extravaganza',
    tagline: '3D Custom Theme Backdrops, Balloon Architecture & Kids Entertainment',
    occasionName: '1st Birthday / Milestones',
    badge: 'High Energy',
    shortDesc: 'Complete birthday experiences: 3D character backdrops, luxury pastel balloon arches, neon signage, cake table styling, emcee/magician, and sound setup.',
    fullDesc:
      'Make your child’s milestone birthday unforgettable with our customized 3D theme productions. From Jungle Safari, Boss Baby, Princess Castle, to Cocomelon, we build multi-layered backdrop sets, customized neon LED name signs, pastel balloon garlands, interactive game hosts/magicians, sound system, and themed return gift setups.',
    highlights: [
      'Custom 3D Theme Backdrop & Layered Stage Architecture',
      'Organic Pastel & Chrome Balloon Garlands & Arches',
      'Customized LED Neon Name Signage & Themed Cake Table',
      'Professional Emcee / Game Host / Magician for Kids',
      'DJ Sound System, Stage Spotlights & Party Entry Sparklers',
      'Coordinated Themed Welcome Arch & Return Gift Counter',
    ],
    idealFor: 'Banquet Halls, Gated Community Clubhouses & Terraces',
    image: '/wow/Grand%20Birthday%20&%20Kids%20Milestone%20Extravaganza.jpg',
  },
  {
    id: 'haldi-pellikuthuru',
    category: 'wedding',
    title: 'Vibrant Haldi & Pellikuthuru Setups',
    tagline: 'Brass Urli Tubs, Marigold Drops & Floral Showers',
    occasionName: 'Haldi & Mangala Snanam',
    badge: 'Vibrant & Festive',
    shortDesc: 'Auspicious yellow marigold backdrops, engraved brass urli for Haldi snanam, flower petal shower baskets, and Telugu photo corners.',
    fullDesc:
      'Joyous, vibrant pre-wedding experiences. Features traditional engraved brass tubs for Mangala Snanam, cascading genda phool backdrops, fresh rose petal shower baskets, and vibrant cultural photobooths.',
    highlights: [
      'Royal Engraved Brass Urli / Tub for Bride & Groom Haldi Snanam',
      'Cascading Genda Phool (Marigold) Backdrops',
      'Fresh Rose & Marigold Petal Baskets for Floral Showers',
      'Telugu Cultural Photobooth with Traditional Props',
      'Waterproof Stage Flooring & Fast Cleanup',
    ],
    idealFor: 'Home Backyards, Terraces & Resort Lawns',
    image: '/wow/Vibrant%20Haldi%20&%20Pellikuthuru%20Setups.jpg',
  },
  {
    id: 'sangeet-dj',
    category: 'wedding',
    title: 'Sangeet & DJ Night Concert Stage',
    tagline: 'High-Energy Truss Lighting, Cold Pyro & Dance Floors',
    occasionName: 'Sangeet & Cocktail Night',
    badge: 'Concert Scale',
    shortDesc: 'Concert-grade sound, dynamic beam truss lighting, LED visual wall, glossy dance floor & safe cold sparklers.',
    fullDesc:
      'Transform your sangeet into a concert experience. Features massive P3 LED visual display backdrops, synchronized intelligent moving-head lighting, safe indoor cold pyro sparklers for couple entries, heavy cloud fog machines, and a high-gloss dance floor.',
    highlights: [
      'P3 HD LED Video Wall & Visual VJ Loops',
      'Concert Truss with Moving-Head Beam Lights',
      'Cold Pyro Sparklers & Low-Lying Heavy Fog',
      'Glossy Dance Floor & Customized Stage Wrapping',
      'Professional Audio System Setup',
    ],
    idealFor: 'Hotel Ballrooms, Resorts & Banquet Stages',
    image: '/wow/Sangeet%20&%20DJ%20Night%20Concert%20Stag.jpeg',
  },
  {
    id: 'corporate-conclave',
    category: 'corporate',
    title: 'Corporate Galas, Conferences & Product Launches',
    tagline: 'P3 HD LED Walls, Line-Array Audio, Stage Rigging & Media Walls',
    occasionName: 'Corporate Conclaves & Galas',
    badge: 'Corporate Standard',
    shortDesc: 'End-to-end corporate event production: seamless LED backdrops, speaker podiums, stage lighting, line-array audio, and branded registration booths.',
    fullDesc:
      'Full-scale event production for enterprise conferences, tech product unveils, dealer awards nights, and annual galas in Hyderabad. We deliver flawless acoustic engineering, seamless LED video displays, branded media walls, live streaming tech, and dedicated stage managers.',
    highlights: [
      'P3 High-Definition Seamless LED Video Display Wall & VJ Loop Control',
      'Professional Line-Array JBL Audio Engineering & Podium Mics',
      'Stage Lighting Truss Rigging & Dynamic Beam Uplighting',
      'Branded Media Backdrop, Red Carpet & Registration Desks',
      'Dedicated Technical Director & Stage Crew on Standby',
    ],
    idealFor: 'Hitec City / Financial District Star Hotels & Convention Centers',
    image: '/wow/Corporate%20Galas,%20Conferences%20&%20Product%20Launches.jpg',
  },
]

const corporateServices = [
  {
    icon: '🏛️',
    title: 'Mandap Architecture & Fabrication',
    desc: 'Custom wooden, fiber, and metal frameworks built to exact structural dimensions for grand temple mandaps and conference stages.',
    tags: ['Structural Rigging', '3D Fabrication', 'CAD Design'],
  },
  {
    icon: '🌺',
    title: 'Fresh Floral Procurement & Styling',
    desc: 'Daily fresh flower sourcing from Bangalore & local markets—marigolds, carnations, roses, orchids, and traditional lotus buds.',
    tags: ['Fresh Bangalore Florals', 'Floral Canopies', 'Custom Urlis'],
  },
  {
    icon: '🪔',
    title: 'Vedic Panthulu & Pooja Samagri',
    desc: 'Certified and experienced Telugu Vedic Panthulu for Gruhapravesam Homams, Vivaha Muhurthams, and family Vrathams.',
    tags: ['Certified Purohits', 'Homam Samagri', 'Muhurtham Guidance'],
  },
  {
    icon: '💡',
    title: 'Theatrical & Intelligent Lighting',
    desc: 'Sharpy moving heads, warm par cans, ambient uplighting, fairy light canopies, and programmed mood lighting controllers.',
    tags: ['Moving Heads', 'Architectural Uplighting', 'DMX Controllers'],
  },
  {
    icon: '✨',
    title: 'Cold Pyro & Atmospheric Entry Effects',
    desc: '100% smokeless & indoor-safe cold spark fountains, low-lying heavy cloud fog, CO2 jets, and confetti cannons for grand entries.',
    tags: ['Indoor Cold Pyro', 'Dry Ice Fog', 'Confetti Blasters'],
  },
  {
    icon: '📸',
    title: 'Cinematography, Drones & Sound',
    desc: '4K cinema wedding films, live multi-camera LED feeds, drone aerial coverage, and professional line-array audio systems.',
    tags: ['4K Cinema Coverage', 'Drone Aerials', 'Line Array Sound'],
  },
]

const corporatePackages = [
  {
    name: 'Housewarming & Sacred Pooja Suite',
    tag: 'Gruhapravesam / Navagraha Homam / Vratam',
    popular: false,
    subtitle: 'End-to-End Vedic Priest & Auspicious Decor Setup',
    features: [
      'Certified Vedic Panthulu (Purohit) & Complete Homam Samagri',
      'Fresh Mango Leaf & Bangalore Marigold Main Door Thoranam',
      'Sacred Pooja Stage Setup with Silk Backdrop & Kalasam',
      'Auspicious Plantain Banana Stems & Brass Deepam Stands',
      'Intricate Fresh Flower Petal Rangoli at Threshold',
      'Dedicated On-Site Setup & Cleanup Crew',
    ],
  },
  {
    name: 'Grand Birthday & Milestone Suite',
    tag: '1st Birthday / Half-Saree / Milestones',
    popular: false,
    subtitle: '3D Theme Fabrication & High-Energy Kids Production',
    features: [
      'Multi-Layered 3D Theme Stage Backdrop (15x8 ft)',
      'Customized Neon LED Name Sign & Themed Cake Table',
      'Organic Pastel & Chrome Balloon Arch Installation',
      'Professional Emcee / Magician / Kids Activity Host',
      'DJ Sound System, Stage Spotlights & Party Lighting',
      'Safe Indoor Cold Pyro Sparkler Fountains (4 Units)',
    ],
  },
  {
    name: 'Complete End-to-End Wedding Suite',
    tag: 'Muhurtham Wedding, Sangeet & Reception',
    popular: true,
    subtitle: 'All-Inclusive 360° Royal Wedding Orchestration',
    features: [
      'Authentic Temple Mandapam with Fresh Flower Ceiling',
      'Certified Vedic Panthulu (Priest) Team & Muhurtham Coordination',
      'Live Nadaswaram / Shehnai Mangala Vadyam Troupe',
      'Sangeet & Reception Stage with P3 LED Wall & Moving Head Lights',
      '4K Cinema Photography, Video & Drone Aerial Coverage',
      'Traditional Silk Umbrella & Royal Entry Coordination',
      'Senior Production Director & Dedicated On-Ground Coordinators',
    ],
  },
]

const hyderabadVenues = [
  'Banjara Hills & Jubilee Hills Venues',
  'Gachibowli, Financial District & Kokapet',
  'Hitec City & Madhapur Star Hotels',
  'Shamshabad & Gandipet Destination Resorts',
  'Secunderabad, Begumpet & Kompally',
  'Abids, Old City & Charminar Heritage Palaces',
  'Kukatpally, Miyapur & Bachupally Banquets',
  'Vijayawada, Warangal & Destination Telangana/AP',
]

export default function CelebrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedThemeModal, setSelectedThemeModal] = useState<CelebrationTheme | null>(null)

  // Quote Calculator State
  const [calcName, setCalcName] = useState('')
  const [calcDate, setCalcDate] = useState('')
  const [calcEventType, setCalcEventType] = useState('Complete End-to-End Wedding (Pelli)')
  const [calcVenueType, setCalcVenueType] = useState('Convention Center / Star Hotel')
  const [calcLocation, setCalcLocation] = useState('Banjara Hills & Jubilee Hills Venues')
  const [calcGuestCount, setCalcGuestCount] = useState('300 - 800 Guests (Grand)')

  const filteredThemes = themesList.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  )

  const handleWhatsAppQuote = (customTheme?: string) => {
    const event = customTheme || calcEventType
    const nameStr = calcName ? `Name: *${encodeURIComponent(calcName)}*%0A` : ''
    const dateStr = calcDate ? `Date: *${encodeURIComponent(calcDate)}*%0A` : ''
    const text = `✨ *Hi WOW Magical Celebrations (ALCA)!*%0A${nameStr}I would like to inquire about event decor & production in Hyderabad.%0A%0A🎉 *Occasion:* ${encodeURIComponent(event)}%0A🏛️ *Venue Style:* ${encodeURIComponent(calcVenueType)}%0A📍 *Location:* ${encodeURIComponent(calcLocation)}%0A👥 *Guest Scale:* ${encodeURIComponent(calcGuestCount)}%0A${dateStr}%0APlease share portfolio, slot availability, and quote estimate. Thank you! ✨`
    window.open(`https://wa.me/919010995180?text=${text}`, '_blank')
  }

  return (
    <main className="relative min-h-screen text-slate-900 selection:bg-blue-600 selection:text-white pb-24 lg:pb-0">
      {/* ───────────────── FULL-PAGE FIXED SANGEET & CONCERT BACKGROUND ───────────────── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src="/wow/Sangeet%20&%20DJ%20Night%20Concert%20Stag.jpeg"
          alt="Sangeet & DJ Concert Production Background"
          className="h-full w-full object-cover object-center scale-100"
        />
        {/* Soft luminous light glass frosted overlay so background image is clearly visible */}
        <div className="absolute inset-0 bg-white/45 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-slate-50/40 to-slate-100/50" />
      </div>

      {/* ───────────────── LOCKED STICKY HERO SECTION ───────────────── */}
      <section className="sticky top-0 z-0 flex min-h-screen items-center justify-center py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Content Card */}
            <div className="lg:col-span-7 rounded-3xl bg-white/85 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl border border-white/80 ring-1 ring-slate-900/5">
              {/* Simple Clean ALCA WOW Celebrations Branding */}
              <div className="flex items-center gap-3 border-b border-slate-200/70 pb-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow-sm">
                    A
                  </div>
                  <div>
                    <div className="font-serif text-base font-bold tracking-tight text-slate-900 leading-none">
                      ALCA <span className="text-blue-600">WOW CELEBRATIONS</span>
                    </div>
                    <div className="text-[10px] font-medium tracking-wide text-slate-500 uppercase mt-1">
                      Event Architecture & Production · Hyderabad
                    </div>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50/90 px-3.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200/60 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                Bespoke Event Architecture & Production Management
              </div>

              <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.12]">
                Signature Celebrations.
                <br />
                <span className="text-blue-600 italic">Flawlessly Orchestrated.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
                Hyderabad's premier luxury event production house specializing in grand Vedic temple mandapams, concert-grade Sangeet stages, auspicious family ceremonies, and enterprise conclaves—delivered with direct in-house technical fabrication, certified ritual coordinators, and transparent end-to-end execution.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#calculator"
                  className="rounded-lg bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-blue-700 active:scale-95"
                >
                  Request Consultation & Quote ↓
                </a>
                <a
                  href="#themes"
                  className="rounded-lg border border-slate-300 bg-white/90 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-800 shadow-sm transition hover:bg-white"
                >
                  Explore Curated Portfolio ↓
                </a>
              </div>

              {/* Metric Badges */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-200/70 pt-6 sm:grid-cols-4">
                <div>
                  <div className="font-serif text-2xl font-bold text-slate-900">500+</div>
                  <div className="text-xs text-slate-600 font-medium">Distinguished Events</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-600 font-medium">Fresh Botanical Florals</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-slate-900">In-House</div>
                  <div className="text-xs text-slate-600 font-medium">Rigging & AV Tech</div>
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-slate-900">Pan-City</div>
                  <div className="text-xs text-slate-600 font-medium">Hyderabad & Destinations</div>
                </div>
              </div>
            </div>

            {/* Right Featured Image Frame */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/80 shadow-2xl backdrop-blur-xl">
                <img
                  src="/wow/Sangeet%20&%20DJ%20Night%20Concert%20Stag.jpeg"
                  alt="Sangeet & DJ Night Concert Stage Setup"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-4 bg-white/95 backdrop-blur-md border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        Featured Production
                      </span>
                      <h3 className="font-serif text-base font-bold text-slate-900">
                        Sangeet & DJ Night Concert Stage
                      </h3>
                    </div>
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-100">
                      Hyderabad Star Venues
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── SCROLLABLE CONTENT (SLIDES OVER LOCKED HERO WITH GLASS TRANSPARENCY) ───────────────── */}
      <div className="relative z-20 rounded-t-[2.5rem] sm:rounded-t-[4rem] bg-white/40 shadow-[0_-25px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl border-t border-white/80 ring-1 ring-slate-900/5">
        {/* ───────────────── OCCASION THEMES SECTION ───────────────── */}
        <section id="themes" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Event Catalog
                </span>
                <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-4xl">
                  Curated Occasions & Decor Styles
                </h2>
                <p className="mt-1 text-sm text-slate-700">
                  Filter through our specialized setups crafted for Telugu weddings, corporate conferences, and family rituals.
                </p>
              </div>

              {/* Clean Category Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: 'all', label: 'All Core Events' },
                  { key: 'wedding', label: '💍 Complete Wedding' },
                  { key: 'housewarming', label: '🪔 Housewarming (Gruhapravesam)' },
                  { key: 'birthday', label: '🎂 Birthdays & Milestones' },
                  { key: 'traditional', label: '🌸 Half-Saree & Sreemantham' },
                  { key: 'corporate', label: '🏢 Corporate Conclaves' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedCategory(tab.key)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                      selectedCategory === tab.key
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'border border-white/60 bg-white/75 text-slate-700 hover:bg-white backdrop-blur-md'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean Grid of Cards */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredThemes.map((theme) => (
                <div
                  key={theme.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/80 bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-blue-300 hover:bg-white/95 hover:shadow-2xl"
                >
                  <div>
                    {/* Clean Visual Frame */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <img
                        src={theme.image}
                        alt={theme.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3 rounded-md bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                        {theme.occasionName}
                      </div>
                      {theme.badge && (
                        <div className="absolute right-3 top-3 rounded-md bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white shadow-sm">
                          {theme.badge}
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                        {theme.tagline}
                      </div>
                      <h3 className="mt-1 font-serif text-xl font-bold text-slate-900">
                        {theme.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2">
                        {theme.shortDesc}
                      </p>

                      <div className="mt-4 space-y-1 border-t border-slate-100/80 pt-3">
                        {theme.highlights.slice(0, 2).map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                            <span className="font-bold text-blue-600">✓</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100/80 bg-slate-50/60 p-4">
                    <div>
                      <span className="block text-[10px] uppercase font-semibold text-slate-400">
                        Scope & Design
                      </span>
                      <span className="font-serif text-sm font-bold text-slate-800">
                        Custom End-to-End Setup
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedThemeModal(theme)}
                        className="rounded-lg border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-white"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleWhatsAppQuote(theme.title)}
                        className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── PRODUCTION SERVICES (LIGHT BENTO) ───────────────── */}
        <section id="services" className="border-y border-white/50 bg-white/30 backdrop-blur-md py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Comprehensive Production
              </span>
              <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-4xl">
                End-to-End Infrastructure & Execution
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                We own and manage our complete inventory of metal truss rigs, 3D theme fabrication, intelligent lighting consoles, audio systems, and fresh flower supply chains.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {corporateServices.map((svc, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/80 bg-white/80 backdrop-blur-xl p-6 shadow-md transition hover:border-blue-200 hover:bg-white/95 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl border border-blue-100">
                    {svc.icon}
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-slate-900">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {svc.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {svc.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── PRODUCTION PACKAGES ───────────────── */}
        <section id="packages" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Production Tiers
              </span>
              <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-4xl">
                Curated Event Decor Packages
              </h2>
              <p className="mt-2 text-sm text-slate-700">
                Comprehensive all-inclusive packages tailored to venue scale. Includes fabrication, structural rigging, fresh florals, ambient lighting, and dedicated on-site event directors.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {corporatePackages.map((pkg, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col justify-between rounded-2xl p-7 backdrop-blur-xl transition-all ${
                    pkg.popular
                      ? 'border-2 border-blue-600 bg-white/90 shadow-2xl lg:-translate-y-2'
                      : 'border border-white/80 bg-white/80 shadow-md hover:bg-white/90'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      Most Popular Choice
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {pkg.tag}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-slate-900">
                      {pkg.name}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-slate-500">
                      {pkg.subtitle}
                    </p>

                    <div className="mt-6 space-y-2.5 border-t border-slate-100/80 pt-5">
                      {pkg.features.map((f, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <span className="font-bold text-blue-600">✓</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleWhatsAppQuote(pkg.name)}
                    className={`mt-8 w-full rounded-lg py-3 text-xs font-bold uppercase tracking-wider transition ${
                      pkg.popular
                        ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                        : 'border border-slate-300 bg-white/90 text-slate-800 hover:bg-white'
                    }`}
                  >
                    Inquire Package on WhatsApp
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── CORPORATE ESTIMATOR & CALCULATOR ───────────────── */}
        <section id="calculator" className="border-t border-white/50 bg-white/30 backdrop-blur-md py-16 md:py-24">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/80 bg-white/85 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                  Instant Estimate Tool
                </span>
                <h2 className="mt-1 font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
                  Event Decor & Production Calculator
                </h2>
              </div>
              <p className="max-w-sm text-xs text-slate-600">
                Select your parameters below to generate a tailored estimate and check slot availability instantly on WhatsApp.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  value={calcName}
                  onChange={(e) => setCalcName(e.target.value)}
                  placeholder="e.g. Sravya Reddy / Tech Corp Ltd"
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Event Date
                </label>
                <input
                  type="date"
                  value={calcDate}
                  onChange={(e) => setCalcDate(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Occasion Type
                </label>
                <select
                  value={calcEventType}
                  onChange={(e) => setCalcEventType(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Complete End-to-End Wedding (Pelli)">Complete End-to-End Wedding (Pelli)</option>
                  <option value="Housewarming (Gruhapravesam) & Sacred Homam">Housewarming (Gruhapravesam) & Sacred Homam</option>
                  <option value="Grand Birthday & Kids Milestone Theme">Grand Birthday & Kids Milestone Theme</option>
                  <option value="Half-Saree (Langa Voni) & Sreemantham Ceremony">Half-Saree (Langa Voni) & Sreemantham Ceremony</option>
                  <option value="Haldi, Mehendi & Sangeet Production">Haldi, Mehendi & Sangeet Production</option>
                  <option value="Corporate Conclave, Summit & Product Launch">Corporate Conclave, Summit & Product Launch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Location in Hyderabad
                </label>
                <select
                  value={calcLocation}
                  onChange={(e) => setCalcLocation(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  {hyderabadVenues.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold">Venue:</span>
                  <select
                    value={calcVenueType}
                    onChange={(e) => setCalcVenueType(e.target.value)}
                    className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-900 focus:outline-none"
                  >
                    <option value="Convention Center / Star Hotel">Convention Center / Hotel</option>
                    <option value="Open Lawn / Farmhouse / Resort">Open Lawn / Resort</option>
                    <option value="Home / Backyard / Terrace">Home / Backyard</option>
                    <option value="Apartment Clubhouse">Apartment Clubhouse</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-semibold">Guests:</span>
                  <select
                    value={calcGuestCount}
                    onChange={(e) => setCalcGuestCount(e.target.value)}
                    className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-900 focus:outline-none"
                  >
                    <option value="50 - 150 Guests (Intimate)">50 - 150 (Intimate)</option>
                    <option value="150 - 350 Guests (Medium)">150 - 350 (Medium)</option>
                    <option value="350 - 1000+ Guests (Grand)">350 - 1000+ (Grand)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() => handleWhatsAppQuote()}
                className="w-full sm:w-auto rounded-lg bg-blue-600 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
              >
                Get WhatsApp Quote ↗
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ───────────────── THEME DETAILS MODAL ───────────────── */}
      {selectedThemeModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-700 border border-blue-100">
                  {selectedThemeModal.occasionName}
                </span>
                <h3 className="mt-2 font-serif text-2xl font-bold text-slate-900">
                  {selectedThemeModal.title}
                </h3>
                <p className="text-xs font-medium text-blue-600">
                  {selectedThemeModal.tagline}
                </p>
              </div>
              <button
                onClick={() => setSelectedThemeModal(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200">
              <img
                src={selectedThemeModal.image}
                alt={selectedThemeModal.title}
                className="h-full w-full object-cover"
              />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-600">
              {selectedThemeModal.fullDesc}
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Setup Inclusions:
              </div>
              <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {selectedThemeModal.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-800">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  Custom Quotation
                </span>
                <div className="font-serif text-sm font-bold text-slate-800">
                  Tailored to Venue & Scale
                </div>
              </div>
              <button
                onClick={() => {
                  handleWhatsAppQuote(selectedThemeModal.title)
                  setSelectedThemeModal(null)
                }}
                className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-blue-700"
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
          href="tel:+919010995180"
          className="group flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xl border border-slate-200 transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:text-blue-600 active:scale-95"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs font-normal">
            📞
          </span>
          <span className="hidden sm:inline">Call +91 90109 95180</span>
          <span className="sm:hidden">Call</span>
        </a>

        <button
          onClick={() => handleWhatsAppQuote()}
          className="group flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-xs font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] active:scale-95"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white text-sm">
            💬
          </span>
          <span>WhatsApp Chat</span>
        </button>
      </div>
    </main>
  )
}