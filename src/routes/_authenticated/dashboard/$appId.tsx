import { createFileRoute, redirect } from '@tanstack/react-router'
import { getDefaultStore } from 'jotai'
import { activeAppState, appsState, SuiteApp } from '@/stores/applicationStore'
import Dashboard from '@/features/dashboard'

export const Route = createFileRoute('/_authenticated/dashboard/$appId')({
  beforeLoad: async ({ params: { appId } }: { params: { appId: string } }) => {
    const store = getDefaultStore()
    
    // Get apps list
    const apps = store.get(appsState)
    
    // If apps is a promise, resolve it
    const appsList: SuiteApp[] = apps instanceof Promise ? await apps : apps
    
    // Find app by ID
    const app = appsList.find((a) => a.id === appId)
    
    if (!app) {
      throw redirect({ to: '/apps' })
    }
    
    // Set active app in store
    store.set(activeAppState, app)
  },
  component: Dashboard,
})
