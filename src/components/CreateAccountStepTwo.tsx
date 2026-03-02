import { useState } from 'react'
import { Button, Input, Text, Lead } from '@hudl/uniform-web'
import hudlLogo from '../images/logo/hudl-logo 3.svg'

interface CreateAccountStepTwoProps {
  firstName: string
  lastName: string
  email: string
  onEditEmail: () => void
  onContinue: () => void
  onLogIn: () => void
}

export function CreateAccountStepTwo({ firstName, lastName, email, onEditEmail, onContinue, onLogIn }: CreateAccountStepTwoProps) {
  const [password, setPassword] = useState('')

  return (
    <div style={{
      backgroundColor: '#101417',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--u-space-one-and-half)',
    }}>
      <div style={{
        backgroundColor: 'var(--u-color-background-container)',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-two)',
        alignItems: 'center',
      }}>
        <img src={hudlLogo} alt="Hudl" height="44" />

        <Lead as="h2" size="small">
          Create Account
        </Lead>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--u-space-one)',
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--u-space-three-quarter)',
          }}>
            <div style={{ position: 'relative' }}>
              <Input
                aria-label="Email Address"
                placeholder="Email Address"
                type="email"
                value={email}
                isReadOnly
                isRequired
              />
              <Button
                buttonStyle="minimal"
                buttonType="primary"
                size="xsmall"
                onPress={onEditEmail}
                style={{
                  position: 'absolute',
                  right: 'var(--u-space-half)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              >
                Edit
              </Button>
            </div>
            <div style={{ marginTop: 'var(--u-space-half)' }}>
              <Input
                aria-label="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={setPassword}
                isRequired
              />
            </div>
          </div>

          <Button buttonType="primary" size="medium" isBlock onPress={onContinue}>
            Create Account
          </Button>

          <div style={{
            color: 'var(--u-color-base-foreground)',
            fontSize: 'var(--u-font-size-text-small)',
            fontFamily: 'var(--u-font-body)',
            lineHeight: 1.4,
            textAlign: 'center',
          }}>
            Already have an account?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); onLogIn(); }} style={{
              color: 'var(--u-color-emphasis-foreground)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}>
              Log In
            </a>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 'var(--u-space-one)',
        textAlign: 'center',
      }}>
        <Text size="small">
          By creating an account, you agree to our{' '}
          <a href="#" style={{
            color: 'var(--u-color-emphasis-foreground)',
            textDecoration: 'none',
          }}>
            Site Terms
          </a>
          {' '}and{' '}
          <a href="#" style={{
            color: 'var(--u-color-emphasis-foreground)',
            textDecoration: 'none',
          }}>
            Privacy Policy
          </a>
          .
        </Text>
      </div>
    </div>
  )
}
