import { createFileRoute } from '@tanstack/react-router'
import { SubscriptionStatusCard } from '@/features/billing/components/subscription-status-card'
import { InvoiceTable } from '@/features/billing/components/invoice-table'
import { TeamSelector } from '@/components/team-selector'
import { useActiveTeam } from '@/hooks/use-team'
import { AlertCircle } from 'lucide-react'

function BillingPage() {
  const { data: activeTeam } = useActiveTeam()

  return (
    <div className="flex h-full flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Thanh toán & Subscription</h1>
          <p className="text-muted-foreground">Quản lý subscription và hóa đơn của team</p>
        </div>
        <TeamSelector />
      </div>

      {!activeTeam ? (
        <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-4 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>Vui lòng chọn team để xem thông tin thanh toán</span>
        </div>
      ) : (
        <>
          <div>
            <h2 className="text-xl font-semibold mb-4">App Subscriptions</h2>
            <SubscriptionStatusCard />
          </div>

          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Lịch sử hóa đơn</h2>
              <InvoiceTable />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/billing/')({
  component: BillingPage,
})
