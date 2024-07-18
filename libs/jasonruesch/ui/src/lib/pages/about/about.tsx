import { Page } from '../../components';

export function About() {
  return (
    <Page contentClassName="flex flex-col items-center justify-center max-w-lg sm:max-w-[var(--breakpoint-sm)] lg:max-w-[var(--breakpoint-lg)] mx-auto">
      <h1 className="gradient-heading" aria-label="About Me">
        <div className="flex items-center justify-center">
          About&nbsp;
          <span className="heading-lg">Me</span>
        </div>
      </h1>
      <div className="text-justify">
        <img
          src="/images/jasonruesch-light-512.png"
          alt="Jason Ruesch"
          className="float-right mt-4 mb-2 ml-4 h-48 w-48 rounded-full shadow-lg sm:h-64 sm:w-64 lg:h-96 lg:w-96 dark:hidden dark:shadow-black [&]:[shape-outside:circle()]"
        />
        <img
          src="/images/jasonruesch-dark-512.png"
          alt="Jason Ruesch"
          className="float-right mt-4 mb-2 ml-4 hidden h-48 w-48 rounded-full shadow-lg sm:h-64 sm:w-64 lg:h-96 lg:w-96 dark:block dark:shadow-black [&]:[shape-outside:circle()]"
        />
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
