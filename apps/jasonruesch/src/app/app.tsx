import ReactGA from 'react-ga4';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Layout } from '../components';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Home } from './home/home';

export function App() {
  const { pathname } = useLocation();
  const fixedBackground = pathname === '/blank';

  const isProduction = import.meta.env.MODE === 'production';
  if (isProduction) {
    const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;
    ReactGA.initialize(measurementId);
  }

  return (
    <Layout fixedBackground={fixedBackground}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/blank"
          element={
            <>
              {/* This element should not use the Page component, allowing the background to show */}
              <div
                dangerouslySetInnerHTML={{
                  __html: '<!-- This is a blank page -->',
                }}
              ></div>
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
