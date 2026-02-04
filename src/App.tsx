import React from 'react'
import { Environment, Title, Text, Card, Button } from '@hudl/uniform-web'

/**
 * Starter template using Hudl Uniform design system
 *
 * See CLAUDE.md for code style rules and quick reference
 * See src/UNIFORM_GUIDE.md for complete component documentation
 */

function App() {
  return (
    <Environment>
      {/* Environment provides theming and dark mode support */}

      <div style={{
        padding: 'var(--u-space-two)',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-two)'
      }}>
        {/* Use Title for headings, Text for body copy */}
        <Title as="h1" size="xlarge">
          Welcome to UX Primer
        </Title>

        <Text size="medium">
          This is your starter template for building prototypes with React and Hudl Uniform.
        </Text>

        <Card>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--u-space-one)'
          }}>
            <Title as="h2" size="large">
              Getting Started
            </Title>
            <ol style={{ paddingLeft: 'var(--u-space-one-and-half)' }}>
              <li style={{ marginBottom: 'var(--u-space-half)' }}>
                <Text>Always use Uniform components (Title, Text, Button, etc.)</Text>
              </li>
              <li style={{ marginBottom: 'var(--u-space-half)' }}>
                <Text>Use CSS variables for colors: var(--u-color-emphasis-foreground)</Text>
              </li>
              <li style={{ marginBottom: 'var(--u-space-half)' }}>
                <Text>Use CSS variables for spacing: var(--u-space-one)</Text>
              </li>
              <li>
                <Text>Check src/UNIFORM_GUIDE.md for all available components and variables</Text>
              </li>
            </ol>
          </div>
        </Card>

        <Card>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--u-space-one)'
          }}>
            <Title as="h3" size="medium">
              Example Component Area
            </Title>
            <Text>
              Replace this section with your Uniform components. Ask Claude for help!
            </Text>
            <Button buttonType="primary">Example Button</Button>
          </div>
        </Card>
      </div>
    </Environment>
  )
}

export default App
