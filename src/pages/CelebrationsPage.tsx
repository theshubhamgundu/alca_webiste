import { useState, useMemo } from 'react'

interface CelebrationTheme {
  id: string
  category: 'wedding' | 'pre-wedding' | 'birthday' | 'milestone' | 'traditional'
  title: string
  tagline: string
  occasionName: string
  badge?: string
  shortDesc: string
  fullDesc: string
  highlights: string[]
  idealFor: string
  image: string
  priceEst: string
}

const themesList: CelebrationTheme[] = [
  {
    id: 'mandapam',
    category: 'wedding',
    title: 'Royal Mandapam & Wedding Stage',
    tagline: 'Temple Architecture & Sacred Floral Canopies',
    occasionName: 'Pelli / Main Wedding Muhurtham',
    badge: 'Signature Grandeur',
    shortDesc: 'Handcrafted temple pillars, fresh marigold & jasmine ceilings, brass urlis, and warm ambient stage lighting.',
    fullDesc:
      'Engineered for the sanctity and grandeur of Telugu and South Indian weddings. Features customized traditional temple pillars, lush South Indian floral chandeliers with fresh Bangalore marigolds and tuberose (nandivardhanam), auspicious kalasam backdrops, and seamless 4K cinematography lighting.',
    highlights: [
      'Authentic Temple Arch & Pillar Mandapam',
      'Fresh Jasmine, Rose & Marigold Floral Ceiling',
      'Sacred Homa Kundam & Seating Arrangements',
      'Grand 40ft Stage Backdrop & Warm Mandap Lighting',
      'Red Carpet Walk-in Entrance Arch',
    ],
    idealFor: 'Grand Weddings, Convention Centers & Resorts',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85',
    priceEst: '₹85,000 – ₹2,50,000+',
  },
  {
    id: 'haldi-pellikuthuru',
    category: 'pre-wedding',
    title: 'Vibrant Haldi & Pellikuthuru Setups',
    tagline: 'Marigold Drops, Floral Urli Tubs & Quirky Props',
    occasionName: 'Haldi & Mangala Snanam',
    badge: 'Most Popular',
    shortDesc: 'Bright yellow marigold drapes, engraved brass urli seating, flower shower baskets, and photo corners.',
    fullDesc:
      'A joyful explosion of auspicious yellows and oranges. Includes traditional engraved brass water tubs (urli) for the bride and groom, cascading marigold curtains, traditional cane baskets filled with rose petals for flower showers, and quirky Telugu signage photobooths.',
    highlights: [
      'Royal Brass Urli / Tub for Haldi Snanam',
      'Cascading Genda Phool (Marigold) Backdrops',
      'Fresh Rose Petal Baskets for Floral Showers',
      'Quirky Telugu Photobooth with Traditional Props',
      'Waterproof Stage Flooring & Easy Cleanup',
    ],
    idealFor: 'Home Backyards, Terraces & Resort Lawns',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    priceEst: '₹25,000 – ₹65,000',
  },
  {
    id: 'sangeet-concert',
    category: 'pre-wedding',
    title: 'Sangeet & DJ Night Concert Stage',
    tagline: 'High-Energy Truss Lighting, Cold Pyro & LED Walls',
    occasionName: 'Sangeet & Cocktail Night',
    badge: 'High Octane',
    shortDesc: 'Concert-grade sound, dynamic beam truss lighting, LED visual wall, glossy dance floor & cold sparklers.',
    fullDesc:
      'Transform your sangeet into a Bollywood concert. Features massive P3 LED digital display backdrops, synchronized intelligent moving-head lighting, safe indoor cold pyro sparklers for couple entries, fog machines, and a seamless high-gloss acrylic dance floor.',
    highlights: [
      'P3 HD LED Video Wall & Visual VJ Loops',
      'Concert Truss with Moving-Head Beam Lights',
      'Cold Pyro Sparklers & Low-Lying Heavy Fog',
      'Glossy Dance Floor & Customized Stage Wrapping',
      'Professional Line-Array Sound System Setup',
    ],
    idealFor: 'Hotel Ballrooms, Resorts & Banquet Stages',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=85',
    priceEst: '₹60,000 – ₹1,80,000',
  },
  {
    id: 'reception-stage',
    category: 'wedding',
    title: 'Grand Reception & Fairy Light Tunnel',
    tagline: 'Luxury Chandeliers, Pastel Florals & Royal Thrones',
    occasionName: 'Wedding Reception',
    badge: 'Red Carpet',
    shortDesc: 'Massive floral backdrop, imperial sofa setup, fairy light walkthrough tunnel, and sparkling chandeliers.',
    fullDesc:
      'Elegant, opulent, and breathtakingly photogenic. Tailored for grand evening receptions featuring lush English pastel roses, hydrangeas, crystal chandeliers, royal bride & groom throne seating, and a magical 60ft fairy-light tunnel entrance.',
    highlights: [
      '60ft Starlight & Floral Walk-in Tunnel',
      'Lush Exotic Florals (Roses, Orchids, Hydrangeas)',
      'Royal Velvet Couch & Stage Furniture',
      'Crystal Chandelier Ceiling Suspensions',
      'Dedicated Stage Portrait Photography Lighting',
    ],
    idealFor: 'Grand Convention Centers & Star Hotel Lawns',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    priceEst: '₹75,000 – ₹2,20,000',
  },
  {
    id: 'half-saree',
    category: 'milestone',
    title: 'Half-Saree / Langa Voni Ceremony',
    tagline: 'Traditional Floral Swings & South Indian Heritage',
    occasionName: 'Langa Voni & Dhoti Function',
    badge: 'Teen Milestone',
    shortDesc: 'Ornate floral wooden swing (jhoola), brass diya pillars, jasmine floral arches, and sweet dessert tables.',
    fullDesc:
      'A heartfelt celebration of tradition and coming-of-age. Features an authentic carved wooden swing decorated with fresh flowers, traditional South Indian umbrella entrances, brass deepam pillars, and customized name backdrops.',
    highlights: [
      'Carved Wooden Swing (Jhoola) with Floral Vines',
      'Traditional South Indian Silk Umbrella Entry',
      'Brass Deepam Stands & Floral Rangoli Borders',
      'Customized Name Cutout & 3D Stage Elements',
    ],
    idealFor: 'Banquets, Community Halls & Home Celebrations',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    priceEst: '₹30,000 – ₹75,000',
  },
  {
    id: 'baby-shower',
    category: 'milestone',
    title: 'Sreemantham & Cradle Ceremony (Barasala)',
    tagline: 'Pastel Floral Nests & Traditional Wooden Cradles',
    occasionName: 'Baby Shower & Naming Ceremony',
    badge: 'Warm & Divine',
    shortDesc: 'Pastel organic balloon arches, fresh baby’s breath, decorated brass cradle, and comfortable seating.',
    fullDesc:
      'Gentle, soothing, and joyous celebrations for mother and newborn. Features decorated floral swings for Sreemantham, authentic silver/brass baby cradles with flower garlands for Barasala, and cute pastel cloud balloon installations.',
    highlights: [
      'Decorated Brass/Silver Cradle (Uyyala) Setup',
      'Pastel Floral Arch with Pampas Grass & Baby’s Breath',
      'Comfortable Seated Floral Swing for Mother',
      'Cute Photo Wall & Milestone Memory Board',
    ],
    idealFor: 'Home Living Rooms, Clubhouses & Banquets',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    priceEst: '₹20,000 – ₹55,000',
  },
  {
    id: 'theme-birthday',
    category: 'birthday',
    title: 'Magical 3D Theme Birthday Worlds',
    tagline: 'Jungle Safari, Fairytale Princess, Space & Candy Land',
    occasionName: '1st Birthdays & Kids Milestones',
    badge: 'Kids Favourite',
    shortDesc: 'Multi-layer 3D character cutouts, organic balloon garlands, marquee milestone light-up numbers & cake table.',
    fullDesc:
      'Turn your child’s imagination into reality. Immersive customized 3D backdrops (Jungle Safari, Little Prince/Princess, Cocomelon, Space Astronaut, Superhero), giant LED light-up numbers, balloon arches, and custom sweet-table cake pedestals.',
    highlights: [
      'Custom 3D Theme Character Cutouts & Arches',
      'Organic 100% Biodegradable Balloon Styling',
      'Giant 3ft Illuminated LED Marquee Number (1, 2, 5...)',
      'Matching Cake Table Pedestals & Welcome Standee',
      'Tattoo Artist, Magic Show & Mascot Coordination',
    ],
    idealFor: 'Apartment Clubhouses, Banquets & Farmhouses',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=85',
    priceEst: '₹18,000 – ₹50,000',
  },
  {
    id: 'gruhapravesam',
    category: 'traditional',
    title: 'Gruhapravesam & Satyanarayana Pooja',
    tagline: 'Sacred Mango Leaves, Temple Thoranam & Urli Rangoli',
    occasionName: 'Housewarming & Vratam Rituals',
    badge: 'Purely Traditional',
    shortDesc: 'Fresh mango leaf door thoranam, sacred pooja stage backdrop, floor flower rangoli, and brass lamp aisles.',
    fullDesc:
      'Auspicious and serene housewarming decor grounded in Vedic traditions. Includes fresh mango leaf and marigold entrance thoranam, sacred pooja stage background with silk curtains and brass bells, and floating flower urlis.',
    highlights: [
      'Fresh Mango Leaf & Marigold Main Door Thoranam',
      'Traditional Pooja Backdrop with Kalasam Setup',
      'Intricate Flower Petal Rangoli at Entrance',
      'Brass Deepam Stands & Auspicious Banana Stems',
    ],
    idealFor: 'New Apartments, Villas & Independent Houses',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85',
    priceEst: '₹12,000 – ₹35,000',
  },
]

