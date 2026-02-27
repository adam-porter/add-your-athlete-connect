import React from 'react'

interface FormFieldProps {
  children: React.ReactNode
  fullWidth?: boolean
}

export function FormField({ children, fullWidth = false }: FormFieldProps) {
  return (
    <div style={{
      gridColumn: fullWidth ? '1 / -1' : 'auto',
    }}>
      {children}
    </div>
  )
}
