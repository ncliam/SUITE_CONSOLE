import { createFileRoute } from '@tanstack/react-router'
import { useActiveTeam } from '@/hooks/use-team'
import { TeamSelector } from '@/components/team-selector'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

function TeamSettingsPage() {
  const { data: activeTeam } = useActiveTeam()

  const handleSave = () => {
    toast.success('Đã lưu cài đặt team')
  }

  if (!activeTeam) {
    return (
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Cài đặt Team</h1>
          <TeamSelector />
        </div>
        <p className="text-muted-foreground">Vui lòng chọn team</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cài đặt Team</h1>
          <div className="flex items-center gap-2 mt-2">
            {activeTeam.verified ? (
              <Badge variant="default" className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Đã xác minh
              </Badge>
            ) : (
              <Badge variant="secondary" className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Chờ xác minh
              </Badge>
            )}
          </div>
        </div>
        <TeamSelector />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
          <CardDescription>Thông tin team và liên hệ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Tên team</Label>
              <Input id="name" defaultValue={activeTeam.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Mã số thuế</Label>
              <Input id="taxId" defaultValue={activeTeam.taxId} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingEmail">Email thanh toán</Label>
            <Input id="billingEmail" type="email" defaultValue={activeTeam.billingEmail} />
          </div>

          {activeTeam.address && (
            <>
              <div className="space-y-2">
                <Label htmlFor="street">Địa chỉ</Label>
                <Input id="street" defaultValue={activeTeam.address.street} />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">Quận/Huyện</Label>
                  <Input id="city" defaultValue={activeTeam.address.city} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Tỉnh/Thành phố</Label>
                  <Input id="province" defaultValue={activeTeam.address.province} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Mã bưu điện</Label>
                  <Input id="postalCode" defaultValue={activeTeam.address.postalCode} />
                </div>
              </div>
            </>
          )}

          <Button onClick={handleSave}>Lưu thay đổi</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/team/settings')({
  component: TeamSettingsPage,
})
