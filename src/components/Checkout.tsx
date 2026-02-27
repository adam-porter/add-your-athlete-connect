import React, { useState, useEffect } from 'react'
import { Text } from '@hudl/uniform-web'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { RegistrationStep } from './RegistrationStep'
import { CheckoutSection } from './CheckoutSection'
import { RegistrationSummary } from './RegistrationSummary'
import { PaymentSummary } from './PaymentSummary'
import { STRIPE_PUBLISHABLE_KEY } from '../config/stripe'

// Load Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

interface CheckoutProps {
  athleteName: string
  competitionName: string
  registrationName: string
  programPrice: number
  depositAmount: number
  showedSelectAthlete: boolean
  onBack: () => void
  onComplete: () => void
}

// Payment form component that uses Stripe hooks
function CheckoutForm({
  athleteName,
  competitionName,
  registrationName,
  programPrice,
  depositAmount,
  showedSelectAthlete,
  onBack,
  onComplete
}: CheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const transactionFee = Math.round((depositAmount * 0.029 + 0.30) * 100) / 100
  const totalDueToday = depositAmount + transactionFee

  const isValid = stripe && elements

  const handleContinue = async () => {
    if (!isValid) return

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      // For this prototype, we'll simulate payment processing
      // In production, you would use Stripe's API to process the payment

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Complete the registration
      onComplete()
    } catch (error) {
      setErrorMessage('Payment processing failed. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <RegistrationStep
      title="Checkout"
      description="Review your registration and complete payment."
      onBack={onBack}
      onContinue={handleContinue}
      continueLabel={isProcessing ? 'Processing...' : `Pay $${totalDueToday.toFixed(2)}`}
      continueDisabled={!isValid || isProcessing}
      currentStep={showedSelectAthlete ? 3 : 2}
      totalSteps={showedSelectAthlete ? 3 : 2}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-four)',
        maxWidth: '1200px',
        paddingBottom: 'var(--u-space-four)',
      }}>
        {/* Section 1: Registration Summary */}
        <CheckoutSection title="Registration Summary">
          <RegistrationSummary
            athleteName={athleteName}
            competitionName={competitionName}
            teamName={registrationName}
            paymentOption="Full Payment"
            registrationPrice={programPrice}
            showAvatar={true}
          />
        </CheckoutSection>

        {/* Section 2: Payment Summary */}
        <CheckoutSection title="Payment Summary">
          <PaymentSummary
            registrationPrice={programPrice}
            depositAmount={depositAmount}
            transactionFee={transactionFee}
            totalDueToday={totalDueToday}
            isPaid={false}
          />
        </CheckoutSection>

        {/* Section 3: Payment Method */}
        <CheckoutSection title="Payment Method">
          {/* Stripe Payment Element */}
          <PaymentElement />

          {errorMessage && (
            <div style={{
              padding: 'var(--u-space-one)',
              backgroundColor: 'var(--u-color-alert-background)',
              borderRadius: 'var(--u-border-radius-large)',
              border: '1px solid var(--u-color-alert-background-contrast)',
            }}>
              <Text size="small" style={{ color: 'var(--u-color-alert-foreground)' }}>
                {errorMessage}
              </Text>
            </div>
          )}
        </CheckoutSection>
      </div>
    </RegistrationStep>
  )
}

// Main Checkout component with Stripe Elements wrapper
export function Checkout(props: CheckoutProps) {
  const { depositAmount } = props
  const [stripeOptions, setStripeOptions] = useState<StripeElementsOptions | null>(null)

  useEffect(() => {
    // Stripe Elements options - using Stripe's flat theme for dark mode
    const options: StripeElementsOptions = {
      mode: 'payment',
      amount: Math.round(depositAmount * 100), // Convert to cents
      currency: 'usd',
      layout: 'tabs',
      appearance: {
        theme: 'night', // Use night theme for readability in dark mode
      },
    }

    setStripeOptions(options)
  }, [depositAmount])

  if (!stripeOptions) {
    return null // Wait for options to be computed
  }

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <CheckoutForm {...props} />
    </Elements>
  )
}
