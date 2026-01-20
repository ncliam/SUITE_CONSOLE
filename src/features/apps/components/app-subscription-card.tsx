import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppSubscriptionStatus } from '@/hooks/use-app-subscription'
import { useAppPricing } from '@/hooks/use-app-subscription'
import { useActiveTeam } from '@/hooks/use-team'
import { usePermission } from '@/hooks/use-permission'
import { AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface AppSubscriptionCardProps {
  appCode: string
  appName: string
  onSubscribe: () => void
  onAccess: () => void
}

export function AppSubscriptionCard({
  appCode,
  appName,
  onSubscribe,
  onAccess,
}: AppSubscriptionCardProps) {
  const { data: pricingList } = useAppPricing()
  const { isSubscribed, subscription } = useAppSubscriptionStatus(appCode)
  const { data: activeTeam } = useActiveTeam()
  const { can, isTeamVerified } = usePermission()

  const pricing = pricingList?.find(p => p.appCode === appCode)

  const handleSubscribe = () => {
    if (!activeTeam) {
      toast.error('Vui lòng chọn team trước')
      return
    }

    if (!isTeamVerified) {
      toast.error('Team chưa được xác minh', {
        description: 'Vui lòng chờ team được duyệt trước khi đăng ký app',
      })
      return
    }

    if (!can('subscribe:apps')) {
      toast.error('Bạn không có quyền đăng ký app')
      return
    }

    onSubscribe()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{appName}</CardTitle>
        <CardDescription>{pricing?.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isTeamVerified && activeTeam && (
          <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-3 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <span>Team chưa được xác minh. Không thể đăng ký app.</span>
          </div>
        )}

        {pricing && (
          <div>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(pricing.pricing.monthly)}
              <span className="text-sm font-normal text-muted-foreground">/tháng</span>
            </p>
          </div>
        )}

        {pricing?.features && (
          <ul className="space-y-1">
            {pricing.features.map((feature, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {isSubscribed && subscription ? (
          <div className="space-y-2">
            <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
              {subscription.status === 'active' ? 'Đã đăng ký' : 'Dùng thử'}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Chu kỳ thanh toán kết thúc:{' '}
              {new Date(subscription.currentPeriodEnd).toLocaleDateString('vi-VN')}
            </p>
            <Button className="w-full" onClick={onAccess}>
              Truy cập
            </Button>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={handleSubscribe}
            disabled={!isTeamVerified || !activeTeam}
          >
            Đăng ký ngay
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
