# Uniform Design System Guide

**IMPORTANT: When building prototypes, ALWAYS use Uniform components and CSS variables instead of plain HTML or hardcoded values.**

## Quick Rules

1. **Never use plain HTML elements** - Use Uniform components instead
2. **Never hardcode colors** - Use CSS variables like `var(--u-color-emphasis-foreground)`
3. **Never hardcode spacing** - Use CSS variables like `var(--u-space-one)`
4. **Never hardcode font sizes** - Use CSS variables like `var(--u-font-size-large)`
5. **Wrap everything in `<Environment>`** - This provides proper theming support

## Core Components

### Typography

```typescript
import { Title, Text } from '@hudl/uniform-web'

// Headings
<Title as="h1" size="xxlarge">Main Heading</Title>
<Title as="h2" size="xlarge">Section Heading</Title>
<Title as="h3" size="large">Subsection</Title>

// Body text
<Text size="large">Large text</Text>
<Text size="medium">Normal text (default)</Text>
<Text size="small">Small text</Text>
<Text size="xsmall">Extra small text</Text>

// With different weights
<Text weight="bold">Bold text</Text>
<Text weight="regular">Regular text</Text>

// With colors
<Text color="contrast">High contrast text</Text>
<Text color="default">Default text</Text>
<Text color="subtle">Subtle/muted text</Text>
```

### Buttons

```typescript
import { Button } from '@hudl/uniform-web'

// Button types
<Button buttonType="primary">Primary Action</Button>
<Button buttonType="secondary">Secondary Action</Button>
<Button buttonType="subtle">Subtle Action</Button>
<Button buttonType="minimal">Minimal Action</Button>
<Button buttonType="destroy">Delete/Remove</Button>
<Button buttonType="confirm">Confirm/Save</Button>

// Button sizes
<Button size="small">Small</Button>
<Button size="medium">Medium (default)</Button>
<Button size="large">Large</Button>

// With icons
<Button icon={<SomeIcon />}>With Icon</Button>
<Button iconPlacement="right" icon={<SomeIcon />}>Icon Right</Button>
```

### Layout Components

```typescript
import { Card } from '@hudl/uniform-web'

// Card - container with elevation
<Card>
  <Text>Content in a card</Text>
</Card>

// For layout, use flexbox with Uniform spacing variables
<div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--u-space-one)'
}}>
  <Text>First item</Text>
  <Text>Second item</Text>
</div>

// Horizontal layout with spacing
<div style={{
  display: 'flex',
  gap: 'var(--u-space-half)',
  alignItems: 'center'
}}>
  <Button>Cancel</Button>
  <Button buttonType="primary">Save</Button>
</div>

// Max-width container
<div style={{
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 'var(--u-space-two)'
}}>
  <Text>Centered content</Text>
</div>
```

### Forms

```typescript
import { Input, Textarea, Select, Checkbox, Radio } from '@hudl/uniform-web'

// Text input
<Input
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// Textarea
<Textarea
  label="Description"
  rows={4}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

// Select
<Select label="Choose option">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>

// Checkbox
<Checkbox
  label="I agree to terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>

// Radio
<Radio
  label="Option A"
  name="choice"
  value="a"
  checked={choice === 'a'}
  onChange={() => setChoice('a')}
/>
```

### Resizable Layout System

For complex multi-panel layouts with resizable and collapsible sections, use the Performance Core Layout system built on react-resizable-panels.

```typescript
import { LayoutGroup, LayoutPanel, LayoutBorder, Placement } from '@hudl/performance-core-layout'
import { useState } from 'react'

function MyLayout() {
  const [isDragging, setIsDragging] = useState(false)
  const [groupSize, setGroupSize] = useState(0)

  return (
    <LayoutGroup
      direction="horizontal"
      onSizeChange={setGroupSize}
    >
      {/* Left sidebar panel */}
      <LayoutPanel
        panel={{
          key: 'sidebar',
          placement: Placement.Left,
          size: 20, // 20% of container
          minSize: { percentage: 15 },
          maxSize: { percentage: 40 },
          canResize: true,
          canCollapse: true
        }}
        groupSize={groupSize}
        isDragging={isDragging}
      >
        <div style={{ padding: 'var(--u-space-one)' }}>
          <Title as="h3" size="medium">Sidebar</Title>
          <Text>Sidebar content here</Text>
        </div>
      </LayoutPanel>

      {/* Resize handle */}
      <LayoutBorder onDragging={setIsDragging} />

      {/* Main content panel */}
      <LayoutPanel
        panel={{
          key: 'main',
          placement: Placement.Center
        }}
        groupSize={groupSize}
        isDragging={isDragging}
      >
        <div style={{ padding: 'var(--u-space-one)' }}>
          <Title as="h2" size="large">Main Content</Title>
          <Text>Main content here</Text>
        </div>
      </LayoutPanel>
    </LayoutGroup>
  )
}
```

