import { Title } from '@hudl/uniform-web'
import { RegistrationCard } from './RegistrationCard'
import { getEligibleAthletes } from '../utils/eligibility'
import { registrations } from '../data/registrations'

interface RegistrationListProps {
  isLoggedIn: boolean
}

export function RegistrationList({ isLoggedIn }: RegistrationListProps) {
  // Sort registrations: those with eligible athletes first
  const sortedRegistrations = isLoggedIn
    ? [...registrations].sort((a, b) => {
        const aHasEligible = getEligibleAthletes(a).length > 0
        const bHasEligible = getEligibleAthletes(b).length > 0
        if (aHasEligible && !bHasEligible) return -1
        if (!aHasEligible && bHasEligible) return 1
        return 0
      })
    : registrations

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-three-quarter)' }}>
      <div style={{
        paddingBottom: 'var(--u-space-quarter)',
        paddingLeft: 'var(--u-space-one)',
        paddingRight: 'var(--u-space-one)',
        fontSize: 'var(--u-font-size-text-large)',
        fontWeight: 'var(--u-font-weight-bold)',
        fontFamily: 'var(--u-font-body)',
        lineHeight: 1.4,
        color: 'var(--u-color-base-foreground)',
      }}>
        Registrations
      </div>
      {sortedRegistrations.map(reg => (
        <RegistrationCard key={reg.id} registration={reg} isLoggedIn={isLoggedIn} />
      ))}
    </div>
  )
}
