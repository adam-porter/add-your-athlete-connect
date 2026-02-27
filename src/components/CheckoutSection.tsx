import React from 'react'

interface CheckoutSectionProps {
  title: string
  children: React.ReactNode
}

export function CheckoutSection({ title, children }: CheckoutSectionProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--u-space-one-and-quarter)',
    }}>
      <div style={{ fontSize: 'var(--u-font-size-text-large)', fontWeight: 700, color: 'var(--u-color-base-foreground)' }}>
        {title}
      </div>
      {children}
    </div>
  )
}
