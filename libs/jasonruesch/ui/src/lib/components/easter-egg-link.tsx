import { easterEggId } from '../utils';
import { PageNavLink } from './page-nav-link';

export const EasterEggLink = () => {
  return (
    <div className="mb-safe fixed right-1 bottom-1 z-20 h-12 w-12 rounded-full">
      <PageNavLink
        to={`/easter-egg/${easterEggId}`}
        className="block size-full cursor-pointer rounded-full"
      >
        <span className="sr-only">You found an easter egg!</span>
      </PageNavLink>
    </div>
  );
};
