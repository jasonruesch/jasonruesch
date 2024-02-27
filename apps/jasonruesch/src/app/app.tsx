import { Layout } from '@jasonruesch/jasonruesch-ui';
import { ScrollRestoration } from 'react-router-dom';

export function App() {
  return (
    <>
      <Layout />
      <ScrollRestoration />

      <div className="text-test hidden">Test color: pink</div>
    </>
  );
}

export default App;
