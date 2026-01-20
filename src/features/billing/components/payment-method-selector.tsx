import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

const paymentMethods = [
  { id: 'vnpay', name: 'VNPay', logo: '💳' },
  { id: 'momo', name: 'Momo', logo: '🟣' },
  { id: 'zalopay', name: 'ZaloPay', logo: '🔵' },
]

interface PaymentMethodSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Chọn phương thức thanh toán</h3>
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="grid grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <Label key={method.id} htmlFor={method.id} className="cursor-pointer">
              <Card
                className={`p-4 text-center hover:border-primary ${
                  value === method.id ? 'border-primary' : ''
                }`}
              >
                <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                <div className="text-3xl mb-2">{method.logo}</div>
                <p className="font-medium">{method.name}</p>
              </Card>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}
