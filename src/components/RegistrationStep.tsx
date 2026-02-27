import React from 'react'
import { Title, Text, Button, AvatarTeam } from '@hudl/uniform-web'

interface RegistrationStepProps {
  title: string
  description: string
  children: React.ReactNode
  onBack: () => void
  onContinue: () => void
  backLabel?: string
  continueLabel?: string
  continueDisabled?: boolean
  currentStep?: number
  totalSteps?: number
}

export function RegistrationStep({
  title,
  description,
  children,
  onBack,
  onContinue,
  backLabel = 'Back',
  continueLabel = 'Continue',
  continueDisabled = false,
  currentStep,
  totalSteps,
}: RegistrationStepProps) {
  return (
    <>
      <style>{`
        .registration-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: var(--u-color-line) transparent;
        }
        .registration-scroll-container::-webkit-scrollbar {
          width: 6px;
        }
        .registration-scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .registration-scroll-container::-webkit-scrollbar-thumb {
          background-color: var(--u-color-line);
          border-radius: 3px;
        }
      `}</style>
      <div style={{
        backgroundColor: 'var(--u-color-background-canvas)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Scroll container */}
        <div
          className="registration-scroll-container"
          style={{
            flex: 1,
            overflowY: 'auto',
            scrollbarGutter: 'stable',
          }}
        >
          {/* Profile Banner */}
        <div style={{
          background: 'linear-gradient(to bottom, rgba(11, 33, 57, 0.9), transparent)',
          padding: '40px var(--u-space-one-and-half)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--u-space-one)',
          width: '100%',
        }}>
          <AvatarTeam
            sport="soccer"
            size="large"
            imageUrl="https://www.figma.com/api/mcp/asset/f70238e0-29e3-4fa2-9e8f-72e403b7f941"
            imageAltText="Sporting Youth Soccer"
          />
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
            Sporting Youth Soccer
          </h1>
        </div>
        {/* Centered content */}
        <div style={{
          maxWidth: '1128px',
          margin: '0 auto',
          paddingLeft: 'var(--u-space-one-and-half)',
          paddingRight: 'var(--u-space-one-and-half)',
        }}>
          {/* Step header */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--u-space-half)',
            paddingTop: 'var(--u-space-one-and-half)',
            paddingBottom: 'var(--u-space-three)',
          }}>
            {/* Progress indicator */}
            {currentStep !== undefined && totalSteps !== undefined && (
              <Title as="h2" size="small" isUppercase style={{ marginBottom: 'var(--u-space-quarter)' }}>
                Step {currentStep} of {totalSteps}
              </Title>
            )}
            <Title as="h1" size="xxlarge">
              {title}
            </Title>
            <Text size="medium">
              {description}
            </Text>
          </div>

          {/* Main content */}
          <div style={{
            paddingBottom: 'var(--u-space-one-and-half)',
          }}>
            {children}
          </div>
        </div>
        </div>

        {/* Sticky footer */}
        <div style={{
          backgroundColor: 'var(--u-color-background-container)',
          borderTop: '1px solid var(--u-color-line-subtle)',
          width: '100%',
          flexShrink: 0,
        }}>
        <div style={{
          maxWidth: '1128px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--u-space-one) var(--u-space-one-and-half)',
        }}>
          <Button buttonType="secondary" size="medium" onPress={onBack}>
            {backLabel}
          </Button>
          <Button
            buttonType="primary"
            size="medium"
            onPress={onContinue}
            isDisabled={continueDisabled}
          >
            {continueLabel}
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}
