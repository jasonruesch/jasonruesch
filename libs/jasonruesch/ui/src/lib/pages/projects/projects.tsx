import { Page } from '../../components';

export function Projects() {
  return (
    <Page contentClassName="flex flex-col items-center justify-center max-w-lg sm:max-w-[var(--breakpoint-sm)] lg:max-w-[var(--breakpoint-lg)] mx-auto">
      <h1 className="gradient-heading" aria-label="Projects">
        <div className="flex items-center justify-center">
          <span className="heading-lg">Projects</span>
        </div>
      </h1>
    </Page>
  );
}
