## [Google Analytics](https://analytics.google.com/)

```bash
npm install react-ga4
```

Create [apps/jasonruesch/.env.example](../../apps/jasonruesch/.env.example) with the following:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

If desired, copy `.env.example` to `.env.local` and replace `G-XXXXXXXXXX` with your Google Analytics Measurement ID.

```bash
cp apps/jasonruesch/.env.example apps/jasonruesch/.env.local
```

Update [apps/jasonruesch/app/root.tsx](../../apps/jasonruesch/app/root.tsx) with the following:

```typescript
import ReactGA from 'react-ga4';

export function Layout({ children }: { children: React.ReactNode }) {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (measurementId) ReactGA.initialize(measurementId);
  ...
}
```

Create [scripts/cp-dep.sh](../../scripts/cp-dep.sh) with the following to copy a dependency from `package.json` to another file:

```bash
#!/usr/bin/env bash

pkg="$1"
source="$2"
target="$3"
section="${4:-dependencies}" # or devDependencies

version=$(jq -r --arg pkg "$pkg" '.dependencies[$pkg] // .devDependencies[$pkg]' "$source")

if [ "$version" != "null" ]; then
  jq --arg pkg "$pkg" --arg version "$version" \
      ".$section[\$pkg] = \$version" "$target" > "$target.tmp" && mv "$target.tmp" "$target"
  echo "✅ Updated $pkg@$version in $target"
else
  echo "❌ Package $pkg not found in $source"
fi
```

Run the script to copy the `react-ga4` dependency from `package.json` to `apps/jasonruesch/package.json`:

```bash
bash scripts/cp-dep.sh react-ga4 package.json apps/jasonruesch/package.json
```
