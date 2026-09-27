import React from "react";
import { 
  Sparkles, 
  Heart, 
  Award, 
  CheckCircle2, 
  ArrowUpRight, 
  MessageCircle,
  Palette,
  Utensils,
  Scissors,
  Gift,
  Boxes,
  Smile,
  Leaf,
  ShieldCheck,
  Star
} from "lucide-react";
import type { SiteData } from "../types/site";
import { waLink } from "../lib/whatsapp";

interface FoundersStoryProps {
  site: SiteData;
}

export function FoundersStory({ site }: FoundersStoryProps) {
  const businesses = [
    {
      title: "Wow Celebrations",
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      desc: "Luxury stage decor, dream weddings & milestone events.",
      href: "/celebrations",
      badge: "Events & Decor",
      bg: "bg-amber-50/70 border-amber-200/60 hover:border-amber-400",
      accent: "text-amber-800"
    },
    {
      title: "ALCA Bites & Juices",
      icon: <Smile className="w-5 h-5 text-emerald-600" />,
      desc: "100% natural dehydrated fruit crunches & cold-pressed fresh juices.",
      href: "/bites",
      badge: "Healthy Living",
      bg: "bg-emerald-50/70 border-emerald-200/60 hover:border-emerald-400",
      accent: "text-emerald-800"
    },
    {
      title: "Customized Crafts & Gifts",
      icon: <Gift className="w-5 h-5 text-rose-600" />,
      desc: "Sacred devotional idols, 3D figurines & preserved varmala resin art.",
      href: "/crafts-gifts",
      badge: "Bespoke Art",
      bg: "bg-rose-50/70 border-rose-200/60 hover:border-rose-400",
      accent: "text-rose-800"
    },
    {
      title: "Designer Studio & Couture",
      icon: <Scissors className="w-5 h-5 text-purple-600" />,
      desc: "Bridal lehengas, custom tailoring & authentic Maggam embroidery.",
      href: "/designer-studio",
      badge: "Fashion & Bridal",
      bg: "bg-purple-50/70 border-purple-200/60 hover:border-purple-400",
      accent: "text-purple-800"
    },
    {
      title: "Luxury Beauty & Makeup",
      icon: <Palette className="w-5 h-5 text-pink-600" />,
      desc: "HD bridal makeup artistry, occasion hair styling & skin rejuvenation.",
      href: "/makeup-beauty",
      badge: "Beauty & Salon",
      bg: "bg-pink-50/70 border-pink-200/60 hover:border-pink-400",
      accent: "text-pink-800"
    },
    {
      title: "Food & Telugu Catering",
      icon: <Utensils className="w-5 h-5 text-orange-600" />,
      desc: "Authentic Telugu cuisine, live buffet setups & corporate catering.",
      href: "/catering",
      badge: "Pure Taste",
      bg: "bg-orange-50/70 border-orange-200/60 hover:border-orange-400",
      accent: "text-orange-800"
    },
    {
      title: "Supply & Manufacturing",
      icon: <Boxes className="w-5 h-5 text-blue-600" />,
      desc: "B2B bulk food ingredients, rigid packaging & private labeling.",
      href: "/supply",
      badge: "B2B Solutions",
      bg: "bg-blue-50/70 border-blue-200/60 hover:border-blue-400",
      accent: "text-blue-800"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] text-stone-900 relative overflow-hidden border-t border-b border-stone-200/70">
      
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-300/60 text-amber-900 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Leadership & Vision
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            Crafting Life’s Cherished Moments with <span className="text-amber-800 italic font-normal">Passion & Care</span>
          </h2>
          <p className="mt-3.5 text-stone-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            The story of how one woman's commitment to authentic Telugu artistry, wholesome nutrition, and warm hospitality shaped the ALCA family of businesses.
          </p>
        </div>

        {/* Main Founder Feature Card */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xl shadow-stone-200/40 p-6 sm:p-10 lg:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Founder Photo Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100 group">
                
                {/* Photo Placeholder Image */}
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                  alt="Vani Kalyani Naidu - Founder of ALCA"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Fallback Initials Card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-100 via-stone-100 to-amber-50 -z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center text-3xl font-serif font-bold text-amber-900 mb-3 shadow-md">
                    VKN
                  </div>
                  <div className="text-xl font-bold text-stone-900">Vani Kalyani Naidu</div>
                  <div className="text-xs text-amber-800 font-semibold mt-1">Founder & Creative Visionary</div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>Founder</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent p-5 pt-10 text-center">
                  <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                    Vani Kalyani Naidu
                  </h3>
                  <p className="text-amber-200 text-xs font-medium uppercase tracking-wider mt-0.5">
                    Founder & Managing Director
                  </p>
                </div>
              </div>

              {/* Trust Metric Badges */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-sm mt-5">
                <div className="bg-[#FAF7F2] border border-stone-200/80 rounded-xl p-3 text-center">
                  <div className="text-lg sm:text-xl font-serif font-bold text-amber-900">7+</div>
                  <div className="text-[10px] sm:text-[11px] text-stone-500 font-medium uppercase tracking-wider">Divisions</div>
                </div>
                <div className="bg-[#FAF7F2] border border-stone-200/80 rounded-xl p-3 text-center">
                  <div className="text-lg sm:text-xl font-serif font-bold text-emerald-800">100%</div>
                  <div className="text-[10px] sm:text-[11px] text-stone-500 font-medium uppercase tracking-wider">In-House</div>
                </div>
                <div className="bg-[#FAF7F2] border border-stone-200/80 rounded-xl p-3 text-center">
                  <div className="text-lg sm:text-xl font-serif font-bold text-rose-800">10k+</div>
                  <div className="text-[10px] sm:text-[11px] text-stone-500 font-medium uppercase tracking-wider">Happy Clients</div>
                </div>
              </div>
            </div>

            {/* Story & Biography Content */}
            <div className="lg:col-span-7 flex flex-col space-y-5 sm:space-y-6">
              <div>
                <span className="text-amber-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  The Woman Behind the Vision
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
                  “One Brand for Everything Life Celebrates”
                </h3>
              </div>

              <div className="space-y-3.5 text-stone-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Guided by <strong className="text-stone-900 font-semibold">Vani Kalyani Naidu</strong>, ALCA was established with a singular dream: to bring genuine warmth, traditional finesse, and uncompromising quality to every aspect of Indian family life and grand celebrations.
                </p>
                <p>
                  From crafting healthy homemade snacks without chemicals in Gudivada to designing breathtaking wedding decor and bespoke bridal couture in Hyderabad, Vani's hands-on leadership ensures every client feels valued as family.
                </p>
                <p>
                  Her vision unites a dedicated team of master artisans, skilled Maggam embroiderers, culinary chefs, and beauty experts under one seamless destination.
                </p>
              </div>

              {/* Core Commitments Pill Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200/80">
                  <div className="p-2 rounded-lg bg-white border border-stone-200 text-amber-700 shrink-0">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 text-xs sm:text-sm block">100% Pure & Homemade</span>
                    <span className="text-stone-500 text-xs">Pure ingredients, zero preservatives, and authentic regional recipes.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200/80">
                  <div className="p-2 rounded-lg bg-white border border-stone-200 text-emerald-700 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900 text-xs sm:text-sm block">Bespoke In-House Care</span>
                    <span className="text-stone-500 text-xs">Direct artisan coordination and personalized trial fittings.</span>
                  </div>
                </div>
              </div>

              {/* Quote Block */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-white to-amber-50/50 border-l-4 border-amber-500 border-y border-r border-amber-200/50">
                <p className="text-stone-800 italic text-sm sm:text-base font-serif leading-relaxed">
                  “Every celebration we design, every wholesome snack we pack, and every handmade keepsake we craft carries our personal promise of love, purity, and trust.”
                </p>
                <div className="mt-2 text-xs font-bold tracking-wider text-amber-900 uppercase">
                  — Vani Kalyani Naidu, Founder
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href={waLink(site.contact.mainPhone, "Hello Vani Kalyani Naidu, I would love to connect with you regarding ALCA.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 text-amber-300" />
                  <span>Connect with Founder</span>
                </a>

                <a
                  href="#faq"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 font-medium text-sm border border-stone-300 shadow-sm transition-all w-full sm:w-auto"
                >
                  <span>Frequently Asked Questions</span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400" />
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* 7 Verticals Ecosystem Cards */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs font-bold tracking-widest text-amber-800 uppercase">
                The ALCA Universe
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                7 Businesses Built with Passion
              </h3>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 sm:mt-0 max-w-md">
              Tap any division below to explore dedicated service offerings, menus, and bespoke catalogs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {businesses.map((biz, idx) => (
              <a
                key={idx}
                href={biz.href}
                className={`group p-5 sm:p-6 rounded-2xl bg-white border ${biz.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="p-2.5 rounded-xl bg-white border border-stone-200/80 shadow-sm group-hover:scale-110 transition-transform">
                      {biz.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-stone-700 border border-stone-200 shadow-2xs">
                      {biz.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {biz.title}
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                    {biz.desc}
                  </p>
                </div>
                
                <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-800 group-hover:text-amber-900">
                  <span>Explore Division</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
