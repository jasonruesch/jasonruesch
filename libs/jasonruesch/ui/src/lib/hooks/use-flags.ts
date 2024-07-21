import { createContext, useCallback, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

export interface Flags {
  showHiddenNavigation: boolean;
  showAllNavigation: boolean;
}

const defaultFlags: Flags = {
  showHiddenNavigation: false,
  showAllNavigation: false,
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const FlagsContext = createContext<
  [Flags, (partial: Partial<Flags>) => void]
>([defaultFlags, noop]);

export const useFlags = () => {
  const storage = window.localStorage ?? window.sessionStorage;
  const storedFlags = JSON.parse(storage.getItem('flags') ?? '{}') as Flags;

  const [searchParams, setSearchParams] = useSearchParams();
  const searchFlags = Array.from(searchParams.entries())
    .filter(([key]) => key in defaultFlags)
    .reduce(
      (flags, [key, value]) => ({ ...flags, [key]: value === 'true' }),
      {} as Flags,
    );

  const [flags, setFlags] = useState<Flags>({
    ...defaultFlags,
    ...storedFlags,
    ...searchFlags,
  });

  const updateFlags = useCallback(
    (partial: Partial<Flags>) => {
      setFlags((flags) => {
        const updated = { ...flags, ...partial };
        storage.setItem('flags', JSON.stringify(updated));

        return updated;
      });
    },
    [storage],
  );

  useEffect(() => {
    const storedFlags = JSON.parse(storage.getItem('flags') ?? '{}') as Flags;
    const searchFlags = Array.from(searchParams.entries())
      .filter(([key]) => key in defaultFlags)
      .reduce(
        (flags, [key, value]) => ({ ...flags, [key]: value === 'true' }),
        {} as Flags,
      );

    const updated = { ...defaultFlags, ...storedFlags, ...searchFlags };
    storage.setItem('flags', JSON.stringify(updated));
    setFlags(updated);
  }, [storage, searchParams]);

  useEffect(() => {
    Object.entries(flags)
      .filter(([key]) => searchParams.has(key))
      .forEach(([key, value]) => {
        if (value) searchParams.set(key, 'true');
        else searchParams.delete(key);
      });
    setSearchParams(searchParams);
  }, [flags, searchParams, setSearchParams]);

  return [flags, updateFlags] as const;
};
