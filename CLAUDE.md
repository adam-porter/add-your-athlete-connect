# UX Prototypes Repository

This is a prototyping template repository. Each prototype lives on its own git branch.

## UX DNA — Always On

**The `ux-dna` plugin is a core part of how you work in this repo, not an optional add-on.**

The plugin's primary agent is `ux-dna:advisor`. It's the single entry point — use it for any UX or design question, at any point in the process. It answers guidelines questions, helps scope what needs to be built, and knows when and how to invoke the rest of the plugin's capabilities.

**Don't wait to be asked.** Before designing, ask what applies. While building, ask about patterns and copy. Before saving, ask for a review. When in doubt, ask. The advisor handles routing — you don't need to know what else the plugin contains.

---

## Workflow

**Starting a new prototype:**
```
/new-prototype
```
This will create a new git branch, install dependencies, and start the dev server.

**Saving your prototype:**
```
/save-prototype
```
This will commit your changes and push the branch to GitHub.

**The main branch** contains the clean template. All prototypes branch from main and stay on separate branches so you can easily switch between them or archive old work.

---

## Code Style - Uniform Design System

**CRITICAL: This project uses Hudl's Uniform design system. You MUST follow these rules:**

1. **ALWAYS use Uniform components** - Never use plain HTML like `<h1>`, `<p>`, `<button>`
2. **ALWAYS use CSS variables** - Never hardcode colors (`#fff`), spacing (`16px`), or fonts
3. **ALWAYS wrap your app in `<Environment>`** - Required for theming

### Quick Reference

**Available components:** `Environment`, `Title`, `Text`, `Button`, `Card`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Spinner`, `Divider`

**Resizable layout components:** `LayoutGroup`, `LayoutPanel`, `LayoutBorder` (from `@hudl/performance-core-layout`)

**Components that DON'T exist:** `Stack`, `Inline`, `Container` (use flexbox with CSS variables for simple layouts, or the resizable layout system for complex multi-panel layouts)

**Common CSS variables:**
- Colors: `var(--u-color-emphasis-foreground)`, `var(--u-color-background-container)`
- Spacing: `var(--u-space-one)` (16px), `var(--u-space-half)` (8px), `var(--u-space-two)` (32px)
- Borders: `var(--u-border-radius-large)` (4px)

### Layout Pattern
```typescript
<div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--u-space-one)'
}}>
  <Title as="h2" size="large">Title</Title>
  <Text>Content</Text>
  <Button buttonType="primary">Action</Button>
</div>
```

### Resizable Layout System

**For complex layouts with resizable panels, use the Performance Core Layout system:**

```typescript
import { LayoutGroup, LayoutPanel, LayoutBorder, Placement } from '@hudl/performance-core-layout'

<LayoutGroup direction="horizontal" onSizeChange={handleSizeChange}>
  <LayoutPanel panel={{ key: 'left', placement: Placement.Left }}>
    <Text>Left panel content</Text>
  </LayoutPanel>
  <LayoutBorder onDragging={setIsDragging} />
  <LayoutPanel panel={{ key: 'center', placement: Placement.Center }}>
    <Text>Center panel content</Text>
  </LayoutPanel>
</LayoutGroup>
```

**When to use:**
- Multi-panel layouts (sidebar + main content)
- Resizable sections
- Collapsible panels
- Complex application layouts

See @src/UNIFORM_GUIDE.md for detailed layout system documentation and examples.

## Seed Data

**IMPORTANT: Use the structured seed data in `src/data/` instead of hardcoding data inline.**

The template includes sample data for common sports domains:
- `sports` - Sport types (basketball, football, soccer, volleyball, lacrosse)
- `teams` - Teams with colors, logos, and sport associations
- `athletes` - Players with positions, jersey numbers, and team membership
- `competitions` - Leagues and tournaments
- `games` - Matches with scores and status
- `events` - In-game events (highlights, goals, fouls, etc.)

### Usage

```typescript
// Import data directly
import { teams, athletes, games } from './data'

// Use helper functions
import { getTeamsBySport, getAthletesByTeam, getGamesByTeam } from './data'

// Get basketball teams
const basketballTeams = getTeamsBySport('sport-basketball')

// Get a team's roster
const roster = getAthletesByTeam('team-lincoln-lions')
```

### Extending Data

When building prototypes, extend the existing data rather than creating new inline data:

```typescript
import { teams, type Team } from './data'

const myTeams: Team[] = [
  ...teams,
  { id: 'team-new', name: 'New Team', /* ... */ },
]
```

## Detailed Documentation

See @src/UNIFORM_GUIDE.md for complete component reference and all CSS variables.

## Development

- Run dev server: `npm run dev`
- Build: `npm run build`
- The app already has Uniform styles imported in `src/main.tsx`
