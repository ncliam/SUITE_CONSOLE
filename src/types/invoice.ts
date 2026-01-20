export interface InvoiceLineItem {
  description: string
  appCode: string  // CHANGED from planName
  appName: string  // NEW
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  teamId: string  // NEW: Changed from organizationId
  status: 'draft' | 'pending' | 'paid' | 'failed' | 'cancelled'
  amount: number
  tax: number
  totalAmount: number
  dueDate: string
  paidAt?: string
  periodStart: string
  periodEnd: string
  lineItems: InvoiceLineItem[]
}

export interface PaymentRecord {
  id: string
  invoiceId: string
  teamId: string  // NEW
  gateway: 'vnpay' | 'momo' | 'zalopay'
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  paymentMethod?: string
  paidAt?: string
}
