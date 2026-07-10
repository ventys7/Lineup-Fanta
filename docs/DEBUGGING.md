# Debugging di Lineup-Fanta

## Controllo completo

Dalla root del progetto:

```bash
npm run verify
```

Il comando esegue, nell'ordine:

1. diagnosi dei file e della configurazione;
2. test automatici dei parser CSV, Calendario e giornata;
3. typecheck TypeScript;
4. build Vite;
5. rigenerazione delle route statiche;
6. controllo statico del progetto;
7. controllo degli errori di whitespace Git.

## Server locale corretto

```bash
npm run dev
```

Usare questo server, non `python3 -m http.server`, perché espone anche le API locali `/api/calendar` e `/api/matchday`.

## Log dettagliati nel browser

Aprire una pagina aggiungendo:

```text
?debug=1
```

Esempio:

```text
http://localhost:4173/fp/?debug=1
```

I messaggi hanno prefissi come:

```text
[Lineup:bootstrap]
[Lineup:calendar]
[Lineup:matchday-detail]
[Lineup:resolver]
```

Per mantenere il debug attivo senza parametro URL:

```js
localStorage.setItem("lineup:debug", "1")
```

Per disattivarlo:

```js
localStorage.removeItem("lineup:debug")
```

## Dove cercare i problemi

- Formazione vanilla: `js/`
- Parsing CSV: `js/csv-parser.js`
- Conversione CSV → database Formazione: `js/csv-formation-db.js`
- Dashboard React: `dashboard/src/`
- Calendario React: `dashboard/src/calendar/`
- Resolver giocatori: `dashboard/src/playerResolver/`
- Stili dettaglio partita: `dashboard/src/styles/match-detail/`
- Parser server-side: `lib/`
- API Vercel: `api/`
- Server locale: `scripts/dev-server.mjs`

## Regola sui file generati

I sorgenti React/CSS sono dentro `dashboard/src/`. I file:

```text
assets/dashboard/dashboard.js
assets/dashboard/dashboard.css
```

sono generati dalla build e devono essere aggiornati prima del commit:

```bash
npm run build
```

## Errori tipici

### Calendario visibile ma dettaglio non disponibile

Controllare:

- `data/matchday-links.json`;
- URL pubblicato del Google Doc;
- console con `?debug=1`;
- risposta di `/api/matchday?...`.

### Crediti non aggiornati

Controllare nel CSV:

- nomi in colonna O;
- crediti in colonna P;
- dati dalla riga 8;
- corrispondenza del nome con il `Tag` della rosa.

### Giocatore non riconosciuto

Il resolver prova:

1. rosa corrente;
2. Listone completo;
3. ruolo atteso;
4. nome esatto, iniziale+cognome e acronimi noti.

Attivare `?debug=1` per vedere i tentativi e il punteggio di risoluzione.
