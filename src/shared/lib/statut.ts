import type { BadgeProps } from '@fluentui/react-components'

export type Statut = 'EnValidation' | 'EnCours' | 'ComplementDemande' | 'Approuvee' | 'Refusee'

export const statuts: Record<Statut, { label: string; color: BadgeProps['color'] }> = {
  EnValidation: { label: 'En validation', color: 'warning' },
  EnCours: { label: 'En cours', color: 'brand' },
  ComplementDemande: { label: 'Complément demandé', color: 'danger' },
  Approuvee: { label: 'Approuvée', color: 'success' },
  Refusee: { label: 'Refusée', color: 'important' },
}
