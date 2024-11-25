import { useCallback } from 'react';

import { Button } from '@headlessui/react';
import { twJoin } from 'tailwind-merge';
import { Page } from '../../../../libs/jasonruesch/ui/src/lib/components';

export default function Contact() {
  const emailRecipient = import.meta.env.VITE_EMAIL_RECIPIENT;
  const sendEmail = useCallback(() => {
    if (emailRecipient) window.location.href = `mailto:${emailRecipient}`;
  }, [emailRecipient]);

  return (
    <Page contentClassName="flex flex-col items-center justify-center max-w-lg text-center sm:max-w-[var(--breakpoint-sm)] mx-auto">
      <h1 className="gradient-heading" aria-label="Connect with Me">
        <div className="flex items-center justify-center" aria-hidden="true">
          <span className="heading-lg">Connect</span>
        </div>
        <div className="flex items-center justify-center" aria-hidden="true">
          with&nbsp;
          <span className="heading-lg">Me</span>
        </div>
      </h1>
      <p>
        Feel free to connect with me to discuss all things frontend development,
        share recommendations for must-watch shows, or exchange thoughts on the
        latest gaming adventures. Let's explore the digital world together!
      </p>
      {emailRecipient ? (
        <div className="mb-4 flex w-full items-center justify-center gap-4">
          <Button
            className={twJoin(
              'w-full sm:w-auto',
              'inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-inner shadow-white/10',
              'bg-cyan-700 text-white dark:bg-violet-600',
              'text-white data-[hover]:bg-cyan-600 dark:data-[hover]:bg-violet-500',
              'data-[active]:bg-cyan-700 dark:data-[active]:bg-violet-600',
              'focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white',
              'data-[disabled]:cursor-not-allowed data-[disabled]:bg-neutral-300 data-[disabled]:text-neutral-400 data-[disabled]:shadow-none',
            )}
            onClick={sendEmail}
          >
            Send me an Email
          </Button>
        </div>
      ) : null}
      <div className="flex items-center justify-center gap-4">
        <a
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1"
          href="https://github.com/jasonruesch"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
            className="size-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
          </svg>
          <span>GitHub</span>
        </a>
        <a
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1"
          href="https://www.linkedin.com/in/jasonruesch/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="size-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M 8.6425781 4 C 7.1835781 4 6 5.181625 6 6.640625 C 6 8.099625 7.182625 9.3085938 8.640625 9.3085938 C 10.098625 9.3085938 11.283203 8.099625 11.283203 6.640625 C 11.283203 5.182625 10.101578 4 8.6425781 4 z M 21.535156 11 C 19.316156 11 18.0465 12.160453 17.4375 13.314453 L 17.373047 13.314453 L 17.373047 11.310547 L 13 11.310547 L 13 26 L 17.556641 26 L 17.556641 18.728516 C 17.556641 16.812516 17.701266 14.960938 20.072266 14.960938 C 22.409266 14.960937 22.443359 17.145609 22.443359 18.849609 L 22.443359 26 L 26.994141 26 L 27 26 L 27 17.931641 C 27 13.983641 26.151156 11 21.535156 11 z M 6.3632812 11.310547 L 6.3632812 26 L 10.923828 26 L 10.923828 11.310547 L 6.3632812 11.310547 z" />
          </svg>
          <span>LinkedIn</span>
        </a>
      </div>
    </Page>
  );
}
