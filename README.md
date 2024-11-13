# Filament UI

## Prerequisites

- **Node.js**: Ensure you have Node.js version 20.x installed.

## Getting Started

1. Create a GitHub Token:

   - Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens)
   - Click on `Generate new token (Classic)`
   - Select `repo` and `read:packages` scopes
   - Click on `Generate token`

2. Add the Token to .npm

- Replace ${GITHUB_TOKEN} with your generated token

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Conventional Commits

In our project, we use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. This helps standardize commit history and simplifies the release process.

### Examples

- `feat(core): add new feature`
- `fix(api): fix bug in data fetching method`

### Commit Types

- `feat`: Adding a new feature
- `fix`: Fixing a bug
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `test`: Adding or updating tests
- `chore`: Changes to the build process or auxiliary tools

### Scope

We require specifying a scope in commit messages. This helps to clearly identify the part of the codebase the change pertains to. For example, `feat(api): add new API endpoint`.

Following these guidelines helps us maintain high code quality and streamline project collaboration.
