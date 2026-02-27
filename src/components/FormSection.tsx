import React from 'react'
import { Title, Text } from '@hudl/uniform-web'

interface FormSectionProps {
  title?: string
  description?: string
  children: React.ReactNode
  columns?: 1 | 2
}

export function FormSection({ title, description, children, columns = 1 }: FormSectionProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--u-space-one)',
    }}>
      {/* Section header */}
      {(title || description) && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--u-space-quarter)',
        }}>
          {title && (
            <Title as="h3" size="large">
              {title}
            </Title>
          )}
          {description && (
            <Text size="medium" color="default">
              {description}
            </Text>
          )}
        </div>
      )}

      {/* Form fields in grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: columns === 2 ? 'repeat(2, 1fr)' : '1fr',
        gap: 'var(--u-space-one)',
      }}>
        {children}
      </div>
    </div>
  )
}
