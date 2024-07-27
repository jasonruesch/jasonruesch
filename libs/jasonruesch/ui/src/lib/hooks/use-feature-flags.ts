import { createContext, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useFlags } from 'flagsmith/react';
import { FeatureFlag, featureFlags } from '../models';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const FeatureFlagsContext = createContext<
  // flags, setFlags, resetFlags
  [FeatureFlag[], (flag: FeatureFlag) => void, () => void]
>([featureFlags, noop, noop]);

export const useFeatureFlags = () => {
  // Flagsmith flags
  const flagsmithFlags = useFlags(featureFlags.map((flag) => flag.key));
  const flagsmithFeatureFlags = Object.entries(flagsmithFlags).reduce(
    (acc, [key, { enabled }]) => {
      const flag = featureFlags.find((f) => f.key === key);
      return flag ? acc.concat({ ...flag, enabled }) : acc;
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
      const flag = featureFlags.find((f) => f.key === key);
      return flag
        ? ({ ...flag, enabled: value === 'true' } as FeatureFlag)
        : null;
    })
    .filter((flag) => flag !== null);

  const getUniqueFlags = () => [
    ...new Map(
      featureFlags
        .concat(flagsmithFeatureFlags)
        .concat(storedFlags)
        .concat(searchFlags)
        .map((item) => [item['key'], item]),
    ).values(),
  ];
  const uniqueFlags = getUniqueFlags();

  if (storedFlags.length === 0) {
    storage.setItem('featureFlags', JSON.stringify(uniqueFlags));
  }

  const [flags, setFlags] = useState<FeatureFlag[]>(uniqueFlags);

  const updateFlags = useCallback(
    (flag: FeatureFlag) => {
      setFlags((flags) => {
        const updated = flags.map((f) =>
          f.key === flag.key ? { ...f, enabled: flag.enabled } : f,
        );

        storage.setItem('featureFlags', JSON.stringify(updated));

        return updated;
      });
    },
    [storage],
  );

  const resetFlags = () => {
    console.log('reset flags');
    const flags = flagsmithFeatureFlags.length
      ? flagsmithFeatureFlags
      : featureFlags;
    storage.setItem('featureFlags', JSON.stringify(flags));
    setFlags(flags);
  };

  useEffect(() => {
    flags
      .filter(({ key }) => searchParams.has(key))
      .forEach(({ key, enabled }) => {
        if (enabled) searchParams.set(key, 'true');
        else searchParams.delete(key);
      });
    setSearchParams(searchParams);
  }, [flags, searchParams, setSearchParams]);

  return [flags, updateFlags, resetFlags] as const;
};

export const findFeatureFlag = (flags: FeatureFlag[], key: string) =>
  flags.find((f) => f.key === key);
