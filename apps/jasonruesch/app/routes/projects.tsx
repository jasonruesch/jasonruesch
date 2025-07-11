import { Card, LinkIcon, SimpleLayout } from '@jasonruesch/ui';

interface Project {
  name: string;
  description: string;
  link: { href: string; label: string };
  logo: string;
}

const projects: Project[] = [
  // {
  //   name: 'Planetaria',
  //   description:
  //     'Creating technology to empower civilians to explore space on their own terms.',
  //   link: { href: 'http://planetaria.tech', label: 'planetaria.tech' },
  //   logo: logoPlanetaria,
  // },
  // {
  //   name: 'Animaginary',
  //   description:
  //     'High performance web animation library, hand-written in optimized WASM.',
  //   link: { href: '#', label: 'github.com' },
  //   logo: logoAnimaginary,
  // },
  // {
  //   name: 'HelioStream',
  //   description:
  //     'Real-time video streaming library, optimized for interstellar transmission.',
  //   link: { href: '#', label: 'github.com' },
  //   logo: logoHelioStream,
  // },
  // {
  //   name: 'cosmOS',
  //   description:
  //     'The operating system that powers our Planetaria space shuttles.',
  //   link: { href: '#', label: 'github.com' },
  //   logo: logoCosmos,
  // },
  // {
  //   name: 'OpenShuttle',
  //   description:
  //     'The schematics for the first rocket I designed that successfully made it to orbit.',
  //   link: { href: '#', label: 'github.com' },
  //   logo: logoOpenShuttle,
  // },
];

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I've made trying to put my dent in the universe."
      intro="I've worked on tons of little projects over the years but these are the ones that I'm most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
    >
      {projects.length ? (
        <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <img src={project.logo} alt="" className="h-8 w-8" />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link to={project.link.href} external>
                  {project.name}
                </Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex items-center text-sm font-medium text-zinc-400 transition group-hover:text-cyan-500 dark:text-zinc-200 dark:group-hover:text-violet-400">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      ) : (
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            <Card>
              <Card.Title>Coming soon</Card.Title>
              <Card.Description>
                No projects to show yet. Check back soon!
              </Card.Description>
            </Card>
          </div>
        </div>
      )}
    </SimpleLayout>
  );
}
