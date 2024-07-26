import { EasterEggLink } from './easter-egg-link';
import { Header } from './header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div id="background"></div>

      <Header />

      <main>
        {/* The relative position is needed to work with the background component's fixed or absolute position */}
        <div className="relative">{children}</div>

        <EasterEggLink />

        {/* <FeatureFlagsManager /> */}
      </main>
    </>
  );
};
