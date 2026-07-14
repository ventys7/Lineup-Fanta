# Lineup-Fanta

Lineup-Fanta è il builder per le due leghe FP e PD, con Formazione, Listone, Rose, Classifica, card Kick-off e gestione essenziale delle fonti.

## Sezioni pubbliche

- `/fp/` — PianginaCUP / Fanta Premier
- `/pd/` — Fanta Liga

Ogni lega mantiene il proprio Listone, le proprie Rose, la propria Classifica e la propria configurazione.

## Pannelli Admin Links

I pannelli sono separati ma utilizzano la stessa password configurata tramite `ADMIN_LINKS_PASSWORD_HASH`:

- `/fp/admin-links/`
- `/pd/admin-links/`

Da ciascun pannello è possibile:

- cambiare il CSV Listone/Rose della sola lega;
- cambiare il CSV Classifica della sola lega;
- cambiare il Docs pubblicato Richiami/Penalizzazioni;
- generare o resettare i codici stemma delle fantasquadre;
- avviare con un solo pulsante la sincronizzazione delle foto;
- correggere soltanto le associazioni rimaste ambigue.

## Richiami, penalizzazioni e Classifica

La sezione disciplinare viene mostrata sotto la Classifica. Il parser pulisce l'HTML pubblicato da Google Docs ed estrae soltanto le voci reali, ignorando CSS, JavaScript e metadati interni.

Le penalizzazioni del CSV Classifica restano visibili sia accanto alla fantasquadra sia nel riepilogo interno alla card.

## Foto giocatori e crest

I dati fantacalcistici — ruolo, quotazione, proprietario e rosa — arrivano sempre dal CSV ufficiale.

- Foto giocatori FP e PD: API-Football.
- Crest FP e PD: manifest già esposto dalla card Kick-off.
- Stemmi fantasquadre: modificabili dalla sezione Rose usando il codice della singola squadra, senza condividere la password admin.

La prima sincronizzazione usa una richiesta rosa per club, non una richiesta per giocatore. Il catalogo viene poi confrontato localmente con il Listone. Le foto risolte vengono salvate nello storage del progetto con URL immutabili e sono riutilizzate da Listone, Rose, Formazione e output 9:16.

Il sistema mantiene un contatore condiviso FP/PD e si ferma prudenzialmente a 90 richieste API-Football giornaliere. Le immagini del CDN non aumentano questo contatore interno.

Quando il Listone contiene un giocatore nuovo, la pagina pubblica prova prima il catalogo locale senza chiamare API-Football. Solo l'Admin Links può aggiornare le rose mancanti.

## Avvio locale

Creare `.env.local` nella root:

```env
API_FOOTBALL_KEY=chiave_privata
```

Il nome non deve avere il prefisso `VITE_`: la chiave deve restare server-side.

Poi:

```bash
npm ci
npm --prefix dashboard ci
npm run verify
npm run dev:test
```

La password locale di test è `prova123`.

Indirizzi abituali:

```text
http://localhost:4173/fp/
http://localhost:4173/pd/
http://localhost:4173/fp/admin-links/
http://localhost:4173/pd/admin-links/
```

La porta può cambiare se `4173` è già occupata: usare sempre quella stampata dal Terminale.

## Variabili Vercel

- `ADMIN_LINKS_PASSWORD_HASH`
- `ADMIN_LINKS_SESSION_SECRET`
- `API_FOOTBALL_KEY`
- `BLOB_READ_WRITE_TOKEN`
- `CRON_SECRET`, consigliata per proteggere la sincronizzazione pianificata
- eventuali variabili già necessarie alla card Kick-off

## Verifica

```bash
npm run verify
git diff --check
```
