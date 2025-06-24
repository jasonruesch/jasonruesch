import ReactGA from 'react-ga4';

import NxWelcome from './nx-welcome';

export function App() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (measurementId) ReactGA.initialize(measurementId);

  return (
    <div>
      <NxWelcome title="@jasonruesch/jasonruesch" />
    </div>
  );
}

export default App;
