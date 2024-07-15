import { Background } from './background';
import { EasterEggLink } from './easter-egg-link';
import { Header } from './header';

interface LayoutProps {
  children: React.ReactNode;
  fixedBackground?: boolean;
}

export const Layout = ({ children, fixedBackground }: LayoutProps) => {
  return (
    <>
      <Background fixed={fixedBackground} />

      <Header />

      {/* The relative position is needed to work with the background component's fixed or absolute position */}
      <main className="relative">{children}</main>

      <EasterEggLink />
    </>
  );
};
