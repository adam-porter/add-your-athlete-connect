import React, { useState } from 'react'
import { Input, Textarea, Select, Checkbox } from '@hudl/uniform-web'
import { RegistrationStep } from './RegistrationStep'
import { FormSection } from './FormSection'
import { FormField } from './FormField'

interface QuestionsProps {
  showedSelectAthlete: boolean
  onBack: () => void
  onContinue: (answers: Record<string, string>) => void
}

export function Questions({ showedSelectAthlete, onBack, onContinue }: QuestionsProps) {
  const [emergencyContactName, setEmergencyContactName] = useState('')
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('')
  const [emergencyContactEmail, setEmergencyContactEmail] = useState('')
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('')
  const [emergencyContactRelationshipOther, setEmergencyContactRelationshipOther] = useState('')
  const [medicalConditions, setMedicalConditions] = useState('')
  const [medications, setMedications] = useState('')
  const [dietaryRestrictions, setDietaryRestrictions] = useState('')
  const [jerseySize, setJerseySize] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [previousClub, setPreviousClub] = useState('')
  const [position, setPosition] = useState('')
  const [photoConsent, setPhotoConsent] = useState(false)

  const handleContinue = () => {
    onContinue({
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactEmail,
      emergencyContactRelationship,
      emergencyContactRelationshipOther,
      medicalConditions,
      medications,
      dietaryRestrictions,
      jerseySize,
      experienceLevel,
      previousClub,
      position,
      photoConsent: photoConsent.toString(),
    })
  }

  return (
    <RegistrationStep
      title="Questions"
      description="Answer the following questions to complete registration for this program."
      onBack={onBack}
      onContinue={handleContinue}
      currentStep={showedSelectAthlete ? 2 : 1}
      totalSteps={showedSelectAthlete ? 3 : 2}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-three)',
        paddingBottom: '64px',
      }}>
        {/* Emergency Contact Section */}
        <FormSection
          title="Emergency Contact"
          description="This person will be contacted in case of emergency during tryouts."
          columns={2}
        >
          <FormField>
            <Input
              label="Contact Name"
              placeholder="Full name"
              value={emergencyContactName}
              onChange={setEmergencyContactName}
            />
          </FormField>

          <FormField>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="(555) 555-5555"
              value={emergencyContactPhone}
              onChange={setEmergencyContactPhone}
            />
          </FormField>

          <FormField>
            <Input
              label="Email Address"
              type="email"
              placeholder="email@example.com"
              value={emergencyContactEmail}
              onChange={setEmergencyContactEmail}
            />
          </FormField>

          <FormField>
            <Select
              label="Relationship to Athlete"
              options={[
                { label: 'Select relationship', value: '' },
                { label: 'Parent', value: 'parent' },
                { label: 'Guardian', value: 'guardian' },
                { label: 'Sibling', value: 'sibling' },
                { label: 'Other', value: 'other' },
              ]}
              value={emergencyContactRelationship ? { label: emergencyContactRelationship === 'parent' ? 'Parent' : emergencyContactRelationship === 'guardian' ? 'Guardian' : emergencyContactRelationship === 'sibling' ? 'Sibling' : 'Other', value: emergencyContactRelationship } : null}
              onChange={(option) => setEmergencyContactRelationship(option?.value || '')}
              placeholder="Select relationship"
            />
          </FormField>

          {/* Conditional "Other" relationship field */}
          {emergencyContactRelationship === 'other' && (
            <FormField fullWidth>
              <Input
                label="Please specify relationship"
                placeholder="e.g., Coach, Grandparent, Family Friend"
                value={emergencyContactRelationshipOther}
                onChange={setEmergencyContactRelationshipOther}
              />
            </FormField>
          )}
        </FormSection>

        {/* Medical Information Section */}
        <FormSection
          title="Medical Information"
          description="Help us keep your athlete safe by sharing important medical details."
          columns={1}
        >
          <FormField>
            <Textarea
              label="Medical Conditions or Allergies"
              placeholder="List any medical conditions, allergies, or special considerations"
              rows={3}
              value={medicalConditions}
              onChange={setMedicalConditions}
            />
          </FormField>

          <FormField>
            <Input
              label="Current Medications"
              placeholder="List any medications (optional)"
              value={medications}
              onChange={setMedications}
            />
          </FormField>

          <FormField>
            <Input
              label="Dietary Restrictions"
              placeholder="Any dietary restrictions or food allergies (optional)"
              value={dietaryRestrictions}
              onChange={setDietaryRestrictions}
            />
          </FormField>
        </FormSection>

        {/* Player Information Section */}
        <FormSection
          title="Player Information"
          description="Tell us about the athlete's experience and preferences."
          columns={2}
        >
          <FormField>
            <Select
              label="Jersey Size"
              options={[
                { label: 'Select a size', value: '' },
                { label: 'Youth Small', value: 'Youth Small' },
                { label: 'Youth Medium', value: 'Youth Medium' },
                { label: 'Youth Large', value: 'Youth Large' },
                { label: 'Adult Small', value: 'Adult Small' },
                { label: 'Adult Medium', value: 'Adult Medium' },
                { label: 'Adult Large', value: 'Adult Large' },
                { label: 'Adult XL', value: 'Adult XL' },
              ]}
              value={jerseySize ? { label: jerseySize, value: jerseySize } : null}
              onChange={(option) => setJerseySize(option?.value || '')}
              placeholder="Select a size"
            />
          </FormField>

          <FormField>
            <Select
              label="Primary Position"
              options={[
                { label: 'Select position', value: '' },
                { label: 'Setter', value: 'Setter' },
                { label: 'Outside Hitter', value: 'Outside Hitter' },
                { label: 'Middle Blocker', value: 'Middle Blocker' },
                { label: 'Opposite', value: 'Opposite' },
                { label: 'Libero', value: 'Libero' },
                { label: 'Defensive Specialist', value: 'Defensive Specialist' },
              ]}
              value={position ? { label: position, value: position } : null}
              onChange={(option) => setPosition(option?.value || '')}
              placeholder="Select position"
            />
          </FormField>

          <FormField>
            <Select
              label="Experience Level"
              options={[
                { label: 'Select experience level', value: '' },
                { label: 'Less than 1 year', value: 'Less than 1 year' },
                { label: '1-2 years', value: '1-2 years' },
                { label: '3-4 years', value: '3-4 years' },
                { label: '5+ years', value: '5+ years' },
              ]}
              value={experienceLevel ? { label: experienceLevel, value: experienceLevel } : null}
              onChange={(option) => setExperienceLevel(option?.value || '')}
              placeholder="Select experience level"
            />
          </FormField>

          <FormField>
            <Input
              label="Previous Club/Team"
              placeholder="Name of previous club or team (optional)"
              value={previousClub}
              onChange={setPreviousClub}
            />
          </FormField>
        </FormSection>

        {/* Consent Section */}
        <FormSection
          title="Photo & Video Consent"
          columns={1}
        >
          <FormField>
            <Checkbox
              label="I consent to photos and videos being taken during tryouts for coaching evaluation purposes only"
              isChecked={photoConsent}
              onChange={setPhotoConsent}
            />
          </FormField>
        </FormSection>
      </div>
    </RegistrationStep>
  )
}
