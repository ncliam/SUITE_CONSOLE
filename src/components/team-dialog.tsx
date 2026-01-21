import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Team } from '@/types/team'

interface TeamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  team?: Team | null // null = add mode, Team = edit mode
  onSave: (team: Partial<Team>) => void
}

export function TeamDialog({ open, onOpenChange, team, onSave }: TeamDialogProps) {
  const isEditMode = !!team

  const [formData, setFormData] = useState({
    name: '',
    taxId: '',
    billingEmail: '',
  })

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name || '',
        taxId: team.taxId || '',
        billingEmail: team.billingEmail || '',
      })
    } else {
      setFormData({
        name: '',
        taxId: '',
        billingEmail: '',
      })
    }
  }, [team, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...(team ? { id: team.id } : {}),
      name: formData.name,
      taxId: formData.taxId,
      billingEmail: formData.billingEmail,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? 'Chỉnh sửa Team' : 'Thêm Team mới'}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? 'Cập nhật thông tin team. Team cần được phê duyệt lại sau khi thay đổi.'
                : 'Tạo team mới. Team sẽ cần được phê duyệt trước khi sử dụng.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên Team *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nhập tên team"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="taxId">Mã số thuế</Label>
              <Input
                id="taxId"
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                placeholder="Nhập mã số thuế"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="billingEmail">Email thanh toán *</Label>
              <Input
                id="billingEmail"
                type="email"
                value={formData.billingEmail}
                onChange={(e) => setFormData({ ...formData, billingEmail: e.target.value })}
                placeholder="billing@example.com"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit">
              {isEditMode ? 'Lưu thay đổi' : 'Tạo Team'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
