## [Flagsmith](https://flagsmith.com/)

Flagsmith is an open-source feature flagging and remote config service. It allows you to manage feature flags and remote config for your applications with ease. Flagsmith provides a simple API and a user-friendly dashboard to help you get started quickly.

Install the [Flagsmith React SDK](https://docs.flagsmith.com/clients/react) to manage your feature flags and environments.

```bash
npm i flagsmith
```

Update `apps/jasonruesch/package.json` with the Flagsmith React SDK dependency by running the `cp-all-deps.sh` script:

```bash
bash scripts/cp-all-deps.sh apps/jasonruesch/package.json
```

Update [apps/jasonruesch/.env.example](../../apps/jasonruesch/.env.example) to include the Flagsmith environment ID example:

```dotenv
# Flagsmith environment ID
VITE_FLAGSMITH_ENVIRONMENT_ID='XXXXXXXXXXXXXXXXXXXXXX'
```

If present, update [apps/jasonruesch/.env.local](../../apps/jasonruesch/.env.local) to include the Flagsmith environment ID:

```dotenv
# Flagsmith environment ID
VITE_FLAGSMITH_ENVIRONMENT_ID='your actual flagsmith environment ID'
```

Add `VITE_FLAGSMITH_ENVIRONMENT_ID` as a secret to each environment in the Github repository with the matching Flagsmith environment ID for that environment.

Update [apps/jasonruesch/Dockerfile.preview](../../apps/jasonruesch/Dockerfile.preview) to include the Flagsmith environment ID environment variable:

```dockerfile
...
# Set environment
ARG VITE_FLAGSMITH_ENVIRONMENT_ID
ENV VITE_FLAGSMITH_ENVIRONMENT_ID=$VITE_FLAGSMITH_ENVIRONMENT_ID
ENV NODE_ENV="preview"
...
```

Update [apps/jasonruesch/Dockerfile.staging](../../apps/jasonruesch/Dockerfile.staging) to include the Flagsmith environment ID environment variable:

```dockerfile
...
# Set environment
ARG VITE_FLAGSMITH_ENVIRONMENT_ID
ENV VITE_FLAGSMITH_ENVIRONMENT_ID=$VITE_FLAGSMITH_ENVIRONMENT_ID
ENV NODE_ENV="staging"
...
```

Update [apps/jasonruesch/Dockerfile.production](../../apps/jasonruesch/Dockerfile.production) to include the Flagsmith environment ID environment variable:

```dockerfile
...
# Set environment
ARG VITE_FLAGSMITH_ENVIRONMENT_ID
ENV VITE_FLAGSMITH_ENVIRONMENT_ID=$VITE_FLAGSMITH_ENVIRONMENT_ID
ENV NODE_ENV="production"
...
```

Update [.github/workflows/preview.yml](../../.github/workflows/preview.yml) to include the Flagsmith environment ID as a build argument:

```yaml
- run: |
    flyctl deploy --config apps/jasonruesch/fly.preview.toml --app "${{ github.event.repository.name }}-pr-${{ github.event.number }}" \
      --build-arg VITE_FLAGSMITH_ENVIRONMENT_ID="${{ secrets.VITE_FLAGSMITH_ENVIRONMENT_ID }}"
```

Update [.github/workflows/staging.yml](../../.github/workflows/staging.yml) to include the Flagsmith environment ID as a build argument:

```yaml
- run: |
    flyctl deploy --config apps/jasonruesch/fly.staging.toml \
      --build-arg VITE_FLAGSMITH_ENVIRONMENT_ID="${{ secrets.VITE_FLAGSMITH_ENVIRONMENT_ID }}"
```

Update [.github/workflows/production.yml](../../.github/workflows/production.yml) to include the Flagsmith environment ID as a build argument:

```yaml
- run: |
    flyctl deploy --config apps/jasonruesch/fly.production.toml --image-label jasonruesch-${{ github.ref_name }} \
      --build-arg VITE_FLAGSMITH_ENVIRONMENT_ID="${{ secrets.VITE_FLAGSMITH_ENVIRONMENT_ID }}"
```

Generate a new feature library for a feature flag context and provider:

```bash
npx nx g @nx/react:library --directory=libs/feature-feature-flags feature-feature-flags --importPath=@jasonruesch/feature-feature-flags
rm -rf libs/ui/src/lib/feature-feature-flags.tsx
```

Select `vite` as the bundler and `none` as the test runner.

Update [libs/feature-feature-flags/tsconfig.lib.json](../../libs/feature-feature-flags/tsconfig.lib.json) to include the `dom` lib:

```json
{
  ...
  "compilerOptions": {
    ...
    lib: ["dom"]
  },
  ...
}
```

Create a new file [libs/feature-feature-flags/src/lib/action-key.hook.ts](../../libs/feature-feature-flags/src/lib/action-key.hook.ts):

```typescript
export interface ActionKey {
  key: string;
  name: string;
  ctrlKey: boolean;
  metaKey: boolean;
}

const ACTION_KEY_DEFAULT: ActionKey = {
  key: 'Ctrl ',
  name: 'Control',
  ctrlKey: true,
  metaKey: false,
};
const ACTION_KEY_APPLE: ActionKey = {
  key: '⌘',
  name: 'Command',
  ctrlKey: false,
  metaKey: true,
};

/**
 * Get the action key for the current platform.
 * @returns Either Ctrl or ⌘ depending on the platform.
 */
export function useActionKey() {
  let actionKey: ActionKey = ACTION_KEY_DEFAULT;

  if (typeof navigator !== 'undefined') {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
      actionKey = ACTION_KEY_APPLE;
    }
  }

  return actionKey;
}
```

Create a new file [libs/feature-feature-flags/src/lib/feature-flag.model.ts](../../libs/feature-feature-flags/src/lib/feature-flag.model.ts):

```typescript
export enum FeatureFlag {
  AllNavigation = 'all_navigation',
  HiddenNavigation = 'hidden_navigation',
}

export type FeatureFlags = Record<FeatureFlag | string, boolean>;

export const defaultFlags: FeatureFlags = {
  [FeatureFlag.AllNavigation]: false,
  [FeatureFlag.HiddenNavigation]: false,
};
```

Create a new file [libs/feature-feature-flags/src/lib/feature-flag-provider.tsx](../../libs/feature-feature-flags/src/lib/feature-flag-provider.tsx):

```jsx
import flagsmith from 'flagsmith';
import type { IFlagsmithFeature } from 'flagsmith/types';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useRouteLoaderData } from 'react-router';
import { defaultFlags, FeatureFlag, FeatureFlags } from './feature-flag.model';

export const LOCAL_STORAGE_KEY = 'jasonruesch.featureFlags';

// === Context ===

interface FeatureFlagContextType {
  flags: FeatureFlags;
  setFlags: (newFlags: FeatureFlags) => void;
  resetFlags: () => void;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(
  undefined,
);

// === Hooks ===

export function useFeatureFlags(): FeatureFlagContextType {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error(
      'useFeatureFlags must be used within a FeatureFlagProvider',
    );
  }
  return context;
}

export function useFeatureFlag(key: FeatureFlag | string): boolean {
  const { flags } = useFeatureFlags();
  return Boolean(flags[key]);
}

// === Utilities ===

function getStoredFlags(): FeatureFlags {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function storeFlags(flags: FeatureFlags) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(flags));
  } catch {
    // Ignore storage errors
  }
}

function clearStoredFlags() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // Ignore
  }
}

function clearFlagsInUrl(search: string, pathname: string) {
  const queryParams = new URLSearchParams(search);
  queryParams.delete('feature');
  queryParams.delete('disable');
  const newUrl = `${pathname}?${queryParams.toString()}`;
  window.history.replaceState({}, '', newUrl);
}

function extractFlagsFromFlagsmith(
  remoteFlags: Record<
    string,
    IFlagsmithFeature<string | number | boolean | null>
  >,
): FeatureFlags {
  const result: FeatureFlags = {};
  for (const key in remoteFlags) {
    result[key] = !!remoteFlags[key]?.enabled;
  }
  return result;
}

// === Provider ===

interface FeatureFlagProviderProps {
  children: ReactNode;
  initialFlags?: FeatureFlags;
  flagsmithEnvironmentId?: string;
  identity?: string;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({
  children,
  initialFlags,
  flagsmithEnvironmentId,
  identity,
}) => {
  const { pathname, search } = useLocation();
  const routeData = useRouteLoaderData('root') as
    | { featureFlags?: FeatureFlags }
    | undefined;

  const loaderFlags = useMemo(() => routeData?.featureFlags ?? {}, [routeData]);

  const ssrSafeFlags = {
    ...defaultFlags,
    ...loaderFlags,
    ...initialFlags,
  };

  // ✅ Initial SSR-safe render
  const [flags, setFlagsInternal] = useState<FeatureFlags>(ssrSafeFlags);

  const setFlags = (newFlags: FeatureFlags) => {
    setFlagsInternal(newFlags);
    storeFlags(newFlags);
  };

  const resetFlags = () => {
    clearStoredFlags();
    clearFlagsInUrl(search, pathname);
    setFlagsInternal(ssrSafeFlags);
    storeFlags(ssrSafeFlags);
  };

  const setAndStoreFlags = useCallback(() => {
    const storedFlags = getStoredFlags();

    const queryParams = new URLSearchParams(search);
    const enabled =
      queryParams.get('feature')?.split(',').filter(Boolean) ?? [];
    const disabled =
      queryParams.get('disable')?.split(',').filter(Boolean) ?? [];

    const urlFlags: FeatureFlags = {
      ...Object.fromEntries(enabled.map((key) => [key, true])),
      ...Object.fromEntries(disabled.map((key) => [key, false])),
    };

    const flagsmithFlags = extractFlagsFromFlagsmith(flagsmith.getAllFlags());

    const merged: FeatureFlags = {
      ...ssrSafeFlags,
      ...flagsmithFlags,
      ...storedFlags,
      ...urlFlags,
    };

    setFlagsInternal(merged);
    storeFlags(merged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // ✅ Apply client-only sources on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    setAndStoreFlags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // ✅ Initialize Flagsmith client-side only
  useEffect(() => {
    if (!flagsmithEnvironmentId || typeof window === 'undefined') return;

    flagsmith.init({
      environmentID: flagsmithEnvironmentId,
      identity,
      onChange: setAndStoreFlags,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagsmithEnvironmentId, identity]);

  return (
    <FeatureFlagContext.Provider value={{ flags, setFlags, resetFlags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
```

Create a new file [libs/feature-feature-flags/src/lib/feature-flag-toggle-dialog.tsx](../../libs/feature-feature-flags/src/lib/feature-flag-toggle-dialog.tsx):

```jsx
import { useLocation, useNavigate } from 'react-router';

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  Label,
  Switch,
  SwitchField,
} from '@jasonruesch/ui';
import { useEffect, useState } from 'react';
import { useActionKey } from './action-key.hook';
import { useFeatureFlags } from './feature-flag-provider';

export function FeatureFlagToggleDialog() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { flags, setFlags, resetFlags } = useFeatureFlags();
  const { ctrlKey, metaKey } = useActionKey();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (key: string, checked: boolean) => {
    setFlags({ ...flags, [key]: checked });
  };

  const handleClose = () => {
    const searchParams = new URLSearchParams(search);
    searchParams.delete('dev');
    const newUrl =
      searchParams.size > 0
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
    navigate(newUrl, { replace: true });
  };

  useEffect(() => {
    if (import.meta.env.PROD) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl|Command + Shift + F(lags) to toggle dev flags panel
      if (
        ((ctrlKey && event.ctrlKey) || (metaKey && event.metaKey)) &&
        event.shiftKey &&
        event.key === 'f'
      ) {
        event.preventDefault();

        const searchParams = new URLSearchParams(search);
        // Toggle the 'dev' query parameter
        if (searchParams.get('dev') === 'true') {
          searchParams.delete('dev');
        } else {
          searchParams.set('dev', 'true');
        }
        const newUrl =
          searchParams.size > 0
            ? `${pathname}?${searchParams.toString()}`
            : pathname;
        navigate(newUrl, { replace: true });
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ctrlKey, metaKey, pathname, search, navigate]);

  useEffect(() => {
    if (import.meta.env.PROD) return;

    const searchParams = new URLSearchParams(search);
    if (searchParams.get('dev') === 'true') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [search]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Feature Flags</DialogTitle>
      <DialogDescription>
        Toggle feature flags for development purposes.
      </DialogDescription>
      <DialogBody>
        {Object.entries(flags).map(([key, value]) => (
          <SwitchField key={key} className="flex items-center justify-between">
            <Label>{key}</Label>
            <Switch
              name={key}
              checked={value}
              onChange={(checked) => handleToggle(key, checked)}
            />
          </SwitchField>
        ))}
      </DialogBody>
      <DialogActions>
        <Button plain onClick={handleClose}>
          Close
        </Button>
        <Button onClick={resetFlags}>Reset Flags</Button>
      </DialogActions>
    </Dialog>
  );
}
```

Create a new file [libs/feature-feature-flags/src/lib/index.ts](../../libs/feature-feature-flags/src/lib/index.ts):

```typescript
export * from './action-key.hook';
export * from './feature-flag-provider';
export * from './feature-flag-toggle-dialog';
export * from './feature-flag.model';
```

Update [libs/feature-feature-flags/src/index.ts](../../libs/feature-feature-flags/src/index.ts) to export from `./lib`:

```typescript
export * from './lib';
```

Update [apps/jasonruesch/styles.css](../../apps/jasonruesch/styles.css) to include the feature flags source:

```css
@import 'tailwindcss';
...
@source '../../libs/feature-feature-flags/src';
```

Update [apps/jasonruesch/src/routes/root.tsx](../../apps/jasonruesch/src/routes/root.tsx) to include the `FeatureFlagProvider` and `FeatureFlagToggleDialog`:

```jsx
...
import {
  FeatureFlag,
  FeatureFlagProvider,
  FeatureFlags,
  FeatureFlagToggleDialog,
  useFeatureFlags,
} from '@jasonruesch/feature-feature-flags';
...

export default function App() {
  ...

  return (
    <FeatureFlagProvider
      flagsmithEnvironmentId={import.meta.env.VITE_FLAGSMITH_ENVIRONMENT_ID}
    >
      ...

      <FeatureFlagToggleDialog />
    </FeatureFlagProvider>
  );
}
```
