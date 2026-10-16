import { Avatar, Button, makeStyles, tokens } from '@fluentui/react-components'
import { AlertRegular } from '@fluentui/react-icons'
import { Outlet } from 'react-router-dom'
import { useCurrentUser } from '../shared/hooks/useCurrentUser'
import { Sidebar } from './Sidebar'

const useStyles = makeStyles({
  root: { display: 'flex', minHeight: '100vh' },
  main: { flex: 1, minWidth: 0, backgroundColor: tokens.colorNeutralBackground2 },
  header: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px', padding: '16px 32px 0' },
  user: { display: 'flex', alignItems: 'center', gap: '10px' },
  name: { fontWeight: 600, fontSize: '14px' },
  sub: { fontSize: '12px', color: tokens.colorNeutralForeground3 },
  content: { padding: '8px 32px 32px' },
})

export function AppShell() {
  const styles = useStyles()
  const { data: user } = useCurrentUser()

  return (
    <div className={styles.root}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <Button appearance="subtle" icon={<AlertRegular />} aria-label="Notifications" />
          <div className={styles.user}>
            <Avatar name={user?.fullName} color="colorful" />
            <div>
              <div className={styles.name}>{user?.fullName}</div>
              <div className={styles.sub}>{user?.userPrincipalName}</div>
            </div>
          </div>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
