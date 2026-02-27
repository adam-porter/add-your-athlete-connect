import { useState } from 'react'
import { Button, Input, Text, Lead, Select, Checkbox, AvatarUser } from '@hudl/uniform-web'
import { IconAdd } from '@hudl/uniform-web-icons'
import hudlLogo from '../images/logo/hudl-logo 3.svg'

interface AddAthleteProps {
  onFinish: () => void
}

export function AddAthlete({ onFinish }: AddAthleteProps) {
  const [formCount, setFormCount] = useState(1)

  const handleAddAnotherAthlete = () => {
    setFormCount(formCount + 1)
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
    }}>
      <div style={{
        backgroundColor: 'var(--u-color-background-callout)',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '560px',
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

        {[...Array(formCount)].map((_, index) => (
          <AthleteForm key={index} formIndex={index} />
        ))}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
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
            onPress={onFinish}
          >
            Finish
          </Button>
        </div>
      </div>
    </div>
  )
}

function AthleteForm({ formIndex }: { formIndex: number }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [grade, setGrade] = useState('')
  const [graduationYear, setGraduationYear] = useState('')
  const [agreed, setAgreed] = useState(false)

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
  }

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
      gap: '20px',
      width: '100%',
    }}>
      <div style={{
        display: 'flex',
        gap: 'var(--u-space-half)',
        alignItems: 'center',
      }}>
        <AvatarUser initials={initials} size="small" />
        <Text color={firstName || lastName ? 'default' : 'subtle'}>{displayName}</Text>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-one)',
      }}>
        <div style={{
          display: 'flex',
          gap: 'var(--u-space-one)',
        }}>
          <div style={{ flex: 1 }}>
            <Input
              label="First Name"
              value={firstName}
              onChange={setFirstName}
              isRequired
            />
          </div>
          <div style={{ flex: 1 }}>
            <Input
              label="Last Name"
              value={lastName}
              onChange={setLastName}
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
              onChange={setDateOfBirth}
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
              onChange={(option) => setGender(option?.value || '')}
              placeholder="Select"
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
              options={[
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
              ]}
              value={grade ? { label: grade, value: grade } : null}
              onChange={(option) => handleGradeChange(option?.value || '')}
              placeholder="Select"
              helpText="Your athlete's grade for the 2025-2026 academic year."
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

        <div style={{
          display: 'flex',
          alignItems: 'start',
        }}>
          <Checkbox
            isChecked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <Text size="small">
            I am the parent or legal guardian of the athlete listed above. I understand that a parent or legal guardian is required to register someone under 18 years old. I acknowledge that the participant and I, the parent/legal guardian, agree to abide by the organization's rules and policies.
          </Text>
        </div>
      </div>
    </div>
  )
}
