import { Button, Description, Field, Label, Switch } from '@headlessui/react';

// This import is causing the following error:
// [vite]: Rollup failed to resolve import "@jasonruesch/ui" from "/app/libs/feature-feature-flags/src/lib/feature-flags-manager.tsx".
// import { Button } from '@jasonruesch/ui';
import clsx from 'clsx';
import { useFeatureFlags } from './feature-flags-context';

const styles = {
  base: [
    // Base
    'relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold',
    // Sizing
    'px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6',
    // Focus
    'focus:not-data-focus:outline-hidden data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-blue-500',
    // Disabled
    'data-disabled:opacity-50',
    // Icon
    '*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center *:data-[slot=icon]:text-(--btn-icon) sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]',
  ],
  outline: [
    // Base
    'border-zinc-950/10 text-zinc-950 data-active:bg-zinc-950/2.5 data-hover:bg-zinc-950/2.5',
    // Dark mode
    'dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:data-active:bg-white/5 dark:data-hover:bg-white/5',
    // Icon
    '[--btn-icon:var(--color-zinc-500)] data-active:[--btn-icon:var(--color-zinc-700)] data-hover:[--btn-icon:var(--color-zinc-700)] dark:data-active:[--btn-icon:var(--color-zinc-400)] dark:data-hover:[--btn-icon:var(--color-zinc-400)]',
  ],
};

export function FeatureFlagsManager() {
  const { featureFlags, updateFeatureFlags, resetFeatureFlags } =
    useFeatureFlags();

  return (
    <>
      {featureFlags.map((flag) => (
        <Field key={flag.key} className="flex items-center justify-between">
          <span className="flex grow flex-col">
            <Label
              as="span"
              passive
              className="text-sm leading-6 font-medium text-zinc-900 sm:text-base dark:text-zinc-50"
            >
              {flag.name}
            </Label>
            <Description className="text-xs text-zinc-600 dark:text-zinc-400">
              {flag.key}
            </Description>
          </span>
          <Switch
            checked={flag.enabled}
            onChange={(checked) =>
              updateFeatureFlags({
                ...flag,
                enabled: checked,
              })
            }
            className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 focus:outline-none data-[checked]:bg-cyan-600 dark:bg-zinc-500 dark:focus:ring-violet-500 dark:focus:ring-offset-zinc-950 dark:data-[checked]:bg-violet-500"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5 dark:bg-zinc-950"
            />
          </Switch>
        </Field>
      ))}

      {/* Reset button */}
      <div className="mt-4">
        <Button
          className={clsx(styles.base, styles.outline)}
          onClick={resetFeatureFlags}
        >
          Reset flags
        </Button>
      </div>
    </>
  );
}
