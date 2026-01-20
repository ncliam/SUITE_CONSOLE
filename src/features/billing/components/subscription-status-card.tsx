import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTeamSubscriptions } from '@/hooks/use-app-subscription'
import { useAppPricing } from '@/hooks/use-app-subscription'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

export function SubscriptionStatusCard() {
  const { data: subscriptions } = useTeamSubscriptions()
  const { data: pricingList } = useAppPricing()

  const activeSubscriptions = subscriptions?.filter(
    s => s.status === 'active' || s.status === 'trial'
  )

  if (!activeSubscriptions || activeSubscriptions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-muted-foreground text-center">
            Chưa có subscription nào
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {activeSubscriptions.map((subscription) => {
        const pricing = pricingList?.find(p => p.appCode === subscription.appCode)
        const statusVariant = subscription.status === 'active' ? 'default' : 'secondary'
        const statusLabel = subscription.status === 'active' ? 'Đang hoạt động' : 'Dùng thử'

        return (
          <Card key={subscription.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{pricing?.appName}</CardTitle>
                <Badge variant={statusVariant}>{statusLabel}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xl font-bold">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(pricing?.pricing.monthly ?? 0)}/tháng
                </p>
                <p className="text-sm text-muted-foreground">{pricing?.description}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chu kỳ thanh toán</p>
                <p className="font-medium">
                  {format(new Date(subscription.currentPeriodStart), 'dd/MM/yyyy', { locale: vi })}
                  {' - '}
                  {format(new Date(subscription.currentPeriodEnd), 'dd/MM/yyyy', { locale: vi })}
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Hủy subscription
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
