import React, { useState } from 'react'
import { AvatarUser, Title, Button } from '@hudl/uniform-web'
import { Tooltip } from '@hudl/uniform-web-tooltip'
import { IconAdd } from '@hudl/uniform-web-icons'
import { useUser } from '../contexts/UserContext'
import { EditAthleteModal } from './EditAthleteModal'
import type { Athlete } from '../contexts/UserContext'

export function MyAthletes() {
  const { userData, setUserData, addAthlete } = useUser()
  const [editingAthlete, setEditingAthlete] = useState<{ athlete: Athlete; index: number } | null>(null)
  const [isAddingAthlete, setIsAddingAthlete] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Map user's athletes to display format
  const athletes = userData?.athletes.map(athlete => ({
    name: `${athlete.firstName} ${athlete.lastName}`,
    initials: `${athlete.firstName[0]}${athlete.lastName[0]}`.toUpperCase()
  })) || []

  const handleAthleteClick = (index: number) => {
    if (userData?.athletes[index]) {
      setEditingAthlete({ athlete: userData.athletes[index], index })
    }
  }

  const handleSaveAthlete = (updatedAthlete: Athlete) => {
    if (userData && editingAthlete) {
      const updatedAthletes = [...userData.athletes]
      updatedAthletes[editingAthlete.index] = updatedAthlete
      setUserData({
        ...userData,
        athletes: updatedAthletes
      })
    }
  }

  const handleAddAthlete = (newAthlete: Athlete) => {
    addAthlete(newAthlete)
  }

  // Empty athlete for adding new
  const emptyAthlete: Athlete = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    grade: ''
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--u-space-quarter)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--u-space-quarter)' }}>
        {/* Avatar stack */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }} className="athlete-avatar-stack">
          {athletes.map((athlete, index) => {
            const firstName = userData?.athletes[index]?.firstName || ''
            return (
              <div
                key={athlete.name}
                style={{
                  marginLeft: index > 0 ? '-8px' : '0',
                  position: 'relative',
                  zIndex: hoveredIndex === index ? athletes.length + 1 : athletes.length - index,
                  transition: 'transform 0.2s ease',
                  transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <Tooltip
                  content={`Edit ${firstName}`}
                  type="label"
                  position="top"
                  asChild
                  className="athlete-tooltip"
                >
                  <button
                    onClick={() => handleAthleteClick(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      display: 'block',
                      filter: hoveredIndex === index ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' : 'none',
                      transition: 'filter 0.2s ease',
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <AvatarUser
                      size="small"
                      initials={athlete.initials}
                    />
                  </button>
                </Tooltip>
              </div>
            )
          })}
        </div>

        {/* Add athlete button */}
        <Button
          buttonType="secondary"
          buttonStyle="minimal"
          size="small"
          icon={<IconAdd size="small" />}
          onPress={() => setIsAddingAthlete(true)}
        >
          Add Athlete
        </Button>
      </div>

      {/* Edit athlete modal */}
      {editingAthlete && (
        <EditAthleteModal
          athlete={editingAthlete.athlete}
          onClose={() => setEditingAthlete(null)}
          onSave={handleSaveAthlete}
        />
      )}

      {/* Add athlete modal */}
      {isAddingAthlete && (
        <EditAthleteModal
          athlete={emptyAthlete}
          onClose={() => setIsAddingAthlete(false)}
          onSave={(newAthlete) => {
            handleAddAthlete(newAthlete)
            setIsAddingAthlete(false)
          }}
          isNew={true}
        />
      )}
    </div>
  )
}
