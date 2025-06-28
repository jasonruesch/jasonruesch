'use client';

import flagsmith from 'flagsmith';
import { FlagsmithProvider, useFlags } from 'flagsmith/react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router';
import { FeatureFlagsManagerModal } from './feature-flags-manager-modal';
import { defaultFlags, FeatureFlag } from './models';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

type FeatureFlagsContextType = {
  featureFlags: FeatureFlag[];
  updateFeatureFlags: (flag: FeatureFlag) => void;
  resetFeatureFlags: () => void;
};

const FeatureFlagsContext = createContext<FeatureFlagsContextType>({
  featureFlags: [],
  updateFeatureFlags: noop,
  resetFeatureFlags: noop,
});

type FeatureFlagsProviderProps = {
  children: React.ReactNode;
};

const FeatureFlagsProviderImpl = ({ children }: FeatureFlagsProviderProps) => {
  const _flagsmithFlags = useFlags(defaultFlags.map((flag) => flag.key));
  const [searchParams, setSearchParams] = useSearchParams();

  // Flagsmith flags
  const flagsmithFlags = useMemo(() => {
    return Object.entries(_flagsmithFlags).reduce((acc, [key, { enabled }]) => {
      const flag = defaultFlags.find((f) => f.key === key);
      return flag
        ? // Prioritize Flagsmith flags
          [...acc, { ...flag, enabled: enabled || flag.enabled }]
        : acc;
    }, [] as FeatureFlag[]);
  }, [_flagsmithFlags]);

  // Local storage flags
  const [storedFlags, storage] = useMemo(() => {
    const storage = window.localStorage ?? window.sessionStorage;
    const storedFlags = JSON.parse(
      storage?.getItem('feature-flags') ?? '[]',
    ) as FeatureFlag[];

    return [storedFlags, storage];
  }, []);

  // Search flags from URL
  const searchFlags = useMemo(() => {
    return Array.from(searchParams.entries())
      .map(([key, value]) => {
        const flag = defaultFlags.find((f) => f.key === key);
        return flag
          ? ({ ...flag, enabled: value === 'true' } as FeatureFlag)
          : null;
      })
      .filter((flag) => flag !== null);
  }, [searchParams]);

  const uniqueFlags = useMemo(() => {
    return [
      ...new Map(
        // Ordered by prioritization, last one wins
        flagsmithFlags
          .concat(storedFlags)
          .concat(searchFlags)
          .map((item) => [item['key'], item]),
      ).values(),
    ];
  }, [flagsmithFlags, storedFlags, searchFlags]);

  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(uniqueFlags);

  const updateFeatureFlags = (flag: FeatureFlag) => {
    setFeatureFlags((flags) => {
      const updated = flags.map((f) =>
        f.key === flag.key ? { ...f, enabled: flag.enabled } : f,
      );

      return updated;
    });
  };

  const resetFeatureFlags = () => {
    setFeatureFlags(flagsmithFlags);
  };

  useEffect(() => {
    // Update storage
    const storedFlagsFromFlags = JSON.stringify(featureFlags);
    storage?.setItem('feature-flags', storedFlagsFromFlags);

    // Update search params
    const searchFlagsFromFlags = featureFlags.reduce(
      (acc, { key, enabled }) => {
        if (enabled) acc.set(key, 'true');
        else acc.delete(key);
        return acc;
      },
      searchParams,
    );
    setSearchParams(searchFlagsFromFlags);
  }, [featureFlags, storage, searchParams, setSearchParams]);

  const value = {
    featureFlags,
    updateFeatureFlags,
    resetFeatureFlags,
  };

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}

      <FeatureFlagsManagerModal />
    </FeatureFlagsContext.Provider>
  );
};

export const FeatureFlagsProvider = ({
  children,
}: FeatureFlagsProviderProps) => {
  const [isClient, setIsClient] = useState(false);
  const flagsmithEnvironmentId = import.meta.env.VITE_FLAGSMITH_ENVIRONMENT_ID;

  useEffect(() => {
    setIsClient(true); // Ensures we only use `useLocation` on the client
  }, []);

  if (!isClient) return null;

  return (
    <FlagsmithProvider
      {...(flagsmithEnvironmentId
        ? { options: { environmentID: flagsmithEnvironmentId } }
        : {})}
      flagsmith={flagsmith}
    >
      <FeatureFlagsProviderImpl>{children}</FeatureFlagsProviderImpl>
    </FlagsmithProvider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext);
  if (!context)
    throw new Error('useFeatureFlags must be used within FeatureFlagsProvider');

  return context;
};

export const useFeatureFlag = (flagName: string): boolean => {
  const { featureFlags } = useFeatureFlags();
  const flag = featureFlags.find((f) => f.key === flagName);

  return flag ? flag.enabled : false;
};
