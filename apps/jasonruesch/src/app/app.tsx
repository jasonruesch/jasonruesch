import flagsmith from 'flagsmith';
import { FlagsmithProvider } from 'flagsmith/react';
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
  const flagsmithEnvironmentId = import.meta.env.VITE_FLAGSMITH_ENVIRONMENT_ID;

  const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;
  useEffect(() => {
    if (measurementId) ReactGA.initialize(measurementId);
  }, [measurementId]);

  return (
    <FlagsmithProvider
      {...(flagsmithEnvironmentId
        ? { options: { environmentID: flagsmithEnvironmentId } }
        : {})}
      flagsmith={flagsmith}
    >
      <FeatureFlagsContext value={[flags, setFlags]}>
        <WillNavigateContext value={willNavigateValue}>
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
    </FlagsmithProvider>
  );
}

export default App;