#### Layout Components

**LayoutGroup** - Container for resizable panels
- Props:
  - `direction`: `'horizontal'` or `'vertical'` - direction of panel layout
  - `onSizeChange`: Callback when group size changes
  - Inherits all [PanelGroup props from react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)

**LayoutPanel** - Individual resizable panel
- Props:
  - `panel`: PanelInfo object (see below)
  - `groupSize`: Current size of the parent LayoutGroup
  - `isDragging`: Whether a border is currently being dragged
  - `onCollapse`: Callback when panel collapses
  - `onExpand`: Callback when panel expands
  - `onResize`: Callback when panel is resized

**LayoutBorder** - Resize handle between panels
- Props:
  - `onDragging`: Callback when dragging starts/stops
  - `isDisabled`: Disable resizing

**PanelInfo** - Configuration object for LayoutPanel
```typescript
{
  key: string                    // Unique identifier
  placement: Placement           // Panel position (Left, Center, Right, Top, Bottom, etc.)
  size?: number                  // Initial size (percentage)
  minSize?: {
    percentage?: number          // Min size as percentage
    pixels?: number             // Min size in pixels
  }
  maxSize?: {
    percentage?: number          // Max size as percentage
    pixels?: number             // Max size in pixels
  }
  canResize?: boolean           // Allow resizing
  canCollapse?: boolean         // Allow collapsing
  isCollapsed?: boolean         // Initial collapsed state
}
```

**Placement** - Enum for panel positioning
- `Placement.Main`, `Placement.Content`, `Placement.Primary`, `Placement.Secondary`
- `Placement.Top`, `Placement.Left`, `Placement.Center`, `Placement.Right`, `Placement.Bottom`

#### Common Layout Patterns

**Two-panel horizontal layout (sidebar + main)**
```typescript
<LayoutGroup direction="horizontal" onSizeChange={setSize}>
  <LayoutPanel panel={{ key: 'sidebar', placement: Placement.Left, size: 25 }}>
    Sidebar
  </LayoutPanel>
  <LayoutBorder onDragging={setDragging} />
  <LayoutPanel panel={{ key: 'main', placement: Placement.Center }}>
    Main content
  </LayoutPanel>
</LayoutGroup>
```

**Three-panel layout**
```typescript
<LayoutGroup direction="horizontal" onSizeChange={setSize}>
  <LayoutPanel panel={{ key: 'left', placement: Placement.Left, size: 20 }}>
    Left panel
  </LayoutPanel>
  <LayoutBorder onDragging={setDragging} />
  <LayoutPanel panel={{ key: 'center', placement: Placement.Center }}>
    Center panel
  </LayoutPanel>
  <LayoutBorder onDragging={setDragging} />
  <LayoutPanel panel={{ key: 'right', placement: Placement.Right, size: 20 }}>
    Right panel
  </LayoutPanel>
</LayoutGroup>
```

**Vertical split with collapsible bottom panel**
```typescript
<LayoutGroup direction="vertical" onSizeChange={setSize}>
  <LayoutPanel panel={{ key: 'top', placement: Placement.Top }}>
    Main content
  </LayoutPanel>
  <LayoutBorder onDragging={setDragging} />
  <LayoutPanel
    panel={{
      key: 'bottom',
      placement: Placement.Bottom,
      size: 30,
      canCollapse: true,
      minSize: { percentage: 10 }
    }}
    onCollapse={handleCollapse}
    onExpand={handleExpand}
  >
    Collapsible bottom panel
  </LayoutPanel>
</LayoutGroup>
```

