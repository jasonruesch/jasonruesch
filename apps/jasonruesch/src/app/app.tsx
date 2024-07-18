import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

import {
  AppRoutes,
  Layout,
  useNavigateEvents,
  WillNavigateContext,
} from '@jasonruesch/jasonruesch-ui';

export function App() {
  const willNavigateValue = useNavigateEvents();
  const location = useLocation();
  const fixedBackground = location.pathname === '/blank';

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
          <AppRoutes location={location} key={location.pathname} />
        </AnimatePresence>
      </Layout>
    </WillNavigateContext>
  );
}

export default App;
