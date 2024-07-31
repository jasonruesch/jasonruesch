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
      <p>[admin functionality goes here]</p>

      <div className="w-full space-y-2 rounded-lg bg-white/50 p-4 ring-1 ring-neutral-200 dark:bg-neutral-950/75 dark:ring-black">
        <h3>Feature Flags</h3>
        <FeatureFlagsManager />
      </div>
    </Page>
  );
}
