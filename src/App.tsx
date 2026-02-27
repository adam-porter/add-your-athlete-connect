import React, { useState } from 'react'
import { Environment, Title, Text, Button, Note, AvatarTeam, AvatarUser } from '@hudl/uniform-web'
import { IconUiExpandCollapseDown } from '@hudl/uniform-web-icons'
import { TooltipProvider } from '@hudl/uniform-web-tooltip'
import hudlLogo from './images/logo/hudl-logo 3.svg'
import { RegistrationList } from './components/RegistrationList'
import { MyAthletes } from './components/MyAthletes'
import { LoginStepOne } from './components/LoginStepOne'
import { LoginStepTwo } from './components/LoginStepTwo'
import { AddAthlete } from './components/AddAthlete'
import type { Theme } from './types'

const PROGRAM_DESCRIPTION = `Get ready for the season with our Sporting Stripes & Stars Summer Camp! Open to athletes ages U9–U18, this multi-day camp is designed to assess player skills in a competitive and supportive environment. Coaches will use these sessions to inform placements ahead of official tryouts. Athletes will receive high-quality instruction, live gameplay reps, and feedback from experienced coaching staff. Whether you're aiming for a top team or just want to sharpen your skills, this is the place to start.`

// ---------------------------------------------------------------------------
// NavBar
// ---------------------------------------------------------------------------

function NavBar({ theme, onToggleTheme, onLogin, isLoggedIn }: { theme: Theme; onToggleTheme: () => void; onLogin: () => void; isLoggedIn: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: 'var(--u-color-background-container)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '48px',
      padding: '0 var(--u-space-one)',
    }}>
      <img src={hudlLogo} alt="Hudl" height="28" />

      {isLoggedIn ? (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '48px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              paddingLeft: 'var(--u-space-half)',
              paddingRight: 'var(--u-space-half)'
            }}>
              <AvatarUser
                size="small"
                initials="AR"
              />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              paddingRight: 'var(--u-space-one)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--u-space-quarter)' }}>
                <Text size="small" style={{
                  color: 'var(--u-color-base-foreground)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '200px'
                }}>
                  John Doe
                </Text>
                <div style={{ transform: 'rotate(180deg)', display: 'flex', alignItems: 'center' }}>
                  <IconUiExpandCollapseDown size="small" color="default" />
                </div>
              </div>
            </div>
          </button>

          {/* User menu dropdown */}
          {menuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 'var(--u-space-quarter)',
              backgroundColor: 'var(--u-color-background-container)',
              borderRadius: 'var(--u-border-radius-large)',
              boxShadow: 'var(--u-elevation-shadow-2)',
              minWidth: '200px',
              padding: 'var(--u-space-half)',
              zIndex: 100
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-quarter)' }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 'var(--u-space-half)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: 'var(--u-border-radius-large)',
                    color: 'var(--u-color-base-foreground)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--u-color-base-background-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Text size="small">Profile</Text>
                </button>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 'var(--u-space-half)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: 'var(--u-border-radius-large)',
                    color: 'var(--u-color-base-foreground)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--u-color-base-background-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Text size="small">Settings</Text>
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    onLogin() // Reuse onLogin to go back to login screen
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 'var(--u-space-half)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: 'var(--u-border-radius-large)',
                    color: 'var(--u-color-base-foreground)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--u-color-base-background-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Text size="small">Log Out</Text>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 'var(--u-space-half)', alignItems: 'center' }}>
          <Button buttonType="subtle" size="small" onClick={onToggleTheme}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </Button>
          <Button buttonType="subtle" size="small">Support</Button>
          <Button buttonType="secondary" size="small">Create Account</Button>
          <Button buttonType="primary" size="small" onPress={onLogin}>Log In</Button>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// ProfileBanner
// ---------------------------------------------------------------------------

function ProfileBanner() {
  return (
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
  )
}

// ---------------------------------------------------------------------------
// AuthBanner
// ---------------------------------------------------------------------------

function AuthBanner({ onLogin }: { onLogin: () => void }) {
  return (
    <div style={{
      backgroundColor: 'var(--u-color-background-callout)',
      borderRadius: '8px',
      paddingTop: 'var(--u-space-one-and-half)',
      paddingBottom: 'var(--u-space-one-and-three-quarter)',
      paddingLeft: 'var(--u-space-four)',
      paddingRight: 'var(--u-space-four)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--u-space-one-and-quarter)',
      width: '100%',
    }}>
      <div style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-quarter)',
        maxWidth: '500px',
        width: '100%',
      }}>
        <Title as="p" size="large">Log in or create an account to register an athlete.</Title>
        <Text size="small">We'll match your athlete to eligible registrations to help you get started faster.</Text>
      </div>
      <Button buttonType="primary" size="medium" onPress={onLogin}>Log In</Button>
      <div style={{ display: 'flex', gap: 'var(--u-space-quarter)', alignItems: 'center' }}>
        <Text size="small">Don't have an account?</Text>
        <a
          href="#"
          style={{
            color: 'var(--u-color-emphasis-foreground)',
            fontSize: 'var(--u-font-size-text-small)',
            fontFamily: 'var(--u-font-body)',
            fontWeight: 'var(--u-font-weight-bold)',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
            cursor: 'pointer',
          }}
        >
          Create Account
        </a>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// ProgramHeader
