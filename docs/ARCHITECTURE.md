# Architettura essenziale

## Confini del prodotto

FP e PD condividono il codice ma mantengono fonti, profili, override e dati completamente separati tramite `leagueId`.

## Frontend

- `fp/` e `pd/`: shell pubbliche generate dalla stessa base.
- `js/`: Formazione e integrazioni della shell storica.
- `dashboard/src/`: Listone, Rose e Classifica in React/TypeScript.
- `assets/dashboard/`: bundle generato; non va modificato a mano.
- `fp/admin-links/` e `pd/admin-links/`: pannelli amministrativi separati, con la stessa logica JavaScript.

## API

- `api/settings.js`: configurazione pubblica della lega.
- `api/admin.js`: login, collegamenti, codici e migrazione legacy.
- `api/team-logo.js`: lettura e caricamento stemmi Neon.
- `api/player-media.js`: manifest BSD, ricerca e override manuali.
- `api/player-photo.js`: proxy same-origin usato soltanto dove il canvas deve leggere la faccia.
- `api/discipline.js`: parser e cache del Docs pubblicato.

## Persistenza

Neon è la sorgente runtime per impostazioni, fantasquadre, codici, stemmi, override BSD e cache media. Le foto giocatori non sono persistite: il manifest espone URL BSD diretti.

## Vincoli invarianti

1. Il ruolo fantacalcistico arriva esclusivamente dal CSV.
2. FP e PD non condividono dati runtime.
3. Il browser non avvia sincronizzazioni o scritture media automatiche.
4. Nessuna scrittura runtime ripiega sul Blob in produzione.
5. Gli asset generati si aggiornano soltanto tramite `npm run build`.

## Debito tecnico non bloccante

`lib/player-media.cjs` concentra ancora matching, cataloghi, diagnostica e compatibilità legacy. È ben coperto dai test, ma un futuro refactor potrà dividerlo in moduli `provider`, `matching`, `manifest` e `diagnostics`. Non è stato spezzato prima del merge per evitare modifiche invasive a una pipeline ormai stabile.
