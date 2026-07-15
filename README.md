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
- sincronizzare soltanto i nuovi giocatori del Listone;
- avviare manualmente un aggiornamento completo delle foto;
- correggere soltanto le associazioni rimaste ambigue.

## Richiami, penalizzazioni e Classifica

La sezione disciplinare viene mostrata sotto la Classifica. Il parser pulisce l'HTML pubblicato da Google Docs ed estrae soltanto le voci reali, ignorando CSS, JavaScript e metadati interni.

Le penalizzazioni del CSV Classifica restano visibili sia accanto alla fantasquadra sia nel riepilogo interno alla card.

## Foto giocatori e crest

I dati fantacalcistici — ruolo, quotazione, proprietario e rosa — arrivano sempre dal CSV ufficiale.

- Foto giocatori FP e PD: BSD, usato esclusivamente dal backend come sorgente di acquisizione.
- Crest FP e PD: manifest già esposto dalla card Kick-off.
- Stemmi fantasquadre: modificabili dalla sezione Rose usando il codice della singola squadra, senza condividere la password admin.

Le pagine pubbliche leggono soltanto il manifest live e gli URL del Vercel Blob. Non interrogano BSD, non scaricano immagini e non modificano manifest.

La sincronizzazione segue un flusso atomico:

1. legge il Listone della sola lega;
2. recupera le rose BSD dei club interessati;
3. costruisce catalogo e manifest temporanei separati;
4. effettua il matching usando nome e club, senza usare il ruolo BSD;
5. scarica e verifica le immagini;
6. le salva in percorsi immutabili `player-faces/bsd/<player-id>/...`;
7. pubblica `media/fp.json` o `media/pd.json` soltanto alla fine.

Se una foto o una squadra non sono disponibili, le vecchie facce verificate restano nel manifest temporaneo. Un errore di sincronizzazione non sovrascrive il manifest live. FP e PD usano job, cataloghi e staging distinti.

Il cron giornaliero controlla soltanto la presenza di nuovi giocatori. Un aggiornamento completo è pianificato il 15 gennaio e il 15 luglio, oltre al pulsante manuale dell'Admin Links.

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
- `CRON_SECRET`, consigliata per proteggere la sincronizzazione pianificata
- eventuali variabili già necessarie alla card Kick-off

## Verifica

```bash
npm run verify
git diff --check
```
