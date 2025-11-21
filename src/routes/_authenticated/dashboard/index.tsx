import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  beforeLoad: async () => {
    // Redirect to /apps if no appId param provided
    throw redirect({ to: '/apps' })
  },
})
