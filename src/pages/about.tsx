import clsx from 'clsx';

import portraitImage from '../assets/images/portrait.jpg';
import { Button, Container, GitHubIcon, LinkedInIcon } from '../components';

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center text-sm font-medium text-zinc-800 transition hover:text-cyan-500 dark:text-zinc-200 dark:hover:text-violet-400"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-cyan-500 dark:group-hover:fill-violet-400" />
        <span className="ml-4">{children}</span>
      </a>
    </li>
  );
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function Contact() {
  const recipient = 'jason.ruesch@me.com';

  const handleSubmit = () => {
    window.open(`mailto:${recipient}`, '_blank');
  };

  return (
    <form
      action="/thank-you"
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <input type="hidden" name="type" value="contact" />
      <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Get in touch</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Feel free to connect with me to discuss all things frontend development,
        share recommendations for must-watch shows, or exchange thoughts on the
        latest gaming adventures. Let's explore the digital world together!
      </p>
      <Button type="submit" className="mt-6">
        Send me an email
      </Button>
    </form>
  );
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="px-2.5 sm:max-w-xs lg:max-w-none">
            <img
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, (min-width: 640px) 20rem, 40rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I'm Jason Ruesch. I live in Raleigh, NC, where I develop and design
            software.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I have dedicated my career to the dynamic world of web
              development. My focus is on crafting intuitive and visually
              stunning interfaces that elevate user experiences.
            </p>
            <p>
              When I'm not immersed in code, you'll likely find me exploring
              virtual realms in video games or catching up on the latest movies
              and TV shows. My love for technology extends beyond my
              profession—I'm always excited to dive into the latest software
              development technologies, staying at the forefront of this
              ever-evolving field.
            </p>
            <p>
              Beyond my professional pursuits, my family is my anchor. Spending
              quality time with them is incredibly important to me. Whether it's
              a weekend adventure or a cozy evening together, their support
              fuels my drive to excel in both my personal and professional life.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://github.com/jasonruesch"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/jasonruesch"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
          </ul>
          <div className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
            <Contact />
          </div>
        </div>
      </div>
    </Container>
  );
}
