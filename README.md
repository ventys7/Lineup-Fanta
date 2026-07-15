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
- ricalcolare i collegamenti tra Listone e rose BSD;
- controllare le associazioni rimaste ambigue senza scrivere immagini nel Blob.

## Richiami, penalizzazioni e Classifica

La sezione disciplinare viene mostrata sotto la Classifica. Il parser pulisce l'HTML pubblicato da Google Docs ed estrae soltanto le voci reali, ignorando CSS, JavaScript e metadati interni.

Le penalizzazioni del CSV Classifica restano visibili sia accanto alla fantasquadra sia nel riepilogo interno alla card.

## Foto giocatori e crest

I dati fantacalcistici — ruolo, quotazione, proprietario e rosa — arrivano sempre dal CSV ufficiale.

- Foto giocatori FP e PD: BSD, usato esclusivamente dal backend come sorgente di acquisizione.
- Crest FP e PD: manifest già esposto dalla card Kick-off.
- Stemmi fantasquadre: modificabili dalla sezione Rose usando il codice della singola squadra, senza condividere la password admin.

Le pagine pubbliche ricevono dal backend un manifest calcolato in memoria con URL BSD diretti del formato `https://sports.bzzoiro.com/img/player/<id>/`. Il browser usa lazy loading e scarica soltanto le facce visibili o vicine allo schermo.

Il backend:

1. legge il Listone della lega;
2. recupera le rose BSD;
3. identifica automaticamente la squadra corretta tramite seed e sovrapposizione dei nomi;
4. abbina i giocatori usando nome e club, senza usare il ruolo BSD;
5. restituisce gli URL diretti e conserva il risultato in cache per sei ore.

Le facce non vengono scaricate, caricate, elencate o verificate nel Vercel Blob. Non esistono job, staging o cron media attivi. Il Blob resta usato soltanto dalle altre funzioni persistenti dell'app, come impostazioni e stemmi delle fantasquadre.

## Avvio locale

Creare `.env.local` nella root:

```env
BSD_API_KEY=token_privato
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
- `BSD_API_KEY`
- `BLOB_READ_WRITE_TOKEN`
- eventuali variabili già necessarie alla card Kick-off

## Verifica

```bash
npm run verify
git diff --check
```
