import flagsmith from 'flagsmith';
import type { IFlagsmithFeature } from 'flagsmith/types';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useRouteLoaderData } from 'react-router';

// === Types ===

export enum FeatureFlag {
  AllNavigation = 'all_navigation',
  HiddenNavigation = 'hidden_navigation',
}

export type FeatureFlags = Record<FeatureFlag | string, boolean>;

interface FeatureFlagContextType {
  flags: FeatureFlags;
  setFlags: (newFlags: FeatureFlags) => void;
  resetFlags: () => void;
}

interface FeatureFlagProviderProps {
  children: ReactNode;
  initialFlags?: FeatureFlags;
  flagsmithEnvironmentId?: string;
  identity?: string;
}

const LOCAL_STORAGE_KEY = 'jasonruesch.featureFlags';

const defaultFlags: FeatureFlags = {
  [FeatureFlag.AllNavigation]: false,
  [FeatureFlag.HiddenNavigation]: false,
};

// === Context ===

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

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({
  children,
  initialFlags,
  flagsmithEnvironmentId,
  identity,
}) => {
  const routeData = useRouteLoaderData('root') as
    | { featureFlags?: FeatureFlags }
    | undefined;

  const loaderFlags = routeData?.featureFlags ?? {};
  const location = useLocation();

  // ✅ Initial SSR-safe render
  const [flags, setFlagsInternal] = useState<FeatureFlags>({
    ...defaultFlags,
    ...loaderFlags,
    ...initialFlags,
  });

  const setFlags = (newFlags: FeatureFlags) => {
    setFlagsInternal(newFlags);
    storeFlags(newFlags);
  };

  const resetFlags = () => {
    clearStoredFlags();
    const base = {
      ...defaultFlags,
      ...loaderFlags,
      ...initialFlags,
    };
    setFlagsInternal(base);
    storeFlags(base);
  };

  // ✅ Apply client-only sources on mount
  useEffect(() => {
    const storedFlags = getStoredFlags();

    const queryParams = new URLSearchParams(location.search);
    const enabled =
      queryParams.get('feature')?.split(',').filter(Boolean) ?? [];
    const disabled =
      queryParams.get('disable')?.split(',').filter(Boolean) ?? [];

    const urlFlags: FeatureFlags = {
      ...Object.fromEntries(enabled.map((key) => [key, true])),
      ...Object.fromEntries(disabled.map((key) => [key, false])),
    };

    const flagsmithFlags =
      flagsmithEnvironmentId && typeof window !== 'undefined'
        ? extractFlagsFromFlagsmith(flagsmith.getAllFlags?.() ?? {})
        : {};

    const merged: FeatureFlags = {
      ...defaultFlags,
      ...loaderFlags,
      ...initialFlags,
      ...flagsmithFlags,
      ...storedFlags,
      ...urlFlags,
    };

    setFlagsInternal(merged);
    storeFlags(merged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, flagsmithEnvironmentId, identity]);

  // ✅ Initialize Flagsmith client-side only
  useEffect(() => {
    if (!flagsmithEnvironmentId || typeof window === 'undefined') return;

    flagsmith.init({
      environmentID: flagsmithEnvironmentId,
      identity,
      onChange: () => {
        const remoteFlags = extractFlagsFromFlagsmith(flagsmith.getAllFlags());
        setFlagsInternal((prev) => ({
          ...prev,
          ...remoteFlags,
        }));
        storeFlags({
          ...flags,
          ...remoteFlags,
        });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagsmithEnvironmentId, identity]);

  return (
    <FeatureFlagContext.Provider value={{ flags, setFlags, resetFlags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};
