import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router';

import {
  AppRoutes,
  AuthContext,
  FeatureFlagsContext,
  Layout,
  useAuth,
  useFeatureFlags,
  useNavigateEvents,
  WillNavigateContext,
} from '@jasonruesch/jasonruesch-ui';

export function App() {
  const location = useLocation();
  const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;

  useEffect(() => {
    if (measurementId) ReactGA.initialize(measurementId);
  }, [measurementId]);

  return (
    <AuthContext value={useAuth()}>
      <FeatureFlagsContext value={useFeatureFlags()}>
        <WillNavigateContext value={useNavigateEvents()}>
          <Layout>
            <AnimatePresence
              initial={false}
              onExitComplete={() => window.scrollTo({ top: 0 })}
            >
              <AppRoutes location={location} key={location.pathname} />
            </AnimatePresence>
          </Layout>
        </WillNavigateContext>
      </FeatureFlagsContext>
    </AuthContext>
  );
}

export default App;
