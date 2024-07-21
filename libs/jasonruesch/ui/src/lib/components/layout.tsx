import { useEffect, useState } from 'react';

import { useActionKey } from '../hooks';
import { EasterEggLink } from './easter-egg-link';
import FeatureFlagsManager from './feature-flags-manager';
import { FeatureFlagsManagerButton } from './feature-flags-manager-button';
import { Header } from './header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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
      <div id="background"></div>

      <Header />

      {/* The relative position is needed to work with the background component's fixed or absolute position */}
      <main className="relative">{children}</main>

      <EasterEggLink />

      <FeatureFlagsManagerButton onClick={() => setManagerOpen(true)} />
      <FeatureFlagsManager
        open={managerOpen}
        onClose={(open) => setManagerOpen(open)}
      />
    </>
  );
};
