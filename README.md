# ALCA Website

A modern, high-performance React application for ALCA built with Vite, TypeScript, Tailwind CSS, and Radix UI.

---

## 📁 Project Structure

The project has been organized into a clean, intuitive structure:

```
alca_webiste/
├── public/                 # Static assets (images, logos, media, favicon)
│   ├── images/             # Product and illustrative images
│   └── media/              # Brand media assets
├── src/
│   ├── components/         # Reusable UI & Common components
│   │   ├── ui/             # Radix & primitive UI widgets (buttons, dialogs, etc.)
│   │   ├── AlcaPhotos.tsx  # Dynamic photo grid component
│   │   └── error-boundary.tsx # React error boundary component
│   ├── data/               # Static site data & default state
│   │   └── siteData.ts     # Main site configuration and content defaults
│   ├── features/           # Modular business features
│   │   ├── admin/          # Admin panel & live site editor
│   │   ├── cart/           # Shopping cart drawer & state hook
│   │   ├── dry-store/      # Dry store product catalog
│   │   ├── hamper/         # Hamper customization builder
│   │   ├── juice-bar/      # Fresh juice & beverage menu
│   │   ├── offers/         # Special discounts & promotions
│   │   ├── quote/          # Instant event quotation calculator
│   │   └── features.css    # Feature-specific styles
│   ├── hooks/              # Custom React hooks (useSiteData, useMobile, useToast)
│   ├── illustrations/      # Service and decorative SVGs
│   ├── lib/                # Shared utilities and service clients
│   │   ├── supabaseClient.ts # Supabase client connection
│   │   ├── whatsapp.ts     # WhatsApp order & contact integration
│   │   ├── businessPhotos.ts # Photo management helpers
│   │   ├── photoCompression.ts # Client-side image compression
│   │   ├── format.ts       # Currency and date formatting
│   │   └── utils.ts        # Tailwind class merging (cn utility)
│   ├── pages/              # Route views
│   │   ├── CateringPage.tsx
│   │   ├── CelebrationsPage.tsx
│   │   ├── CraftsGiftsPage.tsx
│   │   ├── DesignerStudioPage.tsx
│   │   ├── MakeupBeautyPage.tsx
│   │   ├── SupplyPage.tsx
│   │   ├── PhotoAdmin.tsx
│   │   └── not-found.tsx
│   ├── sections/           # Modular landing page sections
│   │   ├── Nav.tsx         # Header navigation
│   │   ├── Hero.tsx        # Hero banner
│   │   ├── Marquee.tsx     # Animated ticker
│   │   ├── Gallery.tsx     # Visual showcase gallery
│   │   ├── JumpMenu.tsx    # Category quick-jump navigation
│   │   ├── DivisionSection.tsx # Division showcase section
│   │   ├── SwapConcierge.tsx # Concierge interaction section
│   │   ├── ReviewsFaq.tsx  # Testimonials & FAQ accordion
│   │   └── ContactFooter.tsx # Footer & contact info
│   ├── types/              # TypeScript interfaces and types
│   │   └── site.ts         # Data models for divisions, items, and site
│   ├── App.tsx             # Root application component & routing
│   ├── index.css           # Global Tailwind CSS & design system tokens
│   └── main.tsx            # Vite React entry point
├── .env.example            # Sample environment variables
├── components.json         # UI component configuration (shadcn)
├── index.html              # HTML entry template
├── package.json            # Dependencies & npm scripts
├── postcss.config.js       # PostCSS plugins
├── tailwind.config.js      # Tailwind CSS theme setup
├── tsconfig.json           # Root TypeScript configuration
├── vercel.json             # Deployment routing configuration
└── vite.config.ts          # Vite build & alias configuration
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Typecheck
```bash
npm run typecheck
```

---

## 🔑 Key Concepts & Modules

- **Path Aliases**: `@/` maps directly to `./src/` (e.g. `@/components/ui/button`).
- **Live Admin Panel**: Append `#admin` to the URL or visit `/admin` to access the site data editor.
- **Routing**: Uses lightweight `wouter` for declarative, client-side routing.
