import React, { useState } from 'react'
import { Environment, Title, Text, Button, Note, AvatarTeam, AvatarUser, ToastMessenger } from '@hudl/uniform-web'
import { IconUiExpandCollapseDown } from '@hudl/uniform-web-icons'
import { TooltipProvider } from '@hudl/uniform-web-tooltip'
import { PortalProvider } from '@hudl/uniform-web-portal'
import hudlLogo from './images/logo/hudl-logo 3.svg'
import { RegistrationList } from './components/RegistrationList'
import { MyAthletes } from './components/MyAthletes'
import { LoginStepOne } from './components/LoginStepOne'
import { LoginStepTwo } from './components/LoginStepTwo'
import { CreateAccountStepOne } from './components/CreateAccountStepOne'
import { CreateAccountStepTwo } from './components/CreateAccountStepTwo'
import { AddAthlete } from './components/AddAthlete'
import { SelectAthlete } from './components/SelectAthlete'
import { Questions } from './components/Questions'
import { Checkout } from './components/Checkout'
import ConfirmationScreen from './components/ConfirmationScreen'
import { UserProvider, useUser } from './contexts/UserContext'
import { registrations } from './data/registrations'
import { getEligibleAthletes } from './utils/eligibility'
import type { Theme } from './types'

const PROGRAM_DESCRIPTION = `Competitive tryouts for the 2025-26 USA Volleyball club season. Open to athletes ages 12U through 18U, these single-day evaluations are designed to assess player skills in a competitive environment. Coaches will evaluate technical skills, court awareness, and team dynamics to determine roster placements. All skill levels welcome—come ready to compete and showcase your abilities. Age eligibility is determined as of August 31, 2026.`


// ---------------------------------------------------------------------------
// NavBar
// ---------------------------------------------------------------------------

function NavBar({ theme, onToggleTheme, onLogin, onCreateAccount, onLogout, isLoggedIn, userData }: { theme: Theme; onToggleTheme: () => void; onLogin: () => void; onCreateAccount: () => void; onLogout: () => void; isLoggedIn: boolean; userData: { firstName: string; lastName: string; email: string; athletes: any[] } | null }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Generate initials from user data
  const getInitials = () => {
    if (userData) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
    }
    return 'AR'
  }

  // Get full name
  const getFullName = () => {
    if (userData) {
      return `${userData.firstName} ${userData.lastName}`
    }
    return 'John Doe'
  }

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
                initials={getInitials()}
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
                <div style={{
                  color: 'var(--u-color-base-foreground)',
                  fontSize: 'var(--u-font-size-text-small)',
                  fontFamily: 'var(--u-font-body)',
                  lineHeight: 1.4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '200px'
                }}>
                  {getFullName()}
                </div>
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
                    onLogout()
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
          <Button buttonType="secondary" size="small" onPress={onCreateAccount}>Create Account</Button>
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

function AuthBanner({ onLogin, onCreateAccount }: { onLogin: () => void; onCreateAccount: () => void }) {
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
        <div style={{
          fontSize: 'var(--u-font-size-text-large)',
          fontWeight: 'var(--u-font-weight-bold)',
          fontFamily: 'var(--u-font-body)',
          lineHeight: 1.4,
          color: 'var(--u-color-base-foreground)',
        }}>
          Log in or create an account to register an athlete.
        </div>
        <Text size="small">We'll match your athlete to eligible registrations to help you get started faster.</Text>
      </div>
      <Button buttonType="primary" size="medium" onPress={onLogin}>Log In</Button>
      <div style={{ display: 'flex', gap: 'var(--u-space-quarter)', alignItems: 'center' }}>
        <Text size="small">Don't have an account?</Text>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onCreateAccount(); }}
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

function ProgramHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = true // Always show read more since we're using line clamping

  return (
    // Outer gap: 16px between title block and description block
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-one)', paddingLeft: 'var(--u-space-one)', paddingRight: 'var(--u-space-one)' }}>

      {/* Title block: title + metadata, gap 8px */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-half)' }}>
        <Title as="h2" size="xxlarge">
          2025-26 Club Volleyball Tryouts
        </Title>

        {/* Metadata: Tryout · Nov 8, 2025 - Nov 14, 2025 — foreground (not subtle) */}
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
          <span>Tryout</span>
          <span>·</span>
          <div style={{ display: 'flex', gap: 'var(--u-space-quarter)', alignItems: 'center' }}>
            <span>Nov 8, 2025</span>
            <span>-</span>
            <span>Nov 14, 2025</span>
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

      {/* My Athletes - only show when logged in */}
      {isLoggedIn && <MyAthletes />}
    </div>
  )
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

