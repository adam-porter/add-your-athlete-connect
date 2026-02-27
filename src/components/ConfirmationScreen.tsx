import { Title, Text } from '@hudl/uniform-web'
import { CheckoutSection } from './CheckoutSection'
import { RegistrationSummary } from './RegistrationSummary'
import { PaymentSummary } from './PaymentSummary'

interface ConfirmationScreenProps {
  athleteName: string
  athleteEmail: string
  competitionName: string
  teamName: string
  paymentOption: string
  registrationPrice: number
  depositAmount: number
  transactionFee: number
  totalPaid: number
  seasonName: string
  organizationName: string
  startDate: string
  endDate: string
  description: string
  showedSelectAthlete: boolean
  onBack: () => void
  onContinue: () => void
}

export default function ConfirmationScreen({
  athleteName,
  athleteEmail,
  competitionName,
  teamName,
  paymentOption,
  registrationPrice,
  depositAmount,
  transactionFee,
  totalPaid,
  seasonName,
  organizationName,
  startDate,
  endDate,
  description,
  showedSelectAthlete,
  onBack,
  onContinue
}: ConfirmationScreenProps) {
  return (
    <div style={{
      backgroundColor: 'var(--u-color-background-canvas)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 'var(--u-space-two)',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-four)',
        maxWidth: '1200px',
        width: '100%',
        padding: '0 var(--u-space-two)',
        paddingBottom: 'var(--u-space-four)',
      }}>
      {/* Success Banner */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-four)',
        alignItems: 'flex-start',
        width: '100%',
        paddingTop: '40px',
        paddingBottom: '40px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--u-space-two)',
          alignItems: 'flex-start',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--u-space-one)',
            alignItems: 'flex-start',
            width: '100%'
          }}>
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}>
              <div style={{
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                backgroundColor: 'var(--u-color-success-background-contrast)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
                </svg>
              </div>
              <h1 style={{
                fontFamily: 'Teko, sans-serif',
                fontWeight: 300,
                fontSize: '72px',
                lineHeight: 0.8,
                letterSpacing: '5.76px',
                textTransform: 'uppercase',
                background: 'linear-gradient(180deg, #e6f2ff 40.104%, #c3cedb 80.208%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(2px 2px 0px black)',
                margin: 0,
              }}>
                Registration Complete!
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <Text style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        Congratulations! {athleteName} has been successfully registered. Your payment of ${totalPaid.toFixed(2)} has been processed and a confirmation email has been sent to {athleteEmail}. Please check your inbox for additional details.
      </Text>

      {/* Registration Summary */}
      <div style={{ paddingBottom: '28px' }}>
        <CheckoutSection title="Registration Summary">
          <RegistrationSummary
            athleteName={athleteName}
            competitionName={competitionName}
            teamName={teamName}
            paymentOption={paymentOption}
            registrationPrice={registrationPrice}
            showAvatar={false}
          />
        </CheckoutSection>
      </div>

      {/* Payment Summary */}
      <div style={{ paddingBottom: '28px' }}>
        <CheckoutSection title="Payment Summary">
          <PaymentSummary
            registrationPrice={registrationPrice}
            depositAmount={depositAmount}
            transactionFee={transactionFee}
            totalDueToday={totalPaid}
            isPaid={true}
          />
        </CheckoutSection>
      </div>

      {/* Registration Details */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-one-and-quarter)'
      }}>
        <div style={{ fontSize: 'var(--u-font-size-text-large)', fontWeight: 700, color: 'var(--u-color-base-foreground)' }}>
          Registration Details
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--u-space-eighth)'
        }}>
          <div style={{ display: 'flex', gap: 'var(--u-space-half)', alignItems: 'center' }}>
            <Text>{seasonName}</Text>
            <Text>·</Text>
            <Text>{organizationName}</Text>
          </div>
          <Text>{startDate} - {endDate}</Text>
        </div>
        <Text style={{ whiteSpace: 'pre-wrap' }}>
          {description}
        </Text>
      </div>
      </div>
    </div>
  )
}
