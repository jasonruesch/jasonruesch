import { twJoin } from 'tailwind-merge';
import { Page } from '../../components';

export function About() {
  return (
    <Page contentClassName="flex flex-col items-center justify-center lg:max-w-[var(--breakpoint-lg)] mx-auto">
      <h1 className="gradient-heading" aria-label="About Me">
        <div className="flex items-center justify-center" aria-hidden="true">
          About&nbsp;
          <span className="heading-lg">Me</span>
        </div>
      </h1>
      <div className="text-justify">
        <img
          src="/images/jasonruesch-512.png"
          alt="Jason Ruesch"
          className={twJoin(
            'float-right mt-4 mb-2 ml-4 h-48 w-48 rounded-full ring-2 sm:h-64 sm:w-64 lg:h-96 lg:w-96 [&]:[shape-outside:circle()]',
            'ring-fuchsia-500 dark:ring-teal-400',
            'backdrop-blur-sm',
          )}
        />
        {/* <img
          src="/images/jasonruesch-light-512.png"
          alt="Jason Ruesch"
          className={twJoin(
            'float-right mt-4 mb-2 ml-4 h-48 w-48 rounded-full ring-2 sm:h-64 sm:w-64 lg:h-96 lg:w-96 [&]:[shape-outside:circle()]',
            'ring-cyan-500 dark:hidden',
          )}
        />
        <img
          src="/images/jasonruesch-dark-512.png"
          alt="Jason Ruesch"
          className={twJoin(
            'float-right mt-4 mb-2 ml-4 h-48 w-48 rounded-full ring-2 sm:h-64 sm:w-64 lg:h-96 lg:w-96 [&]:[shape-outside:circle()]',
            'hidden dark:block dark:ring-violet-400',
          )}
        /> */}
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
