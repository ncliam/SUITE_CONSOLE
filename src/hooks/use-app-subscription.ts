import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { activeTeamIdAtom } from '@/stores/applicationStore'
import { request } from '@/utils/request'
import type { AppPricing, AppSubscription } from '@/types/subscription'
import type { Invoice } from '@/types/invoice'

// Get all app pricing
export function useAppPricing() {
  return useQuery({
    queryKey: ['app-pricing'],
    queryFn: async () => {
      return await request<AppPricing[]>('/app-pricing')
    },
  })
}

// Get app subscriptions for active team
export function useTeamSubscriptions(teamId?: string) {
  const activeTeamId = useAtomValue(activeTeamIdAtom)
  const selectedTeamId = teamId ?? activeTeamId

  return useQuery({
    queryKey: ['app-subscriptions', selectedTeamId],
    queryFn: async () => {
      const allSubscriptions = await request<AppSubscription[]>('/app-subscriptions')
      return allSubscriptions.filter(s => s.teamId === selectedTeamId)
    },
    enabled: !!selectedTeamId,
  })
}

// Get invoices for active team
export function useTeamInvoices(teamId?: string) {
  const activeTeamId = useAtomValue(activeTeamIdAtom)
  const selectedTeamId = teamId ?? activeTeamId

  return useQuery({
    queryKey: ['invoices', selectedTeamId],
    queryFn: async () => {
      const allInvoices = await request<Invoice[]>('/invoices')
      return allInvoices.filter(inv => inv.teamId === selectedTeamId)
    },
    enabled: !!selectedTeamId,
  })
}

// Check if active team has subscription for specific app
export function useAppSubscriptionStatus(appCode: string) {
  const activeTeamId = useAtomValue(activeTeamIdAtom)
  const { data: subscriptions } = useTeamSubscriptions()

  const subscription = subscriptions?.find(s =>
    s.appCode === appCode &&
    (s.status === 'active' || s.status === 'trial')
  )

  return {
    isSubscribed: !!subscription,
    subscription,
    canAccess: !!subscription && (subscription.status === 'active' || subscription.status === 'trial'),
  }
}
