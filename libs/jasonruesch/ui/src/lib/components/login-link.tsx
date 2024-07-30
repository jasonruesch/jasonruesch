import { PageNavLink } from './page-nav-link';

export const LoginLink = () => {
  return (
    <div className="mb-safe fixed bottom-1 left-1 z-20 h-12 w-12 rounded-full">
      <PageNavLink
        to="/login"
        className="block size-full cursor-pointer rounded-full"
      >
        <span className="sr-only">Sign in</span>
      </PageNavLink>
    </div>
  );
};
