# Audit pre-merge · feat/admin-media

Data audit: 15 luglio 2026

## Esito

Il branch è pronto al merge dopo i controlli automatici e il collaudo manuale delle funzioni principali. Non sono emersi bug bloccanti nella logica Formazione, Listone, Rose, Classifica, Neon o BSD.

## Controlli eseguiti

- diagnosi repository e file obbligatori;
- 42 test Node;
- typecheck TypeScript;
- build Vite;
- controllo sintassi di JS, API e moduli CJS;
- controllo route generate e riferimenti statici;
- `git diff --check`;
- audit dipendenze di produzione root e dashboard: 0 vulnerabilità;
- scansione duplicazioni: 0,28% di righe duplicate, non significativa;
- controllo di file `.env`, report diagnostici e credenziali tracciate: nessun dato sensibile committato.

## Correzioni applicate durante l'audit

- pannello Admin Links ridisegnato senza cambiare ID, eventi o funzioni;
- proxy 9:16 protetto da risposte immagine superiori a 5 MB anche durante lo streaming;
- build Vercel resa deterministica con `npm ci`;
- aggiunti header di sicurezza di base;
- diagnosi aggiornata per includere Neon, migrazione e proxy foto;
- documentazione locale e architettura riallineate allo stato reale;
- README corretto sulla visualizzazione delle penalizzazioni.

## Debito tecnico consapevole

`lib/player-media.cjs` è il file più grande del backend e contiene ancora compatibilità legacy insieme alla pipeline BSD diretta. I test coprono i percorsi attivi; dividerlo adesso aumenterebbe il rischio senza migliorare il comportamento utente. Il refactor consigliato, dopo il merge, è separarlo in:

- `player-media/provider.cjs`;
- `player-media/matching.cjs`;
- `player-media/manifest.cjs`;
- `player-media/diagnostics.cjs`.

La toolchain Vite 5 presenta advisory nelle sole dipendenze di sviluppo. Le dipendenze di produzione risultano pulite; l'aggiornamento major di Vite è rinviato a un branch dedicato per non introdurre una migrazione di build dentro questo merge funzionale.

## Checklist merge

```bash
npm ci
npm --prefix dashboard ci
npm run verify
git diff --check
git status
```

Dopo il merge verificare in Production:

1. accesso a entrambi gli Admin Links;
2. lettura impostazioni Neon;
3. un override BSD manuale;
4. apertura di un blocco portieri;
5. generazione grafica 9:16;
6. caricamento di uno stemma di prova;
7. penalizzazioni inline in Classifica.
