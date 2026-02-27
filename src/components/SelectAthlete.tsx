import React, { useState } from 'react'
import { Text, AvatarUser, Radio, Title, Button } from '@hudl/uniform-web'
import { RegistrationStep } from './RegistrationStep'
import { useUser } from '../contexts/UserContext'
import { getEligibleAthletes } from '../utils/eligibility'
import type { RegistrationItem } from '../types'

interface SelectAthleteProps {
  registration: RegistrationItem
  onBack: () => void
  onContinue: (athleteId: string) => void
}

export function SelectAthlete({ registration, onBack, onContinue }: SelectAthleteProps) {
  const { userData } = useUser()
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(null)
  const [hoveredAthleteId, setHoveredAthleteId] = useState<string | null>(null)

  // Get only eligible athletes for this registration
  const allAthletes = userData?.athletes || []
  const eligibleAthletes = getEligibleAthletes(registration, allAthletes)

  const handleContinue = () => {
    if (selectedAthleteId) {
      onContinue(selectedAthleteId)
    }
  }

  return (
    <RegistrationStep
      title="Select Athlete"
      description={`Select an athlete for the ${registration.name}.`}
      onBack={onBack}
      onContinue={handleContinue}
      continueDisabled={!selectedAthleteId || eligibleAthletes.length === 0}
      currentStep={1}
      totalSteps={3}
    >
      {eligibleAthletes.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--u-space-one)',
          padding: 'var(--u-space-two)',
          backgroundColor: 'var(--u-color-background-callout)',
          borderRadius: 'var(--u-border-radius-large)',
        }}>
          <Title as="h3" size="medium">No Eligible Athletes</Title>
          <Text>None of your athletes meet the requirements for this program.</Text>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--u-space-half)',
            marginTop: 'var(--u-space-half)'
          }}>
            <Text size="small" weight="bold">Requirements:</Text>
            <Text size="small">Birth Date: {registration.birthdateRange}</Text>
            <Text size="small">Gender: {registration.gender}</Text>
            <Text size="small">Grade: {registration.grade}</Text>
          </div>
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--u-space-half)',
          }}>
            {eligibleAthletes.map((athlete) => {
          // Find the original athlete index to create the ID
          const athleteIndex = allAthletes.findIndex(a =>
            a.firstName === athlete.firstName && a.lastName === athlete.lastName
          )
          const athleteId = `athlete-${athleteIndex}`

          const initials = 'firstName' in athlete
            ? `${athlete.firstName[0]}${athlete.lastName[0]}`.toUpperCase()
            : athlete.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
          const isSelected = selectedAthleteId === athleteId
          const isHovered = hoveredAthleteId === athleteId

          const displayName = 'firstName' in athlete
            ? `${athlete.firstName} ${athlete.lastName}`
            : athlete.name

          // Determine background and border styles based on state
          const getStyles = () => {
            if (isSelected) {
              return {
                backgroundColor: isHovered
                  ? 'var(--u-color-emphasis-background-hover)'
                  : 'var(--u-color-emphasis-background)',
                border: isHovered
                  ? '1px solid var(--u-color-emphasis-background-contrast-hover)'
                  : '1px solid var(--u-color-emphasis-background-contrast)',
              }
            }
            // Default state uses the same colors as selected hover
            return {
              backgroundColor: isHovered
                ? 'var(--u-color-emphasis-background-hover)'
                : 'var(--u-color-background-container)',
              border: isHovered
                ? '1px solid var(--u-color-emphasis-background-contrast-hover)'
                : '1px solid transparent',
            }
          }

          const styles = getStyles()

          return (
            <label
              key={athleteId}
              onMouseEnter={() => setHoveredAthleteId(athleteId)}
              onMouseLeave={() => setHoveredAthleteId(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--u-space-one)',
                padding: 'var(--u-space-one-and-half) var(--u-space-two) var(--u-space-one-and-half) var(--u-space-one-and-half)',
                minHeight: '56px',
                borderRadius: 'var(--u-border-radius-large)',
                cursor: 'pointer',
                width: '100%',
                ...styles,
                transition: 'background-color 0.15s ease, border-color 0.15s ease',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--u-space-half)',
                flex: 1,
                overflow: 'hidden',
              }}>
                <AvatarUser size="small" initials={initials} />
                <Text
                  size="medium"
                  weight="bold"
                  color={isSelected ? "contrast" : "default"}
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontWeight: 'var(--u-font-weight-bold)',
                  }}
                >
                  {displayName}
                </Text>
              </div>
              <Radio
                name="athlete-selection"
                value={athleteId}
                isChecked={isSelected}
                onChange={() => setSelectedAthleteId(athleteId)}
              />
            </label>
          )
        })}
          </div>
        </>
      )}
    </RegistrationStep>
  )
}
