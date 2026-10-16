# Workflow — Réservation de restaurants: who changes the status

| Step | Done by | Status change |
|---|---|---|
| Demandeur submits | App | → En validation |
| N+1 approves / refuses | **Flow 1** — trigger: `fin_demande` row created; Office 365 Users "Get manager" + Start approval | → En cours / Refusée |
| Service des achats confirms / proposes alternative / refuses | App (Traitement page) | → Approuvée / Complément demandé / Refusée |
| Demandeur accepts / refuses the alternative | App (Détail page) | → Approuvée / Refusée |
| Email notifications | **Flow 2** — trigger: `fin_statut` changes | – |

## Status values (`fin_statutdemande`)
| Status | Meaning |
|---|---|
| En validation | waiting for the N+1 |
| En cours | handled by Service des achats |
| Complément demandé | alternative restaurant proposed, waiting for the demandeur |
| Approuvée | booking confirmed |
| Refusée | refused by the N+1, by Service des achats, or alternative refused by the demandeur |
