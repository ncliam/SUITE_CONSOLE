import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MemberList } from '@/features/team/components/member-list'
import { InviteMemberDialog } from '@/features/team/components/invite-member-dialog'
import { PublicInviteQRDialog } from '@/features/team/components/public-invite-qr-dialog'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { useActiveTeam } from '@/hooks/use-team'
import { Button } from '@/components/ui/button'
import { UserPlus, QrCode, AlertCircle } from 'lucide-react'

function TeamMembersPage() {
  const [inviteOpen, setInviteOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const { data: activeTeam } = useActiveTeam()

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center gap-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Thành viên</h1>
          <p className="text-muted-foreground">
            Quản lý thành viên và quyền truy cập trong team
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setQrOpen(true)} disabled={!activeTeam}>
            <QrCode className="h-4 w-4 mr-2" />
            Tạo QR công khai
          </Button>
          <Button onClick={() => setInviteOpen(true)} disabled={!activeTeam}>
            <UserPlus className="h-4 w-4 mr-2" />
            Mời thành viên
          </Button>
        </div>
      </div>

      {!activeTeam ? (
        <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-4 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>Vui lòng chọn team để xem danh sách thành viên</span>
        </div>
      ) : (
        <MemberList />
      )}

      <InviteMemberDialog open={inviteOpen} onOpenChange={setInviteOpen} />
      <PublicInviteQRDialog open={qrOpen} onOpenChange={setQrOpen} />
    </div>
    </>
  )
}

export const Route = createFileRoute('/_authenticated/team/members')({
  component: TeamMembersPage,
})
