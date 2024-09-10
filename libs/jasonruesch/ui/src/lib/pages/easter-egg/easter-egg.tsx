import { Navigate, useParams } from 'react-router-dom';

import { Page } from '../../components';
import { easterEggId, easterEggImage } from '../../utils';

export function EasterEgg() {
  const { uid } = useParams<{ uid: string }>();
  if (uid !== easterEggId) {
    return <Navigate to="/" replace />;
  }

  return (
    <Page
      transparent
      contentClassName="flex flex-col items-center justify-center max-w-lg text-center sm:max-w-[var(--breakpoint-sm)] lg:max-w-[var(--breakpoint-lg)] mx-auto"
    >
      <img src={easterEggImage} alt="Easter Egg" className="h-full max-h-80" />
    </Page>
  );
}
