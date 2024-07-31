import { FlagIcon } from '@heroicons/react/24/outline';
import { Page } from '../../components';
import { FeatureFlagsManager } from '../../components/feature-flags-manager';

export function Admin() {
  return (
    <Page contentClassName="flex flex-col items-center justify-center lg:max-w-[var(--breakpoint-sm)] mx-auto w-full">
      <h1 className="gradient-heading" aria-label="Admin">
        <div className="flex items-center justify-center" aria-hidden="true">
          <span className="heading-lg">Admin</span>
        </div>
      </h1>

      <div className="mt-4 w-full rounded-lg bg-white/50 p-4 ring-1 ring-neutral-200 backdrop-blur-sm dark:bg-neutral-950/50 dark:ring-black">
        <div className="px-4 sm:flex sm:items-start">
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:size-10 dark:bg-violet-600">
            <FlagIcon
              aria-hidden="true"
              className="size-6 text-cyan-600 dark:text-violet-100"
            />
          </div>
          <div className="mt-3 w-full sm:mt-0 sm:ml-4">
            <h3 className="text-center text-neutral-900 sm:text-left dark:text-white">
              Feature Flags
            </h3>
          </div>
        </div>

        <div className="mt-2 max-h-40 space-y-2 py-3 px-4 sm:ml-14">
          <FeatureFlagsManager />
        </div>
      </div>
    </Page>
  );
}
