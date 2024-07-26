import { useLocation } from 'react-router-dom';

import { EasterEggLink } from './easter-egg-link';
import { Header } from './header';

import styles from './layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  return (
    <>
      <div id="background"></div>

      <div id="skip" className={styles.skip}>
        <a href={`${pathname}#content`} className="z-30">
          Skip Content
        </a>
      </div>

      <Header />

      <main id="content">
        {/* The relative position is needed to work with the background component's fixed or absolute position */}
        <div className="relative">{children}</div>

        <EasterEggLink />

        {/* <FeatureFlagsManager /> */}
      </main>
    </>
  );
};
