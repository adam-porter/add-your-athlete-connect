import { Text, AvatarUser } from '@hudl/uniform-web'

interface RegistrationSummaryProps {
  athleteName: string
  competitionName: string
  teamName?: string
  paymentOption: string
  registrationPrice: number
  showAvatar?: boolean
}

export function RegistrationSummary({
  athleteName,
  competitionName,
  teamName,
  paymentOption,
  registrationPrice,
  showAvatar = true
}: RegistrationSummaryProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--u-space-half)',
    }}>
      {/* Registration Item */}
      <div style={{
        display: 'flex',
        gap: 'var(--u-space-one-and-half)',
        alignItems: 'center',
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          gap: 'var(--u-space-one-and-quarter)',
        }}>
          {/* Athlete & Program Info */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--u-space-eighth)',
          }}>
            <div style={{ minHeight: '24px', display: 'flex', alignItems: 'center', gap: 'var(--u-space-quarter)' }}>
              {showAvatar && (
                <AvatarUser
                  initials={athleteName.split(' ').map(n => n[0]).join('')}
                  size="xsmall"
                />
              )}
              <Text weight="bold" color="contrast">{athleteName}</Text>
            </div>
            <div style={{
              display: 'flex',
              gap: 'var(--u-space-half)',
              alignItems: 'center',
            }}>
              <Text>{competitionName}</Text>
              {teamName && (
                <>
                  <Text>·</Text>
                  <Text>{teamName}</Text>
                </>
              )}
            </div>
          </div>

          {/* Payment Option Info */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--u-space-eighth)',
          }}>
            <div style={{
              display: 'flex',
              gap: 'var(--u-space-half)',
              alignItems: 'center',
              minHeight: '24px',
            }}>
              <Text weight="bold" color="contrast">{paymentOption}</Text>
            </div>
            <div style={{
              display: 'flex',
              gap: 'var(--u-space-half)',
              alignItems: 'center',
            }}>
              <Text>Registration Price: ${registrationPrice.toFixed(2)}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
