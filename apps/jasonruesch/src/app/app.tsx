import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Layout, Page, useNavigateEvents, WillNavigateContext } from '../lib';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { EasterEgg } from './easter-egg/easter-egg';
import { Home } from './home/home';
import Privacy from './privacy/privacy';
import { Transparent } from './transparent/transparent';

export function App() {
  const willNavigateValue = useNavigateEvents();
  const location = useLocation();
  const { pathname } = location;
  const fixedBackground = pathname === '/blank';

  const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;
  useEffect(() => {
    if (measurementId) ReactGA.initialize(measurementId);
  }, [measurementId]);

  return (
    <WillNavigateContext value={willNavigateValue}>
      <Layout fixedBackground={fixedBackground}>
        <AnimatePresence
          initial={false}
          onExitComplete={() => window.scrollTo({ top: 0 })}
        >
          <Routes location={location} key={pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blank" element={<Page />} />
            <Route path="/transparent" element={<Transparent />} />
            <Route path="easter-egg/:uid" element={<EasterEgg />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </WillNavigateContext>
  );
}

export default App;
