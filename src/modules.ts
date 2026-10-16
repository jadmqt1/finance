import {
  AirplaneTakeOffRegular,
  FoodRegular,
  ReceiptRegular,
  ShieldCheckmarkRegular,
  type FluentIcon,
} from '@fluentui/react-icons'

export type ModuleKey = 'notesFrais' | 'reservations' | 'deplacements' | 'cautions'

export type AppModule = {
  key: ModuleKey
  label: string
  typeLabel: string // singular, shown in the "Type" column
  subtitle: string
  icon: FluentIcon
  color: string
  prefix: string
  path: string
}

// Single source for the sidebar, the Accueil cards and the reference prefixes.
export const modules: AppModule[] = [
  { key: 'notesFrais', label: 'Notes de frais', typeLabel: 'Note de frais', subtitle: 'Invitations clients', icon: ReceiptRegular, color: '#2563eb', prefix: 'NF', path: '/notes-frais' },
  { key: 'reservations', label: 'Réservations restaurants', typeLabel: 'Réservation', subtitle: 'Réunions et événements', icon: FoodRegular, color: '#16a34a', prefix: 'RES', path: '/reservations' },
  { key: 'deplacements', label: "Déplacements à l'étranger", typeLabel: 'Déplacement', subtitle: 'Missions professionnelles', icon: AirplaneTakeOffRegular, color: '#6d28d9', prefix: 'DEP', path: '/deplacements' },
  { key: 'cautions', label: 'Cautions', typeLabel: 'Caution', subtitle: 'Garanties financières', icon: ShieldCheckmarkRegular, color: '#f97316', prefix: 'CAU', path: '/cautions' },
]

export const moduleByKey = (key: ModuleKey) => modules.find((m) => m.key === key)!
