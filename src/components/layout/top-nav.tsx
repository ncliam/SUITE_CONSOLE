import { Link, useLocation } from '@tanstack/react-router'
import { IconChevronRight } from '@tabler/icons-react'
import { useAtomValue } from 'jotai'
import { activeAppState } from '@/stores/applicationStore'

const navItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    path: '/dashboard',
  },
  {
    title: 'Users',
    href: '/users',
    path: '/users',
  },
  {
    title: 'Settings',
    href: '/settings',
    path: '/settings',
  },
]

export function TopNav() {
  const activeApp = useAtomValue(activeAppState)
  const location = useLocation()
  
  // Find current page title based on pathname
  const currentItem = navItems.find(item => location.pathname.includes(item.path))
  const currentTitle = currentItem?.title || 'Dashboard'

  return (
    <div className='flex items-center space-x-2 text-sm'>
      {/* Root: Active App Name (clickable to go to settings) */}
      <Link
        to='/settings'
        className='font-semibold text-foreground hover:text-primary transition-colors cursor-pointer'
      >
        {activeApp?.name || 'Apps'}
      </Link>

      {/* Breadcrumb separator */}
      <IconChevronRight size={16} className='text-muted-foreground' />

      {/* Current page title */}
      <span className='text-muted-foreground'>
        {currentTitle}
      </span>
      
    </div>
  )
}
