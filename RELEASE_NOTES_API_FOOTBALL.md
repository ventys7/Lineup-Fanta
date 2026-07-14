# Patch API-Football

## Foto

- FotMob rimosso dal flusso attivo.
- FP e PD usano API-Football esclusivamente per identificativo, nome, club e foto.
- Ruolo, quotazione, proprietario e composizione delle rose restano dati del Listone.
- Bootstrap tramite rose complete dei club, con tetto prudenziale condiviso di 90 richieste giornaliere.
- Download delle facce in piccoli gruppi paralleli e salvataggio su storage immutabile.
- Il pannello Admin Links completa l'intera procedura con un solo clic e mantiene aperta la lista degli irrisolti.

## Crest

- I crest reali continuano a provenire da Kick-off.
- Nessuna chiamata API-Football viene usata per gli stemmi dei club.

## Interfaccia

- Penalizzazioni ripristinate dentro la Classifica: badge accanto alla squadra e riepilogo sotto la tabella.
- Richiami e penalizzazioni riscritti come schede con manager, motivazione, data e valore.
- Blocco portieri nelle Rose con crest nel riquadro chiuso, nessuna ripetizione del club e facce individuali nell'espansione.
- Foto disponibili in Listone, Rose, Formazione e output 9:16.

## Esecuzione

- `API_FOOTBALL_KEY` è letta solo dal backend.
- Le funzioni di sincronizzazione hanno durata massima configurata a 300 secondi.
- La cron giornaliera avvia le date concordate e continua le sincronizzazioni rimaste pendenti.
