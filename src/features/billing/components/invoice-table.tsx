import { useTeamInvoices } from '@/hooks/use-app-subscription'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Download, Eye } from 'lucide-react'
import { toast } from 'sonner'

export function InvoiceTable() {
  const { data: invoices } = useTeamInvoices()

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      paid: { variant: 'default', label: 'Đã thanh toán' },
      pending: { variant: 'secondary', label: 'Chờ thanh toán' },
      failed: { variant: 'destructive', label: 'Thất bại' },
    }
    return variants[status] || { variant: 'outline', label: status }
  }

  const handlePayInvoice = (invoiceId: string) => {
    toast.success('Đang chuyển đến trang thanh toán...')
  }

  const handleViewInvoice = (invoiceId: string) => {
    toast.info('Xem chi tiết hóa đơn')
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success('Đang tải xuống hóa đơn...')
  }

  if (!invoices || invoices.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">Chưa có hóa đơn nào</div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Số hóa đơn</TableHead>
          <TableHead>Kỳ thanh toán</TableHead>
          <TableHead>Số tiền</TableHead>
          <TableHead>Hạn thanh toán</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices?.map((invoice) => {
          const statusInfo = getStatusBadge(invoice.status)
          return (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
              <TableCell>
                {format(new Date(invoice.periodStart), 'dd/MM/yyyy', { locale: vi })}
                {' - '}
                {format(new Date(invoice.periodEnd), 'dd/MM/yyyy', { locale: vi })}
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(invoice.totalAmount)}
              </TableCell>
              <TableCell>
                {format(new Date(invoice.dueDate), 'dd/MM/yyyy', { locale: vi })}
              </TableCell>
              <TableCell>
                <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(invoice.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {invoice.status === 'paid' && (
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(invoice.id)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  {invoice.status === 'pending' && (
                    <Button size="sm" onClick={() => handlePayInvoice(invoice.id)}>
                      Thanh toán
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
