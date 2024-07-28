import { useLocation } from 'react-router-dom';

import { EasterEggLink } from './easter-egg-link';
import FeatureFlagsManager from './feature-flags-manager.modal';
import { Header } from './header';

import { twJoin } from 'tailwind-merge';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  return (
    <>
      <div id="background"></div>

      <div id="skip">
        <a
          href={`${pathname}#content`}
          className={twJoin(
            'absolute z-30 block py-1 px-2',
            'top-[-999px] left-[-999px]',
            'border-2 border-red-500 bg-yellow-200 text-black',
            'focus:top-0 focus:left-0 focus-visible:outline-none',
          )}
        >
          Skip Content
        </a>
      </div>

      <Header />

      <main id="content">
        <FeatureFlagsManager />

        {/* The relative position is needed to work with the background component's fixed or absolute position */}
        <div className="relative">{children}</div>

        <EasterEggLink />
      </main>
    </>
  );
};
