import { Background } from './background';
import { Header } from './header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Background fixed={false} />

      <Header />

      {/* The relative position is needed to work with the background component's fixed or absolute position */}
      <main className="relative">{children}</main>
    </>
  );
};
