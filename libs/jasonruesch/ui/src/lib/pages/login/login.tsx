import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginForm, Page } from '../../components';

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/');
  };

  useEffect(() => {
    const supportsTouch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!supportsTouch) emailRef.current?.focus();
  }, []);

  return (
    <Page contentClassName="flex flex-col items-center justify-center sm:max-w-[var(--breakpoint-sm)] mx-auto w-full">
      <h1 className="gradient-heading" aria-label="Sign In">
        <div className="flex items-center justify-center" aria-hidden="true">
          Sign&nbsp;
          <span className="heading-lg">In</span>
        </div>
      </h1>

      <div className="mt-4 w-full rounded-lg bg-white/50 p-4 ring-1 ring-neutral-200 backdrop-blur-sm dark:bg-neutral-950/50 dark:ring-black">
        <div className="mt-2 space-y-2 py-3 px-4">
          <LoginForm emailRef={emailRef} onSubmit={handleSubmit} />
        </div>
      </div>
    </Page>
  );
}
