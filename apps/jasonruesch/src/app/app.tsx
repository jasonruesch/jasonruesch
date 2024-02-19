import { Layout } from '@jasonruesch/jasonruesch-ui';
import { ScrollRestoration } from 'react-router-dom';

export function App() {
  return (
    <>
      <Layout />
      <ScrollRestoration />

      <div className="hidden text-test">Test color: violet</div>
    </>
  );
}

export default App;
