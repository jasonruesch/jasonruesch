import { Page } from '../../components';

export function Uses() {
  return (
    <Page contentClassName="flex flex-col items-center justify-center max-w-lg sm:max-w-[var(--breakpoint-sm)] lg:max-w-[var(--breakpoint-lg)] mx-auto">
      <h1 className="gradient-heading" aria-label="Uses">
        <div className="flex items-center justify-center">
          <span className="heading-lg">Uses</span>
        </div>
      </h1>
    </Page>
  );
}
