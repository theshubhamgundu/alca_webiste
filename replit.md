# ALCA website

The website shown in Preview is the app in `artifacts/alca-website/`. The repository root is a pnpm workspace, not a second website. Edit the files under `artifacts/alca-website/` to change the site:

- Homepage layout and routing: `src/App.tsx`
- Homepage text, products, prices and contact details: `src/data/siteData.ts`
- Homepage sections: `src/sections/`
- Styles: `src/index.css` and `src/features/features.css`
- Images: `public/`
- Other pages: `src/pages/`

All paths above are relative to `artifacts/alca-website/`. The homepage uses the sections in `App.tsx` and the defaults from `siteData.ts`. The `#admin` editor's “Save locally” stores edits **only in that browser**. Those edits take precedence until `siteData.ts` changes; when its defaults change, the next page load uses the new source defaults. Locally saved edits are not published to other visitors.

The website's development command is `pnpm --filter @workspace/alca-website run dev`. Supabase photo administration needs the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` settings described in `.env.example`; other site content uses local defaults.