import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useSessionStorage } from '../hooks';
import splashDark from './assets/logo-dark.svg';
import splashLight from './assets/logo-light.svg';

export type SplashScreenProps = {
  ref?: React.RefObject<HTMLDivElement>;
};

export const SplashScreen = ({ ref }: SplashScreenProps) => {
  const isDarkScheme = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const [isSplashVisible, setIsSplashVisible] = useSessionStorage(
    'splash-viewed',
    isStandalone,
  );

  useEffect(() => {
    if (isStandalone) {
      // Hide the splash screen after 2.3 seconds
      const timer = setTimeout(() => {
        setIsSplashVisible(false);
      }, 2300);

      return () => clearTimeout(timer);
    }
  }, [isStandalone, setIsSplashVisible]);

  return (
    <Transition show={isSplashVisible}>
      <div
        ref={ref}
        className={clsx(
          'fixed inset-0 z-[100] grid h-dvh place-items-center bg-zinc-50 p-10',
          'transition ease-out data-[leave]:opacity-0 data-[leave]:duration-700 dark:bg-zinc-950',
        )}
      >
        <img
          src={isDarkScheme ? splashDark : splashLight}
          alt="Splash Screen"
          className="h-full max-h-[calc(100dvh-80px)] md:max-h-[calc(50dvh-80px)]"
        />
      </div>
    </Transition>
  );
};
