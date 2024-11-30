import { AnimatePresence } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useLocation, useOutlet } from 'react-router';

import {
  AuthContext,
  FeatureFlagsContext,
  Layout,
  useAuth,
  useFeatureFlags,
  useNavigateEvents,
  WillNavigateContext,
} from '@jasonruesch/jasonruesch-ui';

export const AnimatedOutlet = ({ context }: { context?: unknown }) => {
  const o = useOutlet(context);
  const [outlet] = useState(o);

  return outlet;
};

export function App() {
  const { pathname } = useLocation();
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
              <Fragment key={pathname}>
                <AnimatedOutlet />
              </Fragment>
            </AnimatePresence>
          </Layout>
        </WillNavigateContext>
      </FeatureFlagsContext>
    </AuthContext>
  );
}

export default App;
