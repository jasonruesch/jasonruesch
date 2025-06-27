import clsx from 'clsx';
import ReactGA from 'react-ga4';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinksFunction,
  type MetaFunction,
} from 'react-router';

import { Footer, Header } from '@jasonruesch/ui';

import '../styles.css';

export const meta: MetaFunction = () => [
  {
    title: 'Jason Ruesch',
  },
  {
    name: 'description',
    content: 'Personal website',
  },
  {
    name: 'theme-color',
    content: '#171717',
  },
  {
    name: 'mobile-web-app-capable',
    content: 'yes',
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'black-translucent',
  },
];

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  {
    rel: 'icon',
    href: '/favicon.ico',
    sizes: '48x48',
  },
  {
    rel: 'icon',
    href: '/logo.svg',
    sizes: 'any',
    type: 'image/svg+xml',
  },
  {
    rel: 'apple-touch-icon',
    href: '/ios/180.png',
  },
  {
    rel: 'manifest',
    href: '/manifest.webmanifest',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;
  if (measurementId) ReactGA.initialize(measurementId);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <Meta />
        <Links />

        <style>{`
          /* Provide colors here to avoid FOUC */
          html,
          body {
            background-color: #fafafa;
            color: #0b0809;
          }

          @media screen and (prefers-color-scheme: dark) {
            html,
            body {
              background-color: #0b0809;
              color: #fafafa;
            }
          }

          html,
          body,
          #root {
            min-height: 100dvh;
          }
        `}</style>
      </head>
      <body className="bg-zinc-50 antialiased dark:bg-zinc-950">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 flex h-dvh justify-center',
          'sm:pr-[calc(env(safe-area-inset-right)+(--spacing(8)))] sm:pl-[calc(env(safe-area-inset-left)+(--spacing(8)))]',
        )}
      >
        <div
          className={clsx(
            'flex w-full',
            'max-w-[calc(var(--container-7xl)-env(safe-area-inset-right)-env(safe-area-inset-left))]',
            'lg:pr-[calc(env(safe-area-inset-right)+(--spacing(8)))] lg:pl-[calc(env(safe-area-inset-left)+(--spacing(8)))]',
          )}
        >
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>

      <div
        className={clsx(
          'relative flex min-h-dvh flex-col',
          'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]',
        )}
      >
        <Header />
        <main id="main" className="grow">
          <Outlet />
        </main>
        <Footer version={import.meta.env.PACKAGE_VERSION} />
      </div>
    </>
  );
}
