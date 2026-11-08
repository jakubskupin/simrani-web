# simrani-web

Next.js (App Router, Tailwind, TypeScript) web pro podcast Šimrání — https://simrani.cz

## Deploy a workflow

- **Produkce jede z `main`** přes Vercel — merge do `main` + push = nasazení na ostro. V repu není žádná CI workflow.
- **Pro drobné obsahové změny nezakládej PR.** Commitni, mergni do `main` (fast-forward) a pushni — Jakub chce, aby se to propsalo rovnou do ostré verze.
- Feature branch po mergnutí smaž (lokálně i na GitHubu).
- Před pushem vždy `npm run build` — je to jediná kontrola, kterou tu máme.

## Obsah webu

- Texty a data akcí jsou **hardcoded v komponentách**, žádné CMS ani datové soubory.
- Eventy: `src/components/Events.tsx` — sekce `#eventy`, nadpis „Kde to šimrá“. Každá akce je jeden `<EventCard>`.
- **Proběhlé akce se z Events.tsx mažou** (nearchivují se). Grid je na desktopu tříslupcový (`w-[calc((100%-48px)/3)]`), na mobilu horizontální scroll — počet karet neřeš, layout sedí sám.
- Další sekce: `Hero`, `About`, `Stats`, `Festival`, `Testimonials`, `B2BStrip`/`B2BGateway`, `Footer`. Podstránky: `/konzultace`, `/pro-firmy`, `/sol`.

## Stránka /sol

- Trvalá adresa a QR pro ŠOL (`public/sol-qr.png`, `.svg`). Na každý ŠOL se mění jen údaje a slovo z dílu, odkaz na Meet se pošle až po správném slově.
- Změna údajů: `/sol/zmena?klic=…` (klíč v `SOL_ADMIN_KEY`, bez něj 404). Vloží se text pozvánky z kalendáře, zbytek se vyplní sám.
- Data: na Vercelu soukromý Blob store `simrani-sol` (`BLOB_READ_WRITE_TOKEN`, platí jen pro tenhle store), na lokálu `.data/sol.json`.
- Ve vývojovém režimu je odkaz v HTML kvůli ladicím datům Reactu. Ochranu ověřuj jen na produkčním buildu.

## Prostředí (Claude Code on the web)

- `node_modules` v čerstvém kontejneru chybí → před buildem `npm ci`.
- **simrani.cz je blokované egress proxy** — živý web odsud nejde načíst, takže nasazení nelze ověřit z tohoto prostředí. Netvrď, že je změna na ostro ověřená; ověření je na Jakubovi.
- `git push --delete` remote branche vrací 403 (proxy) — smazání remote branche musí Jakub udělat v GitHub UI.
