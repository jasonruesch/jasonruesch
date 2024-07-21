import { useEffect, useState } from 'react';

import { useActionKey } from '../hooks';
import { Background } from './background';
import { EasterEggLink } from './easter-egg-link';
import FlagsManager from './flags-manager';
import { FlagsManagerButton } from './flags-manager-button';
import { Header } from './header';

interface LayoutProps {
  children: React.ReactNode;
  fixedBackground?: boolean;
}

export const Layout = ({ children, fixedBackground }: LayoutProps) => {
  const [managerOpen, setManagerOpen] = useState(false);
  const { ctrlKey, metaKey } = useActionKey();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl|Command + Shift + F
      if (
        ((ctrlKey && event.ctrlKey) || (metaKey && event.metaKey)) &&
        event.key === 'k'
      ) {
        event.preventDefault();

        setManagerOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ctrlKey, metaKey]);

  return (
    <>
      <Background fixed={fixedBackground} />

      <Header />

      {/* The relative position is needed to work with the background component's fixed or absolute position */}
      <main className="relative">{children}</main>

      <EasterEggLink />

      <FlagsManagerButton onClick={() => setManagerOpen(true)} />
      <FlagsManager
        open={managerOpen}
        onClose={(open) => setManagerOpen(open)}
      />
    </>
  );
};
