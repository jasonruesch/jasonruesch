export function About() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="gradient-heading">
        <span className="heading-lg">About Me</span>
      </h1>
      <div className="max-w-lg text-justify sm:max-w-screen-sm lg:max-w-screen-lg">
        <img
          src="/images/jasonruesch-light-512.png"
          alt="Jason Ruesch"
          className="float-right mb-2 ml-4 mt-4 h-48 w-48 rounded-full shadow-lg sm:h-64 sm:w-64 lg:h-96 lg:w-96 dark:hidden dark:shadow-black [&]:[shape-outside:circle()]"
        />
        <img
          src="/images/jasonruesch-dark-512.png"
          alt="Jason Ruesch"
          className="float-right mb-2 ml-4 mt-4 hidden h-48 w-48 rounded-full shadow-lg sm:h-64 sm:w-64 lg:h-96 lg:w-96 dark:block dark:shadow-black [&]:[shape-outside:circle()]"
        />
        <p className="mb-4">
          I hold a Bachelor of Science in Computer Science and have dedicated my
          career to the dynamic world of web development. My focus is on
          crafting intuitive and visually stunning interfaces that elevate user
          experiences.
        </p>
        <p className="mb-4">
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
    </div>
  );
}

export default About;
