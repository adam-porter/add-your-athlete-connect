# UX Prototypes Repository

This is a prototyping template repository. Each prototype lives on its own git branch.

## UX DNA — Always On

**The `ux-dna` plugin is a core part of how you work in this repo, not an optional add-on.**

The plugin's primary agent is `ux-dna:advisor`. Start there for any UX or design question — it answers guidelines questions, helps scope what needs to be built, and routes to the right agent when the work is bigger than a question.

- **Before designing** — ask `ux-dna:advisor` what guidelines, patterns, or voice rules apply to what you're building
- **While writing copy** — use `ux-dna:writer` to generate compliant UI text, or `ux-dna:reviewer` to check existing copy
- **Before finishing** — use `ux-dna:reviewer` to catch heuristic and accessibility issues before the work is saved
- **When in doubt** — ask `ux-dna:advisor` anything; it knows when to hand off to reviewer or writer

**Don't wait to be asked.** If you're building a form, run the copy through the reviewer. If you're designing an empty state, ask the advisor for the pattern. If you're about to save, run a review first. The plugin exists to make every prototype better and more consistent — use it.

Available ux-dna agents and skills:
- `ux-dna:advisor` — start here; answers any UX/design question, scopes problems, routes to other agents
- `ux-dna:writer` — generate compliant UI copy for a component and context
- `ux-dna:reviewer` — heuristic, accessibility, and content critique of any design artifact
- `ux-dna:check-heuristics` — apply Hudl's 10 UX heuristics to a design
- `ux-dna:check-accessibility` — apply Hudl's WCAG 2.2-aligned accessibility rules

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
