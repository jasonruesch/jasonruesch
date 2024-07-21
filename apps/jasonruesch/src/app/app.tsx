import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

import {
  AppRoutes,
  FeatureFlagsContext,
  Layout,
  useFeatureFlags,
  useNavigateEvents,
  WillNavigateContext,
} from '@jasonruesch/jasonruesch-ui';

export function App() {
  const willNavigateValue = useNavigateEvents();
  const [flags, setFlags] = useFeatureFlags();
  const location = useLocation();

  const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;
  useEffect(() => {
    if (measurementId) ReactGA.initialize(measurementId);
  }, [measurementId]);

  return (
    <WillNavigateContext value={willNavigateValue}>
      <FeatureFlagsContext value={[flags, setFlags]}>
        <Layout>
          <AnimatePresence
            initial={false}
            onExitComplete={() => window.scrollTo({ top: 0 })}
          >
            <AppRoutes location={location} key={location.pathname} />
          </AnimatePresence>
        </Layout>
      </FeatureFlagsContext>
    </WillNavigateContext>
  );
}

export default App;