// ---------------------------------------------------------------------------

function ProgramHeader() {
  const [expanded, setExpanded] = useState(false)
  const isLong = true // Always show read more since we're using line clamping

  return (
    // Outer gap: 16px between title block and description block
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-one)', paddingLeft: 'var(--u-space-one)', paddingRight: 'var(--u-space-one)' }}>

      {/* Title block: title + metadata, gap 8px */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-half)' }}>
        <Title as="h2" size="xxlarge" color="contrast">
          Sporting Stripes &amp; Stars Summer Camp | Summer 2025
        </Title>

        {/* Metadata: Camp · Sep 24, 2025 - Nov 1, 2025 — foreground (not subtle) */}
        <div style={{
          display: 'flex',
          gap: 'var(--u-space-half)',
          alignItems: 'flex-start',
          color: 'var(--u-color-base-foreground)',
          fontSize: 'var(--u-font-size-text-medium)',
          fontFamily: 'var(--u-font-body)',
          fontWeight: 'var(--u-font-weight-default)',
          lineHeight: 1.4,
        }}>
          <span>Camp</span>
          <span>·</span>
          <div style={{ display: 'flex', gap: 'var(--u-space-quarter)', alignItems: 'center' }}>
            <span>Sep 24, 2025</span>
            <span>-</span>
            <span>Nov 1, 2025</span>
          </div>
        </div>
      </div>

      {/* Description block: text + "read more", gap 2px */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-eighth)' }}>
        <span style={{
          color: 'var(--u-color-base-foreground)',
          fontSize: 'var(--u-font-size-text-medium)',
          fontFamily: 'var(--u-font-body)',
          fontWeight: 'var(--u-font-weight-default)',
          lineHeight: 1.4,
          display: expanded ? 'block' : '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          width: '100%',
        }}>
          {PROGRAM_DESCRIPTION}
        </span>
        {isLong && (
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: 'var(--u-color-base-foreground)',
              fontSize: 'var(--u-font-size-text-small)',
              fontFamily: 'var(--u-font-body)',
              fontWeight: 'var(--u-font-weight-bold)',
              lineHeight: 1.4,
              textAlign: 'left',
            }}
          >
            {expanded ? 'read less' : 'read more'}
          </button>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [loginStep, setLoginStep] = useState<'none' | 'step1' | 'step2' | 'addAthlete' | 'loggedIn'>('none')

  // Show login step 1
  if (loginStep === 'step1') {
    return (
      <Environment environment={theme}>
        <LoginStepOne onContinue={() => setLoginStep('step2')} />
      </Environment>
    )
  }

  // Show login step 2
  if (loginStep === 'step2') {
    return (
      <Environment environment={theme}>
        <LoginStepTwo
          onEditEmail={() => setLoginStep('step1')}
          onContinue={() => setLoginStep('addAthlete')}
        />
      </Environment>
    )
  }

  // Show add athlete form
  if (loginStep === 'addAthlete') {
    return (
      <Environment environment={theme}>
        <AddAthlete onFinish={() => setLoginStep('loggedIn')} />
      </Environment>
    )
  }

  // If logged in, show main app
  const isLoggedIn = loginStep === 'loggedIn'

  return (
    <Environment environment={theme}>
      <TooltipProvider>
        <style>{`
          .scroll-container {
            scrollbar-width: thin;
            scrollbar-color: var(--u-color-line) transparent;
          }
          .scroll-container::-webkit-scrollbar {
            width: 6px;
          }
          .scroll-container::-webkit-scrollbar-track {
            background: transparent;
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background-color: var(--u-color-line);
            border-radius: 3px;
          }
          .athlete-tooltip {
            font-size: var(--u-font-size-text-small) !important;
            font-weight: var(--u-font-weight-default) !important;
            padding-left: var(--u-space-half) !important;
            padding-right: var(--u-space-half) !important;
          }
        `}</style>
        <div style={{
          backgroundColor: 'var(--u-color-background-canvas)',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
        <NavBar
          theme={theme}
          onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          onLogin={() => setLoginStep('step1')}
          isLoggedIn={isLoggedIn}
        />

        {/* Scroll container */}
        <div className="scroll-container" style={{ flex: 1, overflowY: 'auto' }}>

          <ProfileBanner />

          {/* Centered content */}
          <div style={{
            maxWidth: '1128px',
            margin: '0 auto',
            padding: '0 var(--u-space-one-and-half)',
          }}>

            {/* Auth banner - only show when not logged in */}
            {!isLoggedIn && (
              <div style={{ paddingBottom: 'var(--u-space-three)' }}>
                <AuthBanner onLogin={() => setLoginStep('step1')} />
              </div>
            )}

            {/* Program content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-three)', paddingBottom: 'var(--u-space-three)' }}>
              <ProgramHeader />

              {/* My Athletes - only show when logged in */}
              {isLoggedIn && <MyAthletes />}

              <RegistrationList isLoggedIn={isLoggedIn} />
            </div>
          </div>
        </div>
      </div>
      </TooltipProvider>
    </Environment>
  )
}

export default App
