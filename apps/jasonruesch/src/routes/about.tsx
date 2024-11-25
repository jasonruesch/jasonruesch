import { twJoin } from 'tailwind-merge';
import { Page } from '../../../../libs/jasonruesch/ui/src/lib/components';

export default function About() {
  return (
    <Page contentClassName="flex flex-col items-center justify-center lg:max-w-[var(--breakpoint-lg)] mx-auto">
      <h1 className="gradient-heading" aria-label="About Me">
        <div className="flex items-center justify-center" aria-hidden="true">
          About&nbsp;
          <span className="heading-lg">Me</span>
        </div>
      </h1>
      <div className="text-justify">
        <div
          className={twJoin(
            'float-right py-4 pl-4 [&]:[shape-outside:circle()]',
          )}
        >
          <img
            src="/images/jasonruesch-512.png"
            alt="Jason Ruesch"
            className={twJoin(
              'size-48 rounded-full ring-2 sm:size-64 lg:size-96',
              'ring-neutral-500 dark:ring-teal-400',
              'backdrop-blur-sm',
            )}
          />
        </div>
        <p>
          I hold a Bachelor of Science in Computer Science and have dedicated my
          career to the dynamic world of web development. My focus is on
          crafting intuitive and visually stunning interfaces that elevate user
          experiences.
        </p>
        <p>
          When I'm not immersed in code, you'll likely find me exploring virtual
          realms in video games or catching up on the latest movies and TV
          shows. My love for technology extends beyond my profession—I'm always
          excited to dive into the latest software development technologies,
          staying at the forefront of this ever-evolving field.
        </p>
        <p>
          Beyond my professional pursuits, my family is my anchor. Spending
          quality time with them is incredibly important to me. Whether it's a
          weekend adventure or a cozy evening together, their support fuels my
          drive to excel in both my personal and professional life.
        </p>
      </div>
    </Page>
  );
}
