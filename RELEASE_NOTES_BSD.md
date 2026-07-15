# Patch BSD e manifest atomici

## Foto giocatori

- API-Football rimossa dal flusso attivo.
- FP e PD usano BSD esclusivamente dal backend per identificativo, nome, club e ritratto.
- Ruolo, quotazione, proprietario, crediti e composizione delle rose restano dati del Listone.
- I ritratti standard sono scaricati da `/img/player/<id>/`, senza variante `sor=true`.
- Ogni immagine viene copiata e riletta dal Vercel Blob prima di entrare nel manifest.
- Il manifest pubblico contiene soltanto URL storage verificati.

## Atomicità

- Manifest live separati: `media/fp.json` e `media/pd.json`.
- Cataloghi separati: `media/bsd/catalog-fp.json` e `media/bsd/catalog-pd.json`.
- Job e manifest temporanei separati per lega.
- Il frontend pubblico non avvia più discovery o sincronizzazioni.
- Il manifest live viene scritto una sola volta, alla conclusione del job.
- Gli errori di una foto conservano l'eventuale ritratto precedente.
- Un errore sistemico lascia invariato il manifest live.

## Sincronizzazione

- “Sincronizza nuove” elabora soltanto i nomi del Listone privi di una foto verificata.
- “Aggiorna tutte” rilegge le rose e aggiorna le facce con pubblicazione atomica.
- Il cron controlla quotidianamente i nuovi giocatori e avvia il refresh completo il 15 gennaio e il 15 luglio.
- `BSD_API_KEY` è letta soltanto dal backend.

## Crest

- I crest reali continuano a provenire da Kick-off.
- BSD non viene usato per gli stemmi dei club.
