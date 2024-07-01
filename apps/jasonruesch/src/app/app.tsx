import ReactGA from 'react-ga4';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '../components';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Home } from './home/home';

export function App() {
  const isProduction = import.meta.env.MODE === 'production';
  if (isProduction) {
    const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;
    ReactGA.initialize(measurementId);
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
