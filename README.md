# Lineup-Fanta

Web app essenziale per due leghe separate (`fp` e `pd`).

## Funzioni mantenute

- Lineup builder con titolari, panchina, moduli, switch e blocchi portieri.
- Card Kick-off con prossima deadline e partite del turno.
- Listone.
- Liste Rose.
- Classifica.
- Output WhatsApp, Docs e grafica 9:16.

Non sono presenti Calendario fantacalcio, Docs delle giornate, invio ufficiale delle formazioni, PIN, voti, risultati o API runtime.

## Avvio locale

```bash
npm ci
npm --prefix dashboard ci
npm run build
npm run dev
```

Aprire `http://localhost:4173/fp/` oppure `http://localhost:4173/pd/`.

## Verifica

```bash
npm run verify
```
