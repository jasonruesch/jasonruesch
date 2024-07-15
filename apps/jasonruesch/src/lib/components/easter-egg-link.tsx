import { easterEggId } from '../utils';
import { PageNavLink } from './page-nav-link';

export const EasterEggLink = () => {
  return (
    <div className="mr-safe mb-safe fixed right-0 bottom-0 z-20 h-12 w-12 rounded-full">
      <PageNavLink
        to={`/easter-egg/${easterEggId}`}
        className="flex h-full w-full items-center justify-center"
      >
        <span className="sr-only">You found an easter egg! Click to view.</span>
      </PageNavLink>
    </div>
  );
};
