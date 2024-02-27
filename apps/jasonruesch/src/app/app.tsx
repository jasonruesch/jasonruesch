import { DependencyInjectionProvider } from '@jasonruesch/data-access-react';
import { buildInjector } from '@jasonruesch/jasonruesch-data-access';
import { Layout } from '@jasonruesch/jasonruesch-ui';
import { ScrollRestoration } from 'react-router-dom';

export function App() {
  return (
    <DependencyInjectionProvider injector={buildInjector()}>
      <Layout />
      <ScrollRestoration />
    </DependencyInjectionProvider>
  );
}

export default App;
