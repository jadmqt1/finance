import { Spinner, makeStyles, tokens } from '@fluentui/react-components'
import { ArrowRightRegular } from '@fluentui/react-icons'
import { Link } from 'react-router-dom'
import { modules } from '../../modules'
import { useCurrentUser } from '../../shared/hooks/useCurrentUser'
import { DemandesTable } from '../demandes/DemandesTable'
import { useMesDemandes } from '../demandes/hooks'

const useStyles = makeStyles({
  title: { margin: '0 0 4px', fontSize: '28px', fontWeight: 700 },
  intro: { margin: '0 0 24px', color: tokens.colorNeutralForeground3 },
  cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' },
  card: { borderRadius: '12px', padding: '24px', color: '#fff', display: 'flex', flexDirection: 'column', gap: '4px' },
  cardIcon: { fontSize: '32px', marginBottom: '12px' },
  cardTitle: { fontWeight: 600, fontSize: '16px' },
  cardSub: { fontSize: '13px', opacity: 0.85, marginBottom: '16px' },
  cardBtn: {
    alignSelf: 'flex-start',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    borderRadius: '6px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '14px',
    ':hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
  },
  panel: { backgroundColor: tokens.colorNeutralBackground1, borderRadius: '12px', padding: '24px', boxShadow: tokens.shadow4 },
  panelHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' },
  panelTitle: { margin: 0, fontSize: '20px', fontWeight: 600 },
  seeAll: { display: 'inline-flex', alignItems: 'center', gap: '6px', color: tokens.colorBrandForegroundLink, textDecoration: 'none', fontWeight: 600 },
})

export function AccueilPage() {
  const styles = useStyles()
  const { data: user } = useCurrentUser()
  const { data: demandes, isLoading, error } = useMesDemandes(5)
  const firstName = user?.fullName?.split(' ')[0]

  return (
    <>
      <h1 className={styles.title}>Bonjour{firstName && `, ${firstName}`} !</h1>
      <p className={styles.intro}>Voici un aperçu de vos demandes et un accès rapide aux modules.</p>

      <div className={styles.cards}>
        {modules.map(({ key, label, subtitle, icon: Icon, color, path }) => (
          <section key={key} className={styles.card} style={{ backgroundColor: color }} aria-label={label}>
            <Icon className={styles.cardIcon} aria-hidden />
            <div className={styles.cardTitle}>{label}</div>
            <div className={styles.cardSub}>{subtitle}</div>
            <Link to={`${path}/nouvelle`} className={styles.cardBtn}>
              Faire une demande <ArrowRightRegular aria-hidden />
            </Link>
          </section>
        ))}
      </div>

      <section className={styles.panel}>
        <div className={styles.panelHead}>
          <h2 className={styles.panelTitle}>Mes demandes récentes</h2>
          <Link to="/demandes" className={styles.seeAll}>
            Voir toutes mes demandes <ArrowRightRegular aria-hidden />
          </Link>
        </div>
        {isLoading && <Spinner label="Chargement…" />}
        {error && <p role="alert">Impossible de charger vos demandes.</p>}
        {demandes && <DemandesTable demandes={demandes} />}
      </section>
    </>
  )
}