const productionServices = [
  {
    icon: '🏛️',
    title: 'Mandap Architecture & Stage Fabrication',
    desc: 'Custom wooden, fiber, and metal framework built to exact structural dimensions for grand mandaps and reception stages.',
    tags: ['Temple Pillars', '3D Fabrication', 'Truss Rigging'],
  },
  {
    icon: '🌺',
    title: 'Fresh Floral Sculpting & Procurement',
    desc: 'Daily fresh flower sourcing from Bangalore & local markets—marigolds, carnations, roses, orchids, and traditional lotus buds.',
    tags: ['Fresh Flowers', 'Flower Chandeliers', 'Floral Walls'],
  },
  {
    icon: '💡',
    title: 'Theatrical Lighting & Concert Effects',
    desc: 'Sharpy moving heads, warm par cans, ambient uplighting, fairy light canopies, and programmed mood lighting.',
    tags: ['Moving Heads', 'Fairy Lights', 'Ambient Glow'],
  },
  {
    icon: '✨',
    title: 'Cold Pyro & Atmospheric Entry Effects',
    desc: '100% smokeless & indoor-safe cold spark fountains, low-lying heavy cloud fog, CO2 jets, and confetti cannons for grand entries.',
    tags: ['Cold Pyro', 'Dry Ice Fog', 'Confetti Blasters'],
  },
  {
    icon: '📸',
    title: 'Candid Photography & 4K Drone Film',
    desc: 'Cinematic wedding films, traditional photography, drone aerial coverage, live LED streaming, and instant photo booths.',
    tags: ['4K Cinema', 'Drone Footage', 'Instant Photobooth'],
  },
  {
    icon: '🎶',
    title: 'Sound, DJ & Traditional Music Troupe',
    desc: 'High-fidelity audio systems, club DJs, traditional Nadaswaram/Shehnai players, and interactive emcees.',
    tags: ['JBL Sound', 'Wedding DJ', 'Nadaswaram Troupes'],
  },
]