**Nested layouts (vertical inside horizontal)**
```typescript
<LayoutGroup direction="horizontal" onSizeChange={setSize}>
  <LayoutPanel panel={{ key: 'sidebar', placement: Placement.Left, size: 25 }}>
    Sidebar
  </LayoutPanel>
  <LayoutBorder onDragging={setDragging} />
  <LayoutPanel panel={{ key: 'main', placement: Placement.Center }}>
    <LayoutGroup direction="vertical" onSizeChange={setInnerSize}>
      <LayoutPanel panel={{ key: 'top', placement: Placement.Top }}>
        Top section
      </LayoutPanel>
      <LayoutBorder onDragging={setInnerDragging} />
      <LayoutPanel panel={{ key: 'bottom', placement: Placement.Bottom }}>
        Bottom section
      </LayoutPanel>
    </LayoutGroup>
  </LayoutPanel>
</LayoutGroup>
```

### Environment Component

Always wrap your app in the Environment component for proper theming:

```typescript
import { Environment } from '@hudl/uniform-web'

function App() {
  return (
    <Environment>
      {/* Your app content */}
    </Environment>
  )
}
```

## CSS Variables Reference

### Colors

#### Base Colors
```css
/* Foreground (text) colors */
--u-color-base-foreground-contrast    /* Highest contrast text */
--u-color-base-foreground             /* Default text color */
--u-color-base-foreground-subtle      /* Muted/secondary text */
--u-color-base-foreground-reversed    /* Text on dark backgrounds */

/* Background colors */
--u-color-base-background             /* Default background */
--u-color-base-background-hover       /* Background on hover */
--u-color-base-background-active      /* Background on active/press */
--u-color-base-background-contrast    /* High contrast background */

/* Canvas/container backgrounds */
--u-color-background-canvas           /* Page background */
--u-color-background-container        /* Card/container background */
--u-color-background-callout          /* Callout/alert background */
--u-color-background-popover          /* Popover background */
```

#### Semantic Colors
```css
/* Emphasis/Primary (Blue) */
--u-color-emphasis-foreground         /* Primary text/links */
--u-color-emphasis-background         /* Primary background (light) */
--u-color-emphasis-background-contrast /* Primary background (dark/button) */

/* Success (Green) */
--u-color-success-foreground          /* Success text */
--u-color-success-background          /* Success background (light) */
--u-color-success-background-contrast /* Success background (dark) */

/* Alert/Error (Red) */
--u-color-alert-foreground            /* Error text */
--u-color-alert-background            /* Error background (light) */
--u-color-alert-background-contrast   /* Error background (dark) */

/* Warning (Yellow) */
--u-color-warning-foreground          /* Warning text */
--u-color-warning-background          /* Warning background (light) */
--u-color-warning-background-contrast /* Warning background (dark) */
```

#### Brand Colors
```css
--u-color-brand-orange    /* Hudl orange */
--u-color-brand-electric  /* Hudl electric blue */
--u-color-brand-ink       /* Hudl ink/navy */
--u-color-brand-evening   /* Hudl evening blue */
--u-color-brand-slate     /* Hudl slate */
```

#### Palette Colors (for custom styling)
```css
/* Grey scale */
--u-color-grey-100  /* Lightest */
--u-color-grey-95
--u-color-grey-90
--u-color-grey-80
--u-color-grey-70
--u-color-grey-60
--u-color-grey-50
--u-color-grey-40
--u-color-grey-30
--u-color-grey-20
--u-color-grey-15
--u-color-grey-12
--u-color-grey-10
--u-color-grey-07   /* Darkest */

/* Blue scale */
--u-color-blue-98  /* Lightest */
--u-color-blue-95
--u-color-blue-90
--u-color-blue-80
--u-color-blue-70
--u-color-blue-60
--u-color-blue-50
--u-color-blue-40
--u-color-blue-30
--u-color-blue-20
--u-color-blue-15
--u-color-blue-10  /* Darkest */

/* Red, Green, Yellow scales follow similar pattern */
--u-color-red-95 through --u-color-red-10
--u-color-green-95 through --u-color-green-10
--u-color-yellow-95 through --u-color-yellow-10
```

