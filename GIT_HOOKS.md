# Git Hooks & Husky Configuration

This project uses **Husky** to automatically run code quality checks before commits, ensuring consistent code standards across the team.

## What is Husky?

Husky is a tool that makes Git hooks easy. It prevents bad commits by running scripts at certain Git events (like before committing or pushing).

## Current Setup

### Pre-commit Hook

Every time you try to commit code, Husky will automatically:

1. ✅ **Run ESLint** - Fix linting errors automatically
2. ✅ **Run Prettier** - Format your code consistently
3. ✅ **Remove unused imports** - Clean up your imports
4. ✅ **Sort imports alphabetically** - Organize import statements
5. ✅ **Only process staged files** - For better performance

### Configuration Files

- **`.husky/pre-commit`** - The pre-commit hook script
- **`package.json` > `lint-staged`** - Defines what to run on staged files

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

## How It Works

1. **You stage files:** `git add .`
2. **You commit:** `git commit -m "Your message"`
3. **Husky intercepts** and runs the pre-commit hook
4. **Lint-staged processes only staged files:**
   - Runs ESLint with `--fix` flag
   - Runs Prettier to format code
   - Adds the fixed files back to the commit
5. **If everything passes:** Commit proceeds
6. **If there are unfixable errors:** Commit is blocked

## Example Workflow

```bash
# Stage your changes
git add src/components/MyComponent.tsx

# Try to commit
git commit -m "Add new component"

# Husky runs automatically:
# → Running lint-staged...
# → ✓ eslint --fix on src/components/MyComponent.tsx
# → ✓ prettier --write on src/components/MyComponent.tsx
# → ✓ Everything passed!

# Commit proceeds successfully
```

## Benefits

### ✅ **Consistent Code Style**

- All code is automatically formatted
- No more style debates in code reviews

### ✅ **Catch Issues Early**

- ESLint catches potential bugs before they reach the repository
- Unused imports are automatically removed

### ✅ **Better Performance**

- Only processes changed files (not the entire codebase)
- Runs faster than full project linting

### ✅ **Team Collaboration**

- Everyone's code looks the same
- Reduces merge conflicts due to formatting differences

## Troubleshooting

### Hook Not Running?

```bash
# Reinstall Husky hooks
npm run prepare
```

### Want to Skip Hooks Temporarily?

```bash
# Skip pre-commit hook (use with caution!)
git commit -m "Your message" --no-verify
```

### Hook Fails Due to Errors?

1. Check the error message in terminal
2. Fix the issues manually
3. Stage the fixed files: `git add .`
4. Try committing again

### Manual Commands

If you want to run the same checks manually:

```bash
# Run linting and formatting on staged files
npx lint-staged

# Run on all files
npm run lint-and-format
```

## Configuration Customization

To modify what runs on commit, edit the `lint-staged` section in `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add" // Add this if you want to stage fixes automatically
    ]
  }
}
```

## Disabling Husky

If you need to temporarily disable Husky:

```bash
# Disable all hooks
npx husky install --skip

# Re-enable
npx husky install
```
