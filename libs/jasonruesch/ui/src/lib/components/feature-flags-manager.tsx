import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Label,
  Switch,
} from '@headlessui/react';
import { FlagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { use } from 'react';

import { FeatureFlagsContext } from '../hooks';

export interface FeatureFlagsManagerProps {
  open: boolean;
  onClose: (open: boolean) => void;
}

export default function FeatureFlagsManager({
  open,
  onClose,
}: FeatureFlagsManagerProps) {
  const [flags, setFlags] = use(FeatureFlagsContext);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-neutral-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in dark:bg-neutral-700/75"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative my-8 w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 pt-5 px-4 pb-4 text-left shadow-xl transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in dark:bg-neutral-950"
          >
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="rounded-md bg-white text-neutral-400 hover:text-neutral-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none dark:bg-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-400 dark:focus:ring-violet-400 dark:focus:ring-offset-neutral-950"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:size-10 dark:bg-violet-600">
                <FlagIcon
                  aria-hidden="true"
                  className="size-6 text-cyan-600 dark:text-violet-100"
                />
              </div>
              <div className="mt-3 w-full sm:mt-0 sm:ml-4">
                <DialogTitle
                  as="h3"
                  className="text-center text-neutral-900 sm:text-left dark:text-white"
                >
                  Feature Flags
                </DialogTitle>
                <div className="mt-2 space-y-2">
                  <Field className="flex items-center justify-between">
                    <span className="flex grow flex-col">
                      <Label
                        as="span"
                        passive
                        className="text-sm font-medium leading-6 text-neutral-900 sm:text-base dark:text-neutral-50"
                      >
                        Show hidden navigation
                      </Label>
                    </span>
                    <Switch
                      checked={flags.showHiddenNavigation}
                      onChange={(checked) =>
                        setFlags({
                          showHiddenNavigation: checked,
                        })
                      }
                      className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-neutral-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 focus:outline-none data-[checked]:bg-cyan-600 dark:bg-neutral-500 dark:focus:ring-violet-500 dark:focus:ring-offset-neutral-950 dark:data-[checked]:bg-violet-500"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white ring-0 shadow transition duration-200 ease-in-out group-data-[checked]:translate-x-5 dark:bg-neutral-950"
                      />
                    </Switch>
                  </Field>

                  <Field className="flex items-center justify-between">
                    <span className="flex grow flex-col">
                      <Label
                        as="span"
                        passive
                        className="text-sm font-medium leading-6 text-neutral-900 sm:text-base dark:text-neutral-50"
                      >
                        Show all navigation
                      </Label>
                    </span>
                    <Switch
                      checked={flags.showAllNavigation}
                      onChange={(checked) =>
                        setFlags({
                          showAllNavigation: checked,
                        })
                      }
                      className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-neutral-200 bg-neutral-500 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 focus:outline-none data-[checked]:bg-cyan-600 dark:focus:ring-violet-500 dark:focus:ring-offset-neutral-950 dark:data-[checked]:bg-violet-500"
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white ring-0 shadow transition duration-200 ease-in-out group-data-[checked]:translate-x-5 dark:bg-neutral-950"
                      />
                    </Switch>
                  </Field>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
