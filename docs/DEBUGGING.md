# Debug locale

La versione essenziale è statica e non richiede API locali.

```bash
npm ci
npm --prefix dashboard ci
npm run build
npm run dev
```

Pagine:

- `http://localhost:4173/fp/`
- `http://localhost:4173/pd/`

Le fonti dati sono configurate in `js/config.js`:

- `csvUrl` per Listone, Rose e lineup builder;
- `standingsCsvUrl` e `standingsFallbackUrl` per la Classifica;
- `teamProfilesUrl` per loghi e dati delle fantasquadre.

La card Kick-off usa direttamente `https://kick-off-tau.vercel.app/api/lineup`.
