## [Google Analytics](https://analytics.google.com/)

```bash
npm install react-ga4
```

Create [apps/jasonruesch/.env.example](../../apps/jasonruesch/.env.example) with the following:

```env
VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID='G-XXXXXXXXXX'
```

If desired, copy `.env.example` to `.env.local` and replace `G-XXXXXXXXXX` with your Google Analytics Measurement ID.

```bash
cp apps/jasonruesch/.env.example apps/jasonruesch/.env.local
```

Update [apps/jasonruesch/app/root.tsx](../../apps/jasonruesch/app/root.tsx) with the following:

```jsx
import ReactGA from 'react-ga4';
...
export default function App() {
  const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;
  if (measurementId) ReactGA.initialize(measurementId);
  ...
}
```

Run the `cp-dep.sh` script to copy the `react-ga4` dependency from `package.json` to `apps/jasonruesch/package.json`:

```bash
bash scripts/cp-dep.sh react-ga4 package.json apps/jasonruesch/package.json
```
