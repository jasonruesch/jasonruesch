import { useState } from 'react';

import { Page } from '../../components';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(username, password);
  };

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
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              autoFocus
              className="block w-full rounded-md border-0 py-1.5 px-2 text-neutral-900 ring-1 shadow-sm ring-neutral-300 ring-inset placeholder:text-neutral-400 focus:ring-2 focus:ring-cyan-600 focus:ring-inset sm:text-sm sm:leading-6 dark:text-white dark:focus:ring-violet-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              className="block w-full rounded-md border-0 py-1.5 px-2 text-neutral-900 ring-1 shadow-sm ring-neutral-300 ring-inset placeholder:text-neutral-400 focus:ring-2 focus:ring-cyan-600 focus:ring-inset sm:text-sm sm:leading-6 dark:text-white dark:focus:ring-violet-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button type="submit" className="btn-primary w-full sm:w-auto">
            Sign in
          </button>
        </div>
      </form>
    </Page>
  );
}
