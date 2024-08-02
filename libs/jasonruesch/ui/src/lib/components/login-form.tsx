import { Button, Description, Field, Input, Label } from '@headlessui/react';
import { use, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { AuthContext } from '../hooks';

export interface LoginFormProps {
  emailRef?: React.RefObject<HTMLInputElement | null>;
  onSubmit?: () => void;
}

export const LoginForm = ({ emailRef, onSubmit }: LoginFormProps) => {
  const development = import.meta.env.MODE === 'development';
  const [email, setEmail] = useState(
    development ? import.meta.env.VITE_AUTH_EMAIL : '',
  );
  const [password, setPassword] = useState(
    development ? import.meta.env.VITE_AUTH_PASSWORD : '',
  );
  const [error, setError] = useState<string | null>(null);
  const { login } = use(AuthContext);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      login(email, password);
      onSubmit?.();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      setError(message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full space-y-2">
      <Field>
        <Label className="text-sm/6 font-medium">Email</Label>
        <Description className="mb-0 text-sm/6 text-neutral-950/50 dark:text-white/50">
          Your email address is your username.
        </Description>
        <Input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          className={twJoin(
            'mt-2 block w-full rounded-lg border-none bg-neutral-950/5 py-1.5 px-3 text-sm/6 dark:bg-white/5',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-neutral-950/25 dark:data-[focus]:outline-white/25',
          )}
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Field>
      <Field>
        <Label className="text-sm/6 font-medium">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          className={twJoin(
            'mt-2 block w-full rounded-lg border-none bg-neutral-950/5 py-1.5 px-3 text-sm/6 dark:bg-white/5',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-neutral-950/25 dark:data-[focus]:outline-white/25',
          )}
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>

      <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
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
  );
};
