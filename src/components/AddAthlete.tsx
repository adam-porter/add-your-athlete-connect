import { useState, useRef, useEffect } from 'react'
import { Button, Input, Text, Lead, Select, Checkbox, AvatarUser } from '@hudl/uniform-web'
import { IconAdd, IconInformation, IconRemove } from '@hudl/uniform-web-icons'
import hudlLogo from '../images/logo/hudl-logo 3.svg'

export interface AthleteFormData {
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  grade: string
}

interface AddAthleteProps {
  onFinish: (athletes: AthleteFormData[]) => void
}

export function AddAthlete({ onFinish }: AddAthleteProps) {
  // Check URL query param for flow version
  const [flowVersion, setFlowVersion] = useState<'split' | 'merged' | 'split-default-no'>(() => {
    const params = new URLSearchParams(window.location.search)
    const flow = params.get('flow')
    if (flow === 'merged') return 'merged'
    if (flow === 'split-default-no') return 'split-default-no'
    return 'split'
  })

  const [formCount, setFormCount] = useState(1)
  const [formKeys, setFormKeys] = useState<number[]>([0])
  const athleteFormsRef = useRef<{ [key: number]: AthleteFormData }>({})
  const formValidityRef = useRef<{ [key: number]: boolean }>({})
  const [isValid, setIsValid] = useState(false)
  const nextKeyRef = useRef(1)
  const formContainerRef = useRef<HTMLDivElement>(null)

  // Update URL when flow version changes
  const handleFlowChange = (version: 'split' | 'merged' | 'split-default-no') => {
    setFlowVersion(version)
    const url = new URL(window.location.href)
    url.searchParams.set('flow', version)
    window.history.replaceState({}, '', url.toString())
  }

  const updateAthleteData = (index: number, data: AthleteFormData, valid: boolean) => {
    athleteFormsRef.current[index] = data
    formValidityRef.current[index] = valid

    // Check if all forms are valid
    const allFormsPresent = Object.keys(formValidityRef.current).length === formKeys.length
    const allFormsValid = allFormsPresent && Object.values(formValidityRef.current).every(v => v === true)
    setIsValid(allFormsValid)
  }

  const handleFinish = () => {
    const athletes = Object.values(athleteFormsRef.current)
    onFinish(athletes)
  }

  const handleAddAnotherAthlete = () => {
    setFormKeys([...formKeys, nextKeyRef.current])
    nextKeyRef.current++
    setFormCount(formCount + 1)
    setIsValid(false)

    // Scroll to the bottom of the form container after the new form is added
    setTimeout(() => {
      if (formContainerRef.current) {
        const lastForm = formContainerRef.current.lastElementChild
        if (lastForm) {
          lastForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
      }
    }, 100)
  }

  const handleRemoveAthlete = (key: number) => {
    setFormKeys(formKeys.filter(k => k !== key))
    delete athleteFormsRef.current[key]
    delete formValidityRef.current[key]
    setFormCount(formCount - 1)
    // Revalidate after removal
    const remainingKeys = formKeys.filter(k => k !== key)
    const allFormsPresent = Object.keys(formValidityRef.current).length === remainingKeys.length
    const allFormsValid = allFormsPresent && Object.values(formValidityRef.current).every(v => v === true)
    setIsValid(allFormsValid)
  }

  return (
    <div style={{
      backgroundColor: '#101417',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--u-space-one-and-half)',
      position: 'relative',
    }}>
      {/* Flow Toggle - Development Only */}
      <div style={{
        position: 'absolute',
        top: 'var(--u-space-one)',
        right: 'var(--u-space-one)',
        zIndex: 10,
      }}>
        <div style={{ width: '200px' }}>
          <Select
            options={[
              { label: 'Split Flow', value: 'split' },
              { label: 'Split (Default No)', value: 'split-default-no' },
              { label: 'Merged Flow', value: 'merged' },
            ]}
            value={{
              label: flowVersion === 'split' ? 'Split Flow' : flowVersion === 'split-default-no' ? 'Split (Default No)' : 'Merged Flow',
              value: flowVersion
            }}
            onChange={(option) => handleFlowChange(option?.value as 'split' | 'merged' | 'split-default-no')}
            menuPlacement="bottom"
          />
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--u-color-background-container)',
        borderRadius: '12px',
        padding: '48px',
        maxWidth: '624px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-two)',
        alignItems: 'center',
      }}>
        <img src={hudlLogo} alt="Hudl" height="44" />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--u-space-half)',
          alignItems: 'center',
          width: '100%',
        }}>
          <Lead as="h2" size="small">
            Add Your Athlete
          </Lead>
          <div style={{
            color: 'var(--u-color-base-foreground)',
            fontSize: 'var(--u-font-size-text-medium)',
            fontFamily: 'var(--u-font-body)',
            lineHeight: 1.4,
            textAlign: 'center',
          }}>
            Enter your athlete's information so we can match them to eligible registrations.
          </div>
        </div>

        <div
          ref={formContainerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
            width: '100%',
          }}
        >
          {formKeys.map((key) => (
            <AthleteForm
              key={key}
              formIndex={key}
              flowVersion={flowVersion}
              onUpdate={(idx, data, valid) => updateAthleteData(idx, data, valid)}
              onRemove={formKeys.length > 1 ? () => handleRemoveAthlete(key) : undefined}
            />
          ))}
        </div>

        <div style={{
          display: 'flex',
          gap: 'var(--u-space-three-quarter)',
          width: '100%',
        }}>
          <Button
            buttonType="secondary"
            size="medium"
            isBlock
            icon={<IconAdd size="small" />}
            onPress={handleAddAnotherAthlete}
          >
            Add Another Athlete
          </Button>
          <Button
            buttonType="primary"
            size="medium"
            isBlock
            isDisabled={!isValid}
            onPress={handleFinish}
          >
            Finish
          </Button>
        </div>
      </div>
    </div>
  )
}

