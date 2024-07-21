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

import { FlagsContext } from '../hooks';

export interface FlagsManagerProps {
  open: boolean;
  onClose: (open: boolean) => void;
}

export default function FlagsManager({ open, onClose }: FlagsManagerProps) {
  const [flags, setFlags] = use(FlagsContext);

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-neutral-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in dark:bg-neutral-700/75"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white pt-5 px-4 pb-4 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 dark:bg-neutral-950"
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
              <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-neutral-900 dark:text-white"
                >
                  Activate or deactivate flags
                </DialogTitle>
                <div className="mt-2 space-y-2">
                  <Field className="flex items-center justify-between">
                    <span className="flex grow flex-col">
                      <Label
                        as="span"
                        passive
                        className="text-sm font-medium leading-6 text-neutral-900 dark:text-neutral-50"
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
                      className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-neutral-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-cyan-600 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none data-[checked]:bg-cyan-600 dark:bg-neutral-500 dark:focus:ring-offset-neutral-950 dark:data-[checked]:bg-violet-500"
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
                        className="text-sm font-medium leading-6 text-neutral-900 dark:text-neutral-50"
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
                      className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-neutral-200 bg-neutral-500 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-cyan-600 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none data-[checked]:bg-cyan-600 dark:focus:ring-offset-neutral-950 dark:data-[checked]:bg-violet-500"
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
            {/* <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Deactivate
              </button>
              <button
                type="button"
                onClick={() => onClose(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white py-2 px-3 text-sm font-semibold text-neutral-900 ring-1 shadow-sm ring-neutral-300 ring-inset hover:bg-neutral-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div> */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
