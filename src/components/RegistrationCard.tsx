import { useState } from 'react'
import { Title, Text, Button, Note, AvatarUser } from '@hudl/uniform-web'
import { IconUiExpandCollapseDown, IconUiExpandCollapseUp } from '@hudl/uniform-web-icons'
import { Tooltip } from '@hudl/uniform-web-tooltip'
import { RegistrationDetails } from './RegistrationDetails'
import { getEligibleAthletes } from '../utils/eligibility'
import type { RegistrationItem } from '../types'
import type { Athlete } from '../contexts/UserContext'

interface RegistrationCardProps {
  registration: RegistrationItem
  isLoggedIn: boolean
  userAthletes?: Athlete[]
  onRegister?: (registrationId: string) => void
}

export function RegistrationCard({ registration, isLoggedIn, userAthletes = [], onRegister }: RegistrationCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [hoveredAthleteIndex, setHoveredAthleteIndex] = useState<number | null>(null)
  const eligibleAthletes = isLoggedIn ? getEligibleAthletes(registration, userAthletes) : []
  const hasEligibleAthletes = eligibleAthletes.length > 0

  return (
    <div style={{
      backgroundColor: hasEligibleAthletes ? 'var(--u-color-background-callout)' : 'var(--u-color-background-container)',
      borderRadius: '8px',
      paddingTop: 'var(--u-space-one)',
      paddingBottom: 'var(--u-space-one-and-quarter)',
      paddingLeft: 'var(--u-space-one)',
      paddingRight: 'var(--u-space-one)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--u-space-one-and-quarter)',
    }}>
      {/* inner-container: price + primary-info, gap 8px */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-half)' }}>

        {/* Price row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            color: 'var(--u-color-emphasis-foreground-contrast)',
            fontSize: 'var(--u-font-size-text-large)',
            fontFamily: 'var(--u-font-body)',
            fontWeight: 'var(--u-font-weight-default)',
            lineHeight: 1.4,
          }}>
            {registration.price}
          </span>
          <Button
            buttonStyle="minimal"
            buttonType="subtle"
            size="xsmall"
            aria-label={expanded ? 'Collapse' : 'Expand'}
            onPress={() => setExpanded(e => !e)}
            style={{
              padding: 0,
              margin: 0,
              minWidth: 'auto',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ display: 'flex', margin: 0, padding: 0, lineHeight: 0 }}>
              {expanded
                ? <IconUiExpandCollapseUp size="small" color="subtle" />
                : <IconUiExpandCollapseDown size="small" color="subtle" />
              }
            </span>
          </Button>
        </div>

        {/* Primary info: name/dates + bottom row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-half)' }}>

          {/* Name + dates, gap 2px */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-eighth)' }}>
            <div style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              fontSize: 'var(--u-font-size-text-large)',
              fontWeight: 'var(--u-font-weight-bold)',
              fontFamily: 'var(--u-font-body)',
              lineHeight: 1.4,
              color: 'var(--u-color-base-foreground)',
            }}>
              {registration.name}
            </div>
            <div style={{
              display: 'flex',
              gap: 'var(--u-space-quarter)',
              alignItems: 'center',
              color: 'var(--u-color-subtle-foreground)',
              fontSize: 'var(--u-font-size-text-default)',
              fontFamily: 'var(--u-font-body)',
              fontWeight: 'var(--u-font-weight-default)',
              lineHeight: 1.4,
              whiteSpace: 'nowrap',
            }}>
              <span>{registration.startDate}</span>
              <span>-</span>
              <span>{registration.endDate}</span>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: 'flex', gap: 'var(--u-space-half)', alignItems: 'center', justifyContent: 'space-between' }}>
            {isLoggedIn ? (
              <>
                {/* Left: Eligible athletes avatars */}
                <div style={{ display: 'flex', gap: 'var(--u-space-quarter)', alignItems: 'center', flex: 1 }}>
                  {hasEligibleAthletes ? (
                    <>
                      <Text size="small">Eligible:</Text>
                      {/* Avatar stack */}
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {eligibleAthletes.map((athlete, index) => {
                          const name = 'firstName' in athlete ? `${athlete.firstName} ${athlete.lastName}` : athlete.name
                          const initials = 'firstName' in athlete
                            ? `${athlete.firstName[0]}${athlete.lastName[0]}`.toUpperCase()
                            : athlete.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                          return (
                            <div
                              key={name}
                              style={{
                                marginLeft: index > 0 ? '-8px' : '0',
                                position: 'relative',
                                zIndex: hoveredAthleteIndex === index ? eligibleAthletes.length + 1 : eligibleAthletes.length - index,
                                transition: 'transform 0.2s ease',
                                transform: hoveredAthleteIndex === index ? 'scale(1.1)' : 'scale(1)',
                              }}
                              onMouseEnter={() => setHoveredAthleteIndex(index)}
                              onMouseLeave={() => setHoveredAthleteIndex(null)}
                            >
                              <Tooltip
                                content={name}
                                type="label"
                                position="top"
                                asChild
                                className="athlete-tooltip"
                              >
                                <div style={{
                                  filter: hoveredAthleteIndex === index ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' : 'none',
                                  transition: 'filter 0.2s ease',
                                }}>
                                  <AvatarUser
                                    size="small"
                                    initials={initials}
                                  />
                                </div>
                              </Tooltip>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  ) : (
                    <Text size="small" color="subtle">No eligible athletes</Text>
                  )}
                </div>

                {/* Right: note + register button */}
                <div style={{ display: 'flex', gap: 'var(--u-space-one)', alignItems: 'center', flexShrink: 0 }}>
                  <Note size="small" type="information">
                    <Text size="small">Only ## spots left</Text>
                  </Note>
                  <Button
                    buttonType="primary"
                    size="small"
                    isDisabled={!hasEligibleAthletes}
                    onPress={() => onRegister?.(registration.id)}
                  >
                    Register
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Left: Log in note */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Note size="small" type="information">
                    <Text size="small" color="default">Log in or add an athlete to check eligibility.</Text>
                  </Note>
                </div>

                {/* Right: disabled register button */}
                <Button buttonType="primary" size="small" isDisabled>Register</Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Expanded details panel */}
      {expanded && <RegistrationDetails registration={registration} />}
    </div>
  )
}
