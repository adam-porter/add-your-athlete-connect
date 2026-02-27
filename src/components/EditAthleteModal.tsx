import { useState, useEffect } from 'react'
import { Input, Select, AvatarUser, Checkbox, Text } from '@hudl/uniform-web'
import { Modal } from '@hudl/uniform-web-dialogs'
import type { Athlete } from '../contexts/UserContext'

interface EditAthleteModalProps {
  athlete: Athlete
  onClose: () => void
  onSave: (athlete: Athlete) => void
  isNew?: boolean
}

export function EditAthleteModal({ athlete, onClose, onSave, isNew = false }: EditAthleteModalProps) {
  const [firstName, setFirstName] = useState(athlete.firstName)
  const [lastName, setLastName] = useState(athlete.lastName)
  const [dateOfBirth, setDateOfBirth] = useState(athlete.dateOfBirth)
  const [gender, setGender] = useState(athlete.gender)
  const [grade, setGrade] = useState(athlete.grade)
  const [graduationYear, setGraduationYear] = useState('')
  const [agreedToGuardianship, setAgreedToGuardianship] = useState(false)

  // Calculate graduation year based on grade
  const calculateGraduationYear = (selectedGrade: string): string => {
    if (!selectedGrade) return ''

    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
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

  // Initialize graduation year
  useEffect(() => {
    setGraduationYear(calculateGraduationYear(grade))
  }, [grade])

  const handleGradeChange = (value: string) => {
    setGrade(value)
    setGraduationYear(calculateGraduationYear(value))
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

  const handleSave = () => {
    onSave({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      grade
    })
  }

  // Check if all required fields are filled
  // For new athletes, also require guardian agreement
  const isValid = firstName.trim() !== '' &&
                  lastName.trim() !== '' &&
                  dateOfBirth !== '' &&
                  gender !== '' &&
                  grade !== '' &&
                  (!isNew || agreedToGuardianship)

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
    <Modal
      isOpen={true}
      onClose={onClose}
      header={isNew ? "Add Athlete" : "Edit Athlete"}
      size="large"
      actions={[
        {
          text: isNew ? 'Add Athlete' : 'Save Changes',
          buttonType: 'primary',
          isDisabled: !isValid,
          onPress: () => {
            handleSave()
            onClose()
          }
        }
      ]}
      cancelText="Cancel"
    >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--u-space-one)',
        }}>
        {/* Athlete preview */}
        <div style={{
          display: 'flex',
          gap: 'var(--u-space-half)',
          alignItems: 'center',
        }}>
          <AvatarUser initials={initials} size="small" />
          <div style={{
            color: displayName === 'Athlete Name' ? 'var(--u-color-base-subtle)' : 'var(--u-color-base-foreground)',
            fontSize: 'var(--u-font-size-text-large)',
            fontFamily: 'var(--u-font-body)',
            fontWeight: displayName === 'Athlete Name' ? 'var(--u-font-weight-medium)' : 'var(--u-font-weight-bold)',
          }}>
            {displayName}
          </div>
        </div>

        {/* Form fields */}
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
                options={gradeOptions}
                value={selectedGradeOption || null}
                onChange={(option) => handleGradeChange(option?.value || '')}
                placeholder="Select"
                helpText="Your athlete's grade for the 2025-2026 academic year."
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

          {/* Guardian checkbox - only show when adding a new athlete */}
          {isNew && (
            <div style={{
              display: 'flex',
              alignItems: 'start',
              gap: 'var(--u-space-half)',
              marginTop: 'var(--u-space-half)',
            }}>
              <Checkbox
                isChecked={agreedToGuardianship}
                onChange={(e) => setAgreedToGuardianship(e.target.checked)}
              />
              <Text size="small">
                I am the parent or legal guardian of the athlete listed above. I understand that a parent or legal guardian is required to register someone under 18 years old. I acknowledge that the participant and I, the parent/legal guardian, agree to abide by the organization's rules and policies.
              </Text>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