#### Lines/Borders
```css
--u-color-line        /* Default border color */
--u-color-line-subtle /* Subtle/light border */
--u-color-divider     /* Divider lines */
```

### Spacing

```css
/* Spacing scale */
--u-space-px                    /* 1px */
--u-space-eighth                /* 2px / 0.125rem */
--u-space-quarter               /* 4px / 0.25rem */
--u-space-half                  /* 8px / 0.5rem */
--u-space-three-quarter         /* 12px / 0.75rem */
--u-space-one                   /* 16px / 1rem */
--u-space-one-and-quarter       /* 20px / 1.25rem */
--u-space-one-and-half          /* 24px / 1.5rem */
--u-space-one-and-three-quarter /* 28px / 1.75rem */
--u-space-two                   /* 32px / 2rem */
--u-space-three                 /* 48px / 3rem */
--u-space-four                  /* 64px / 4rem */
```

### Typography

```css
/* Font family */
--u-font-body /* barlow, helvetica, sans-serif */

/* Font weights */
--u-font-weight-light    /* 300 */
--u-font-weight-default  /* 400 */
--u-font-weight-bold     /* bold */

/* Font sizes */
--u-font-size-micro   /* 12px / 0.75rem */
--u-font-size-small   /* 14px / 0.875rem */
--u-font-size-default /* 16px / 1rem */
--u-font-size-large   /* 18px / 1.125rem */

/* Title sizes (use with Title component) */
--u-font-size-title-xsmall  /* 10px */
--u-font-size-title-small   /* 12px */
--u-font-size-title-medium  /* 16px */
--u-font-size-title-large   /* 20px */
--u-font-size-title-xlarge  /* 24px */
--u-font-size-title-xxlarge /* 32px */

/* Text sizes (use with Text component) */
--u-font-size-text-xsmall /* 12px */
--u-font-size-text-small  /* 14px */
--u-font-size-text-medium /* 16px */
--u-font-size-text-large  /* 18px */
```

### Border Radius

```css
--u-border-radius-small /* 2px / 0.125rem */
--u-border-radius-large /* 4px / 0.25rem */
```

### Shadows

```css
--u-elevation-shadow-1 /* Small shadow */
--u-elevation-shadow-2 /* Medium shadow */
--u-elevation-shadow-3 /* Large shadow */
```

### Z-Index

```css
--u-zindex-1 through --u-zindex-9    /* 100-900 */
--u-elevation-popover                /* 1200 */
--u-elevation-modal                  /* 5200 */
--u-elevation-tooltip                /* 8100 */
```

## Styling Best Practices

### DO: Use CSS Variables

```typescript
// ✅ GOOD - Uses Uniform variables
<div style={{
  backgroundColor: 'var(--u-color-background-container)',
  padding: 'var(--u-space-one)',
  borderRadius: 'var(--u-border-radius-large)',
  color: 'var(--u-color-base-foreground)'
}}>
  Content
</div>
```

### DON'T: Hardcode Values

```typescript
// ❌ BAD - Hardcoded values
<div style={{
  backgroundColor: '#ffffff',
  padding: '16px',
  borderRadius: '4px',
  color: '#333'
}}>
  Content
</div>
```

### DO: Use Uniform Components

```typescript
// ✅ GOOD - Uses Uniform components and CSS variables
<div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--u-space-one)'
}}>
  <Title as="h2" size="large">Section Title</Title>
  <Text>Description text here</Text>
  <Button buttonType="primary">Take Action</Button>
</div>
```

### DON'T: Use Plain HTML

```typescript
// ❌ BAD - Plain HTML with hardcoded values
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Section Title</h2>
  <p>Description text here</p>
  <button style={{ background: '#0073f5', color: 'white', padding: '8px 16px' }}>
    Take Action
  </button>
</div>
```

### DO: Use Semantic Color Tokens

```typescript
// ✅ GOOD - Semantic tokens adapt to theme
<div style={{
  backgroundColor: 'var(--u-color-emphasis-background)',
  color: 'var(--u-color-emphasis-foreground)',
  borderColor: 'var(--u-color-emphasis-background-contrast)'
}}>
  Primary callout
</div>
```

