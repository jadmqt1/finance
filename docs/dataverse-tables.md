# Dataverse tables — Casanet Flow (Réservation de restaurants)

## Global choices (shared by all modules)
| Choice | Values |
|---|---|
| `fin_typedemande` | Note de frais · Réservation · Déplacement · Caution |
| `fin_statutdemande` | En validation (N+1) · En cours (Service des achats) · Complément demandé (alternative proposée, attente demandeur) · Approuvée (réservation confirmée) · Refusée |

## Restaurant choices
| Choice | Values |
|---|---|
| `fin_objetreservation` | Invitation client · Invitation partenaire · Invitation fournisseur · Réunion d'affaires · Repas d'équipe · Événement professionnel · Formation interne · Formation externe · Autre |
| `fin_typerepas` | Petit-déjeuner · Déjeuner · Dîner · Ftour du Ramadan |

## `fin_demande` (parent, shared by the 4 modules)
| Column | Type | Notes |
|---|---|---|
| `fin_name` (primary) | Autonumber | e.g. `DEM-{SEQNUM:4}`; UI displays `RES-…` from the type |
| `fin_type` | Choice `fin_typedemande` | required |
| `fin_objet` | Text (200) | summary shown in "Mes demandes" (restaurant / objet label) |
| `fin_statut` | Choice `fin_statutdemande` | default: En validation |
| `fin_validateur` | Lookup → User | N+1, filled by the flow |
| `fin_datevalidation` | Date & time | |
| `fin_motifrefus` | Multiline text | |
| Owner / Created on | built-in | Owner = demandeur, Created on = request date |

## `fin_reservation` (detail, 1 row per booking)
| Column | Type | Required | Wireframe field |
|---|---|---|---|
| `fin_name` (primary) | Text | | copy of the reference |
| `fin_demande` | Lookup → `fin_demande` | ✔ | |
| `fin_nomprenom` | Text (100) | | Nom et prénom (pre-filled from current user, editable) |
| `fin_email` | Email | | E-mail (pre-filled) |
| `fin_datereservation` | Date only | ✔ | Date de réservation |
| `fin_heurereservation` | Text (5) `hh:mm` | ✔ | Heure (Dataverse has no time-only column) |
| `fin_objetreservation` | Choice | ✔ | Objet de réservation |
| `fin_objetautre` | Text | if Autre | free text when "Autre" |
| `fin_typerepas` | Choice | ✔ | Type de repas |
| `fin_nombreinvites` | Whole number (1–20) | ✔ | Nombre d'invités |
| `fin_listeinvites` | Multiline text | ✔ | Liste d'invités, one name per line |
| `fin_ville` | Text (100) | ✔ | Ville |
| `fin_restaurant` | Text (150) | | Restaurant |
| `fin_remarque` | Multiline text | | Remarque |
| `fin_restaurantpropose` | Text (150) | | set by Service des achats (alternative) |
| `fin_commentaireachats` | Multiline text | | Service des achats' comment to the demandeur |
| `fin_reponsedemandeur` | Yes/No | | demandeur accepted the alternative |

> Shortcut: guests stored as text (one per line). Move to a child table `fin_invite` if guest-level reporting/search is needed.

## Security roles
| Role | `fin_demande` / `fin_reservation` |
|---|---|
| **CF Demandeur** (all Casanet staff) | Create + Read/Write own rows (User level) |
| **CF Achats** (team "Service des achats": A.Elmoulouaa, H.Saadoune) | Read/Write all rows (Organization level) |

N+1 needs no role: approval goes through Power Automate Approvals (Teams/Outlook).