const LOGIN_STEP_KEY = 'ux-prototype-login-step'

function AppContent() {
  const [theme, setTheme] = useState<Theme>('dark')
  const { userData, setUserData } = useUser()

  // Initialize loginStep from localStorage
  const [loginStep, setLoginStepState] = useState<'none' | 'loginStep1' | 'loginStep2' | 'createStep1' | 'createStep2' | 'addAthlete' | 'loggedIn'>(() => {
    try {
      const stored = localStorage.getItem(LOGIN_STEP_KEY)
      // If we have user data, restore to loggedIn, otherwise default to none
      if (stored && userData) {
        return stored as 'none' | 'loginStep1' | 'loginStep2' | 'createStep1' | 'createStep2' | 'addAthlete' | 'loggedIn'
      }
      return 'none'
    } catch {
      return 'none'
    }
  })

  const [tempUserData, setTempUserData] = useState<{ firstName: string; lastName: string; email: string } | null>(null)

  // Registration flow state
  const [registrationStep, setRegistrationStep] = useState<'none' | 'selectAthlete' | 'questions' | 'checkout' | 'confirmation'>('none')
  const [selectedRegistrationId, setSelectedRegistrationId] = useState<string | null>(null)
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(null)
  const [registrationAnswers, setRegistrationAnswers] = useState<Record<string, string>>({})
  const [paymentData, setPaymentData] = useState<{
    totalPaid: number
    transactionFee: number
    depositAmount: number
  } | null>(null)

  // Wrapper to persist loginStep to localStorage
  const setLoginStep = (step: 'none' | 'loginStep1' | 'loginStep2' | 'createStep1' | 'createStep2' | 'addAthlete' | 'loggedIn') => {
    setLoginStepState(step)
    if (step === 'none') {
      localStorage.removeItem(LOGIN_STEP_KEY)
    } else {
      localStorage.setItem(LOGIN_STEP_KEY, step)
    }
  }

  // Sync loginStep with userData on mount - if we have userData, ensure we're logged in
  React.useEffect(() => {
    if (userData && loginStep === 'none') {
      setLoginStep('loggedIn')
    } else if (!userData && loginStep !== 'none' && loginStep !== 'loginStep1' && loginStep !== 'loginStep2' && loginStep !== 'createStep1' && loginStep !== 'createStep2') {
      // If no userData but we're in a logged-in state (except auth flows), reset
      setLoginStep('none')
    }
  }, [userData])

  // Show login step 1
  if (loginStep === 'loginStep1') {
    return (
      <Environment environment={theme}>
        <LoginStepOne
          onContinue={() => setLoginStep('loginStep2')}
          onCreateAccount={() => setLoginStep('createStep1')}
        />
      </Environment>
    )
  }

  // Show login step 2
  if (loginStep === 'loginStep2') {
    return (
      <Environment environment={theme}>
        <LoginStepTwo
          onEditEmail={() => setLoginStep('loginStep1')}
          onContinue={() => setLoginStep('addAthlete')}
          onCreateAccount={() => setLoginStep('createStep1')}
        />
      </Environment>
    )
  }

  // Show create account step 1
  if (loginStep === 'createStep1') {
    return (
      <Environment environment={theme}>
        <CreateAccountStepOne
          onContinue={(firstName, lastName, email) => {
            setTempUserData({ firstName, lastName, email })
            setLoginStep('createStep2')
          }}
          onLogIn={() => setLoginStep('loginStep1')}
        />
      </Environment>
    )
  }

  // Show create account step 2
  if (loginStep === 'createStep2' && tempUserData) {
    return (
      <Environment environment={theme}>
        <CreateAccountStepTwo
          firstName={tempUserData.firstName}
          lastName={tempUserData.lastName}
          email={tempUserData.email}
          onEditEmail={() => setLoginStep('createStep1')}
          onContinue={() => {
            // Store user data in context
            setUserData({
              firstName: tempUserData.firstName,
              lastName: tempUserData.lastName,
              email: tempUserData.email,
              athletes: []
            })
            setLoginStep('addAthlete')
          }}
          onLogIn={() => setLoginStep('loginStep1')}
        />
      </Environment>
    )
  }

  // Show add athlete form
  if (loginStep === 'addAthlete') {
    return (
      <Environment environment={theme}>
        <AddAthlete onFinish={(athletes) => {
          // Add athletes to user data
          if (userData) {
            setUserData({
              ...userData,
              athletes: athletes.map(a => ({
                firstName: a.firstName,
                lastName: a.lastName,
                dateOfBirth: a.dateOfBirth,
                gender: a.gender,
                grade: a.grade
              }))
            })
          }

          // Show success toast
          const athleteCount = athletes.length
          const athleteText = athleteCount === 1 ? 'athlete' : 'athletes'
          ToastMessenger.show({
            text: `${athleteCount} ${athleteText} added to your account`,
            type: 'success',
            duration: 'short'
          })

          setLoginStep('loggedIn')
        }} />
      </Environment>
    )
  }

  // Registration flow: Select Athlete
  if (registrationStep === 'selectAthlete' && selectedRegistrationId) {
    const registration = registrations.find(r => r.id === selectedRegistrationId)

    if (registration) {
      return (
        <Environment environment={theme}>
          <SelectAthlete
            registration={registration}
            onBack={() => {
              setRegistrationStep('none')
              setSelectedRegistrationId(null)
            }}
            onContinue={(athleteId) => {
              setSelectedAthleteId(athleteId)
              setRegistrationStep('questions')
            }}
          />
        </Environment>
      )
    }
  }

  // Registration flow: Questions
  if (registrationStep === 'questions') {
    // Determine if we came from selectAthlete or skipped it
    const registration = selectedRegistrationId ? registrations.find(r => r.id === selectedRegistrationId) : null
    const hasMultipleEligibleAthletes = registration && userData
      ? getEligibleAthletes(registration, userData.athletes).length > 1
      : false

    return (
      <Environment environment={theme}>
        <Questions
          showedSelectAthlete={hasMultipleEligibleAthletes}
          onBack={() => {
            // Go back to selectAthlete if there were multiple athletes, otherwise go back to main
            if (hasMultipleEligibleAthletes) {
              setRegistrationStep('selectAthlete')
            } else {
              setRegistrationStep('none')
              setSelectedRegistrationId(null)
              setSelectedAthleteId(null)
            }
          }}
          onContinue={(answers) => {
            setRegistrationAnswers(answers)
            setRegistrationStep('checkout')
          }}
        />
      </Environment>
    )
  }

  // Registration flow: Confirmation
  if (registrationStep === 'confirmation' && selectedRegistrationId && selectedAthleteId && userData && paymentData) {
    const registration = registrations.find(r => r.id === selectedRegistrationId)
    const athleteIndex = parseInt(selectedAthleteId.replace('athlete-', ''))
    const athlete = userData.athletes[athleteIndex]

    if (registration && athlete) {
      const hasMultipleEligibleAthletes = getEligibleAthletes(registration, userData.athletes).length > 1

      return (
        <Environment environment={theme}>
          <ConfirmationScreen
              athleteName={`${athlete.firstName} ${athlete.lastName}`}
              athleteEmail={userData.email}
              competitionName="2025-26 Club Volleyball Tryouts"
              teamName={registration.name}
              paymentOption="Full Payment"
              registrationPrice={parseFloat(registration.price.replace('$', ''))}
              depositAmount={paymentData.depositAmount}
              transactionFee={paymentData.transactionFee}
              totalPaid={paymentData.totalPaid}
              seasonName="2025-26 Club Volleyball Tryouts"
              organizationName={registration.name}
              startDate={registration.startDate}
              endDate={registration.endDate}
              description={registration.description}
              showedSelectAthlete={hasMultipleEligibleAthletes}
              onBack={() => setRegistrationStep('checkout')}
              onContinue={() => {
                // Reset registration flow
                setRegistrationStep('none')
                setSelectedRegistrationId(null)
                setSelectedAthleteId(null)
                setRegistrationAnswers({})
                setPaymentData(null)
              }}
            />
        </Environment>
      )
    }
  }

  // Registration flow: Checkout
  if (registrationStep === 'checkout' && selectedRegistrationId && selectedAthleteId && userData) {
    const registration = registrations.find(r => r.id === selectedRegistrationId)
    const athleteIndex = parseInt(selectedAthleteId.replace('athlete-', ''))
    const athlete = userData.athletes[athleteIndex]

    if (registration && athlete) {
      const athleteName = `${athlete.firstName} ${athlete.lastName}`
      const programPrice = parseFloat(registration.price.replace('$', ''))
      // For this prototype, deposit is the full amount
      const depositAmount = programPrice

      // Determine if we showed the select athlete step
      const hasMultipleEligibleAthletes = getEligibleAthletes(registration, userData.athletes).length > 1

      return (
        <Environment environment={theme}>
          <Checkout
            athleteName={athleteName}
            competitionName="2025-26 Club Volleyball Tryouts"
            registrationName={registration.name}
            programPrice={programPrice}
            depositAmount={depositAmount}
            showedSelectAthlete={hasMultipleEligibleAthletes}
            onBack={() => setRegistrationStep('questions')}
            onComplete={() => {
              // Calculate payment data
              const transactionFee = Math.round((depositAmount * 0.029 + 0.30) * 100) / 100
              const totalPaid = depositAmount + transactionFee

              // Store payment data
              setPaymentData({
                totalPaid,
                transactionFee,
                depositAmount
              })

              // Navigate to confirmation screen
              setRegistrationStep('confirmation')
            }}
          />
        </Environment>
      )
    }
  }

  // If logged in, show main app
  const isLoggedIn = loginStep === 'loggedIn'

  return (
    <Environment environment={theme}>
      <PortalProvider>
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
          .athlete-avatar-button:hover {
            opacity: 1 !important;
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
          onLogin={() => setLoginStep('loginStep1')}
          onCreateAccount={() => setLoginStep('createStep1')}
          onLogout={() => {
            // Clear all user data and reset to fresh state
            setUserData(null)
            setTempUserData(null)
            setLoginStep('none')
          }}
          isLoggedIn={isLoggedIn}
          userData={userData}
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
                <AuthBanner
                  onLogin={() => setLoginStep('loginStep1')}
                  onCreateAccount={() => setLoginStep('createStep1')}
                />
              </div>
            )}

            {/* Program content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-three)', paddingBottom: 'var(--u-space-three)' }}>
              <ProgramHeader isLoggedIn={isLoggedIn} />

              <RegistrationList
                isLoggedIn={isLoggedIn}
                onRegister={(registrationId) => {
                  setSelectedRegistrationId(registrationId)

                  // Check if there are multiple eligible athletes
                  const registration = registrations.find(r => r.id === registrationId)
                  if (registration && userData) {
                    const eligibleAthletes = getEligibleAthletes(registration, userData.athletes)

                    if (eligibleAthletes.length === 1) {
                      // Only one eligible athlete - skip to questions
                      const athleteIndex = userData.athletes.findIndex(a =>
                        a.firstName === eligibleAthletes[0].firstName &&
                        a.lastName === eligibleAthletes[0].lastName
                      )
                      setSelectedAthleteId(`athlete-${athleteIndex}`)
                      setRegistrationStep('questions')
                    } else {
                      // Multiple eligible athletes - show select athlete
                      setRegistrationStep('selectAthlete')
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
        </TooltipProvider>
      </PortalProvider>
    </Environment>
  )
}

function App() {
  return (
    <UserProvider>
      <ToastMessenger />
      <AppContent />
    </UserProvider>
  )
}

export default App
