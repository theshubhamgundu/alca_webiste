import { useState, useMemo } from 'react'

interface Occasion {
  id: string
  category: 'wedding' | 'pre-wedding' | 'hyderabadi' | 'festive' | 'milestone'
  title: string
  tagline: string
  occasionName: string
  shortDesc: string
  fullDesc: string
  highlights: string[]
  duration: string
  bestFor: string
  image: string
  priceEst: string
  badge?: string
  objectPos?: string
}

const occasionsList: Occasion[] = [
  {
    id: 'muhurtham',
    category: 'wedding',
    title: 'Telugu Muhurtham Bride',
    tagline: 'Kanjeevaram & Temple Radiance',
    occasionName: 'Pelli / Main Muhurtham',
    badge: 'Most Popular',
    objectPos: 'object-[center_12%]',
    shortDesc: '16hr sweatproof HD base, Kanchi silk box pleating, temple jewellery fixing & authentic Poola Jada.',
    fullDesc:
      'Engineered for sacred rituals under mandap heat and 4K cinema cameras. Features a 16-hour sweat-proof matte base, traditional Kanjeevaram box-pleat draping, temple jewellery setting, and classic auspicious kohl-rimmed eyes.',
    highlights: [
      '16hr Sweat & Mandap Proof HD Base',
      'Authentic Kanjeevaram Box Pleat Draping',
      'Fresh Poola Jada / Veni Hair Fixing',
      'Temple Jewellery & Maang Tikka Setting',
      'Early Morning 3:00 AM Slot Available',
    ],
    duration: '2.5 - 3 Hours',
    bestFor: 'Morning Muhurtham & Sacred Pelli Vows',
    image: '/makeup/Telugu%20Muhurtham%20Bride.jpg',
    priceEst: '₹18,000 – ₹28,000',
  },
  {
    id: 'pellikuthuru',
    category: 'pre-wedding',
    title: 'Pellikuthuru & Haldi Glow',
    tagline: 'Floral Vibrance & Turmeric Radiance',
    occasionName: 'Haldi & Mangala Snanam',
    badge: 'Haldi Proof',
    objectPos: 'object-center',
    shortDesc: 'Waterproof golden hour look, fresh floral jewellery setting & textured braids with baby’s breath.',
    fullDesc:
      'A breathable, waterproof, and de-tan resilient golden hour look designed for haldi water splashes and family ceremonies. Completed with fresh floral jewellery styling and sun-kissed cheek tint.',
    highlights: [
      'Waterproof & Turmeric-Resistant Base',
      'Fresh Floral Jewellery Anchoring',
      'Soft Sun-Kissed Peachy Glow',
      'Textured Dutch/French Floral Braids',
    ],
    duration: '2 Hours',
    bestFor: 'Haldi, Mangala Snanam & Pellikuthuru',
    image: '/makeup/Pellikuthuru%20&%20Haldi%20Glow.webp',
    priceEst: '₹12,000 – ₹18,000',
  },
  {
    id: 'sangeet',
    category: 'pre-wedding',
    title: 'Sangeet & Cocktail Night Glam',
    tagline: 'High-Shimmer & Dance-Proof Finish',
    occasionName: 'Sangeet & Cocktail Party',
    badge: 'Stage Glam',
    objectPos: 'object-top',
    shortDesc: 'Stage-ready glitter eyes, Russian volume lashes, sculpted contour & 14hr zero-transfer base.',
    fullDesc:
      'Command the stage with high-octane glam. Ultra-fine metallic shimmer or cut-crease smokey eyes, fluttery Russian volume lashes, sculpted contouring, and transfer-proof glass skin for non-stop dancing.',
    highlights: [
      'Stage-Ready Eye Artistry & Lashes',
      'Zero-Transfer 14hr Base for Dancing',
      'Hollywood Waves / Textured Ponytail',
      'Designer Lehenga / Gown Draping',
    ],
    duration: '2.5 Hours',
    bestFor: 'Sangeet Choreography & Cocktail DJ Nights',
    image: '/makeup/Sangeet%20&%20Cocktail%20Night%20Glam.jpg',
    priceEst: '₹14,000 – ₹22,000',
  },
  {
    id: 'reception',
    category: 'wedding',
    title: 'Grand Reception Elegance',
    tagline: 'Glass Skin & International Polish',
    occasionName: 'Wedding Reception',
    badge: 'Red Carpet',
    objectPos: 'object-[center_10%]',
    shortDesc: 'Luminous strobe glass skin, couture buns or cascade curls, can-can lehenga & trail dupatta draping.',
    fullDesc:
      'Sophisticated, high-fashion radiance tailored for grand reception stages. Features luminous glass skin, neutral tones, custom contouring for stage lighting, and international couture hairstyles.',
    highlights: [
      'Luminous Strobe & Glass-Skin Finish',
      'Couture Hairstyling (Buns / Hollywood Waves)',
      'Can-Can Lehenga & Trail Dupatta Pinning',
      'Custom Lash Mapping & Glossy Nude Palette',
    ],
    duration: '2.5 Hours',
    bestFor: 'Grand Ballroom Receptions & Stage Shoots',
    image: '/makeup/Grand%20Reception%20Elegance.jpg',
    priceEst: '₹16,000 – ₹25,000',
  },
  {
    id: 'nikah',
    category: 'hyderabadi',
    title: 'Royal Hyderabadi Nikah & Walima',
    tagline: 'Nizami Khada Dupatta & Kohled Eyes',
    occasionName: 'Nikah, Walima & Dawat',
    badge: 'Nizami Heritage',
    objectPos: 'object-[center_5%]',
    shortDesc: 'Masterful Hyderabadi Khada Dupatta drape, Passaa/Jhumar fixing, velvet matte HD & Arabian eyes.',
    fullDesc:
      'A tribute to Hyderabad’s iconic bridal royalty. Masterful traditional Khada Dupatta draping, royal passaa/jhumar placement, velvety matte HD complexion, and smoldering kohled eyes with champagne cut-crease.',
    highlights: [
      'Authentic Hyderabadi Khada Dupatta Draping',
      'Passaa, Jhumar & Maatha Patti Precision Fixing',
      'Classic Royal Smoldering Eye Artistry',
      'Long-Wearing Velvet Matte Complexion',
    ],
    duration: '3 Hours',
    bestFor: 'Royal Hyderabadi Nikahs, Walima & Dholak',
    image: '/makeup/Royal%20Hyderabadi%20Nikah%20&%20Walima.jpg',
    priceEst: '₹20,000 – ₹32,000',
  },
  {
    id: 'half-saree',
    category: 'milestone',
    title: 'Half-Saree / Langa Voni',
    tagline: 'Youthful Glow & Traditional Pattu',
    occasionName: 'Langa Voni / Rithu Shudhi',
    badge: 'Teen Milestone',
    objectPos: 'object-[center_10%]',
    shortDesc: 'Lightweight breathable radiant tint, South Indian Langa Voni draping & delicate jasmine veni braids.',
    fullDesc:
      'Tailored for young celebrants stepping into grace. Soft, breathable, age-appropriate radiance that enhances natural youthfulness. Includes South Indian Langa Voni draping and delicate floral hair styling.',
    highlights: [
      'Lightweight Breathable Radiant Tint',
      'South Indian Langa Voni Draping',
      'Delicate Jasmine / Rose Veni Hairstyle',
      'Soft Pastel Shimmer & Tinted Lip Gloss',
    ],
    duration: '1.5 - 2 Hours',
    bestFor: 'Half Saree Ceremonies & Milestone Birthdays',
    image: '/makeup/Half-Saree%20%20Langa%20Voni.jpg',
    priceEst: '₹9,000 – ₹14,000',
  },
  {
    id: 'seemantham',
    category: 'milestone',
    title: 'Seemantham & Baby Shower',
    tagline: 'Maternal Grace & Gentle Organic Skincare',
    occasionName: 'Seemantham / Godh Bharai',
    badge: 'Pregnancy Safe',
    objectPos: 'object-top',
    shortDesc: 'Hypoallergenic & soothing cosmetics, comfortable seated styling, traditional poola jada & saree draping.',
    fullDesc:
      'Created with extra care for expectant mothers using gentle, hypoallergenic, toxin-free cosmetics. Comfortable seated styling experience, soothing skincare preparation, and divine ethnic elegance.',
    highlights: [
      'Hypoallergenic & Pregnancy-Safe Products',
      'Comfortable Seated Styling Experience',
      'Traditional Seemantham Poola Jada Fixing',
      'Soft Divine Glow & Elegant Saree Draping',
    ],
    duration: '1.5 Hours',
    bestFor: 'Seemantham, Godh Bharai & Baby Showers',
    image: '/makeup/Seemantham%20&%20Baby%20Shower.jpg',
    priceEst: '₹8,500 – ₹13,000',
  },
  {
    id: 'festivals',
    category: 'festive',
    title: 'Pooja, Vratham & Festive Glow',
    tagline: 'Understated Sophistication for Sacred Rituals',
    occasionName: 'Varalakshmi, Diwali & Sankranti',
    badge: 'Fast Turnaround',
    objectPos: 'object-center',
    shortDesc: 'Clean long-wear ethnic look, silk saree pleating & fresh jasmine bun in a fast 60-min turnaround.',
    fullDesc:
      'Serene, divine ethnic makeup for pooja mornings, family festive gatherings, and temple visits. Clean base, subtle eyeliner, natural rosy cheeks, traditional bindi, and neat jasmine-adorned buns.',
    highlights: [
      'Clean Long-Wear Traditional Look',
      'Quick 60-Minute Styling Turnaround',
      'Silk Saree & Dupatta Pleating',
      'Fresh Mallipoo (Jasmine) Bun Setting',
    ],
    duration: '1 - 1.5 Hours',
    bestFor: 'Gruhapravesam, Satyanarayana Pooja & Festivals',
    image: '/makeup/Pooja,%20Vratham%20&%20Festive%20Glow.jpg',
    priceEst: '₹6,000 – ₹9,500',
  },
]

