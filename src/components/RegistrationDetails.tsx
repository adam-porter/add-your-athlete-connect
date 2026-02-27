import React from 'react'
import type { RegistrationItem } from '../types'

interface RegistrationDetailsProps {
  registration: RegistrationItem
}

export function RegistrationDetails({ registration }: RegistrationDetailsProps) {
  const labelStyle: React.CSSProperties = {
    color: 'var(--u-color-base-foreground-contrast)',
    fontSize: 'var(--u-font-size-text-medium)',
    fontFamily: 'var(--u-font-body)',
    fontWeight: 'var(--u-font-weight-default)',
    lineHeight: 1.4,
  }
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--u-space-quarter)',
    alignItems: 'flex-start',
    color: 'var(--u-color-base-foreground)',
    fontSize: 'var(--u-font-size-text-medium)',
    fontFamily: 'var(--u-font-body)',
    fontWeight: 'var(--u-font-weight-default)',
    lineHeight: 1.4,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-one)', width: '100%' }}>

      {/* Eligibility */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-quarter)' }}>
        <span style={labelStyle}>Eligibility</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-quarter)' }}>
          <div style={rowStyle}>
            <span>Birthdate:</span>
            <span>{registration.birthdateRange}</span>
          </div>
          <div style={rowStyle}>
            <span>Gender:</span>
            <span>{registration.gender}</span>
          </div>
          <div style={rowStyle}>
            <span>Grade:</span>
            <span>{registration.grade}</span>
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-quarter)' }}>
        <span style={labelStyle}>Payment Options</span>
        <div style={rowStyle}>
          <span>Full Payment:</span>
          <span>{registration.fullPayment}</span>
        </div>
      </div>

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-quarter)' }}>
        <span style={labelStyle}>Details</span>
        <span style={{
          color: 'var(--u-color-base-foreground)',
          fontSize: 'var(--u-font-size-text-medium)',
          fontFamily: 'var(--u-font-body)',
          fontWeight: 'var(--u-font-weight-default)',
          lineHeight: 1.4,
        }}>{registration.description}</span>
      </div>
    </div>
  )
}
