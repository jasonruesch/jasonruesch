import { Page } from '@jasonruesch/jasonruesch-ui';

export function Home() {
  return (
    <Page contentClassName="flex flex-col items-center justify-center max-w-lg text-center sm:max-w-[var(--breakpoint-sm)] lg:max-w-[var(--breakpoint-lg)] mx-auto">
      <h1
        className="gradient-heading"
        aria-label="I'm Jason Ruesch, a Senior Frontend Software Engineer and Architect"
      >
        <div className="flex items-center justify-center">
          I'm&nbsp;
          <span className="heading-lg">Jason Ruesch</span>
        </div>
        <div className="flex items-center justify-center">
          a&nbsp;
          <span className="heading-lg">Senior&nbsp;</span>
          Frontend
        </div>
        <div className="flex items-center justify-center">
          Software&nbsp;
          <span className="heading-lg">Engineer</span>
        </div>
        <div className="flex items-center justify-center">
          and&nbsp;
          <span className="heading-lg">Architect</span>
        </div>
      </h1>
      <p>
        This is where I share my passion for creating exceptional user
        experiences through web development. Whether you're here for code or
        just to connect, I'm thrilled to have you.
      </p>
    </Page>
  );
}
