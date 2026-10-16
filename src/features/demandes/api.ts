import type { ModuleKey } from '../../modules'
import type { Statut } from '../../shared/lib/statut'

export type Demande = {
  id: string
  reference: string
  type: ModuleKey
  objet: string
  date: string // ISO
  statut: Statut
}

// shortcut: mock data, replace with the generated fin_demande service once `pac code add-data-source` has run.
const mock: Demande[] = [
  { id: '1', reference: 'NF-2025-001', type: 'notesFrais', objet: 'Déjeuner client - Société ABC', date: '2025-03-12T12:00:00', statut: 'Approuvee' },
  { id: '2', reference: 'RES-2025-014', type: 'reservations', objet: 'Restaurant La Table', date: '2025-03-10T12:00:00', statut: 'EnCours' },
  { id: '3', reference: 'DEP-2025-008', type: 'deplacements', objet: 'Mission Paris', date: '2025-03-05T12:00:00', statut: 'EnValidation' },
  { id: '4', reference: 'CAU-2025-003', type: 'cautions', objet: 'Garantie marché XYZ', date: '2025-03-01T12:00:00', statut: 'ComplementDemande' },
]

export async function listMesDemandes(top?: number): Promise<Demande[]> {
  return mock.slice(0, top)
}
