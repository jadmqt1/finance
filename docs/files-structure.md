# Files structure — Casanet Flow (Réservation de restaurants)

## The big idea: 3 layers

```
  PAGES (.tsx)          → what the user sees and clicks
       ↓ uses
  HOOKS (hooks.ts)      → loading, errors, refreshing the lists
       ↓ calls
  API (api.ts)          → the only place that talks to Dataverse
       ↓ uses
  src/generated/        → code created by pac (never edit it)
```

Each layer only talks to the layer just below it. If a Dataverse column name changes, fix it in `api.ts`; no page changes.

## Tree

```
src/
  generated/                       # pac-generated services & models — never edit
  modules.ts                       # registry of the 4 modules
  app/
    App.tsx                        # FluentProvider + QueryClientProvider + HashRouter
    routes.tsx                     # URL → page
  layout/
    AppShell.tsx  Sidebar.tsx  Header.tsx
  shared/
    lib/statut.ts                  # status value → label + badge colour
    lib/reference.ts               # (type, fin_name) → "RES-2025-014"
    hooks/useCurrentUser.ts        # signed-in user's name + email
    hooks/useIsAchats.ts           # is the user in Service des achats
  features/reservations/
    api.ts                         # only file importing src/generated
    hooks.ts                       # React Query wrappers
    options.ts                     # dropdown choices (value → label)
    validation.ts                  # form rules
    validation.test.ts             # test for the rules
    ReservationFormPage.tsx        # the wireframe form
    InvitesField.tsx               # N guest-name inputs
    ReservationDetailPage.tsx      # details + status + accept/refuse alternative
    TraitementAchatsPage.tsx       # Service des achats queue
    DecisionAchatsDialog.tsx       # Confirmer / Proposer / Refuser
```

## Shared files

| File | What it does | Why |
|---|---|---|
| `modules.ts` | List of the 4 modules: label, icon, colour, prefix (`RES`), route (`/reservations`). | Sidebar, Accueil cards and "Nouvelle demande" all read it. Add a module here → it appears everywhere. |
| `app/routes.tsx` | `/reservations/nouvelle` → form, `/reservations/:id` → détail, `/achats/traitement` → Service des achats page. | All URLs in one place. |
| `shared/lib/statut.ts` | Status number from Dataverse → label + colour (`100000003` → "Approuvée", green). | The badge appears in many places; one source. |
| `shared/lib/reference.ts` | Builds the visible reference (Réservation + `0014` → `RES-2025-014`). | Same format everywhere. |
| `shared/hooks/useCurrentUser.ts` | Gets the signed-in user's name and email from the Power Apps SDK. | Pre-fills "Nom et prénom" and "E-mail". |
| `shared/hooks/useIsAchats.ts` | `true` if the user is in Service des achats. | Shows the "Traitement" menu only to them. This only hides the menu; the real protection is the Dataverse security role. |

## `features/reservations/` — logic (no UI)

**`api.ts`** — the only file that talks to Dataverse:
- `createReservation(form)` → creates `fin_demande` (type Réservation, status En validation), then `fin_reservation` linked to it.
- `getReservation(id)` → one booking + its parent, for the Détail page.
- `listATraiter()` → bookings with status "En cours", for Service des achats.
- `decideAchats(id, decision, comment, restaurantPropose?)` → Service des achats confirms, proposes an alternative or refuses.
- `repondreProposition(id, accepte)` → the demandeur accepts or refuses the alternative.

It also translates names: `fin_datereservation` ↔ `date`.

**`hooks.ts`** — wraps each `api.ts` function with React Query:
- `useReservation(id)` → `{ data, isLoading, error }`
- `useCreateReservation()` → sends the form; on success refreshes "Mes demandes".

**`options.ts`** — dropdown choices with their Dataverse values:
```ts
export const typesRepas = [
  { value: 100000000, label: 'Petit-déjeuner' },
  { value: 100000001, label: 'Déjeuner' }, ...
]
```

**`validation.ts`** — checks before sending:
- required (*) fields are filled in
- the date is not in the past
- "Autre" chosen → free-text field filled in
- number of guest names = Nombre d'invités

Returns errors like `{ ville: 'Champ obligatoire' }`, shown under each field.

**`validation.test.ts`** — small test that the rules work.

## `features/reservations/` — screens

**`ReservationFormPage.tsx`** — the wireframe form:
1. Name and email filled in from `useCurrentUser`.
2. User fills in the form and clicks **Envoyer**.
3. `validation.ts` runs → errors shown in red.
4. Valid → `useCreateReservation` saves it → redirect to the Détail page with "Demande envoyée".

**`InvitesField.tsx`** — "Liste d'invités": pick 6 guests → 6 name boxes, 3 per row (as in the wireframe).

**`ReservationDetailPage.tsx`** — everything the demandeur entered + status badge. If status is **Complément demandé**: shows the proposed restaurant, the Service des achats comment, and **Accepter** / **Refuser** buttons.

**`TraitementAchatsPage.tsx`** — Service des achats only: table of bookings with status "En cours". Click a row → decision dialog.

**`DecisionAchatsDialog.tsx`** — 3 choices:
- **Confirmer** → Approuvée
- **Proposer un autre restaurant** → asks for the restaurant name → Complément demandé
- **Refuser** → asks for a reason → Refusée

## Full example: one booking from start to finish

```
1. Ahmed opens /reservations/nouvelle
   ReservationFormPage → useCurrentUser fills in his name and email

2. He clicks Envoyer
   validation.ts ✔ → hooks.useCreateReservation → api.createReservation
   → Dataverse: fin_demande (En validation) + fin_reservation

3. Flow 1 (Power Automate) sends an approval to his N+1
   N+1 approves → status = En cours

4. H.Saadoune opens /achats/traitement
   TraitementAchatsPage → clicks the row → DecisionAchatsDialog
   "Proposer un autre restaurant" → api.decideAchats → Complément demandé

5. Flow 2 emails Ahmed. He opens /reservations/:id
   ReservationDetailPage → Accepter → api.repondreProposition → Approuvée
```

## Other modules

Notes de frais, Déplacements and Cautions use the same files: `api.ts`, `hooks.ts`, `options.ts`, `validation.ts`, then the pages. Once Réservations works, copy the folder and change the fields.
