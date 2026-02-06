import {
  IconCreditCard,
  IconHelp,
  IconMail,
  IconPackages,
  IconUserCog,
} from '@tabler/icons-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  
  navGroups: [
    {
      title: 'Chung',
      items: [

        {
          title: 'Ứng dụng',
          url: '/',
          icon: IconPackages,
        },
        {
          title: 'Thanh toán',
          url: '/billing',
          icon: IconCreditCard,
        },
        {
          title: 'Tham gia nhóm',
          url: '/invitations',
          icon: IconMail,
        },
      ],
    },
    {
      title: 'Application',
      items: [
        {
          title: 'Settings',
          url: '/settings',
          icon: IconUserCog,
        },
      ],
    },
    {
      title: 'Khác',
      items: [
        {
          title: 'Trợ giúp',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
