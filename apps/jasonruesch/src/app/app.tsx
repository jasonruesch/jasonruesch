import { Layout } from '@jasonruesch/jasonruesch-ui';
import { ScrollRestoration } from 'react-router-dom';

export function App() {
  return (
    <>
      <Layout />
      <ScrollRestoration />

      <div className="hidden">Test Preview Deployments to Vercel</div>
    </>
  );
}

export default App;
