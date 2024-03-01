import { Layout } from '@jasonruesch/jasonruesch-ui';
import { ScrollRestoration } from 'react-router-dom';

export function App() {
  return (
    <>
      <Layout />
      <ScrollRestoration />

      <div className="hidden">Setting up new release workflow</div>
    </>
  );
}

export default App;
