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

`/fp` usa il logo PianginaCUP e `/pd` quello LaLigaCUP nell'header, nel favicon e nell'icona Apple Home Screen. Le due route sono documenti statici generati (`fp/index.html` e `pd/index.html`), così Safari riceve il rispettivo tag `apple-touch-icon` prima del JavaScript.

Le icone Web Clip sono file fisici specifici della route:

- `fp/favicon.png` e `fp/apple-touch-icon.png`
- `pd/favicon.png` e `pd/apple-touch-icon.png`

Restano intenzionalmente fuori dalla regola `no-store` di Vercel: Safari deve poterle conservare quando crea una scorciatoia Home Screen. I loro URL hanno una versione (`?v=5`) per forzare un nuovo download quando l'icona viene cambiata. La home `/` non dichiara favicon, manifest o icona Apple di lega e resta volutamente neutra.

Dopo ogni modifica a `index.html` o alla configurazione delle icone, esegui `node scripts/generate-route-pages.mjs` e includi i file generati nel commit. Il controllo statico verifica che non siano fuori sync.

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
