# Foto BSD dirette

## Foto giocatori

- API-Football non è più usata.
- FP e PD identificano i giocatori tramite le rose BSD e mantengono il Listone come unica fonte dei dati fantacalcistici.
- Le facce sono servite direttamente da `https://sports.bzzoiro.com/img/player/<id>/`.
- Il frontend usa lazy loading e cache del browser.
- Nessuna faccia viene copiata nel Vercel Blob.

## Operazioni Blob

- Zero `put`, `copy`, `list` o `head` Blob nel flusso delle foto giocatori.
- Rimossi cron, job, staging e pubblicazione dei manifest media nel Blob.
- I vecchi endpoint di sincronizzazione ora effettuano soltanto un ricalcolo in memoria.
- Il Blob continua a essere usato dalle funzioni indipendenti già esistenti, come configurazioni e stemmi delle fantasquadre.

## Matching

- Restano attivi alias club, seed verificati FP/PD e selezione automatica delle neopromosse tramite sovrapposizione delle rose.
- I casi non sicuri restano visibili in Admin Links come elementi da controllare.
- I crest reali continuano a provenire esclusivamente da Kick-off.