const signatureServices = [
  {
    icon: '✨',
    title: 'Ultra-HD & 4K Artistry',
    desc: 'Micro-fine blending that looks natural in person while delivering flawless finish for 4K video & flash shoots.',
    tags: ['Charlotte Tilbury', 'Dior', 'NARS', 'MAC Pro'],
  },
  {
    icon: '💨',
    title: 'Airbrush Bridal Couture',
    desc: 'Micro-droplet spray creating a waterproof, tear-proof barrier that resists mandap heat for 18+ hours.',
    tags: ['Temptu Pro', 'Waterproof', 'Zero-Transfer'],
  },
  {
    icon: '🌸',
    title: 'Poola Jada & Veni Artistry',
    desc: 'Authentic South Indian fresh flower jadas, jasmine venis, mermaid braids, and custom floral hair extensions.',
    tags: ['Fresh Flowers', 'Poola Jada', 'Mermaid Braid'],
  },
  {
    icon: '🥻',
    title: 'Master Saree & Khada Dupatta',
    desc: 'Precision pleat sculpting for Kanjeevarams, Paithanis, Can-Can lehenga pinning, and Nizami Khada Dupattas.',
    tags: ['Box Pleating', 'Khada Dupatta', 'Lehenga Styling'],
  },
  {
    icon: '🌿',
    title: 'Ayurvedic Pre-Bridal Care',
    desc: 'Botanical de-tanning, herbal ubtan polishing, barrier repair facials, and natural handmade lip & skin prep.',
    tags: ['Botanical Glow', 'De-Tan Polishing', 'Herbal'],
  },
  {
    icon: '👯‍♀️',
    title: 'Bridal Party & Family Glam',
    desc: 'Synchronized team of senior stylists to glam mothers, sisters, and bridesmaids without morning delays.',
    tags: ['Group Bookings', 'Fast Turnaround', 'Coordinated'],
  },
]

