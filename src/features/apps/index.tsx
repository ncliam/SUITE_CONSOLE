import { useState } from 'react'
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TeamSelector } from '@/components/team-selector'
import { AppSubscriptionCard } from './components/app-subscription-card'
import { appsState, savedAppState } from '@/stores/applicationStore'
import { useActiveTeam } from '@/hooks/use-team'
import { useAtomValue, useSetAtom } from 'jotai'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { AlertCircle } from 'lucide-react'

const appText = new Map<string, string>([
  ['all', 'All Apps'],
  ['subscribed', 'Subscribed'],
  ['notSubscribed', 'Not Subscribed'],
])

export default function Apps() {
  const apps = useAtomValue(appsState)
  const setActiveApp = useSetAtom(savedAppState)
  const { data: activeTeam } = useActiveTeam()
  const navigate = useNavigate()
  const [sort, setSort] = useState('ascending')
  const [appType, setAppType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubscribe = (appCode: string, appName: string) => {
    // Mock subscription - show toast
    toast.success(`Đã đăng ký ${appName} thành công!`)
  }

  const handleAccess = (appCode: string) => {
    setActiveApp(appCode)
    navigate({ to: '/dashboard' })
  }

  const filteredApps = apps
    .sort((a, b) =>
      sort === 'ascending'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ml-auto flex items-center gap-4'>
          <TeamSelector />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Content ===== */}
      <Main fixed>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            Suite Apps
          </h1>
          <p className='text-muted-foreground'>
            Explore and subscribe to our enterprise apps
          </p>
        </div>

        {!activeTeam ? (
          <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-4 rounded-md my-4">
            <AlertCircle className="h-4 w-4" />
            <span>Vui lòng chọn team để xem và đăng ký ứng dụng</span>
          </div>
        ) : (
          <>
            <div className='my-4 flex items-end justify-between sm:my-0 sm:items-center'>
              <div className='flex flex-col gap-4 sm:my-4 sm:flex-row'>
                <Input
                  placeholder='Filter apps...'
                  className='h-9 w-40 lg:w-[250px]'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className='w-16'>
                  <SelectValue>
                    <IconAdjustmentsHorizontal size={18} />
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align='end'>
                  <SelectItem value='ascending'>
                    <div className='flex items-center gap-4'>
                      <IconSortAscendingLetters size={16} />
                      <span>Ascending</span>
                    </div>
                  </SelectItem>
                  <SelectItem value='descending'>
                    <div className='flex items-center gap-4'>
                      <IconSortDescendingLetters size={16} />
                      <span>Descending</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator className='shadow-sm' />
            <ul className='faded-bottom no-scrollbar grid gap-4 overflow-auto pt-4 pb-16 md:grid-cols-2 lg:grid-cols-3'>
              {filteredApps.map((app) => (
                <li key={app.id}>
                  <AppSubscriptionCard
                    appCode={app.code}
                    appName={app.name}
                    onSubscribe={() => handleSubscribe(app.code, app.name)}
                    onAccess={() => handleAccess(app.code)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </Main>
    </>
  )
}
