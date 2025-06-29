import { useLocation } from 'react-router';

import { Button } from '@jasonruesch/ui';
import { useFeatureFlags } from './feature-flag-provider';

export function DevFlagTogglePanel() {
  const location = useLocation();
  const showDevTools =
    !import.meta.env.PROD &&
    new URLSearchParams(location.search).get('dev') === 'true';

  const { flags, setFlags, resetFlags } = useFeatureFlags();

  if (!showDevTools) return null;

  const toggle = (key: string) => {
    setFlags({ ...flags, [key]: !flags[key] });
  };

  return (
    <div className="fixed right-0 bottom-0 z-50 flex flex-col items-start gap-2 border border-r-0 border-b-0 border-zinc-300 bg-white p-4 text-black dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
      <strong>Feature Flags</strong>
      <ul>
        {Object.entries(flags).map(([key, value]) => (
          <li key={key} className="flex items-center gap-1">
            <input
              id={`flag-${key}`}
              type="checkbox"
              checked={value}
              onChange={() => toggle(key)}
            />
            <label htmlFor={`flag-${key}`}>{key}</label>
          </li>
        ))}
      </ul>
      <Button onClick={resetFlags}>Reset Flags</Button>
    </div>
  );
}