const hyderabadLocations = [
  'Banjara Hills & Jubilee Hills',
  'Gachibowli & Hitec City',
  'Kokapet & Financial District',
  'Madhapur & Kondapur',
  'Secunderabad & Begumpet',
  'Old City & Charminar',
  'Kukatpally & Miyapur',
  'Shamshabad & Resorts',
  'Vijayawada & Destination Telangana/AP',
]

const bridalPackages = [
  {
    name: 'Silver Celebration Glow',
    tag: 'Sangeet / Mehendi / Haldi',
    price: '₹12,000',
    popular: false,
    features: [
      'HD Party / Sangeet Makeup Look',
      'Trendy Hairstyle (Textured Braid / Waves)',
      'Designer Saree / Lehenga Draping',
      'Premium Eyelashes & Lens Application',
      'Hydrating Botanical Skin Prep',
    ],
  },
  {
    name: 'Royal Muhurtham Couture',
    tag: 'Signature Bridal Package',
    popular: true,
    price: '₹24,000',
    features: [
      'Ultra-HD / Airbrush 16hr Waterproof Base',
      'Authentic Kanjeevaram Saree Draping & Pinning',
      'Traditional Poola Jada / Veni Hair Installation',
      'Temple Jewellery & Matha Patti Setting',
      'Premium 3D Mink Lashes & Eye Artistry',
      'On-Location 3:00 AM Muhurtham Service',
      'Complimentary Touch-Up Kit',
    ],
  },
  {
    name: 'Nizami Grandeur Suite',
    tag: '2-Event Grand Bridal Suite',
    popular: false,
    price: '₹42,000',
    features: [
      'Muhurtham & Reception / Nikah & Walima (2 Events)',
      'Airbrush 24hr Flawless Canvas (Both Events)',
      'Khada Dupatta or 2 Distinct Saree/Lehenga Drapes',
      '2 Custom International & Traditional Hairstyles',
      'Full Bridal Jewelry, Passaa & Veil Anchoring',
      'Dedicated Senior Artist & Assistant Team',
      'Pre-Bridal Glow Consultation & Skin Mapping',
    ],
  },
]

