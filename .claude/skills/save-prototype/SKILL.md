---
name: save-prototype
description: Save and push the current prototype to GitHub
disable-model-invocation: true
---

Save the current prototype by committing changes and pushing to GitHub.

**Workflow:**

1. **Check git status** - Run `git status` to see what's changed
   - Show the user a summary of changed files
   - Confirm they want to save these changes

2. **Stage files** - Add relevant files to staging
   - Add all src/ files and any new components
   - Add package.json if dependencies changed
   - DON'T add node_modules, dist, or other build artifacts

3. **Create commit** - Commit with a descriptive message
   - Ask user for a commit message (suggest a default based on changes)
   - Include co-authored by: "Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
   - Use heredoc format for the commit message

4. **Push to GitHub** - Push the branch to remote
   - Use `git push -u origin [branch-name]` if first push
   - Use `git push` for subsequent pushes

5. **Provide GitHub URL** - Tell the user:
   - Changes committed and pushed
   - Provide the GitHub branch URL so they can view it
   - Remind them they can create a PR if they want to merge to main
   - Or continue working with more changes

**Optional: Create PR**
- Ask if they want to create a PR to merge this prototype into main
- If yes, use `gh pr create` with title and description
- Description should summarize what was built

**Important:**
- Always show what will be committed before committing
- Use descriptive commit messages
- Don't commit secrets or sensitive data (.env files, etc.)
- Don't force push unless explicitly requested
