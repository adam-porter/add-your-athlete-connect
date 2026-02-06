# Technical Guide - UX Primer

This guide contains technical details for users who want to understand more about how the project works or prefer working directly with the codebase.

## Project Structure

```
ux-primer/
├── src/
│   ├── App.tsx          ← Your main prototype code (start here!)
│   └── main.tsx         ← Entry point (typically don't edit)
├── index.html           ← Page title and metadata
├── package.json         ← Project dependencies
├── tsconfig.json        ← TypeScript configuration
├── vite.config.ts       ← Build tool configuration
└── README.md            ← User guide
```

### Where to Add Your Code

- **Start with `App.tsx`** - This is your main component
- **Create new components** - Ask Claude or create `.tsx` files in `src/`
- **Organize as you grow** - Create folders like `src/components/`, `src/pages/`, etc.

## Using Seed Data

The template includes structured sample data in `src/data/` for common sports domains. This data is designed to be extended as your prototype grows.

### Quick Start

```typescript
// Import specific data
import { teams, athletes, games } from './data'

// Import everything
import { seedData } from './data'

// Use helper functions to query related data
import { getTeamsBySport, getAthletesByTeam, getGamesByTeam } from './data'
```

### Available Data

| Entity | Description | Example Fields |
|--------|-------------|----------------|
| `sports` | Sport types | name, abbreviation, icon |
| `teams` | Teams with colors/logos | name, city, sportId, primaryColor |
| `athletes` | Players with positions | firstName, lastName, teamId, position |
| `competitions` | Leagues and tournaments | name, season, teamIds |
| `games` | Matches between teams | homeTeamId, awayTeamId, score, status |
| `events` | In-game events | gameId, type, description, athleteId |

### Helper Functions

```typescript
// Get all basketball teams
const basketballTeams = getTeamsBySport('sport-basketball')

// Get athletes on a specific team
const roster = getAthletesByTeam('team-lincoln-lions')

// Get all games for a team
const schedule = getGamesByTeam('team-lincoln-lions')

// Get events from a game
const highlights = getEventsByGame('game-mbl-001')
```

### Extending the Data

Add your own entries following the existing patterns:

```typescript
// In your component, extend the data
import { teams, type Team } from './data'

const myTeams: Team[] = [
  ...teams,
  {
    id: 'team-my-new-team',
    name: 'My New Team',
    abbreviation: 'MNT',
    sportId: 'sport-basketball',
    city: 'Hometown',
    primaryColor: '#FF0000',
    secondaryColor: '#FFFFFF',
    logoUrl: 'https://placehold.co/100x100/FF0000/FFFFFF?text=MNT',
  },
]
```

## Using Uniform Components

The Hudl Uniform design system (`@hudl/uniform-web`) is already installed.

### Basic Pattern

```typescript
// 1. Import components at the top of your file
import { Button, Text, Card, Input } from '@hudl/uniform-web'

// 2. Use them in your JSX
function MyComponent() {
  return (
    <Card>
      <Text variant="heading">Hello!</Text>
      <Button variant="primary">Click Me</Button>
    </Card>
  )
}
```

### Finding Available Components

Ask Claude: "What Uniform components are available?" or "Show me how to use the Card component"

Claude can browse the package and show you:
- Available components
- Component props and variants
- Usage examples
- Best practices

## Manual Commands

If you prefer using the terminal directly:

```bash
# First time setup (requires Hudl VPN)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## VPN and Package Registry

### Why VPN is Required

The `@hudl/uniform-web` package is hosted on Hudl's internal npm registry, which requires VPN access.

### The .npmrc File

This project includes an `.npmrc` file that configures npm to use Hudl's registry:

```
@hudl:registry=https://artifacts.hudlnet.com/artifactory/api/npm/npm/
```

This file is:
- Required for installing `@hudl/uniform-web`
- Safe to commit to version control
- Only affects packages in the `@hudl` scope

## TypeScript Configuration

This project is configured to be lenient with TypeScript errors to prioritize rapid prototyping:

- **Type checking is relaxed** - Your app will often work fine even with TypeScript warnings
- **Strict mode is off** - You don't need to type everything perfectly
- **Focus on building** - Fix types only if they're causing actual runtime issues

If you want stricter type checking, edit `tsconfig.json`.

## React Concepts

### State Management

Use React hooks to add interactivity:

```typescript
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <Button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </Button>
  )
}
```

### Effects

Run code when components mount or update:

```typescript
import { useEffect, useState } from 'react'