### DON'T: Use Specific Palette Colors Directly

```typescript
// ❌ BAD - Hardcoded to specific shade, won't adapt to dark mode
<div style={{
  backgroundColor: 'var(--u-color-blue-95)',
  color: 'var(--u-color-blue-40)',
  borderColor: 'var(--u-color-blue-50)'
}}>
  Primary callout
</div>
```

## Common Patterns

### Page Layout

```typescript
<Environment>
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'var(--u-space-two)'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--u-space-two)'
    }}>
      <Title as="h1" size="xxlarge">Page Title</Title>

      <Card>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--u-space-one)'
        }}>
          <Title as="h2" size="large">Card Title</Title>
          <Text>Card content here</Text>
        </div>
      </Card>

      <div style={{
        display: 'flex',
        gap: 'var(--u-space-half)'
      }}>
        <Button buttonType="secondary">Cancel</Button>
        <Button buttonType="primary">Save</Button>
      </div>
    </div>
  </div>
</Environment>
```

### Form Layout

```typescript
<div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--u-space-one)'
}}>
  <Input
    label="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <Input
    label="Email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <Textarea
    label="Message"
    rows={4}
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />

  <div style={{
    display: 'flex',
    gap: 'var(--u-space-half)'
  }}>
    <Button buttonType="secondary">Cancel</Button>
    <Button buttonType="primary">Submit</Button>
  </div>
</div>
```

### Card Grid

```typescript
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 'var(--u-space-one)'
}}>
  {items.map(item => (
    <Card key={item.id}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--u-space-half)'
      }}>
        <Title as="h3" size="medium">{item.title}</Title>
        <Text color="subtle">{item.description}</Text>
        <Button buttonType="minimal">View Details</Button>
      </div>
    </Card>
  ))}
</div>
```

### Status Messages

```typescript
// Success message
<div style={{
  backgroundColor: 'var(--u-color-success-background)',
  color: 'var(--u-color-success-foreground)',
  padding: 'var(--u-space-one)',
  borderRadius: 'var(--u-border-radius-large)'
}}>
  <Text>Successfully saved!</Text>
</div>

// Error message
<div style={{
  backgroundColor: 'var(--u-color-alert-background)',
  color: 'var(--u-color-alert-foreground)',
  padding: 'var(--u-space-one)',
  borderRadius: 'var(--u-border-radius-large)'
}}>
  <Text>An error occurred</Text>
</div>

// Warning message
<div style={{
  backgroundColor: 'var(--u-color-warning-background)',
  color: 'var(--u-color-warning-foreground)',
  padding: 'var(--u-space-one)',
  borderRadius: 'var(--u-border-radius-large)'
}}>
  <Text>Warning: Check your input</Text>
</div>
```

## Dark Mode Support

All Uniform components and CSS variables automatically support dark mode through the `Environment` component. No additional work needed!

```typescript
// This automatically works in both light and dark mode
<Environment>
  <div style={{
    backgroundColor: 'var(--u-color-background-container)',
    color: 'var(--u-color-base-foreground)'
  }}>
    This adapts to light/dark mode automatically
  </div>
</Environment>
```

## Finding Available Components

Ask Claude: "What Uniform components are available?" or "Show me the Button component props"

Claude can explore the `@hudl/uniform-web` package to show you:
- Available components
- Component props and options
- Usage examples
- Variants and sizes

## Quick Component Reference

Common components you'll use frequently:

- **Typography**: `Title`, `Text`
- **Buttons**: `Button`
- **Layout**: `Card`, `Divider` (use flexbox with CSS variables for simple layouts)
- **Resizable Layouts**: `LayoutGroup`, `LayoutPanel`, `LayoutBorder` (for multi-panel resizable layouts)
- **Forms**: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`
- **Feedback**: `Spinner`
- **Utility**: `Environment`

## Remember

1. Always wrap your app in `<Environment>`
2. Use Uniform components instead of plain HTML
3. Use CSS variables instead of hardcoded values
4. Use semantic color tokens (not specific palette colors)
5. Use spacing variables for consistent spacing
6. Components automatically support dark mode

---

For more details on specific components, ask Claude to explore the package or show you examples!
