import type { SiteData } from "../types/site";

export const siteData: SiteData = {
  announce: {
    on: false,
    text: "Festival Special: Order your custom gift hampers and fresh juice subscriptions 2-3 days ahead!",
  },
  hero: {
    eyebrow: "ALCA · Hyderabad",
    text: "Healthy snacks, fresh cold-pressed juices, royal events, catering, bespoke gifts, designer couture, luxury beauty, and manufacturing. One trusted team for every celebration and lifestyle need.",
  },
  contact: {
    ordersPhone: "9010995180",
    mainPhone: "9951806080",
    ig1: "alca_bites",
    ig2: "alca_com",
    place: "ALCA",
    address: "Plot 42, LB Nagar Area, Hyderabad, Telangana 500074",
    map: "LB Nagar Hyderabad",
  },
  footer: "From our kitchen to your heart · మీ వేడుక మా బాధ్యత",
  divisions: [
    {
      id: "bites",
      c: "--c1",
      name: "Alca Bites, Juices & Dry Store",
      short: "Bites & Juices",
      phone: "9010995180",
      fruit: true,
      lead: "From our kitchen to your heart. 100% homemade dehydrated fruits, zero-oil vegetable chips, premium handpicked dry fruits, cold-pressed fresh juices, and nutritious monthly office lunch boxes.",
      tags: [
        "100% Natural",
        "No Added Sugar",
        "Zero Preservatives",
        "Homemade with Love",
        "Order 2–3 Days Ahead",
        "Hygienically Packed",
      ],
      lunch: [],
      drinks: [
        { name: "Beetroot Juice", image: "/bites/bet juice.jpeg", price: "80", emoji: "🥤", inStock: true },
        { name: "Carrot Juice", image: "/bites/carrot juice.jpeg", price: "80", emoji: "🥤", inStock: true },
        { name: "Orange Juice", image: "/bites/orange juice.jpeg", price: "90", emoji: "🥤", inStock: true },
        { name: "Pineapple Juice", image: "/bites/pinespple juice.jpeg", price: "90", emoji: "🥤", inStock: true },
      ],
      store: [
        {
          name: "Dry Fruits & Nuts",
          emoji: "🥜",
          items: [
            { name: "Almonds", image: "/bites/almonds.jpeg", price: "300", emoji: "🥜", inStock: true },
            { name: "Cashews", image: "/bites/cashwes.jpeg", price: "350", emoji: "🥜", inStock: true },
            { name: "Dates", image: "/bites/dates.jpeg", price: "200", emoji: "🥜", inStock: true },
            { name: "Pistachio", image: "/bites/pistachio.jpeg", price: "400", emoji: "🥜", inStock: true },
            { name: "Classic Trail Mix", image: "/bites/classic trail mix.jpeg", price: "250", emoji: "🥜", inStock: true },
            { name: "Dry Fruit Box", image: "/bites/dry fruit box.jpeg", price: "800", emoji: "🎁", inStock: true }
          ]
        },
        {
          name: "Dry Fruits (Dehydrated)",
          emoji: "🍎",
          items: [
            { name: "Apple Chips", image: "/bites/apple chips.jpeg", price: "150", emoji: "🍎", inStock: true },
            { name: "Banana Chips", image: "/bites/banana chips.jpeg", price: "120", emoji: "🍌", inStock: true },
            { name: "Dragon Fruit Slice", image: "/bites/dragon fruit slice.jpeg", price: "200", emoji: "🐉", inStock: true },
            { name: "Kiwi Slices", image: "/bites/kiwi slices.jpeg", price: "180", emoji: "🥝", inStock: true },
            { name: "Mango Strips", image: "/bites/mango strips.jpeg", price: "160", emoji: "🥭", inStock: true },
            { name: "Pineapple Chips", image: "/bites/pineapple chips.jpeg", price: "150", emoji: "🍍", inStock: true },
            { name: "Strawberry Slices", image: "/bites/strawberry slices.jpeg", price: "220", emoji: "🍓", inStock: true }
          ]
        },
        {
          name: "Dry Vegetables",
          emoji: "🥕",
          items: [
            { name: "Beetroot Chips", image: "/bites/betroot chips.jpeg", price: "120", emoji: "🥔", inStock: true },
            { name: "Carrot Chips", image: "/bites/carrot chips.jpeg", price: "120", emoji: "🥕", inStock: true },
            { name: "Okra Chips", image: "/bites/okra chips.jpeg", price: "130", emoji: "🥒", inStock: true },
            { name: "Sweet Potato Chips", image: "/bites/sweet potato chips.jpeg", price: "140", emoji: "🍠", inStock: true }
          ]
        },
        {
          name: "Healthy Bites & Rolls",
          emoji: "🍪",
          items: [
            { name: "Dates and Nuts Roll", image: "/bites/dates and nuts roll.jpeg", price: "200", emoji: "🌯", inStock: true },
            { name: "Dry Fruit Laddu", image: "/bites/dry fruit laddu.jpeg", price: "250", emoji: "🧆", inStock: true },
            { name: "Mango Roll", image: "/bites/mango roll.jpeg", price: "150", emoji: "🌯", inStock: true },
            { name: "Gift Box", image: "/bites/gift box.jpeg", price: "500", emoji: "🎁", inStock: true }
          ]
        }
      ],
      hidden: false,
    },
    {
      id: "gifts",
      c: "--c6",
      name: "Customized Gifts & Crafts",
      short: "Gifts & Crafts",
      phone: "9010995180",
      ig: "alca_com",
      waText: "Hi ALCA, I'd like to order a customised gift.",
      photos: [],
      lead: "We don't just make gifts, we create cherished emotions. Handcrafted devotional idols, 3D photo couple figurines, and festival hampers personalized for your loved ones.",
      tags: [
        "Handmade with Love",
        "Personalized Customization",
        "Free Gift Packaging",
        "Worldwide Shipping",
      ],
      store: [],
      hidden: false,
    },
    {
      id: "celebrations",
      c: "--c2",
      name: "Wow Magical Celebrations",
      short: "Events & Decor",
      phone: "9010995180",
      waText: "Hi ALCA, I'd like to plan an event.",
      photos: [],
      lead: "We create memories you cherish forever. End-to-end wedding planning, birthday theme decor, surprise setups, and grand corporate events in Hyderabad.",
      tags: [
        "Grand Weddings",
        "Theme Birthdays",
        "Anniversaries & Surprises",
        "Baby Showers & Sreemantham",
        "Corporate Galas",
      ],
      store: [],
      hidden: false,
    },
    {
      id: "studio",
      c: "--c4",
      name: "Designer Studio & Fashion",
      short: "Studio & Apparel",
      phone: "9010995180",
      lead: "Custom bridal couture, designer lehengas, bespoke tailoring, and personal fashion styling crafted to perfection.",
      tags: [
        "Bespoke Tailoring",
        "Bridal Couture",
        "Maggam & Zardosi Embroidery",
        "Custom Fit Guarantee",
      ],
      store: [],
      hidden: false,
    },
    {
      id: "beauty",
      c: "--c5",
      name: "Luxury Beauty & Makeup",
      short: "Beauty & Salon",
      phone: "9010995180",
      lead: "Luxury bridal makeup, occasion hair styling, modeling portfolio shoots, and skin glow rejuvenation by certified artists.",
      tags: [
        "HD & Airbrush Makeup",
        "Certified Artists",
        "Premium International Brands",
        "On-Venue Service",
      ],
      store: [],
      hidden: false,
    },
    {
      id: "supply",
      c: "--c7",
      name: "Supply & Manufacturing",
      short: "Supply & Packaging",
      phone: "9010995180",
      lead: "Bulk food ingredients, dehydrated vegetables for bakeries, luxury packaging boxes, and private labeling solutions for Hyderabad businesses.",
      tags: [
        "Wholesale Pricing",
        "Consistent Batch Quality",
        "Custom Box Printing",
        "Fast Local Dispatch",
      ],
      store: [],
      hidden: false,
    },
    {
      id: "catering",
      c: "--c3",
      name: "Food & Catering",
      short: "Catering",
      phone: "9010995180",
      waText: "Hi ALCA, I'd like a catering quote.",
      lead: "మీ వేడుక మా బాధ్యత. Authentic Telugu & South Indian catering for weddings, family poojas, housewarmings, and corporate events at honest prices.",
      tags: [
        "Minimum Order 50 Guests",
        "Free Delivery near Madhapur / Hitec City",
        "100% Hygienic & Fresh Preparation",
        "On-Time Live Counter Setup",
        "Daily Corporate Lunch Available",
      ],
      feature: [],
      hidden: false,
    },
  ],
  offers: {
    on: true,
    special: "Try our signature ABC Juice: Fresh Apple, Beetroot, and Carrot. Order custom dry fruit hampers 2-3 days ahead!",
    combos: [],
  },
  hamper: {
    on: true,
    note: "Pick your luxury basket, customize with dry fruits, dehydrated fruits, and pooja gifts, add a handwritten card message, and we'll hand-deliver it.",
    boxes: [],
  },
  quote: {
    on: true,
    types: "Wedding, Birthday, Anniversary, Baby shower, Housewarming, Festival / Pooja, Corporate Event",
    vegPlate: "100",
    nonvegPlate: "150",
    minGuests: "50",
    addons: "Theme Decor & Balloon Garland, Candid Photography, Live Chaat Counter, Return Gifts, Bridal Makeup, Designer Wear",
  },
  reviews: [],
  faq: [],
};
