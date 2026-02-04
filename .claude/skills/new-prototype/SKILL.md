---
name: new-prototype
description: Start a new prototype by creating a git branch and setting up the environment
disable-model-invocation: true
---

Start a new prototype with a fresh git branch and development environment.

**Workflow:**

1. **Check git status** - Verify we're in a clean state on main/master branch
   - If there are uncommitted changes, warn the user and ask if they want to stash or commit first
   - If not on main/master, warn and ask if they want to switch

2. **Pull latest changes** - Run `git pull origin main` (or master) to get latest template

3. **Ask for prototype name** - Use AskUserQuestion to get a descriptive name for the prototype
   - Suggest format like "feature-name" or "experiment-name"
   - Convert spaces to hyphens, make lowercase

4. **Create and checkout new branch** - `git checkout -b prototype/[name]`
   - Use "prototype/" prefix to keep branches organized

5. **Install dependencies** - Run `npm install` (should be quick if already installed)

6. **Start dev server** - Run `npm run dev` in the background

7. **Confirm ready** - Tell the user:
   - Branch name created
   - Dev server running at the URL
   - Ready to start building their prototype
   - Remind them to use `/save-prototype` when done

**Important:**
- Always verify we're starting from a clean main/master branch
- Use descriptive branch names with "prototype/" prefix
- Don't force any operations - ask user if there are conflicts
