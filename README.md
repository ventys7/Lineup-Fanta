# Lineup-Fanta

Applicazione statica per comporre, salvare e condividere le formazioni delle due leghe fantasy.

## Rotte

- `/` — scelta della lega.
- `/fp` — PianginaCUP / Fanta Premier.
- `/pd` — LaLigaCUP / Fanta Liga.

In locale, se il server statico non gestisce le rewrite Vercel, sono disponibili anche `/?league=fp` e `/?league=pd`.

## Architettura essenziale

| Area | File principali | Responsabilità |
| --- | --- | --- |
| Configurazione e routing | `js/config.js`, `js/router.js`, `vercel.json` | Leghe, tema, rotte e rewrite. |
| CSV e stato condiviso | `js/csv.js`, `js/state.js` | Caricamento listone e stato della formazione. |
| Persistenza | `js/persistence.js` | Bozze e ultimo manager in `localStorage`, separati per lega. |
| Formazione | `js/formation-model.js`, `js/slots-*.js`, `js/mobile-slots.js`, `js/picker.js`, `js/dragdrop.js` | Moduli, campo, panchina, desktop e mobile. |
| Rosa e portieri | `js/roster.js`, `js/gk-*.js` | Rosa, blocchi portieri e relativa modale. |
| Switch | `js/switch-*.js`, `js/switch.js` | Switch Base e Plus, esclusi i portieri. |
| Output e story | `js/output.js`, `js/story.js` | WhatsApp, Docs, grafica 9:16, condivisione e copia immagine. |
| Calendario | `js/fixtures.js`, `css/fixtures-card.css` | Card Kick-off ottenuta solo da endpoint cache-only. |
| Interfaccia | `css/style.css`, `css/formation-clean.css`, `css/sticky-story-mobile.css`, `css/landing.css` | Base, campo, sticky header/story e landing. |

## Identità visiva per rotta

`/fp` usa il logo PianginaCUP e `/pd` quello LaLigaCUP sia nell'header sia nei tag `icon` e `apple-touch-icon`. La home `/` non pubblica un'icona di lega: resta volutamente neutra in tab e bookmark. I percorsi sono definiti in `js/config.js`; gli asset stanno in `assets/identity/`.

## Dati e persistenza

Ogni lega usa il proprio CSV in `js/config.js`. Le chiavi browser sono isolate con prefissi `lineup-fp:` e `lineup-pd:`; la bozza contiene manager, modulo, selezioni, posizioni manuali e switch.

La card Kick-off legge `https://kick-off-tau.vercel.app/api/lineup?league=fp|pd`. L'app non chiama direttamente il provider calcistico e gestisce l'assenza di cache senza bloccare la composizione della formazione.

## Controllo statico prima di un push

```bash
./scripts/check-static.sh
```

Il controllo verifica sintassi JavaScript, riferimenti locali di CSS/JS nell'HTML, assenza di cartelle backup della patch tracciabili e spaziature Git problematiche. Non sostituisce il test manuale di FP/PD su desktop e iPhone.

## Sviluppo

L'app non richiede build né dipendenze npm: è HTML/CSS/JavaScript statico. Per una prova locale basta un server statico; in produzione Vercel serve le route `/fp` e `/pd` tramite `vercel.json`.
