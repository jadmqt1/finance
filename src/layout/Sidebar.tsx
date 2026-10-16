import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components'
import {
  AddSquareRegular,
  DocumentTextRegular,
  HomeRegular,
  InfoRegular,
  SettingsRegular,
  WalletRegular,
  type FluentIcon,
} from '@fluentui/react-icons'
import { NavLink } from 'react-router-dom'
import { modules } from '../modules'

const useStyles = makeStyles({
  root: {
    width: '240px',
    flexShrink: 0,
    backgroundColor: '#1b2a4a',
    color: '#cbd5e1',
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: '16px',
  },
  brand: { display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 20px 20px', color: '#fff', fontWeight: 600, fontSize: '16px' },
  section: { padding: '16px 20px 6px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em', color: '#94a3b8' },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 20px',
    color: 'inherit',
    textDecoration: 'none',
    fontSize: '14px',
    ':hover': { backgroundColor: 'rgba(255,255,255,0.06)', color: '#fff' },
    ':focus-visible': { outline: `2px solid ${tokens.colorStrokeFocus2}`, outlineOffset: '-2px' },
  },
  active: { backgroundColor: '#2563eb', color: '#fff', ':hover': { backgroundColor: '#2563eb' } },
  icon: { fontSize: '20px' },
  bottom: { marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px' },
})

type Item = { to: string; label: string; icon: FluentIcon }

const main: Item[] = [
  { to: '/', label: 'Accueil', icon: HomeRegular },
  { to: '/demandes', label: 'Mes demandes', icon: DocumentTextRegular },
  { to: '/nouvelle', label: 'Nouvelle demande', icon: AddSquareRegular },
]
const footer: Item[] = [
  { to: '/aide', label: 'Aide', icon: InfoRegular },
  { to: '/parametres', label: 'Paramètres', icon: SettingsRegular },
]

export function Sidebar() {
  const styles = useStyles()
  const link = ({ to, label, icon: Icon }: Item) => (
    <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => mergeClasses(styles.link, isActive && styles.active)}>
      <Icon className={styles.icon} aria-hidden />
      {label}
    </NavLink>
  )

  return (
    <nav className={styles.root} aria-label="Navigation principale">
      <div className={styles.brand}>
        <WalletRegular fontSize={24} aria-hidden />
        Gestion Finance
      </div>
      {main.map(link)}
      <div className={styles.section}>MODULES</div>
      {modules.map((m) => link({ to: m.path, label: m.label, icon: m.icon }))}
      <div className={styles.bottom}>{footer.map(link)}</div>
    </nav>
  )
}