const celebrationPackages = [
  {
    name: 'Aarambham (Home Rituals)',
    tag: 'Haldi / Pooja / Cradle / Gruhapravesam',
    popular: false,
    price: '₹18,000',
    features: [
      'Traditional Floral & Fabric Backdrop (10x8 ft)',
      'Fresh Marigold & Jasmine Thoranam Framing',
      'Engraved Brass Urli / Wooden Swing Setup',
      'Entrance Welcome Board with Fresh Florals',
      'Warm LED Spotlights & Floor Flower Rangoli',
      'Dedicated Setup & Takedown Crew',
    ],
  },
  {
    name: 'Sankalpam (Grand Celebrations)',
    tag: 'Sangeet / Half-Saree / Milestone Birthdays',
    popular: true,
    price: '₹55,000',
    features: [
      'Grand Stage Decor with 3D Props & Florals (20x10 ft)',
      'Full Banquet Entrance Floral Arch / Tunnel',
      'Couple Entry Cold Pyro Sparklers (4 units)',
      'Low-Lying Heavy Cloud Fog Machine for Dance',
      'Ambient LED Uplighting Across Entire Venue',
      'Cake Table / Seating Furniture Styling',
      'On-Site Event Coordinator Throughout Function',
    ],
  },
  {
    name: 'Vaibhavam (Royal Mandap Suite)',
    tag: 'Complete Wedding & Reception Suite',
    popular: false,
    price: '₹1,45,000',
    features: [
      'Full Scale Temple Pillar Mandapam with Fresh Flower Ceiling',
      'Grand 30ft Reception Backdrop with Crystal Chandeliers',
      '60ft Starlight & Floral Walkway Entrance Tunnel',
      'Cold Pyro & Confetti Blaster Package (8 units)',
      'Intelligent Moving-Head Stage Lighting System',
      'Royal Throne Chairs & VIP Lounge Furniture',
      'Complimentary Photobooth with Custom Props',
      'Dedicated Senior Production Manager & Tech Crew',
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
  'Vijayawada, Warangal & Outstation Telangana/AP',
]

const celebrationFaqs = [
  {
    q: 'How many days in advance should we book event decor in Hyderabad?',
    a: 'For weddings and auspicious Muhurtham dates, we recommend booking 2 to 4 months in advance. For intimate home rituals, haldi, and birthdays, 1 to 2 weeks notice is usually sufficient depending on slot availability.',
  },
  {
    q: 'Do you provide customizable decor based on our theme or Pinterest references?',
    a: 'Yes, 100%! We customize color palettes, floral choices, structural dimensions, and theme props according to your venue size, budget, and personal Pinterest/Instagram inspiration.',
  },
  {
    q: 'Are your cold pyro sparklers safe for indoor banquet halls?',
    a: 'Yes, absolutely. We use certified indoor cold-pyrotechnics that produce zero smoke, no toxic odor, and low-temperature sparks that are completely safe around fabrics, children, and indoor ceilings.',
  },
  {
    q: 'Do you handle destination weddings outside Hyderabad?',
    a: 'Yes, our team regularly travels across Telangana, Andhra Pradesh (Vijayawada, Guntur, Vizag), and destination resort properties with our full fabrication and decor inventory.',
  },
]

export default function CelebrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeModalTheme, setActiveModalTheme] = useState<CelebrationTheme | null>(null)
  const [activeTabSection, setActiveTabSection] = useState<'catalog' | 'services' | 'packages' | 'venues'>('catalog')

  // Quote Calculator State
  const [calcName, setCalcName] = useState('')
  const [calcDate, setCalcDate] = useState('')
  const [calcEventType, setCalcEventType] = useState('Grand Telugu Wedding Mandap')
  const [calcVenueType, setCalcVenueType] = useState('Convention Center / Star Hotel')
  const [calcLocation, setCalcLocation] = useState('Banjara Hills & Jubilee Hills Venues')
  const [calcGuestCount, setCalcGuestCount] = useState('300 - 800 Guests (Grand)')

  const filteredThemes = useMemo(() => {
    if (selectedCategory === 'all') return themesList
    return themesList.filter((t) => t.category === selectedCategory)
  }, [selectedCategory])

  const handleWhatsAppQuote = (customTheme?: string) => {
    const event = customTheme || calcEventType
    const nameStr = calcName ? `Name: *${encodeURIComponent(calcName)}*%0A` : ''
    const dateStr = calcDate ? `Date: *${encodeURIComponent(calcDate)}*%0A` : ''
    const text = `✨ *Hi WOW Magical Celebrations (ALCA)!*%0A${nameStr}I would like to get a decor & event quote for Hyderabad.%0A%0A🎉 *Occasion:* ${encodeURIComponent(event)}%0A🏛️ *Venue Style:* ${encodeURIComponent(calcVenueType)}%0A📍 *Location:* ${encodeURIComponent(calcLocation)}%0A👥 *Guest Scale:* ${encodeURIComponent(calcGuestCount)}%0A${dateStr}%0APlease share portfolio pictures, availability, and estimate. Thank you! ✨`
    window.open(`https://wa.me/919010995180?text=${text}`, '_blank')
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAF6F2] text-[#201818] pb-24 lg:pb-0 selection:bg-[#8B1A1A] selection:text-white">
      {/* ───────────────── TOP NAVIGATION ───────────────── */}
      <nav className="fixed left-1/2 top-3 z-50 flex w-[calc(100%-20px)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border border-white/15 bg-[#201818]/92 px-3.5 py-2 text-white shadow-2xl backdrop-blur-xl md:px-6 md:py-2.5">
        <a href="/" className="flex items-center gap-2.5 group">
          <img
            src="/images/alca-logo-1.webp"
            alt="ALCA Logo"
            className="h-8 w-8 rounded-full object-cover shadow-sm ring-2 ring-[#D7A15D]/40 transition group-hover:scale-105"
          />
          <div>
            <div className="font-serif text-base font-bold tracking-wider text-white">
              WOW<span className="text-[#D7A15D]">.</span>
              <span className="ml-1 text-[10px] font-sans font-normal uppercase tracking-widest text-[#D7A15D]">
                Celebrations
              </span>
            </div>
            <div className="text-[8px] uppercase tracking-[0.2em] text-white/50">
              Hyderabad Events & Decor
            </div>
          </div>
        </a>

        {/* Quick Nav Anchors */}
        <div className="hidden items-center gap-5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70 lg:flex">
          <a href="#hub" onClick={() => setActiveTabSection('catalog')} className="transition hover:text-[#D7A15D]">
            Themes
          </a>
          <a href="#hub" onClick={() => setActiveTabSection('services')} className="transition hover:text-[#D7A15D]">
            Production
          </a>
          <a href="#hub" onClick={() => setActiveTabSection('packages')} className="transition hover:text-[#D7A15D]">
            Packages
          </a>
          <a href="#hub" onClick={() => setActiveTabSection('venues')} className="transition hover:text-[#D7A15D]">
            Venues
          </a>
          <a href="#calculator" className="transition hover:text-[#D7A15D]">
            Quote Calculator
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleWhatsAppQuote()}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#D7A15D]/40 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D7A15D] transition hover:bg-[#D7A15D] hover:text-[#201818]"
          >
            WhatsApp
          </button>
          <a
            href="tel:+919010995180"
            className="rounded-full bg-gradient-to-r from-[#D7A15D] to-[#C78B3F] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#201818] shadow-md transition hover:scale-105 active:scale-95"
          >
            Call 90109 95180
          </a>
        </div>
      </nav>

      {/* ───────────────── HERO (Compact, High-Energy) ───────────────── */}
      <section className="relative overflow-hidden bg-[#201818] pb-10 pt-20 text-white md:pb-16 md:pt-28">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=2000&q=85"
            alt="Hyderabad Wedding Mandap Decor"
            className="h-full w-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#201818] via-[#201818]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201818] via-transparent to-[#201818]/40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D7A15D]/30 bg-white/5 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D7A15D] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D7A15D] animate-ping" />
              Hyderabad & Telangana Premier Event Designers
            </div>

            <h1 className="mt-4 font-serif text-3xl font-light leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Dream Decors. <span className="italic text-[#D7A15D]">Magical Celebrations.</span>
            </h1>

            <p className="mt-3 max-w-xl text-xs leading-relaxed text-white/75 sm:text-sm md:text-base">
              From grand temple-style Telugu wedding mandaps, vibrant Haldi floral urlis, and Bollywood Sangeet truss stages to 1st birthday fairytale themes and sacred Gruhapravesam setups across Hyderabad.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href="#calculator"
                className="rounded-full bg-gradient-to-r from-[#D7A15D] to-[#C78B3F] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#201818] shadow-lg transition hover:brightness-110 active:scale-95"
              >
                Calculate Event Estimate ↓
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('hub')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/10"
              >
                Browse Decor Themes
              </button>
            </div>
          </div>

          {/* Compact Mini Metric Strip */}
          <div className="mt-8 grid grid-cols-2 gap-2 border-t border-white/10 pt-4 sm:grid-cols-4 sm:gap-3">
            <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D7A15D]">500+ Events</div>
              <div className="text-[9px] uppercase tracking-wider text-white/60">Weddings & Milestones</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D7A15D]">100% Fresh Flowers</div>
              <div className="text-[9px] uppercase tracking-wider text-white/60">Daily Bangalore Influx</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D7A15D]">In-House Truss & SFX</div>
              <div className="text-[9px] uppercase tracking-wider text-white/60">Cold Pyro & 3D Sets</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D7A15D]">Pan-Hyderabad</div>
              <div className="text-[9px] uppercase tracking-wider text-white/60">Full Venue Execution</div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── INTERACTIVE QUICK-HUB ───────────────── */}
      <section id="hub" className="mx-auto max-w-6xl px-4 pt-8 md:px-6">
        {/* Sticky-feeling Segmented Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-1.5 rounded-2xl border border-[#8B1A1A]/15 bg-white p-1.5 shadow-sm">
          {[
            { key: 'catalog', label: '🎪 Decor Themes', desc: 'Browse Setups' },
            { key: 'services', label: '✨ Production Services', desc: 'Lighting & SFX' },
            { key: 'packages', label: '💎 Packages & Pricing', desc: 'Transparent' },
            { key: 'venues', label: '📍 Hyderabad Venues', desc: 'Coverage' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTabSection(tab.key as any)}
              className={`flex-shrink-0 rounded-xl px-4 py-2 text-left transition-all duration-200 ${
                activeTabSection === tab.key
                  ? 'bg-[#8B1A1A] text-white shadow-md'
                  : 'text-[#554749] hover:bg-neutral-100'
              }`}
            >
              <div className="text-xs font-bold leading-none">{tab.label}</div>
            </button>
          ))}
        </div>

        {/* ────────────── TAB 1: DECOR THEMES ────────────── */}
        {activeTabSection === 'catalog' && (
          <div className="mt-6 animate-fadeIn">
            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
              {[
                { key: 'all', label: 'All Occasions' },
                { key: 'wedding', label: '💍 Telugu Mandaps & Reception' },
                { key: 'pre-wedding', label: '🌼 Haldi & Sangeet Nights' },
                { key: 'milestone', label: '🌸 Half-Saree & Baby Shower' },
                { key: 'birthday', label: '🎂 3D Theme Birthdays' },
                { key: 'traditional', label: '🪔 Gruhapravesam & Pooja' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition ${
                    selectedCategory === cat.key
                      ? 'bg-[#201818] text-white shadow-sm'
                      : 'border border-[#8B1A1A]/20 bg-white text-[#44383A] hover:bg-[#8B1A1A]/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Compact Grid of Themes */}
            <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredThemes.map((theme) => (
                <div
                  key={theme.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#8B1A1A]/15 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-[#8B1A1A]/40 hover:shadow-lg"
                >
                  <div>
                    {/* Portrait Framed Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100">
                      <img
                        src={theme.image}
                        alt={theme.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-2.5 top-2.5 rounded-md bg-[#201818]/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm shadow">
                        {theme.occasionName}
                      </div>
                      {theme.badge && (
                        <div className="absolute right-2.5 top-2.5 rounded-md bg-[#8B1A1A] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                          {theme.badge}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="mt-3">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B1A1A]">
                        {theme.tagline}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#201818] leading-snug">
                        {theme.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#685D5D]">
                        {theme.shortDesc}
                      </p>

                      {/* Mini Highlights */}
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {theme.highlights.slice(0, 2).map((h, i) => (
                          <span
                            key={i}
                            className="rounded bg-[#FAF0E6] px-2 py-0.5 text-[10px] font-medium text-[#8B1A1A]"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-3.5 flex items-center justify-between border-t border-neutral-100 pt-2.5">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-neutral-400">
                        Starting Estimate
                      </span>
                      <span className="font-serif text-sm font-bold text-[#8B1A1A]">
                        {theme.priceEst}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveModalTheme(theme)}
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-[11px] font-semibold text-[#201818] transition hover:bg-neutral-100"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleWhatsAppQuote(theme.title)}
                        className="rounded-lg bg-[#8B1A1A] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#6b1414]"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ────────────── TAB 2: PRODUCTION SERVICES ────────────── */}
        {activeTabSection === 'services' && (
          <div className="mt-6 animate-fadeIn">
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {productionServices.map((svc, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#8B1A1A]/15 bg-white p-4 shadow-sm transition-all hover:border-[#8B1A1A]/40 hover:shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF0E6] text-xl">
                      {svc.icon}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#201818]">
                      {svc.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#685D5D]">
                    {svc.desc}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {svc.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-neutral-100 px-2 py-0.5 text-[9px] font-medium text-[#8B1A1A]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ────────────── TAB 3: PACKAGES & PRICING ────────────── */}
        {activeTabSection === 'packages' && (
          <div className="mt-6 animate-fadeIn">
            <div className="grid gap-4 lg:grid-cols-3">
              {celebrationPackages.map((pkg, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col justify-between rounded-2xl p-5 transition-all ${
                    pkg.popular
                      ? 'border-2 border-[#8B1A1A] bg-white shadow-xl'
                      : 'border border-[#8B1A1A]/15 bg-white shadow-sm'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#8B1A1A] px-3 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow">
                      Most Chosen by Families
                    </div>
                  )}

                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#8B1A1A]">
                      {pkg.tag}
                    </span>
                    <h3 className="mt-0.5 font-serif text-xl font-bold text-[#201818]">
                      {pkg.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-serif text-3xl font-bold text-[#8B1A1A]">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-neutral-400">/ starting</span>
                    </div>

                    <div className="mt-4 space-y-1.5 border-t border-neutral-100 pt-3">
                      {pkg.features.map((f, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#44383A]">
                          <span className="font-bold text-[#8B1A1A]">✓</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleWhatsAppQuote(pkg.name)}
                    className={`mt-5 w-full rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                      pkg.popular
                        ? 'bg-[#8B1A1A] text-white shadow-md hover:bg-[#6b1414]'
                        : 'border border-[#201818] text-[#201818] hover:bg-[#201818] hover:text-white'
                    }`}
                  >
                    Get Package Quote on WhatsApp
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ────────────── TAB 4: HYDERABAD VENUES ────────────── */}
        {activeTabSection === 'venues' && (
          <div className="mt-6 rounded-2xl border border-[#8B1A1A]/15 bg-white p-5 shadow-sm animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#201818]">
                  Event Decor Across Hyderabad & Destination Venues
                </h3>
                <p className="text-xs text-[#685D5D]">
                  Our fabrication trucks and setup crews operate across all major star hotels, convention centers, and home communities.
                </p>
              </div>
              <a
                href="tel:9010995180"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#8B1A1A] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#6b1414]"
              >
                Call for Venue Recce
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {hyderabadVenues.map((loc, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#8B1A1A]/20 bg-[#FAF6F2] px-3 py-1.5 text-xs font-medium text-[#201818]"
                >
                  <span className="text-[#8B1A1A]">📍</span>
                  {loc}
                </span>
              ))}
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3 border-t border-neutral-100 pt-4 text-xs text-[#554749]">
              <div className="rounded-lg bg-neutral-50 p-2.5">
                <strong className="block text-[#201818]">Site Recce & 3D Pre-Vis:</strong> In-person measurements and 3D visual preview before fabrication.
              </div>
              <div className="rounded-lg bg-neutral-50 p-2.5">
                <strong className="block text-[#201818]">Punctual Timelines:</strong> Venue handed over 3 hours before guest arrival guaranteed.
              </div>
              <div className="rounded-lg bg-neutral-50 p-2.5">
                <strong className="block text-[#201818]">Zero-Hassle Takedown:</strong> Clean disassembly and waste removal included.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ───────────────── INSTANT EVENT QUOTE CALCULATOR ───────────────── */}
      <section id="calculator" className="mx-auto max-w-6xl px-4 pt-10 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-[#201818] p-6 text-white shadow-2xl md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D7A15D]">
                Instant WhatsApp Quote
              </span>
              <h2 className="mt-1 font-serif text-2xl font-light sm:text-3xl">
                Event Decor & Production Estimator
              </h2>
            </div>
            <p className="max-w-md text-xs text-white/70">
              Select your celebration details below to immediately trigger an estimate and check date availability directly on WhatsApp.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#D7A15D]">
                Your Name / Family Name
              </label>
              <input
                type="text"
                value={calcName}
                onChange={(e) => setCalcName(e.target.value)}
                placeholder="e.g. Rao Family / Rajesh"
                className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#D7A15D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#D7A15D]">
                Event Date
              </label>
              <input
                type="date"
                value={calcDate}
                onChange={(e) => setCalcDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#D7A15D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#D7A15D]">
                Celebration Occasion
              </label>
              <select
                value={calcEventType}
                onChange={(e) => setCalcEventType(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-[#2A1E1E] px-3 py-2 text-xs text-white focus:border-[#D7A15D] focus:outline-none"
              >
                <option value="Grand Telugu Wedding Mandap">Grand Telugu Wedding Mandap</option>
                <option value="Vibrant Haldi & Pellikuthuru Setup">Vibrant Haldi & Pellikuthuru Setup</option>
                <option value="Sangeet & DJ Night Concert Stage">Sangeet & DJ Night Concert Stage</option>
                <option value="Wedding Reception & Fairy Tunnel">Wedding Reception & Fairy Tunnel</option>
                <option value="Half-Saree / Langa Voni Ceremony">Half-Saree / Langa Voni Ceremony</option>
                <option value="Sreemantham / Baby Shower">Sreemantham / Baby Shower</option>
                <option value="3D Kids Theme Birthday Party">3D Kids Theme Birthday Party</option>
                <option value="Gruhapravesam & Pooja Ritual">Gruhapravesam & Pooja Ritual</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#D7A15D]">
                Venue Area in Hyderabad
              </label>
              <select
                value={calcLocation}
                onChange={(e) => setCalcLocation(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-[#2A1E1E] px-3 py-2 text-xs text-white focus:border-[#D7A15D] focus:outline-none"
              >
                {hyderabadVenues.map((loc, i) => (
                  <option key={i} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/75">
              <div className="flex items-center gap-1.5">
                <span>🏛️ Venue:</span>
                <select
                  value={calcVenueType}
                  onChange={(e) => setCalcVenueType(e.target.value)}
                  className="rounded-lg border border-white/15 bg-[#2A1E1E] px-2.5 py-1 text-xs text-white focus:outline-none"
                >
                  <option value="Home / Backyard / Terrace">Home / Backyard / Terrace</option>
                  <option value="Apartment Clubhouse / Community Hall">Apartment Clubhouse</option>
                  <option value="Convention Center / Star Hotel">Convention Center / Star Hotel</option>
                  <option value="Open Lawn / Farmhouse / Resort">Open Lawn / Resort</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span>👥 Guests:</span>
                <select
                  value={calcGuestCount}
                  onChange={(e) => setCalcGuestCount(e.target.value)}
                  className="rounded-lg border border-white/15 bg-[#2A1E1E] px-2.5 py-1 text-xs text-white focus:outline-none"
                >
                  <option value="50 - 150 Guests (Intimate)">50 - 150 (Intimate)</option>
                  <option value="150 - 350 Guests (Medium)">150 - 350 (Medium)</option>
                  <option value="350 - 1000+ Guests (Grand)">350 - 1000+ (Grand)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleWhatsAppQuote()}
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#D7A15D] to-[#C78B3F] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#201818] shadow-lg transition hover:scale-105 active:scale-95"
              >
                Send Quote Request ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── FAQS (Compact Accordion) ───────────────── */}
      <section className="mx-auto max-w-4xl px-4 pt-10 pb-6 md:px-6">
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8B1A1A]">
            Planning Questions?
          </span>
          <h2 className="mt-1 font-serif text-2xl font-light text-[#201818]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-5 space-y-2.5">
          {celebrationFaqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-[#8B1A1A]/15 bg-white p-3.5 shadow-sm transition open:shadow-md"
            >
              <summary className="flex cursor-pointer items-center justify-between text-xs font-bold text-[#201818]">
                <span>{faq.q}</span>
                <span className="text-sm font-normal text-[#8B1A1A] transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-2 text-xs leading-relaxed text-[#685D5D]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ───────────────── COMPACT THEME DETAILS MODAL ───────────────── */}
      {activeModalTheme && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-4 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-2xl text-[#201818] animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded bg-[#FAF0E6] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#8B1A1A]">
                  {activeModalTheme.occasionName}
                </span>
                <h3 className="mt-1.5 font-serif text-2xl font-bold text-[#201818]">
                  {activeModalTheme.title}
                </h3>
                <p className="text-xs font-medium text-[#8B1A1A]">
                  {activeModalTheme.tagline}
                </p>
              </div>
              <button
                onClick={() => setActiveModalTheme(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 relative aspect-[16/10] max-h-[340px] w-full overflow-hidden rounded-2xl bg-neutral-100">
              <img
                src={activeModalTheme.image}
                alt={activeModalTheme.title}
                className="h-full w-full object-cover"
              />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[#554749]">
              {activeModalTheme.fullDesc}
            </p>

            <div className="mt-4 rounded-xl bg-neutral-50 p-3.5 border border-neutral-100">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Setup Inclusions:
              </div>
              <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {activeModalTheme.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[#201818]">
                    <span className="text-[#8B1A1A] font-bold">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400">
                  Estimated Pricing
                </span>
                <div className="font-serif text-lg font-bold text-[#8B1A1A]">
                  {activeModalTheme.priceEst}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleWhatsAppQuote(activeModalTheme.title)
                    setActiveModalTheme(null)
                  }}
                  className="rounded-xl bg-[#8B1A1A] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-[#6b1414]"
                >
                  Book on WhatsApp ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────── STICKY MOBILE QUICK-ACTION BAR ───────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-white/15 bg-[#201818]/95 px-4 py-2.5 backdrop-blur-md lg:hidden">
        <a
          href="tel:+919010995180"
          className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-white"
        >
          📞 Call
        </a>
        <button
          onClick={() => handleWhatsAppQuote()}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D7A15D] to-[#C78B3F] px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#201818] shadow-md"
        >
          🎉 Instant Event Quote
        </button>
      </div>

      {/* ───────────────── FOOTER (Compact) ───────────────── */}
      <footer className="mt-10 bg-[#1A1212] px-4 py-8 text-white md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-b border-white/10 pb-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2.5">
            <img
              src="/images/alca-logo-1.webp"
              alt="ALCA Logo"
              className="h-8 w-8 rounded-full object-cover ring-1 ring-white/20"
            />
            <div>
              <div className="font-serif text-lg font-bold tracking-wider text-white">
                WOW CELEBRATIONS
              </div>
              <div className="text-[9px] uppercase tracking-widest text-[#D7A15D]">
                Hyderabad Event Decor & Production by ALCA
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[11px] uppercase tracking-wider text-white/70">
            <a href="tel:9010995180" className="hover:text-white">
              +91 90109 95180
            </a>
            <a
              href="https://instagram.com/alca_urs_emerveil_celebrations"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Instagram
            </a>
            <a href="/" className="hover:text-white">
              All ALCA Services
            </a>
          </div>
        </div>

        <div className="mx-auto mt-4 flex max-w-6xl flex-col items-center justify-between gap-2 text-[9px] uppercase tracking-widest text-white/40 sm:flex-row">
          <div>© {new Date().getFullYear()} WOW Magical Celebrations · Hyderabad, Telangana</div>
          <div>Bespoke Wedding Mandaps, Haldi Setups & Theme Productions</div>
        </div>
      </footer>
    </main>
  )
}