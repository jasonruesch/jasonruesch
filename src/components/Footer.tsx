import { NavLink } from 'react-router';
import { ContainerInner, ContainerOuter } from './Container';

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  // { name: "Articles", to: "/articles" },
  // { name: "Projects", to: "/projects" },
  // { name: "Speaking", to: "/speaking" },
  { name: 'Uses', to: '/uses' },
];

function Link({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className="transition hover:text-cyan-500 dark:hover:text-violet-400"
    >
      {children}
    </NavLink>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {navigation.map(({ to, name }) => (
                  <Link key={to} to={to}>
                    {name}
                  </Link>
                ))}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                &copy; {new Date().getFullYear()} Jason Ruesch. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
