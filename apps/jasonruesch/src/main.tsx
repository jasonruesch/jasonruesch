import flagsmith from 'flagsmith';
import { FlagsmithProvider } from 'flagsmith/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import App from './app/app';

const flagsmithEnvironmentId = import.meta.env.VITE_FLAGSMITH_ENVIRONMENT_ID;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/*"
      element={<App />}
      hydrateFallbackElement={<div>Hydrating...</div>}
    />,
  ),
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

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
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </FlagsmithProvider>
  </StrictMode>,
);
