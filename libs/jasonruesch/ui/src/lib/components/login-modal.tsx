import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { use, useEffect, useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { AuthContext, useActionKey } from '../hooks';
import { LoginButton } from './login-button';

import styles from './background-gradients.module.css';

export function LoginModal() {
  const [open, setOpen] = useState(false);
  const { ctrlKey, metaKey } = useActionKey();
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      login(email, password);
      setOpen(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      setError(message);
    }
  };

  useEffect(() => {
    if (open) {
      const supportsTouch =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (!supportsTouch) setTimeout(() => emailRef.current?.focus(), 400); // Delay 300ms transition duration used below + 100ms
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl|Command + Shift + F
      if (
        ((ctrlKey && event.ctrlKey) || (metaKey && event.metaKey)) &&
        event.key === 'k'
      ) {
        event.preventDefault();

        setOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ctrlKey, metaKey]);

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-40">
        <DialogBackdrop
          transition
          className={twJoin(
            'fixed inset-0 bg-neutral-200/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in dark:bg-neutral-700/75',
            styles['background-top-transparent'],
          )}
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto pt-20 px-4 pb-4 lg:pt-32 lg:px-20 lg:pb-20">
          <DialogPanel
            transition
            className="relative mx-auto w-full max-w-lg transform overflow-hidden rounded-lg bg-white pt-5 pb-4 text-left shadow-xl transition-all data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in dark:bg-neutral-950"
          >
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md bg-white text-neutral-400 hover:text-neutral-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none dark:bg-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-400 dark:focus:ring-violet-400 dark:focus:ring-offset-neutral-950"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="px-4 sm:flex sm:items-start">
              <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:size-10 dark:bg-violet-600">
                <UserIcon
                  aria-hidden="true"
                  className="size-6 text-cyan-600 dark:text-violet-100"
                />
              </div>
              <div className="mt-3 w-full sm:mt-0 sm:ml-4">
                <DialogTitle
                  as="h3"
                  className="text-center text-neutral-900 sm:text-left dark:text-white"
                >
                  Sign In
                </DialogTitle>
              </div>
            </div>

            <div className="mt-2 transform-gpu scroll-py-3 space-y-2 overflow-y-auto py-3 px-4 sm:ml-14">
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
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <LoginButton onClick={() => setOpen(true)} />
    </>
  );
}
