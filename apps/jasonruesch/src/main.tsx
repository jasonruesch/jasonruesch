import flagsmith from 'flagsmith';
import { FlagsmithProvider } from 'flagsmith/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import App from './app/app';

const flagsmithEnvironmentId = import.meta.env.VITE_FLAGSMITH_ENVIRONMENT_ID;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convert(m: any) {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader,
    action: clientAction,
    Component,
  };
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        lazy: () => import('./routes/home').then(convert),
      },
      {
        path: 'about',
        lazy: () => import('./routes/about').then(convert),
      },
      {
        path: 'admin',
        lazy: () => import('./routes/admin').then(convert),
      },
      {
        path: 'articles',
        lazy: () => import('./routes/articles').then(convert),
      },
      {
        path: 'blank',
        lazy: () => import('./routes/blank').then(convert),
      },
      {
        path: 'built-with',
        lazy: () => import('./routes/built-with').then(convert),
      },
      {
        path: 'changelog',
        lazy: () => import('./routes/changelog').then(convert),
      },
      {
        path: 'contact',
        lazy: () => import('./routes/contact').then(convert),
      },
      {
        path: 'easter-egg/:id',
        lazy: () => import('./routes/easter-egg').then(convert),
      },
      {
        path: 'login',
        lazy: () => import('./routes/login').then(convert),
      },
      {
        path: 'logout',
        lazy: () => import('./routes/logout').then(convert),
      },
      {
        path: 'privacy',
        lazy: () => import('./routes/privacy').then(convert),
      },
      {
        path: 'projects',
        lazy: () => import('./routes/projects').then(convert),
      },
      {
        path: 'transparent',
        lazy: () => import('./routes/transparent').then(convert),
      },
      {
        path: 'uses',
        lazy: () => import('./routes/uses').then(convert),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <FlagsmithProvider
      {...(flagsmithEnvironmentId
        ? { options: { environmentID: flagsmithEnvironmentId } }
        : {})}
      flagsmith={flagsmith}
    >
      <RouterProvider router={router} />
    </FlagsmithProvider>
  </StrictMode>,
);
