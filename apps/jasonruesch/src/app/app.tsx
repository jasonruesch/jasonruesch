import ReactGA from 'react-ga4';
import { Link, Route, Routes } from 'react-router-dom';
import { About } from './about/about';
import { Home } from './home/home';

export function App() {
  const isProduction = import.meta.env.MODE === 'production';
  if (!isProduction) {
    const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;
    ReactGA.initialize(measurementId);
  }

  return (
    <div className="min-h-dvh grid place-content-center p-4">
      <nav className="flex justify-center space-x-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-blue-600 hover:underline">
          About
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
