import { Button, Description, Field, Label, Switch } from '@headlessui/react';
import { use } from 'react';

import { twJoin } from 'tailwind-merge';
import { FeatureFlagsContext } from '../hooks';

export function FeatureFlagsManager() {
  const [flags, setFlags, resetFlags] = use(FeatureFlagsContext);

  return (
    <>
      {flags.map((flag) => (
        <Field key={flag.key} className="flex items-center justify-between">
          <span className="flex grow flex-col">
            <Label
              as="span"
              passive
              className="text-sm font-medium leading-6 text-neutral-900 sm:text-base dark:text-neutral-50"
            >
              {flag.name}
            </Label>
            <Description className="text-xs text-neutral-600 dark:text-neutral-400">
              {flag.key}
            </Description>
          </span>
          <Switch
            checked={flag.enabled}
            onChange={(checked) =>
              setFlags({
                ...flag,
                enabled: checked,
              })
            }
            className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-neutral-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 focus:outline-none data-[checked]:bg-cyan-600 dark:bg-neutral-500 dark:focus:ring-violet-500 dark:focus:ring-offset-neutral-950 dark:data-[checked]:bg-violet-500"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 transform rounded-full bg-white ring-0 shadow transition duration-200 ease-in-out group-data-[checked]:translate-x-5 dark:bg-neutral-950"
            />
          </Switch>
        </Field>
      ))}

      {/* Reset button */}
      <div className="mt-4">
        <Button
          className={twJoin(
            'w-full sm:w-auto',
            'inline-flex items-center justify-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10',
            'bg-neutral-700 text-white',
            'data-[hover]:bg-neutral-600',
            'data-[active]:bg-neutral-700',
            'focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white',
            'data-[disabled]:cursor-not-allowed data-[disabled]:bg-neutral-300 data-[disabled]:text-neutral-400 data-[disabled]:shadow-none',
          )}
          onClick={resetFlags}
        >
          Reset flags
        </Button>
      </div>
    </>
  );
}
