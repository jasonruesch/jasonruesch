import ReactGA from 'react-ga4';
import { Route, Routes } from 'react-router-dom';
import { Header } from '../components';
import { About } from './about/about';
import { Home } from './home/home';

export function App() {
  const isProduction = import.meta.env.MODE === 'production';
  if (isProduction) {
    const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;
    ReactGA.initialize(measurementId);
  }

  return (
    <>
      <Header />

      <main className="min-h-dvh flex flex-col px-4 py-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
