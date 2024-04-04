import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Page } from '../page';

export const ResumeTailwindLabs = () => {
  return (
    <Page>
      <div className="container mx-auto flex flex-1 flex-col gap-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1
              className="gradient-heading"
              aria-label="Jason Ruesch: Staff Software Engineer"
            >
              <div className="flex items-center">
                <span className="heading-lg">Jason&nbsp;</span>
                Ruesch
              </div>
              <div className="flex items-center">
                Staff&nbsp;
                <span className="heading-lg">Software</span>
              </div>
              <div className="flex items-center">
                <span className="heading-lg">Engineer</span>
              </div>
            </h1>
            <div className="mt-4 space-x-8">
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-x-2 hover:underline"
                href="https://github.com/jasonruesch"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                </svg>
                <span>GitHub</span>
              </a>
              <a
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-x-2 hover:underline"
                href="https://www.linkedin.com/in/jasonruesch/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M 8.6425781 4 C 7.1835781 4 6 5.181625 6 6.640625 C 6 8.099625 7.182625 9.3085938 8.640625 9.3085938 C 10.098625 9.3085938 11.283203 8.099625 11.283203 6.640625 C 11.283203 5.182625 10.101578 4 8.6425781 4 z M 21.535156 11 C 19.316156 11 18.0465 12.160453 17.4375 13.314453 L 17.373047 13.314453 L 17.373047 11.310547 L 13 11.310547 L 13 26 L 17.556641 26 L 17.556641 18.728516 C 17.556641 16.812516 17.701266 14.960938 20.072266 14.960938 C 22.409266 14.960937 22.443359 17.145609 22.443359 18.849609 L 22.443359 26 L 26.994141 26 L 27 26 L 27 17.931641 C 27 13.983641 26.151156 11 21.535156 11 z M 6.3632812 11.310547 L 6.3632812 26 L 10.923828 26 L 10.923828 11.310547 L 6.3632812 11.310547 z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <div>
            <img
              src="/images/jasonruesch-light-512.png"
              alt="Jason Ruesch"
              className="h-40 w-40 rounded-full shadow-lg sm:h-56 sm:w-56 lg:h-80 lg:w-80 dark:hidden dark:shadow-black"
            />
            <img
              src="/images/jasonruesch-dark-512.png"
              alt="Jason Ruesch"
              className="hidden h-40 w-40 rounded-full shadow-lg sm:h-56 sm:w-56 lg:h-80 lg:w-80 dark:block dark:shadow-black"
            />
          </div>
        </div>

        <h2>Hi Adam, Steve and the rest of the Tailwind Labs team!</h2>
        <p>
          My name is{' '}
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.linkedin.com/in/jasonruesch/"
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500"
          >
            Jason Ruesch
          </a>
          . I am a developer living in Raleigh, North Carolina.
        </p>
        <p>
          First, thank you for this opportunity to apply for a dream job like
          this! I have been working with enterprise organizations for quite some
          time now, particularly in the e-learning sector. Though I have had
          some great experiences, I am looking to make a change and work with a
          small company such as Tailwind Labs on tools that developers use and
          benefit from each and every day! And...why not apply for the best out
          there?{' '}
          <span role="img" aria-label="wink">
            😉
          </span>
        </p>
        <p>
          Throughout my software development career, I have come to truly value
          the impact of cutting-edge tools such as Tailwind CSS. Recognizing how
          awesome it is from the start, I have been a strong advocate for
          incorporating and educating others within my team about its
          capabilities. Seeing firsthand the significant improvement it brings
          to web development practices has only further solidified my admiration
          for Tailwind CSS, and the other Tailwind Lab products. I am impressed
          by the dedication and quality behind your company, and I look forward
          to playing a role in its ongoing success.
        </p>
        <p>
          Recently, I have been working closely with my company's design team to
          lead the development of a new <b>design system</b>. We make heavy use
          of the Tailwind UI recipes to base our components off of. Leveraging
          tools like Figma and Tailwind CSS, I created a custom Tailwind CSS
          configuration library that encapsulates our brand identity and design
          principles. Additionally, I led the creation of two component
          libraries for Angular and React, the latter utilizing Headless UI and
          Vite. This project not only showcases my technical proficiency, but
          also my ability to collaborate effectively across teams to deliver
          impactful solutions. Every frontend developer on our team now uses
          this design system, which has significantly improved our development
          experience, velocity and consistency.
        </p>

        <h3>Why Me?</h3>
        <p>
          What sets me apart is my passion for learning and innovation, and
          DRIVE to get things done! As the in-house expert on Tailwind CSS,
          React, and Reactive State Management at my current role, I am
          continuously staying abreast of emerging technologies and refining my
          skills. I take pride in mentoring fellow developers, fostering a
          culture of growth and collaboration within the organization. Moreover,
          I greatly improved our deployment processes by enhancing our DevOps
          practices for frontend applications and npm packages in a monorepo.
          This includes implementing independent automated versioning, release
          note and changelog generation, and deployment using GitHub Actions,
          resulting in improved efficiency and reliability.
        </p>

        <h3>Community contributions</h3>
        <p>
          I am a strong advocate for open-source software. Living in Raleigh,
          NC, I attend the local{' '}
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://allthingsopen.org/"
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500"
          >
            All Things Open
          </a>{' '}
          conference each year! I hope to further contribute to the community by
          presenting on topics such as Tailwind CSS, React, and other frontend
          technologies this year.
        </p>

        <p>
          I have created a few libraries and tools. One example is the{' '}
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/jasonruesch/xlifftranslate"
            className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500"
          >
            xlifftranslate
          </a>{' '}
          library, which is a CLI tool that helps developers manage and
          translate their XLIFF formatted translations using the Google Cloud
          Translation API.
        </p>

        <h3>Code Samples</h3>
        <p>Here are a few code samples that I have worked on recently:</p>
        <div className="space-y-8">
          <h4>Tailwind CSS configuration for use as a preset</h4>
          <SyntaxHighlighter
            language="typescript"
            style={theme}
            showLineNumbers
          >
            {`# grid.ts
import { CSSRuleObject, PluginUtils } from 'tailwindcss/types/config';

export default (theme: PluginUtils['theme']) =>
  ({
    '.grid-layout': {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      gap: theme('spacing.4'),
      paddingLeft: theme('spacing.4'),
      paddingRight: theme('spacing.4'),

      '@media screen(sm)': {
        gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
      },

      '@media screen(md)': {
        paddingLeft: theme('spacing.10'),
        paddingRight: theme('spacing.10'),
      },

      '@media screen(lg)': {
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
      },

      '@media screen(xl)': {
        gap: theme('spacing.6'),
      },

      '@media screen(2xl)': {
        width: '100%',
        maxWidth: theme('screens.2xl'),
        paddingLeft: theme('spacing.12'),
        paddingRight: theme('spacing.12'),
        marginLeft: 'auto',
        marginRight: 'auto',
      },

      '&.has-sidebar': {
        '@media screen(lg)': {
          paddingLeft: theme('spacing.6'),
          paddingRight: theme('spacing.6'),
        },

        '@media screen(2xl)': {
          paddingLeft: theme('spacing.8'),
          paddingRight: theme('spacing.8'),
        },
      },
    },
  }) satisfies CSSRuleObject;

# tailwind-preset.config.ts
export default {
  theme: {
    ...
    extend: {
      ...
    },
  },
  plugins: [
    ...
    plugin(({ addBase, addComponents, theme }) => {
      addBase(headings(theme));

      addComponents(grid(theme));
      addComponents(buttons(theme));
    }),
  ],
} satisfies Omit<Config, 'content'>;`}
          </SyntaxHighlighter>
          <span className="border-secondary-500 dark:border-secondary-600 border-l-4 bg-neutral-200 py-1 pl-2 dark:bg-neutral-700">
            Omitting the content property since this configuration is strictly
            used as a preset for other configurations.
          </span>

          <h4>Animated outlet for page transitions</h4>
          <SyntaxHighlighter
            language="typescript"
            style={theme}
            showLineNumbers
          >
            {`import { AnimatePresence } from 'framer-motion';

const AnimatedOutlet = ({ context }: { context?: unknown }) => {
  const o = useOutlet(context);
  const [outlet] = useState(o);

  return outlet;
};

...
  <AnimatePresence initial={false}>
    <AnimatedOutlet key={pathname} />
  </AnimatePresence>
...
`}
          </SyntaxHighlighter>

          <h4>Custom types for complex situations</h4>
          <SyntaxHighlighter
            language="typescript"
            style={theme}
            showLineNumbers
          >
            {`import { ReactNode } from 'react';

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type NavigationSubItem = WithRequired<Omit<NavigationItem, 'title'>, 'href'>;

export interface NavigationItem {
  name: string;
  title?: string;
  icon?: ReactNode;
  href?: string;
  children?: NavigationSubItem[];
  end?: boolean;
}

export type Product = 'one' | 'two' | 'three';

export type ProductNavigationItem = WithRequired<Omit<NavigationItem, 'icon' | 'href'>, 'title'> & {
  product: Product;
  selected?: boolean;
};

----------------------------------------------

type HTMLInputProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, HTMLInputElement | HTMLTextAreaElement>,
  'rows'
>;

export type InputProps = HTMLInputProps & { rows?: number };`}
          </SyntaxHighlighter>

          <h4>Wait for requests and track status</h4>
          <SyntaxHighlighter
            language="typescript"
            style={theme}
            showLineNumbers
          >
            {`const requests$: Record<string, Promise<unknown> | undefined> = {};

export type AsyncFunction<T> = () => Promise<T>;

export const waitFor = async <T, U = T>(
  makeRequest: AsyncFunction<U>,
  id?: string,
): Promise<U> => {
  if (!id) return makeRequest();
  if (requests$[id]) return requests$[id] as Promise<U>;

  requests$[id] = makeRequest();
  const results = await requests$[id];

  delete requests$[id];

  return results as U;
};

export const isWaitingFor = (id: string) => !!requests$[id];

/**
 * With 'ready' async action:
 *  -  update loading status
 *  -  trigger async action
 *  -  update with action data AND updated status
 */
export function trackStatusWith<T extends StoreState>(
  set: (state: Partial<T> | ((state: T) => Partial<T>)) => void,
  get: () => T,
) {
  return async (
    action: () => Promise<Partial<T>>,
    waitForId?: string,
  ): Promise<T> =>
    waitFor(async () => {
      if (get().forceSkeleton) return get();

      // Track isLoading state
      set(updateRequestStatus('pending'));

      // Introduce a delay for the skeleton to display a minimum amount of time
      if (get().showSkeleton)
        await new Promise((resolve) => setTimeout(resolve, 450));

      try {
        // Trigger async action
        const updates = await action();
        // Update status
        const withUpdatedRequestStatus = updateRequestStatus<T>('success');
        // Update with action data AND updated status
        set((state: T) => withUpdatedRequestStatus({ ...state, ...updates }));
      } catch (error) {
        console.error(error);

        const withUpdatedRequestStatus = updateRequestStatus<T>('error');
        set((state: T) =>
          withUpdatedRequestStatus({ ...state, errors: [\`\${error}\`] }),
        );
      }

      return get();
    }, waitForId);
}`}
          </SyntaxHighlighter>
        </div>

        <h3>Wrap Up</h3>
        <p>
          I am genuinely excited about the opportunity to join Tailwind Labs and
          contribute to its mission of delivering exceptional developer tools
          and software. I am confident that my blend of technical expertise,
          synergetic spirit, and passion for innovation makes me a valuable
          asset to your team.
        </p>
        <p>
          Thank you for considering my application. I look forward to discussing
          how my skills and experiences align with the needs of your team.
        </p>
      </div>
    </Page>
  );
};
