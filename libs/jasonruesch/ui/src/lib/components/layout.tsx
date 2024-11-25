import { use } from 'react';
import { useLocation } from 'react-router';
import { twJoin } from 'tailwind-merge';

import { AuthContext } from '../hooks';
import { EasterEggLink } from './easter-egg-link';
import { FeatureFlagsManagerModal } from './feature-flags-manager-modal';
import { Header } from './header';
import { LoginModal } from './login-modal';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const { authenticated } = use(AuthContext);

  return (
    <>
      <div id="background"></div>

      <div id="skip">
        <a
          href={`${pathname}#content`}
          className={twJoin(
            'absolute z-30 block px-2 py-1',
            'left-[-999px] top-[-999px]',
            'border-2 border-red-500 bg-yellow-200 text-black',
            'focus:left-0 focus:top-0 focus-visible:outline-none',
          )}
        >
          Skip Content
        </a>
      </div>

      <Header />

      <main id="content">
        {/* The relative position is needed to work with the background component's fixed or absolute position */}
        <div className="relative">{children}</div>

        {authenticated ? <FeatureFlagsManagerModal /> : <LoginModal />}
        <EasterEggLink />
      </main>
    </>
  );
};
