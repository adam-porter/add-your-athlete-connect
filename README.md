# UX Prototypes

Build interactive prototypes using Hudl's design system. No coding experience needed - Claude does the technical work for you!

**Each prototype lives on its own git branch**, keeping your work organized and the main template clean.

## Before You Start

**Connect to the Hudl VPN** - You need this the first time you set up the project.

**Install the Hudl Claude marketplace** - This repo uses the `ux-dna` plugin from the Hudl agent marketplace. Claude Code will prompt you to install it when you open the project, or you can install it manually:
```
/plugin marketplace add git@github.com:hudl/agent-marketplace.git
```
Once the marketplace is installed, the `ux-dna` plugin will be enabled automatically.

## Starting a New Prototype

1. **Open this folder in Claude Desktop**

2. **Tell Claude: "new prototype"** (or type `/new-prototype`)
   - Claude will create a new git branch for your prototype
   - Ask you to name it (like "dashboard-redesign" or "onboarding-flow")
   - Install dependencies if needed
   - Start the development server automatically

3. **Start building!**
   - Tell Claude what you want to add
   - Changes appear instantly in your browser
   - Everything is automatically tracked in your branch

That's it! No commands to memorize.

## Working on Your Prototype

**Starting a work session:**
1. Open this folder in Claude Desktop
2. Tell Claude: **"Start the development server"**
3. Make changes (ask Claude for help!)
4. Changes appear instantly in your browser

**Saving your work:**
- Tell Claude: **"save prototype"** (or type `/save-prototype`)
- Claude will commit your changes and push to GitHub
- Your prototype is now safely backed up!

**Switching between prototypes:**
- Each prototype is on its own branch
- Tell Claude: **"switch to [branch-name]"**
- Or use git directly if you're comfortable

## What to Ask Claude

### Adding Things
- "Add a blue button that says Submit"
- "Create a form with name and email fields"
- "Add a navigation bar at the top"
- "Make a card with an image and some text"

### Changing Things
- "Make that button bigger"
- "Change the title to My Project"
- "Move the form to the center"
- "Use a different color for the header"

### When You're Stuck
- "What does this do?"
- "I see an error, can you help?"
- "Show me what this will look like"
- "How do I make a list of items?"

### Sharing Your Work
- "Build this so I can share it"
- "How do I put this online?"

## Sharing Your Prototype

When you're ready to show others:

1. **Save your prototype first**
   - Tell Claude: **"save prototype"**
   - This backs up your work to GitHub

2. **Build for sharing:**
   - Tell Claude: **"Build this project for production"**
   - Creates a `dist` folder ready to share

3. **Put it online:**
   - Go to [netlify.com](https://www.netlify.com) (free!)
   - Sign in
   - Drag and drop the `dist` folder
   - Get your link instantly!

4. **Made changes?**
   - Save your prototype again
   - Tell Claude to rebuild
   - Drag the new `dist` folder to Netlify
   - Your link updates automatically

## Common Issues

**Can't install?**
- Check you're on the Hudl VPN
- Tell Claude: "Try installing again"

**Changes not showing?**
- Save your file (Cmd+S or Ctrl+S)
- Tell Claude: "Restart the server"

**Something's broken?**
- Tell Claude what you're seeing
- Claude will help you fix it!

## Need More Details?

Check [src/README.md](src/README.md) for technical information about the project structure, components, and manual commands.

---

**Remember:** Claude is here to help with everything. When in doubt, just ask!