function DataFetcher() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData)
  }, []) // Empty array means "run once on mount"

  return <div>{data?.value}</div>
}
```

## Advanced Topics

### Adding Routing

For multi-page prototypes, you can add React Router:

```bash
npm install react-router-dom
```

Ask Claude: "Help me add routing with multiple pages"

### Styling Beyond Uniform

While Uniform provides most components you need, you can add custom styles:

```typescript
// Inline styles
<div style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
  Content
</div>

// CSS Modules (create App.module.css)
import styles from './App.module.css'
<div className={styles.container}>Content</div>
```

### Working with APIs

Fetch data from external APIs:

```typescript
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
  fetch('https://api.example.com/items')
    .then(res => res.json())
    .then(items => {
      setData(items)
      setLoading(false)
    })
}, [])

if (loading) return <Text>Loading...</Text>

return (
  <div>
    {data.map(item => (
      <Card key={item.id}>{item.name}</Card>
    ))}
  </div>
)
```

### Adding Dependencies

Install additional npm packages as needed:

```bash
npm install package-name
```

Popular packages for prototypes:
- `date-fns` - Date formatting and manipulation
- `axios` - HTTP requests (alternative to fetch)
- `react-router-dom` - Multi-page navigation
- `framer-motion` - Animations

## Build and Deployment Details

### Build Process

```bash
npm run build
```

This:
1. Compiles TypeScript to JavaScript
2. Bundles all code and dependencies
3. Optimizes and minifies for production
4. Outputs to `dist/` folder

### What's in the dist/ Folder

- `index.html` - Entry point
- `assets/` - JavaScript, CSS, and other assets with hashed filenames
- All optimized and ready to deploy

### Deployment Options

#### Netlify (Drag & Drop)
1. Build locally: `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag `dist/` folder to deploy

#### Vercel (Drag & Drop)
1. Build locally: `npm run build`
2. Go to [vercel.com](https://vercel.com)
3. Import project or drag `dist/` folder

#### Git-Based Deployment

Both Netlify and Vercel support continuous deployment from Git:

1. Push your code to GitHub/GitLab
2. Connect your repository in Netlify/Vercel
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Every push automatically deploys

## Troubleshooting

### TypeScript Errors

The project is configured to be lenient, but if you want to fix TypeScript errors:

- Check the error message in your editor
- Ask Claude: "Help me fix this TypeScript error"
- Types are usually imported from packages: `import { ButtonProps } from '@hudl/uniform-web'`

### Port Already in Use

If port 3000 is occupied, Vite automatically tries the next available port (3001, 3002, etc.). Check the terminal output for the actual URL.

To manually stop a process on port 3000:

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Build Failures

Common causes:
- TypeScript errors that are too severe
- Missing dependencies: run `npm install`
- Corrupted node_modules: delete `node_modules` and run `npm install` again

### VPN Issues

If installation fails:
1. Verify VPN connection
2. Try `npm install` again
3. Check that `.npmrc` file exists in the project root
4. Verify you can access `https://artifacts.hudlnet.com` in your browser

## Development Tips

### Hot Module Replacement (HMR)

Vite provides instant updates without full page reloads. When you save a file:
- React components update in place
- State is preserved when possible
- Changes appear immediately

### VS Code Extensions

Recommended extensions:
- **ES7+ React/Redux/React-Native snippets** - Code snippets
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **TypeScript and JavaScript Language Features** - Built-in type checking

### Browser DevTools

Press **F12** or **Cmd+Option+I** to open DevTools:
- **Console** - See errors and `console.log()` output
- **Elements** - Inspect HTML and CSS
- **Network** - Monitor API requests
- **React DevTools** - Inspect React component tree (install extension)

## Learning Resources

- [React Documentation](https://react.dev/) - Official React guide
- [Vite Documentation](https://vitejs.dev/) - Build tool documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Learn TypeScript
- [Uniform Design System](https://uniform.hudl.com) - Hudl component library (if available)
- [MDN Web Docs](https://developer.mozilla.org/) - HTML, CSS, JavaScript reference

## Working with Claude vs. Manual Editing

### When to Use Claude
- Learning new patterns or APIs
- Complex component creation
- Debugging issues
- Refactoring code
- Understanding how something works

### When to Edit Directly
- Simple text changes
- Tweaking values (colors, sizes, spacing)
- Quick experiments
- When you know exactly what to change

Both approaches are valid - use what feels comfortable!

---

Have questions? Ask Claude or refer back to the [main README](../README.md) for the simplified guide.
