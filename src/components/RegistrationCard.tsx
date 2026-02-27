import { useState } from 'react'
import { Title, Text, Button, Note } from '@hudl/uniform-web'
import { IconUiExpandCollapseDown, IconUiExpandCollapseUp } from '@hudl/uniform-web-icons'
import { RegistrationDetails } from './RegistrationDetails'
import { getEligibleAthletes } from '../utils/eligibility'
import type { RegistrationItem } from '../types'

interface RegistrationCardProps {
  registration: RegistrationItem
  isLoggedIn: boolean
}

export function RegistrationCard({ registration, isLoggedIn }: RegistrationCardProps) {
  const [expanded, setExpanded] = useState(false)
  const hasEligibleAthletes = isLoggedIn && getEligibleAthletes(registration).length > 0

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
                {/* Left: Eligible athletes list */}
                <div style={{ display: 'flex', gap: 'var(--u-space-eighth)', alignItems: 'center', flex: 1 }}>
                  {hasEligibleAthletes ? (
                    <>
                      <Text size="small">Eligible:</Text>
                      <div style={{ display: 'flex', gap: 'var(--u-space-eighth)', alignItems: 'center', flexWrap: 'wrap' }}>
                        {getEligibleAthletes(registration).map((athlete, index, array) => (
                          <Text size="small" color="default" key={athlete.name}>
                            {athlete.name}{index < array.length - 1 ? ',' : ''}
                          </Text>
                        ))}
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
                  <Button buttonType="primary" size="small" isDisabled={!hasEligibleAthletes}>Register</Button>
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
