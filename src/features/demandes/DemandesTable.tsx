import {
  Badge,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  makeStyles,
  tokens,
} from '@fluentui/react-components'
import { CircleFilled, MoreHorizontalRegular } from '@fluentui/react-icons'
import { useNavigate } from 'react-router-dom'
import { moduleByKey } from '../../modules'
import { statuts } from '../../shared/lib/statut'
import type { Demande } from './api'

const useStyles = makeStyles({
  wrap: { border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusLarge, overflowX: 'auto' },
  head: { backgroundColor: tokens.colorNeutralBackground3 },
  actions: { width: '80px', textAlign: 'center' },
})

export function DemandesTable({ demandes }: { demandes: Demande[] }) {
  const styles = useStyles()
  const navigate = useNavigate()

  return (
    <div className={styles.wrap}>
      <Table aria-label="Mes demandes">
        <TableHeader className={styles.head}>
          <TableRow>
            <TableHeaderCell>Référence</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Objet</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Statut</TableHeaderCell>
            <TableHeaderCell className={styles.actions}>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demandes.map((d) => {
            const m = moduleByKey(d.type)
            const s = statuts[d.statut]
            return (
              <TableRow key={d.id}>
                <TableCell>{d.reference}</TableCell>
                <TableCell>{m.typeLabel}</TableCell>
                <TableCell>{d.objet}</TableCell>
                <TableCell>{new Date(d.date).toLocaleDateString('fr-FR')}</TableCell>
                <TableCell>
                  <Badge appearance="tint" shape="rounded" color={s.color} icon={<CircleFilled />}>
                    {s.label}
                  </Badge>
                </TableCell>
                <TableCell className={styles.actions}>
                  <Menu>
                    <MenuTrigger disableButtonEnhancement>
                      <Button appearance="subtle" icon={<MoreHorizontalRegular />} aria-label={`Actions ${d.reference}`} />
                    </MenuTrigger>
                    <MenuPopover>
                      <MenuList>
                        <MenuItem onClick={() => navigate(`${m.path}/${d.id}`)}>Voir le détail</MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
