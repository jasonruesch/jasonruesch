import { createContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useFlags } from 'flagsmith/react';
import { FeatureFlag, defaultFeatureFlags } from '../models';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const FeatureFlagsContext = createContext<
  // flags, setFlags, resetFlags
  readonly [FeatureFlag[], (flag: FeatureFlag) => void, () => void]
>([defaultFeatureFlags, noop, noop]);

export const useFeatureFlags = () => {
  // Flagsmith flags
  const flagsmithFeatureFlags = useFlags(
    defaultFeatureFlags.map((flag) => flag.key),
  );
  const featureFlags = Object.entries(flagsmithFeatureFlags).reduce(
    (acc, [key, { enabled }]) => {
      const flag = defaultFeatureFlags.find((f) => f.key === key);
      return flag
        ? // Prioritize Flagsmith flags
          [...acc, { ...flag, enabled: enabled || flag.enabled }]
        : acc;
    },
    [] as FeatureFlag[],
  );

  // Local storage flags
  const storage = window.localStorage ?? window.sessionStorage;
  const storedFlags = JSON.parse(
    storage.getItem('featureFlags') ?? '[]',
  ) as FeatureFlag[];

  // Search flags from URL
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFlags = Array.from(searchParams.entries())
    .map(([key, value]) => {
      const flag = defaultFeatureFlags.find((f) => f.key === key);
      return flag
        ? ({ ...flag, enabled: value === 'true' } as FeatureFlag)
        : null;
    })
    .filter((flag) => flag !== null);

  const uniqueFlags = [
    ...new Map(
      // Ordered by prioritization, last one wins
      featureFlags
        .concat(storedFlags)
        .concat(searchFlags)
        .map((item) => [item['key'], item]),
    ).values(),
  ];

  const [flags, setFlags] = useState<FeatureFlag[]>(uniqueFlags);

  const updateFlags = (flag: FeatureFlag) => {
    setFlags((flags) => {
      const updated = flags.map((f) =>
        f.key === flag.key ? { ...f, enabled: flag.enabled } : f,
      );

      return updated;
    });
  };

  const resetFlags = () => {
    setFlags(featureFlags);
  };

  useEffect(() => {
    // Update storage
    const storedFlagsFromFlags = JSON.stringify(flags);
    storage.setItem('featureFlags', storedFlagsFromFlags);

    // Update search params
    const searchFlagsFromFlags = flags.reduce((acc, { key, enabled }) => {
      if (enabled) acc.set(key, 'true');
      else acc.delete(key);
      return acc;
    }, searchParams);
    setSearchParams(searchFlagsFromFlags);
  }, [flags, storage, searchParams, setSearchParams]);

  return [flags, updateFlags, resetFlags] as const;
};

export const findFeatureFlag = (flags: FeatureFlag[], key: string) =>
  flags.find((f) => f.key === key);
