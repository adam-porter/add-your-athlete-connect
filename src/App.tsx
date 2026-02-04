import { useState } from 'react'
import { Environment, Title, Text, Card, Button } from '@hudl/uniform-web'
import { LayoutGroup, LayoutPanel, LayoutBorder, Placement } from '@hudl/performance-core-layout'

/**
 * Starter template using Hudl Uniform design system with resizable layout
 *
 * See CLAUDE.md for code style rules and quick reference
 * See src/UNIFORM_GUIDE.md for complete component documentation
 */

function App() {
  const [isDragging, setIsDragging] = useState(false)
  const [groupSize, setGroupSize] = useState(0)

  return (
    <Environment environment='dark'>
      {/* Environment provides theming and dark mode support */}

      <div style={{
        backgroundColor: 'var(--u-color-background-canvas)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--u-space-half',
        gap: 'var(--u-space-half'
      }}>
        {/* Header */}
        <div style={{
          padding: 'var(--u-space-one)',
        }}>
          <Title as="h1" size="large">
            Welcome to UX Prototypes
          </Title>
        </div>

        {/* Resizable Layout */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <LayoutGroup
            direction="horizontal"
            onSizeChange={setGroupSize}
          >
            {/* Left Sidebar Panel */}
            <LayoutPanel
              defaultSize={25}
              panel={{
                key: 'sidebar',
                placement: Placement.Left,
                minSize: { percentage: 15 },
                maxSize: { percentage: 50 },
                canResize: true,
                canCollapse: true
              }}
              groupSize={groupSize}
              isDragging={isDragging}
            >
              <div style={{
                padding: 'var(--u-space-one)',
                height: '100%',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--u-space-one)',
                backgroundColor: 'var(--u-color-background-container)',
                borderRadius: 'var(--u-border-radius-large'
              }}>
                <Title as="h2" size="medium">
                  Sidebar
                </Title>
                <Text color="subtle">
                  This sidebar is resizable! Drag the border to resize it.
                </Text>
                <Card>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--u-space-half)'
                  }}>
                    <div style={{ fontWeight: 'bold', fontSize: 'var(--u-font-size-default)' }}>
                      <Text>Quick Links</Text>
                    </div>
                    <Button buttonType="subtle" style={{ justifyContent: 'flex-start' }}>
                      Dashboard
                    </Button>
                    <Button buttonType="subtle" style={{ justifyContent: 'flex-start' }}>
                      Settings
                    </Button>
                    <Button buttonType="subtle" style={{ justifyContent: 'flex-start' }}>
                      Help
                    </Button>
                  </div>
                </Card>
              </div>
            </LayoutPanel>

            {/* Resize Handle */}
            <LayoutBorder onDragging={setIsDragging} />

            {/* Main Content Panel */}
            <LayoutPanel
              panel={{
                key: 'main',
                placement: Placement.Center
              }}
              groupSize={groupSize}
              isDragging={isDragging}
            >
              <div style={{
                padding: 'var(--u-space-two)',
                height: '100%',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--u-space-two)',
                backgroundColor: 'var(--u-color-background-container)',
                borderRadius: 'var(--u-border-radius-large'
              }}>
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
                      <li style={{ marginBottom: 'var(--u-space-half)' }}>
                        <Text>Use LayoutGroup, LayoutPanel, and LayoutBorder for resizable layouts</Text>
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
            </LayoutPanel>
          </LayoutGroup>
        </div>
      </div>
    </Environment>
  )
}

export default App
