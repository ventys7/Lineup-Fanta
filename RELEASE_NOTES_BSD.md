# Foto BSD dirette

## Foto giocatori

- API-Football non è più usata.
- FP e PD identificano i giocatori tramite le rose BSD e mantengono il Listone come unica fonte dei dati fantacalcistici.
- Le facce sono servite direttamente da `https://sports.bzzoiro.com/img/player/<id>/`.
- Il frontend usa lazy loading e cache del browser.
- Nessuna faccia viene copiata nel Vercel Blob.

## Neon e operazioni Blob

- Zero `put`, `copy`, `list` o `head` Blob nel flusso delle foto giocatori.
- Rimossi cron, job, staging e pubblicazione dei manifest media nel Blob.
- Override manuali, associazioni squadra, cache del manifest, impostazioni, codici e stemmi sono persistiti in Neon.
- In produzione una configurazione Neon mancante blocca le scritture invece di ripiegare sul Blob.
- La procedura una tantum “Migra Blob → Neon” legge i dati legacy senza scrivere nel Blob.

## Matching

- Restano attivi alias club, seed verificati FP/PD e selezione automatica delle neopromosse tramite sovrapposizione delle rose.
- I casi non sicuri restano visibili in Admin Links come elementi da controllare.
- I crest reali continuano a provenire esclusivamente da Kick-off.


## Interfaccia media

- I candidati manuali sono selezionabili e vengono salvati immediatamente in Neon.
- La ricerca mostra prima i nomi simili, poi la rosa completa e infine il database della lega.
- Corretto l'alias Nottingham Forest.
- Ripristinate le facce nei blocchi portieri e nella grafica 9:16 tramite proxy same-origin senza Blob.
