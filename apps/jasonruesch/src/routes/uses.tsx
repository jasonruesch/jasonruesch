import { Page } from '../../../../libs/jasonruesch/ui/src/lib/components';

export default function Uses() {
  return (
    <Page contentClassName="flex flex-col items-center justify-center lg:max-w-[var(--breakpoint-lg)] mx-auto">
      <h1 className="gradient-heading" aria-label="Uses">
        <div className="flex items-center justify-center" aria-hidden="true">
          <span className="heading-lg">Uses</span>
        </div>
      </h1>
    </Page>
  );
}
