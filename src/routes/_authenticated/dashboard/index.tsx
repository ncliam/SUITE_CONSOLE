import { createFileRoute, redirect } from '@tanstack/react-router'
import { getDefaultStore } from 'jotai'
import { activeAppState } from '@/stores/applicationStore'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  beforeLoad: async () => {
    const store = getDefaultStore()
    const active = store.get(activeAppState)

    if (!active) {
      // No active app selected — redirect to apps list
      throw redirect({ to: '/apps' })
    }
  },
})
