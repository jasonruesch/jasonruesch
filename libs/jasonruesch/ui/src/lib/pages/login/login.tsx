import { use, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@headlessui/react';
import { twJoin } from 'tailwind-merge';
import { Page } from '../../components';
import { AuthContext } from '../../hooks';

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const development = import.meta.env.MODE === 'development';
  const [email, setEmail] = useState(
    development ? import.meta.env.VITE_AUTH_EMAIL : '',
  );
  const [password, setPassword] = useState(
    development ? import.meta.env.VITE_AUTH_PASSWORD : '',
  );
  const [error, setError] = useState<string | null>(null);
  const { login } = use(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      login(email, password);
      navigate('/');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      setError(message);
    }
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

      <form onSubmit={handleFormSubmit} className="w-full space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-neutral-900 ring-1 shadow-sm ring-neutral-300 ring-inset placeholder:text-neutral-400 focus:ring-2 focus:ring-cyan-600 focus:ring-inset focus-visible:outline-none sm:text-sm sm:leading-6 dark:text-white dark:focus:ring-violet-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-neutral-900 ring-1 shadow-sm ring-neutral-300 ring-inset placeholder:text-neutral-400 focus:ring-2 focus:ring-cyan-600 focus:ring-inset focus-visible:outline-none sm:text-sm sm:leading-6 dark:text-white dark:focus:ring-violet-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
          <Button
            type="submit"
            className={twJoin(
              'w-full sm:w-auto',
              'inline-flex items-center justify-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10',
              'bg-cyan-700 text-white dark:bg-violet-600',
              'text-white data-[hover]:bg-cyan-600 dark:data-[hover]:bg-violet-500',
              'data-[active]:bg-cyan-700 dark:data-[active]:bg-violet-600',
              'focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white',
              'data-[disabled]:cursor-not-allowed data-[disabled]:bg-neutral-300 data-[disabled]:text-neutral-400 data-[disabled]:shadow-none',
            )}
          >
            Sign in
          </Button>
          <span className="text-red-500 sm:order-first">{error}</span>
        </div>
      </form>
    </Page>
  );
}