const faqs = [
  {
    q: 'Do you provide 3:00 AM / early morning Muhurtham on-location service?',
    a: 'Yes! We specialize in South Indian weddings and regularly accommodate early morning Telugu Muhurthams across Hyderabad. Our team arrives fully equipped with studio ring lights and sanitized kits.',
  },
  {
    q: 'What cosmetic brands do you use?',
    a: 'We use exclusively high-end luxury products: Charlotte Tilbury, MAC Pro, NARS, Dior Backstage, Huda Beauty, Estée Lauder, and Temptu Airbrush, backed by botanical skin prep.',
  },
  {
    q: 'Are saree draping and floral Poola Jada included in bridal packages?',
    a: 'Yes! All bridal packages include precision saree pleating, heavy pinning, Poola Jada/Veni placement, jewellery fixing, and lashes at no extra charge.',
  },
  {
    q: 'Can you style the mother, sisters, and bridesmaids together?',
    a: 'Yes! We have an experienced team of senior stylists who assist simultaneously so everyone is styled smoothly without rushing.',
  },
]

export default function MakeupBeautyPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeModalOccasion, setActiveModalOccasion] = useState<Occasion | null>(null)
  const [activeTabSection, setActiveTabSection] = useState<'looks' | 'services' | 'packages' | 'locations'>('looks')

  // Booking Form State
  const [inquiryName, setInquiryName] = useState('')
  const [inquiryDate, setInquiryDate] = useState('')
  const [inquiryOccasion, setInquiryOccasion] = useState('Telugu Muhurtham Bride')
  const [inquiryLocation, setInquiryLocation] = useState('Banjara Hills & Jubilee Hills')
  const [inquiryCount, setInquiryCount] = useState('Bride Only')

  const filteredOccasions = useMemo(() => {
    if (selectedCategory === 'all') return occasionsList
    return occasionsList.filter((o) => o.category === selectedCategory)
  }, [selectedCategory])

  const handleWhatsAppBooking = (customOccasion?: string) => {
    const occ = customOccasion || inquiryOccasion
    const namePart = inquiryName ? `Name: *${encodeURIComponent(inquiryName)}*%0A` : ''
    const datePart = inquiryDate ? `Date: *${encodeURIComponent(inquiryDate)}*%0A` : ''
    const text = `🌸 *Hi ALCA Makeup & Beauty!*%0A${namePart}I would like to enquire about booking beauty & makeup services in Hyderabad.%0A%0A✨ *Occasion:* ${encodeURIComponent(occ)}%0A📍 *Location:* ${encodeURIComponent(inquiryLocation)}%0A👥 *People:* ${encodeURIComponent(inquiryCount)}%0A${datePart}%0APlease check availability and share package details. Thank you! ✨`
    window.open(`https://wa.me/919010995180?text=${text}`, '_blank')
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAF6F2] text-[#251C1C] pb-24 lg:pb-0 selection:bg-[#8B2252] selection:text-white">
      {/* ───────────────── TOP NAV (Ultra Sleek) ───────────────── */}
      <nav className="fixed left-1/2 top-3 z-50 flex w-[calc(100%-20px)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-full border border-white/15 bg-[#251C1C]/92 px-3.5 py-2 text-white shadow-2xl backdrop-blur-xl md:px-6 md:py-2.5">
        <a href="/" className="flex items-center gap-2.5 group">
          <img
            src="/images/alca-logo-1.webp"
            alt="ALCA Logo"
            className="h-8 w-8 rounded-full object-cover shadow-sm ring-2 ring-[#D7A7B7]/40 transition group-hover:scale-105"
          />
          <div>
            <div className="font-serif text-base font-bold tracking-wider text-white">
              ALCA<span className="text-[#D7A7B7]">.</span>
              <span className="ml-1 text-[10px] font-sans font-normal uppercase tracking-widest text-[#D7A7B7]">
                Beauty
              </span>
            </div>
            <div className="text-[8px] uppercase tracking-[0.2em] text-white/50">
              Hyderabad Studio
            </div>
          </div>
        </a>

        {/* Quick Nav Anchors */}
        <div className="hidden items-center gap-5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70 lg:flex">
          <a href="#quick-hub" onClick={() => setActiveTabSection('looks')} className="transition hover:text-[#D7A7B7]">
            Occasions
          </a>
          <a href="#quick-hub" onClick={() => setActiveTabSection('services')} className="transition hover:text-[#D7A7B7]">
            Services
          </a>
          <a href="#quick-hub" onClick={() => setActiveTabSection('packages')} className="transition hover:text-[#D7A7B7]">
            Packages
          </a>
          <a href="#quick-hub" onClick={() => setActiveTabSection('locations')} className="transition hover:text-[#D7A7B7]">
            Locations
          </a>
          <a href="#booking" className="transition hover:text-[#D7A7B7]">
            Quick Book
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleWhatsAppBooking()}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#D7A7B7]/40 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D7A7B7] transition hover:bg-[#D7A7B7] hover:text-[#251C1C]"
          >
            WhatsApp
          </button>
          <a
            href="tel:+919010995180"
            className="rounded-full bg-gradient-to-r from-[#D7A7B7] to-[#C7899F] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#251C1C] shadow-md transition hover:scale-105 active:scale-95"
          >
            Call 90109 95180
          </a>
        </div>
      </nav>

      {/* ───────────────── HERO (Compact, High-Impact) ───────────────── */}
      <section className="relative overflow-hidden bg-[#221717] pb-10 pt-20 text-white md:pb-16 md:pt-28">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/makeup/Telugu%20Muhurtham%20Bride.jpg"
            alt="Hyderabad Indian Bride"
            className="h-full w-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#221717] via-[#221717]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#221717] via-transparent to-[#221717]/40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D7A7B7]/30 bg-white/5 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D7A7B7] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D7A7B7] animate-ping" />
              Hyderabad & Telangana Bridal Specialists
            </div>

            <h1 className="mt-4 font-serif text-3xl font-light leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Sacred Traditions. <span className="italic text-[#D7A7B7]">Bespoke Radiance.</span>
            </h1>

            <p className="mt-3 max-w-xl text-xs leading-relaxed text-white/75 sm:text-sm md:text-base">
              From auspicious 4:00 AM Telugu Muhurthams & Haldi glow to Nizami Nikahs, Sangeet glam & Half-Saree milestones—we deliver 16hr sweatproof HD bridal looks, Kanjeevaram draping, and authentic Poola Jada at your doorstep across Hyderabad.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href="#booking"
                className="rounded-full bg-gradient-to-r from-[#D7A7B7] to-[#C7899F] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#251C1C] shadow-lg transition hover:brightness-110 active:scale-95"
              >
                Book Date Online ↓
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('quick-hub')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md transition hover:bg-white/10"
              >
                Quick View Catalog
              </button>
            </div>
          </div>

          {/* Compact Mini Metric Strip */}
          <div className="mt-8 grid grid-cols-2 gap-2 border-t border-white/10 pt-4 sm:grid-cols-4 sm:gap-3">
            <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D7A7B7]">800+ Brides</div>
              <div className="text-[9px] uppercase tracking-wider text-white/60">Telugu & Nizami Weddings</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D7A7B7]">16hr HD Finish</div>
              <div className="text-[9px] uppercase tracking-wider text-white/60">Sweat & Mandap Proof</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D7A7B7]">3:00 AM Slot</div>
              <div className="text-[9px] uppercase tracking-wider text-white/60">Early Muhurtham Promise</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 px-3 py-2 backdrop-blur-sm">
              <div className="font-serif text-lg font-bold text-[#D7A7B7]">At-Venue Vanity</div>
              <div className="text-[9px] uppercase tracking-wider text-white/60">Pan-Hyderabad Travel</div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── INTERACTIVE QUICK-HUB (Fast Navigation) ───────────────── */}
      <section id="quick-hub" className="mx-auto max-w-6xl px-4 pt-8 md:px-6">
        {/* Sticky-feeling Segmented Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-1.5 rounded-2xl border border-[#8B2252]/15 bg-white p-1.5 shadow-sm">
          {[
            { key: 'looks', label: '👰 Occasion Looks', desc: 'Browse Styles' },
            { key: 'services', label: '✨ Artistry Services', desc: 'Draping & Prep' },
            { key: 'packages', label: '💎 Packages & Pricing', desc: 'Transparent' },
            { key: 'locations', label: '📍 Hyderabad Locations', desc: 'On-Location' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTabSection(tab.key as any)}
              className={`flex-shrink-0 rounded-xl px-4 py-2 text-left transition-all duration-200 ${
                activeTabSection === tab.key
                  ? 'bg-[#8B2252] text-white shadow-md'
                  : 'text-[#554749] hover:bg-neutral-100'
              }`}
            >
              <div className="text-xs font-bold leading-none">{tab.label}</div>
            </button>
          ))}
        </div>

        {/* ────────────── TAB 1: OCCASION LOOKS ────────────── */}
        {activeTabSection === 'looks' && (
          <div className="mt-6 animate-fadeIn">
            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
              {[
                { key: 'all', label: 'All Occasions' },
                { key: 'wedding', label: '💍 Telugu Muhurtham & Reception' },
                { key: 'pre-wedding', label: '🌼 Pellikuthuru & Sangeet' },
                { key: 'hyderabadi', label: '👑 Royal Hyderabadi Nikah' },
                { key: 'milestone', label: '🌸 Half-Saree & Seemantham' },
                { key: 'festive', label: '🪔 Pooja & Festivals' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition ${
                    selectedCategory === cat.key
                      ? 'bg-[#251C1C] text-white shadow-sm'
                      : 'border border-[#8B2252]/20 bg-white text-[#44383A] hover:bg-[#8B2252]/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Compact Grid of Occasions */}
            <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredOccasions.map((occ) => (
                <div
                  key={occ.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#8B2252]/15 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-[#8B2252]/40 hover:shadow-lg"
                >
                  <div>
                    {/* Beautifully Framed Portrait Image (No Head/Face Cropping) */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#251C1C]/5">
                      <img
                        src={occ.image}
                        alt={occ.title}
                        loading="lazy"
                        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${occ.objectPos || 'object-top'}`}
                      />
                      <div className="absolute left-2.5 top-2.5 rounded-md bg-[#251C1C]/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm shadow">
                        {occ.occasionName}
                      </div>
                      {occ.badge && (
                        <div className="absolute right-2.5 top-2.5 rounded-md bg-[#8B2252] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                          {occ.badge}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="mt-3">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B2252]">
                        {occ.tagline}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#251C1C] leading-snug">
                        {occ.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#685D5D]">
                        {occ.shortDesc}
                      </p>

                      {/* Mini Highlights */}
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {occ.highlights.slice(0, 2).map((h, i) => (
                          <span
                            key={i}
                            className="rounded bg-[#FAF0E6] px-2 py-0.5 text-[10px] font-medium text-[#732349]"
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
                        Package Est.
                      </span>
                      <span className="font-serif text-sm font-bold text-[#8B2252]">
                        {occ.priceEst}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveModalOccasion(occ)}
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-[11px] font-semibold text-[#251C1C] transition hover:bg-neutral-100"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleWhatsAppBooking(occ.title)}
                        className="rounded-lg bg-[#8B2252] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#6e1a40]"
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

        {/* ────────────── TAB 2: ARTISTRY SERVICES ────────────── */}
        {activeTabSection === 'services' && (
          <div className="mt-6 animate-fadeIn">
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {signatureServices.map((svc, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#8B2252]/15 bg-white p-4 shadow-sm transition-all hover:border-[#8B2252]/40 hover:shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF0E6] text-xl">
                      {svc.icon}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#251C1C]">
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
                        className="rounded-full bg-neutral-100 px-2 py-0.5 text-[9px] font-medium text-[#8B2252]"
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
              {bridalPackages.map((pkg, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col justify-between rounded-2xl p-5 transition-all ${
                    pkg.popular
                      ? 'border-2 border-[#8B2252] bg-white shadow-xl'
                      : 'border border-[#8B2252]/15 bg-white shadow-sm'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#8B2252] px-3 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow">
                      Most Chosen by Brides
                    </div>
                  )}

                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#8B2252]">
                      {pkg.tag}
                    </span>
                    <h3 className="mt-0.5 font-serif text-xl font-bold text-[#251C1C]">
                      {pkg.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-serif text-3xl font-bold text-[#8B2252]">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-neutral-400">/ event</span>
                    </div>

                    <div className="mt-4 space-y-1.5 border-t border-neutral-100 pt-3">
                      {pkg.features.map((f, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#44383A]">
                          <span className="font-bold text-[#8B2252]">✓</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleWhatsAppBooking(pkg.name)}
                    className={`mt-5 w-full rounded-xl py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                      pkg.popular
                        ? 'bg-[#8B2252] text-white shadow-md hover:bg-[#6e1a40]'
                        : 'border border-[#251C1C] text-[#251C1C] hover:bg-[#251C1C] hover:text-white'
                    }`}
                  >
                    Reserve via WhatsApp
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ────────────── TAB 4: HYDERABAD LOCATIONS ────────────── */}
        {activeTabSection === 'locations' && (
          <div className="mt-6 rounded-2xl border border-[#8B2252]/15 bg-white p-5 shadow-sm animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#251C1C]">
                  On-Location Vanity Service in Hyderabad
                </h3>
                <p className="text-xs text-[#685D5D]">
                  Our artists travel to your venue, hotel suite, or home with portable studio ring lights & vanity sets.
                </p>
              </div>
              <a
                href="tel:9010995180"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#8B2252] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#6e1a40]"
              >
                Call for Location Booking
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {hyderabadLocations.map((loc, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#8B2252]/20 bg-[#FAF6F2] px-3 py-1.5 text-xs font-medium text-[#251C1C]"
                >
                  <span className="text-[#8B2252]">📍</span>
                  {loc}
                </span>
              ))}
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3 border-t border-neutral-100 pt-4 text-xs text-[#554749]">
              <div className="rounded-lg bg-neutral-50 p-2.5">
                <strong className="block text-[#251C1C]">3:00 AM Muhurtham Ready:</strong> Punctual setup for early morning Telugu Muhurthams.
              </div>
              <div className="rounded-lg bg-neutral-50 p-2.5">
                <strong className="block text-[#251C1C]">Master Drapers:</strong> Sturdy box pleating for Kanjeevarams & Khada Dupattas.
              </div>
              <div className="rounded-lg bg-neutral-50 p-2.5">
                <strong className="block text-[#251C1C]">Sterilized Kits:</strong> 100% sanitized brushes and premium luxury cosmetics.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ───────────────── INSTANT BOOKING BAR / FORM ───────────────── */}
      <section id="booking" className="mx-auto max-w-6xl px-4 pt-10 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-[#221717] p-6 text-white shadow-2xl md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D7A7B7]">
                Instant WhatsApp Check
              </span>
              <h2 className="mt-1 font-serif text-2xl font-light sm:text-3xl">
                Check Date Availability & Rates
              </h2>
            </div>
            <p className="max-w-md text-xs text-white/70">
              Select your event details below to immediately trigger an availability enquiry directly on WhatsApp.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#D7A7B7]">
                Your Name
              </label>
              <input
                type="text"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                placeholder="e.g. Sravya / Ayesha"
                className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#D7A7B7] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#D7A7B7]">
                Event Date
              </label>
              <input
                type="date"
                value={inquiryDate}
                onChange={(e) => setInquiryDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#D7A7B7] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#D7A7B7]">
                Ceremony / Occasion
              </label>
              <select
                value={inquiryOccasion}
                onChange={(e) => setInquiryOccasion(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-[#2C1F1F] px-3 py-2 text-xs text-white focus:border-[#D7A7B7] focus:outline-none"
              >
                <option value="Telugu Muhurtham Bride">Telugu Muhurtham (Main Wedding)</option>
                <option value="Pellikuthuru / Haldi Glow">Pellikuthuru / Haldi Glow</option>
                <option value="Sangeet & Cocktail Night Glam">Sangeet & Cocktail Night</option>
                <option value="Grand Reception Elegance">Grand Wedding Reception</option>
                <option value="Royal Hyderabadi Nikah / Walima">Royal Hyderabadi Nikah / Walima</option>
                <option value="Half-Saree / Langa Voni">Half-Saree / Langa Voni</option>
                <option value="Seemantham / Baby Shower">Seemantham / Baby Shower</option>
                <option value="Festive & Pooja Elegance">Pooja / Vratham / Festivals</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#D7A7B7]">
                Hyderabad Area
              </label>
              <select
                value={inquiryLocation}
                onChange={(e) => setInquiryLocation(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/15 bg-[#2C1F1F] px-3 py-2 text-xs text-white focus:border-[#D7A7B7] focus:outline-none"
              >
                {hyderabadLocations.map((loc, i) => (
                  <option key={i} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-white/75">
              <span>👥 Styling for:</span>
              <select
                value={inquiryCount}
                onChange={(e) => setInquiryCount(e.target.value)}
                className="rounded-lg border border-white/15 bg-[#2C1F1F] px-2.5 py-1 text-xs text-white focus:outline-none"
              >
                <option value="Bride Only">Bride Only</option>
                <option value="Bride + 2 Family Members">Bride + 2 Family Members</option>
                <option value="Bride + 4+ Group">Bride + 4+ Group</option>
                <option value="Family Only (3+ people)">Family Only (3+ people)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleWhatsAppBooking()}
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#D7A7B7] to-[#C7899F] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#251C1C] shadow-lg transition hover:scale-105 active:scale-95"
              >
                Chat on WhatsApp ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── FAQS (Compact Accordion) ───────────────── */}
      <section className="mx-auto max-w-4xl px-4 pt-10 pb-6 md:px-6">
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8B2252]">
            Got Questions?
          </span>
          <h2 className="mt-1 font-serif text-2xl font-light text-[#251C1C]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-5 space-y-2.5">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-[#8B2252]/15 bg-white p-3.5 shadow-sm transition open:shadow-md"
            >
              <summary className="flex cursor-pointer items-center justify-between text-xs font-bold text-[#251C1C]">
                <span>{faq.q}</span>
                <span className="text-sm font-normal text-[#8B2252] transition-transform duration-200 group-open:rotate-45">
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

      {/* ───────────────── COMPACT OCCASION MODAL / BOTTOM DRAWER ───────────────── */}
      {activeModalOccasion && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-4 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-2xl text-[#251C1C] animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded bg-[#FAF0E6] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#8B2252]">
                  {activeModalOccasion.occasionName}
                </span>
                <h3 className="mt-1.5 font-serif text-2xl font-bold text-[#251C1C]">
                  {activeModalOccasion.title}
                </h3>
                <p className="text-xs font-medium text-[#8B2252]">
                  {activeModalOccasion.tagline}
                </p>
              </div>
              <button
                onClick={() => setActiveModalOccasion(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 relative aspect-[4/5] sm:aspect-[16/10] max-h-[380px] w-full overflow-hidden rounded-2xl bg-[#251C1C]/5">
              <img
                src={activeModalOccasion.image}
                alt={activeModalOccasion.title}
                className={`h-full w-full object-cover ${activeModalOccasion.objectPos || 'object-top'}`}
              />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[#554749]">
              {activeModalOccasion.fullDesc}
            </p>

            <div className="mt-4 rounded-xl bg-neutral-50 p-3.5 border border-neutral-100">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Service Inclusions:
              </div>
              <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {activeModalOccasion.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[#251C1C]">
                    <span className="text-[#8B2252] font-bold">✓</span>
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
                <div className="font-serif text-lg font-bold text-[#8B2252]">
                  {activeModalOccasion.priceEst}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleWhatsAppBooking(activeModalOccasion.title)
                    setActiveModalOccasion(null)
                  }}
                  className="rounded-xl bg-[#8B2252] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-[#6e1a40]"
                >
                  Book via WhatsApp ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────── STICKY MOBILE QUICK-ACTION BAR ───────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-white/15 bg-[#251C1C]/95 px-4 py-2.5 backdrop-blur-md lg:hidden">
        <a
          href="tel:+919010995180"
          className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-white"
        >
          📞 Call
        </a>
        <button
          onClick={() => handleWhatsAppBooking()}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D7A7B7] to-[#C7899F] px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#251C1C] shadow-md"
        >
          🌸 WhatsApp Availability
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
                ALCA BEAUTY
              </div>
              <div className="text-[9px] uppercase tracking-widest text-[#D7A7B7]">
                Hyderabad Bridal & Celebration Artistry
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
          <div>© {new Date().getFullYear()} ALCA Makeup & Beauty · Hyderabad, Telangana</div>
          <div>Bespoke Indian Bridal & Celebration Artistry</div>
        </div>
      </footer>
    </main>
  )
}