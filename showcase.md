# Release-Please Showcase Guide

This guide demonstrates how to use release-please in a polyrepo setup where backend and client are managed as separate packages.

## Overview

Release-please automates version management and changelog generation using Conventional Commits. Each package (backend/client) has its own independent release workflow.

## Prerequisites

- Git repository pushed to GitHub
- GitHub Actions enabled
- Permissions set for Actions (Settings → Actions → General → Workflow permissions → "Read and write permissions")

## How Release-Please Works

1. **Detects Conventional Commits**: Scans commit messages following the pattern `type: description`
2. **Calculates Version Bumps**:
   - `feat:` → Minor version bump (1.0.0 → 1.1.0)
   - `fix:` → Patch version bump (1.0.0 → 1.0.1)
   - `feat!:` or `BREAKING CHANGE:` → Major version bump (1.0.0 → 2.0.0)
3. **Creates Release PR**: Automatically updates CHANGELOG.md and package.json
4. **Creates GitHub Release**: When the PR is merged, creates a tagged release

## Showcase Steps

### Step 1: Initial Setup

First, ensure you're on the main branch and everything is committed:

```bash
git status
git checkout main
```

### Step 2: Make Changes to Client Package

Create a feature branch and add a new feature:

```bash
git checkout -b feature/add-search
```

Edit `client/index.js` to add a new method:

```javascript
// Add this method to the ClientApp class:

/**
 * Search users by name
 * @param {string} query - Search query
 * @returns {Promise<Array>} Filtered users
 */
async searchUsers(query) {
  const users = await this.fetchUsers();
  return users.filter(user => 
    user.name.toLowerCase().includes(query.toLowerCase())
  );
}
```

Commit using Conventional Commits format:

```bash
git add client/index.js
git commit -m "feat(client): add user search functionality"
```

### Step 3: Make a Bug Fix to Client

Edit `client/index.js` again to fix error handling:

```javascript
// Improve the fetchUsers method error handling:

async fetchUsers() {
  try {
    const response = await fetch(`${this.apiUrl}/api/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
```

Commit the fix:

```bash
git add client/index.js
git commit -m "fix(client): improve error handling in fetchUsers"
```

### Step 4: Push and Create PR

```bash
git push origin feature/add-search
```

Create a Pull Request on GitHub from `feature/add-search` to `main`.

### Step 5: Merge the PR

Once the PR is approved, merge it into `main`. This triggers the release-please workflow.

### Step 6: Observe Release-Please in Action

1. Go to GitHub Actions tab and watch the "Release Please - Client" workflow run
2. After it completes, check the Pull Requests tab
3. You'll see a new PR titled "chore(main): release client 1.1.0" (or similar)
4. Open this PR to see:
   - Updated `client/package.json` with new version (1.1.0)
   - Updated `client/CHANGELOG.md` with new entries
   - All changes grouped by type (Features, Bug Fixes, etc.)

### Step 7: Create the Release

Merge the release-please PR. This will:
- Update the version in `main` branch
- Create a GitHub Release with tag `client-v1.1.0`
- Publish release notes based on the changelog

### Step 8: Make Changes to Backend Package

Now showcase the backend workflow:

```bash
git checkout main
git pull
git checkout -b feature/add-auth
```

Edit `backend/index.js` to add authentication endpoint:

```javascript
// Add this method to the setupRoutes():

this.app.post('/api/auth/login', (req, res) => {
  // Simple demo authentication
  res.json({ token: 'demo-token-12345', user: { id: 1, name: 'Demo User' } });
});
```

Commit and push:

```bash
git add backend/index.js
git commit -m "feat(backend): add authentication endpoint"
git push origin feature/add-auth
```

Create PR, merge, and observe the backend release-please workflow create its own independent release PR.

## Commit Message Format Reference

### Types
- `feat:` - New feature (minor bump)
- `fix:` - Bug fix (patch bump)
- `perf:` - Performance improvement (patch bump)
- `docs:` - Documentation only
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `style:` - Code style changes

### Breaking Changes
Add `!` after type or include `BREAKING CHANGE:` in commit body:

```bash
git commit -m "feat!: redesign user API"
# or
git commit -m "feat: redesign user API

BREAKING CHANGE: User API now requires authentication token"
```

### Scopes
Specify which package is affected:

```bash
git commit -m "feat(client): add dark mode"
git commit -m "fix(backend): resolve memory leak"
```

## Verification Checklist

- [ ] Separate workflows trigger for backend vs client changes
- [ ] Release PR contains correct version bump (feat=minor, fix=patch)
- [ ] CHANGELOG.md is properly updated with commit messages
- [ ] package.json version is incremented
- [ ] GitHub Release is created after merging release PR
- [ ] Both packages can be released independently

## Advanced: Breaking Changes Example

```bash
git checkout -b breaking/api-redesign
# Make breaking changes to backend
git add backend/
git commit -m "feat(backend)!: redesign API response structure

BREAKING CHANGE: All API endpoints now return data wrapped in a 'data' field.
Clients must update their response handling."

git push origin breaking/api-redesign
```

This will create a release PR with version 2.0.0 (major bump).

## Troubleshooting

### Workflow Doesn't Trigger
- Ensure changes are in `backend/**` or `client/**` paths
- Check that you're pushing to `main` branch
- Verify GitHub Actions has write permissions

### No Release PR Created
- Confirm commits use Conventional Commits format
- Check that there are actual changes in the package directory
- Review GitHub Actions logs for errors

### Multiple Packages in One PR
Each package releases independently. If you change both packages in one PR:
- Both workflows will trigger
- Two separate release PRs will be created
- Each can be merged independently

## Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Release Please Documentation](https://github.com/googleapis/release-please)
- [Semantic Versioning](https://semver.org/)
