/* eslint-disable jsx-a11y/anchor-is-valid */
import { useProjects } from '@jasonruesch/jasonruesch-data-access';
import missing from '../../assets/missing.svg';
import { Page } from '../page';

export function Projects() {
  const { showSkeleton, allProjects } = useProjects();

  return (
    <Page>
      <div className="flex flex-1 flex-col items-center gap-4 text-center">
        <h1 className="gradient-heading" aria-label="My Software Projects">
          <div className="flex items-center justify-center">
            <span className="heading-lg">My&nbsp;</span>
            Software
          </div>
          <div className="flex items-center justify-center">
            <span className="heading-lg">Projects</span>
          </div>
        </h1>
        <p>
          Step into a realm where lines of code transform into functional
          marvels.
          <br />
          Discover a collection of my software projects, each a testament to my
          dedication to innovation and craftsmanship.
          <br />
          Explore diverse applications, tools, and experiments that reflect my
          journey in the realm of software development.
        </p>

        <div className="mt-8 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {showSkeleton
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  className="flex animate-pulse flex-col items-center gap-4"
                  key={index}
                >
                  <div className="my-1 h-6 w-1/2 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                  <div className="h-[225px] w-[300px] rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                  <p className="my-[5px] flex w-full flex-col items-center gap-[10px]">
                    <span className="h-[18px] w-3/4 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                    <span className="h-[18px] w-full rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                    <span className="h-[18px] w-1/2 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                  </p>
                  <div className="flex w-full justify-center gap-4">
                    <div className="my-px h-8 w-1/3 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                    <div className="my-px h-8 w-1/3 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
                  </div>
                </div>
              ))
            : allProjects.map((project) => (
                <div
                  className="flex flex-col items-center gap-4"
                  key={project.id}
                >
                  <h2 className="text-2xl font-bold">{project.name}</h2>
                  <div className="h-[225px] w-[300px] overflow-hidden rounded-lg text-neutral-500 dark:text-neutral-400">
                    <img
                      src={project.imageUrl ?? missing}
                      alt={project.name}
                      className="rounded-lg"
                      onError={(event) => {
                        const target = event.target as HTMLImageElement;
                        target.src = missing;
                      }}
                    />
                  </div>
                  <p className="text-lg">{project.description}</p>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                    <a
                      href="#"
                      className="btn-neutral"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Source
                    </a>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </Page>
  );
}

export default Projects;
