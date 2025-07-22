# Developer Guide – LintedRNApp (React Native Bare)

This guide provides comprehensive instructions for developers working on the LintedRNApp project, following the same standards as the main Developer Guide, but adapted for React Native (bare) development.

## Table of Contents

1. Development Setup
2. Code Standards
3. Component Development
4. State Management
5. Performance Optimization
6. Testing Strategy
7. Maintenance Procedures
8. Deployment
9. Troubleshooting
10. Resources

---

## Development Setup

### Prerequisites

- **Node.js**: Version 18+ (LTS recommended)
- **npm**: Latest version
- **Git**: Latest version
- **VS Code**: Recommended editor with extensions below
- **Xcode**: For iOS development (macOS only)
- **Android Studio**: For Android development
- **CocoaPods**: For iOS native dependencies (`sudo gem install cocoapods`)
- **Watchman**: For macOS (`brew install watchman`)

### VS Code Extensions

Install these extensions for optimal development experience:

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-react-native",
    "ms-vscode.vscode-typescript-next",
    "christian-kohler.npm-intellisense"
  ]
}
```

### Initial Setup

1. **Clone and Install**:

   ```bash
   git clone <repository-url>
   cd LintedRNApp
   npm install
   ```

2. **iOS Native Setup**:

   ```bash
   npx pod-install ios
   ```

3. **Start Metro Bundler**:

   ```bash
   npm start
   ```

4. **Run on Device/Emulator**:
   - iOS: `npx react-native run-ios`
   - Android: `npx react-native run-android`

---

## Code Standards

### TypeScript Guidelines

- **Always use TypeScript** for new files.
- **Prefer interfaces over types** for object shapes.
- **Use strict type checking** – no `any` types.
- **Export types from dedicated files** when reused.

### Component Structure

Follow this structure for all components:

```typescript
// 1. Imports (external libraries first, then internal)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

// 3. Main Component
export function Component({ title, onAction }: ComponentProps) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      {/* Add more UI here */}
    </View>
  );
}

// 4. Sub-components (if any)
function SubComponent() {
  return <Text>Sub component</Text>;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
```

### Naming Conventions

- **Files**: `kebab-case.tsx` (e.g., `user-profile.tsx`)
- **Components**: kebab-case (e.g., `user-profile`)
- **Functions**: `camelCase` (e.g., `handleSubmit`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)
- **Styles**: Use StyleSheet and camelCase keys

### Import Organization

Use the import order defined in `.prettierrc`:

```typescript
// 1. React
import React from 'react';

// 2. React Native
import { View, Text } from 'react-native';

// 3. External libraries
import { SomeLib } from 'some-lib';

// 4. Internal absolute imports
import { Button } from '@/components/ui/button';

// 5. Relative imports
import { UserCard } from '../components/user-card';

import './styles.css'; // (rare in RN, but for web support)
```

---

## Component Development

### Creating New Components

1. **Choose the right location**:

   - `src/components/ui/` – Reusable UI primitives
   - `src/components/forms/` – Form-specific components
   - `src/components/layout/` – Layout components
   - `src/components/features/` – Feature-specific components

2. **Use the component template**:

   ```bash
   touch src/components/ui/new-component.tsx
   ```

3. **Follow the component checklist**:

   - [ ] TypeScript interfaces defined
   - [ ] Props properly typed
   - [ ] Responsive design implemented (use Flexbox)
   - [ ] Accessibility features added (e.g., accessibilityLabel)
   - [ ] Error boundaries considered
   - [ ] Performance optimized

4. **Maintain consistency**:
   - Use the same spacing scale
   - Follow the color palette
   - Maintain typography hierarchy

### Special Pinch: Platform-Specific Code

- Use `Platform.OS` or create `Component.ios.tsx` / `Component.android.tsx` for platform differences.

---

## State Management

### Local State

Use React hooks for local state:

```typescript
const [isLoading, setIsLoading] = useState(false);
const [hasError, setHasError] = useState(false);
const [userData, setUserData] = useState<User | null>(null);
```

### Global State

- **Simple state**: Use React Context
- **Complex state**: Consider Zustand or Redux Toolkit
- **Server state**: Use React Query or SWR

---

## Performance Optimization

### React Optimization

- Use `React.memo` for expensive components.
- Memoize callbacks with `useCallback`.
- Memoize expensive calculations with `useMemo`.
- Use FlatList/SectionList for large lists.
- Avoid inline functions in render.
- Use the native driver for animations (`useNativeDriver: true`).

### Bundle Optimization

- Use dynamic imports for code splitting (where supported).
- Import only what you need from libraries.

### Image Optimization

- Use appropriate image sizes and formats.
- Use `Image` component’s `resizeMode` and caching strategies.

---

## Testing Strategy

### Testing Setup

1. **Install testing dependencies**:

   ```bash
   npm install -D jest @testing-library/react-native @testing-library/jest-native
   ```

2. **Configure Jest** in `jest.config.js`:

   ```js
   module.exports = {
     preset: 'react-native',
     setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
     // ...other config
   };
   ```

### Testing Patterns

- **Component testing**: Use `@testing-library/react-native`
- **Integration testing**: Simulate user flows and interactions

### Testing Best Practices

- Test user behavior, not implementation
- Use semantic queries (getByRole, getByLabelText)
- Mock external dependencies
- Test error states and edge cases
- Keep tests focused and isolated

---

## Maintenance Procedures

### Dependency Updates

- **Regular updates**:
  ```bash
  npm outdated
  npm update
  ```
- **Security updates**:
  ```bash
  npm audit
  npm audit fix
  ```

### Code Quality Maintenance

- **Linting**:
  ```bash
  npm run lint
  npm run fix
  ```
- **Formatting**:
  ```bash
  npm run format
  ```
- **Type checking**:
  ```bash
  npx tsc --noEmit
  ```

### iOS/Android Native

- After adding/updating native dependencies, run:
  ```bash
  cd ios && pod install && cd ..
  ```

---

## Deployment

### Build Process

- **iOS**:
  ```bash
  npx react-native run-ios --configuration Release
  ```
- **Android**:
  ```bash
  cd android && ./gradlew assembleRelease
  ```

### Environment Configuration

- Use `.env` files for environment variables (with `react-native-dotenv` or similar).

---

## Troubleshooting

### Common Issues

- **Metro issues**: `npm start --reset-cache`
- **iOS build issues**: `cd ios && pod install`
- **Android build issues**: `cd android && ./gradlew clean`
- **Dependency conflicts**: Remove `node_modules`, `package-lock.json`, and reinstall.

### Debugging

- Use React Native Debugger or Flipper for debugging.
- Use console logging and error boundaries.

---

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library for React Native](https://testing-library.com/docs/react-native-testing-library/intro/)
- [Flipper](https://fbflipper.com/)

---

**Remember**: This guide is a living document. Update it as the project evolves and new patterns emerge.
