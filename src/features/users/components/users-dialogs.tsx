import { useUsers } from '../context/users-context'
import { UsersDeleteDialog } from './users-delete-dialog'
import { UsersInviteDialog } from './users-invite-dialog'
import { PublicInviteQRDialog } from '@/features/team/components/public-invite-qr-dialog'

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  return (
    <>
      <UsersInviteDialog
        key='user-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      <PublicInviteQRDialog
        key='user-qr'
        open={open === 'qr'}
        onOpenChange={() => setOpen('qr')}
      />

      {currentRow && (
        <UsersDeleteDialog
          key={`user-revoke-${currentRow.id}`}
          open={open === 'revoke'}
          onOpenChange={() => {
            setOpen('revoke')
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          currentRow={currentRow}
        />
      )}
    </>
  )
}
