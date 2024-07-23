import { createContext, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FeatureFlag, featureFlags } from '../models';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const FeatureFlagsContext = createContext<
  [FeatureFlag[], (flag: FeatureFlag) => void]
>([featureFlags, noop]);

export const useFeatureFlags = () => {
  const storage = window.localStorage ?? window.sessionStorage;
  const storedFlags = JSON.parse(
    storage.getItem('featureFlags') ?? '[]',
  ) as FeatureFlag[];

  const [searchParams, setSearchParams] = useSearchParams();
  const searchFlags = Array.from(searchParams.entries())
    .map(([key, value]) => {
      const flag = featureFlags.find((f) => f.key === key);
      return flag
        ? ({ ...flag, enabled: value === 'true' } as FeatureFlag)
        : null;
    })
    .filter((flag) => flag !== null);

  const uniqueFlags = [
    ...new Map(
      featureFlags
        .concat(storedFlags)
        .concat(searchFlags)
        .map((item) => [item['key'], item]),
    ).values(),
  ];
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

  useEffect(() => {
    const storedFlags = JSON.parse(
      storage.getItem('featureFlags') ?? '[]',
    ) as FeatureFlag[];
    const searchFlags = Array.from(searchParams.entries())
      .map(([key, value]) => {
        const flag = featureFlags.find((f) => f.key === key);
        return flag
          ? ({ ...flag, enabled: value === 'true' } as FeatureFlag)
          : null;
      })
      .filter((flag) => flag !== null);

    const updated = [
      ...new Map(
        featureFlags
          .concat(storedFlags)
          .concat(searchFlags)
          .map((item) => [item['key'], item]),
      ).values(),
    ];
    storage.setItem('featureFlags', JSON.stringify(updated));
    setFlags(updated);
  }, [storage, searchParams]);

  useEffect(() => {
    flags
      .filter(({ key }) => searchParams.has(key))
      .forEach(({ key, enabled }) => {
        if (enabled) searchParams.set(key, 'true');
        else searchParams.delete(key);
      });
    setSearchParams(searchParams);
  }, [flags, searchParams, setSearchParams]);

  return [flags, updateFlags] as const;
};

export const findFeatureFlag = (flags: FeatureFlag[], key: string) =>
  flags.find((f) => f.key === key);
