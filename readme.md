# Release-Please Polyrepo Example

This repository demonstrates how to use [release-please](https://github.com/googleapis/release-please) in a polyrepo structure with multiple independent packages.

## Structure

```
polyrepo_example/
├── backend/          # Backend API package
│   ├── package.json
│   ├── index.js
│   └── CHANGELOG.md
├── client/           # Frontend client package
│   ├── package.json
│   ├── index.js
│   └── CHANGELOG.md
└── .github/
    └── workflows/
        ├── release-backend.yml
        └── release-client.yml
```

## What is Release-Please?

Release-please is a GitHub Action that automates:
- ✅ Version bumping based on Conventional Commits
- ✅ CHANGELOG.md generation
- ✅ GitHub Release creation
- ✅ Git tagging

## Key Features of This Setup

### Independent Package Releases
- Each package (backend/client) has its own release workflow
- Changes to `backend/**` trigger only the backend release workflow
- Changes to `client/**` trigger only the client release workflow
- Packages can be versioned and released independently

### Conventional Commits
Uses commit message patterns to determine version bumps:
- `feat:` → Minor version (1.0.0 → 1.1.0)
- `fix:` → Patch version (1.0.0 → 1.0.1)
- `feat!:` or `BREAKING CHANGE:` → Major version (1.0.0 → 2.0.0)

### Automated Workflow
1. Push commits to `main` branch
2. Release-please analyzes commits
3. Creates/updates a release PR
4. Merge PR to publish the release

## Quick Start

1. **Clone and push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "chore: initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Enable GitHub Actions**
   - Go to Settings → Actions → General
   - Set "Workflow permissions" to "Read and write permissions"

3. **Follow the showcase guide**
   - See [showcase.md](./showcase.md) for step-by-step demonstration

## Example Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes to client
# Edit client/index.js

# Commit with conventional format
git add client/
git commit -m "feat(client): add search functionality"

# Push and create PR
git push origin feature/new-feature

# After PR is merged to main:
# → Release-please creates release PR
# → Merge release PR
# → GitHub Release is created automatically
```

## Commit Message Examples

```bash
# New feature (minor bump)
git commit -m "feat(backend): add user authentication"

# Bug fix (patch bump)
git commit -m "fix(client): resolve memory leak in API client"

# Breaking change (major bump)
git commit -m "feat(backend)!: redesign API endpoints"

# Multiple types
git commit -m "feat(client): add dark mode

- Add theme toggle component
- Save preference to localStorage
- Apply theme across all pages"
```

## Documentation

- **[showcase.md](./showcase.md)** - Detailed step-by-step guide to demonstrate release-please
- **[backend/CHANGELOG.md](./backend/CHANGELOG.md)** - Backend version history
- **[client/CHANGELOG.md](./client/CHANGELOG.md)** - Client version history

## Packages

### Backend (`@polyrepo/backend`)
API server with health check and user endpoints.

**Current Version:** 1.0.0

### Client (`@polyrepo/client`)
Frontend client application for consuming the backend API.

**Current Version:** 1.0.0

## Resources

- [Release-Please Documentation](https://github.com/googleapis/release-please)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
