import { useState } from 'react'
import { Button, Input, Text, Lead } from '@hudl/uniform-web'
import hudlLogo from '../images/logo/hudl-logo 3.svg'

interface CreateAccountStepOneProps {
  onContinue: (firstName: string, lastName: string, email: string) => void
  onLogIn: () => void
}

export function CreateAccountStepOne({ onContinue, onLogIn }: CreateAccountStepOneProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

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
          gap: '32px',
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--u-space-one)',
            width: '100%',
          }}>
            <Input
              label="First Name"
              type="text"
              value={firstName}
              onChange={setFirstName}
              isRequired
            />

            <div style={{ marginTop: 0 }}>
              <Input
                label="Last Name"
                type="text"
                value={lastName}
                onChange={setLastName}
                isRequired
              />
            </div>

            <div style={{ marginTop: 0 }}>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                isRequired
              />
            </div>

            <Button buttonType="primary" size="medium" isBlock onPress={() => onContinue(firstName, lastName, email)}>
              Continue
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

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--u-space-one)',
            width: '100%',
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              backgroundColor: 'var(--u-color-line)',
            }} />
            <Text size="xsmall" color="subtle">Or</Text>
            <div style={{
              flex: 1,
              height: '1px',
              backgroundColor: 'var(--u-color-line)',
            }} />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--u-space-three-quarter)',
            width: '100%',
          }}>
            <Button buttonType="subtle" size="medium" isBlock>
              Continue with Google
            </Button>
            <Button buttonType="subtle" size="medium" isBlock>
              Continue with Facebook
            </Button>
            <Button buttonType="subtle" size="medium" isBlock>
              Continue with Apple
            </Button>
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
