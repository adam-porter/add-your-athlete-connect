import { Text, Title } from '@hudl/uniform-web'

interface PaymentSummaryProps {
  registrationPrice: number
  depositAmount: number
  transactionFee: number
  totalDueToday: number
  isPaid?: boolean
}

export function PaymentSummary({
  registrationPrice,
  depositAmount,
  transactionFee,
  totalDueToday,
  isPaid = false
}: PaymentSummaryProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--u-space-one)',
    }}>
      {/* Registration Total */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-quarter)',
      }}>
        <div style={{
          display: 'flex',
          gap: 'var(--u-space-four)',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Text weight="default">Registration Total</Text>
          <Text weight="default" style={{ fontFeatureSettings: "'tnum' 1" }}>
            ${registrationPrice.toFixed(2)}
          </Text>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        borderTop: '1px dashed var(--u-color-line-subtle)',
        width: '100%',
      }} />

      {/* Due Today & Transaction Fee */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-quarter)',
      }}>
        <div style={{
          display: 'flex',
          gap: 'var(--u-space-four)',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Text>Due Today</Text>
          <Text style={{ fontFeatureSettings: "'tnum' 1" }}>
            ${depositAmount.toFixed(2)}
          </Text>
        </div>
        <div style={{
          display: 'flex',
          gap: 'var(--u-space-four)',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Text>Transaction Fee</Text>
          <Text style={{ fontFeatureSettings: "'tnum' 1" }}>
            ${transactionFee.toFixed(2)}
          </Text>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        borderTop: '1px dashed var(--u-color-line-subtle)',
        width: '100%',
      }} />

      {/* Total Due Today */}
      <div style={{
        display: 'flex',
        gap: 'var(--u-space-four)',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Title as="h4" size="default">
          {isPaid ? 'Total Paid Today' : 'Total Due Today'}
        </Title>
        <Title as="h4" size="default" style={{ fontFeatureSettings: "'tnum' 1" }}>
          ${totalDueToday.toFixed(2)}
        </Title>
      </div>
    </div>
  )
}
