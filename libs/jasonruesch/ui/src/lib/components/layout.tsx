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

      {/* The relative position is needed to work with the background component's fixed or absolute position */}
      <main className="relative">{children}</main>

      <EasterEggLink />

      {/* <FeatureFlagsManager /> */}
    </>
  );
};
