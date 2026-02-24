import { IconMailPlus } from '@tabler/icons-react'
import { QrCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUsers } from '../context/users-context'

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('qr')}
      >
        <QrCode size={18} />
        <span>Tạo QR công khai</span>
      </Button>
      <Button
        className='space-x-1'
        onClick={() => setOpen('invite')}
      >
        <span>Gửi lời mời</span> <IconMailPlus size={18} />
      </Button>
    </div>
  )
}
