import { Page } from '../../components';

export function Articles() {
  return (
    <Page contentClassName="flex flex-col items-start">
      <h1 className="gradient-heading" aria-label="Articles">
        <div className="flex items-center justify-center">
          <span className="heading-lg">Articles</span>
        </div>
      </h1>
    </Page>
  );
}
