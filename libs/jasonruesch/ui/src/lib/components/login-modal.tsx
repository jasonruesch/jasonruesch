import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { useActionKey } from '../hooks';
import { LoginButton } from './login-button';

import styles from './background-gradients.module.css';
import { LoginForm } from './login-form';

export function LoginModal() {
  const [open, setOpen] = useState(false);
  const { ctrlKey, metaKey } = useActionKey();
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    setOpen(false);
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
              <LoginForm emailRef={emailRef} onSubmit={handleSubmit} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <LoginButton onClick={() => setOpen(true)} />
    </>
  );
}