function AthleteForm({ formIndex, flowVersion, onUpdate, onRemove }: { formIndex: number; flowVersion: 'split' | 'merged' | 'split-default-no'; onUpdate: (index: number, data: AthleteFormData, valid: boolean) => void; onRemove?: () => void }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [grade, setGrade] = useState('')
  const [graduationYear, setGraduationYear] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [hasHudlAccount, setHasHudlAccount] = useState<boolean | null>(flowVersion === 'split-default-no' ? false : null)
  const [athleteEmail, setAthleteEmail] = useState('')
  const [committedDateOfBirth, setCommittedDateOfBirth] = useState('')

  // Calculate if athlete is 13 or older based on a specific date
  const isThirteenOrOlder = (date: string): boolean => {
    if (!date) return false
    const birthDate = new Date(date)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()

    // Adjust age if birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return age - 1 >= 13
    }
    return age >= 13
  }

  // Only show question based on the committed (blurred) date, not the current typing value
  const showHudlAccountQuestion = committedDateOfBirth && isThirteenOrOlder(committedDateOfBirth)

  // Reset Hudl account selection when question is hidden (but preserve default for split-default-no)
  useEffect(() => {
    if (!showHudlAccountQuestion) {
      setHasHudlAccount(flowVersion === 'split-default-no' ? false : null)
      setAthleteEmail('')
    }
  }, [showHudlAccountQuestion, flowVersion])

  // Update parent whenever form data changes
  const updateParent = (updates: Partial<AthleteFormData>) => {
    const currentData: AthleteFormData = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      grade,
      ...updates
    }
    const basicFieldsValid = currentData.firstName.trim() !== '' &&
                             currentData.lastName.trim() !== '' &&
                             currentData.dateOfBirth !== '' &&
                             currentData.gender !== '' &&
                             currentData.grade !== ''

    // If the Hudl account question is shown, user must answer it
    const hudlAccountQuestionAnswered = !showHudlAccountQuestion || hasHudlAccount !== null

    // Email validation depends on flow version:
    // - Merged flow: email required when question is shown
    // - Split flow: email required only when "Yes" is selected
    const emailValid = showHudlAccountQuestion
                       ? (flowVersion === 'merged' || hasHudlAccount === true
                         ? athleteEmail.trim() !== ''
                         : true)
                       : true

    // Legal checkbox must be checked
    const legalValid = agreed

    const isValid = basicFieldsValid && hudlAccountQuestionAnswered && emailValid && legalValid
    onUpdate(formIndex, currentData, isValid)
  }

  // Revalidate whenever relevant state changes
  useEffect(() => {
    updateParent({})
  }, [firstName, lastName, dateOfBirth, gender, grade, agreed, hasHudlAccount, athleteEmail])

  // Calculate graduation year based on grade
  const calculateGraduationYear = (selectedGrade: string): string => {
    if (!selectedGrade) return ''

    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    // School year starts in August (month 7), so if we're before August, use current year, otherwise next year
    const academicYear = currentMonth >= 7 ? currentYear + 1 : currentYear

    const gradeToYearsUntilGrad: { [key: string]: number } = {
      'pre-k': 13,
      'kindergarten': 12,
      '1st': 11,
      '2nd': 10,
      '3rd': 9,
      '4th': 8,
      '5th': 7,
      '6th': 6,
      '7th': 5,
      '8th': 4,
      '9th': 3,
      '10th': 2,
      '11th': 1,
      '12th': 0,
    }

    const yearsUntilGrad = gradeToYearsUntilGrad[selectedGrade]
    return yearsUntilGrad !== undefined ? String(academicYear + yearsUntilGrad) : ''
  }

  const handleGradeChange = (value: string) => {
    setGrade(value)
    setGraduationYear(calculateGraduationYear(value))
    updateParent({ grade: value })
  }

  // Map grade value to label for display
  const gradeOptions = [
    { label: 'Pre-K', value: 'pre-k' },
    { label: 'Kindergarten', value: 'kindergarten' },
    { label: '1st Grade', value: '1st' },
    { label: '2nd Grade', value: '2nd' },
    { label: '3rd Grade', value: '3rd' },
    { label: '4th Grade', value: '4th' },
    { label: '5th Grade', value: '5th' },
    { label: '6th Grade', value: '6th' },
    { label: '7th Grade', value: '7th' },
    { label: '8th Grade', value: '8th' },
    { label: '9th Grade', value: '9th' },
    { label: '10th Grade', value: '10th' },
    { label: '11th Grade', value: '11th' },
    { label: '12th Grade', value: '12th' },
  ]
  const selectedGradeOption = gradeOptions.find(opt => opt.value === grade)

  // Generate graduation year options (current year through 15 years in the future)
  const currentYear = new Date().getFullYear()
  const graduationYearOptions = Array.from({ length: 16 }, (_, i) => {
    const year = currentYear + i
    return { label: String(year), value: String(year) }
  })
  const selectedGraduationYearOption = graduationYearOptions.find(opt => opt.value === graduationYear)

  // Generate display name and initials
  const displayName = firstName || lastName ? `${firstName} ${lastName}`.trim() : 'Athlete Name'
  const initials = firstName && lastName
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : firstName
    ? firstName[0].toUpperCase()
    : lastName
    ? lastName[0].toUpperCase()
    : 'A'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0px',
      width: '100%',
      padding: '0px',
      backgroundColor: '#1a1f24',
      borderRadius: '8px',
      border: '1px solid var(--u-color-line-subtle)',
      marginBottom: '20px',
    }}>
      <div style={{
        display: 'flex',
        gap: 'var(--u-space-half)',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--u-space-one) 20px',
        borderBottom: '1px solid var(--u-color-line-subtle)',
      }}>
        <div style={{
          display: 'flex',
          gap: 'var(--u-space-half)',
          alignItems: 'center',
        }}>
          <AvatarUser initials={firstName || lastName ? initials : undefined} size="small" />
          <div style={{
            fontSize: 'var(--u-font-size-text-large)',
            fontFamily: 'var(--u-font-body)',
            fontWeight: firstName || lastName ? 'var(--u-font-weight-bold)' : 'var(--u-font-weight-default)',
            color: firstName || lastName ? 'var(--u-color-base-foreground-contrast)' : 'var(--u-color-base-foreground-subtle)',
            lineHeight: 1.4,
          }}>
            {displayName}
          </div>
        </div>
        {onRemove && (
          <Button
            buttonStyle="minimal"
            buttonType="subtle"
            size="xsmall"
            aria-label="Remove athlete"
            onPress={onRemove}
            icon={<IconRemove size="small" />}
          />
        )}
      </div>

      {/* Hudl Account Question - Split or Merged Flow */}
      {(flowVersion === 'split' || flowVersion === 'split-default-no') ? (
        /* SPLIT FLOW - Yes/No Question */
        <div style={{
          overflow: 'hidden',
          maxHeight: showHudlAccountQuestion ? (hasHudlAccount === true ? '250px' : hasHudlAccount === false ? '280px' : '80px') : '0',
          opacity: showHudlAccountQuestion ? 1 : 0,
          transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
        }}>
          <div style={{
            backgroundColor: 'var(--u-color-background-callout)',
            borderBottom: '1px dashed var(--u-color-line-subtle)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--u-space-one)',
              padding: 'var(--u-space-one) 20px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--u-space-half)',
              }}>
                <IconInformation size="small" color="default" />
                <Text weight="bold">
                  Does {firstName || 'athlete'} already have a Hudl account?
                </Text>
              </div>
              <div style={{
                display: 'flex',
                gap: 'var(--u-space-quarter)',
                flexShrink: 0,
              }}>
                <Button
                  buttonType={hasHudlAccount === true ? 'secondary' : 'subtle'}
                  size="small"
                  onPress={() => {
                    setHasHudlAccount(true)
                    updateParent({})
                  }}
                >
                  Yes
                </Button>
                <Button
                  buttonType={hasHudlAccount === false ? 'secondary' : 'subtle'}
                  size="small"
                  onPress={() => {
                    setHasHudlAccount(false)
                    setAthleteEmail('')
                    updateParent({})
                  }}
                >
                  No
                </Button>
              </div>
            </div>

            {/* Email input section when "Yes" is selected */}
            {hasHudlAccount === true && (
              <div style={{
                padding: '0 20px 20px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--u-space-half)',
              }}>
                <Text>
                  <span style={{ fontWeight: 'var(--u-font-weight-bold)' }}>Connect {firstName || 'athlete'}'s existing account.</span> You'll access their highlights, stats, and team connections.
                </Text>
                <Input
                  placeholder="Enter email *"
                  type="email"
                  value={athleteEmail}
                  onChange={(val) => {
                    setAthleteEmail(val)
                    updateParent({})
                  }}
                  isRequired
                />
              </div>
            )}

            {/* Invite section when "No" is selected - only in regular split flow */}
            {hasHudlAccount === false && flowVersion === 'split' && (
              <div style={{
                padding: '0 20px 20px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--u-space-half)',
              }}>
                <Text>
                  <span style={{ fontWeight: 'var(--u-font-weight-bold)' }}>Invite them to create one.</span> They'll own their highlights, track their performance, and control their profile.
                </Text>
                <Input
                  placeholder="Enter email"
                  type="email"
                  value={athleteEmail}
                  onChange={(val) => {
                    setAthleteEmail(val)
                    updateParent({})
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        /* MERGED FLOW - Single Email Input */
        <div style={{
          overflow: 'hidden',
          maxHeight: showHudlAccountQuestion ? '180px' : '0',
          opacity: showHudlAccountQuestion ? 1 : 0,
          transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
        }}>
          <div style={{
            backgroundColor: 'var(--u-color-background-callout)',
            borderBottom: '1px dashed var(--u-color-line-subtle)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--u-space-half)',
          }}>
            <Text>
              <span style={{ fontWeight: 'var(--u-font-weight-bold)' }}>Connect {firstName || 'athlete'} to Hudl.</span> If they have an account, we'll link it. If not, we'll invite them to create one.
            </Text>
            <Input
              placeholder="Email *"
              type="email"
              value={athleteEmail}
              onChange={(val) => {
                setAthleteEmail(val)
                updateParent({})
              }}
              isRequired
            />
          </div>
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-three-quarter)',
        padding: '20px',
      }}>
        <div style={{
          display: 'flex',
          gap: 'var(--u-space-one)',
        }}>
          <div style={{ flex: 1 }}>
            <Input
              label="First Name"
              placeholder="First name"
              value={firstName}
              onChange={(val) => {
                setFirstName(val)
                updateParent({ firstName: val })
              }}
              isRequired
            />
          </div>
          <div style={{ flex: 1 }}>
            <Input
              label="Last Name"
              placeholder="Last name"
              value={lastName}
              onChange={(val) => {
                setLastName(val)
                updateParent({ lastName: val })
              }}
              isRequired
            />
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: 'var(--u-space-one)',
        }}>
          <div style={{ flex: 1 }}>
            <Input
              label="Date of Birth"
              type="date"
              value={dateOfBirth}
              onChange={(val) => {
                setDateOfBirth(val)
                updateParent({ dateOfBirth: val })
              }}
              onBlur={() => {
                // Commit the current date value - this determines if question shows
                setCommittedDateOfBirth(dateOfBirth)
              }}
              isRequired
            />
          </div>
          <div style={{ flex: 1 }}>
            <Select
              label="Gender"
              options={[
                { label: 'Female', value: 'female' },
                { label: 'Male', value: 'male' },
              ]}
              value={gender ? { label: gender === 'male' ? 'Male' : 'Female', value: gender } : null}
              onChange={(option) => {
                const val = option?.value || ''
                setGender(val)
                updateParent({ gender: val })
              }}
              placeholder="Select gender"
              isRequired
            />
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: 'var(--u-space-one)',
        }}>
          <div style={{ flex: 1 }}>
            <Select
              label="Grade"
              options={gradeOptions}
              value={selectedGradeOption || null}
              onChange={(option) => handleGradeChange(option?.value || '')}
              placeholder="Select grade"
              helpText="Grade for the 2025-2026 academic year."
              menuPlacement="top"
              isRequired
            />
          </div>
          <div style={{ flex: 1 }}>
            <Input
              label="Graduation Year"
              value={graduationYear}
              isReadOnly
              isRequired
            />
          </div>
        </div>

        <label style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '4px',
          cursor: 'pointer',
        }}>
          <div style={{ paddingTop: '2px' }}>
            <Checkbox
              isChecked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked)
                updateParent({})
              }}
            />
          </div>
          <Text size="small">
            I am the parent or legal guardian of the athlete listed above. I understand that a parent or legal guardian is required to register someone under 18 years old. I agree to abide by the organization's rules and policies.
          </Text>
        </label>
      </div>
    </div>
  )
}
