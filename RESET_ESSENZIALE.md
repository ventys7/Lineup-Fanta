# Reset essenziale

Questa versione mantiene soltanto:

- lineup builder;
- card Kick-off;
- Listone;
- Rose;
- Classifica.

Sono stati rimossi completamente:

- tab Calendario;
- Docs delle singole giornate;
- parser e snapshot delle giornate;
- PIN e invio ufficiale delle formazioni;
- richieste admin;
- voti, bonus/malus, risultati e calcolo giornata;
- Blob e API runtime;
- pannello amministrativo collegato alle giornate.

La formazione continua a essere salvata in `localStorage` come prima. La card Kick-off resta puramente informativa e non blocca il builder in caso di errore del servizio esterno.
