import { Page } from '../../../../libs/jasonruesch/ui/src/lib/components';

export default function Articles() {
  return (
    <Page contentClassName="flex flex-col items-start">
      <h1 className="gradient-heading" aria-label="Articles">
        <div className="flex items-center justify-center" aria-hidden="true">
          <span className="heading-lg">Articles</span>
        </div>
      </h1>
    </Page>
  );
}
