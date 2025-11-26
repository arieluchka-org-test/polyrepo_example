# Simple Release-Please Example

This is a minimal example showing what you need for release-please:

1. **package.json** - with name and version
2. **CHANGELOG.md** - tracks release history
3. **Source code** - your application code (index.js)
4. **Workflow file** - `.github/workflows/release-simple.yml`

## Important: Conventional Commits Required

Release-please requires commits to follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

- `feat: add new feature` - creates a minor version bump (1.0.0 → 1.1.0)
- `fix: bug fix` - creates a patch version bump (1.0.0 → 1.0.1)
- `feat!: breaking change` or `fix!:` - creates a major version bump (1.0.0 → 2.0.0)
- `chore:`, `docs:`, `style:`, `refactor:`, `test:` - no version bump

Example commits:
```
feat: add user authentication
fix: resolve login timeout issue
docs: update README
```

Without conventional commits, release-please cannot determine version bumps and won't create release PRs.
