import { NavLink } from "react-router";
import { ContainerInner, ContainerOuter } from "./Container";

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
        <div className="border-t border-neutral-100 pt-10 pb-16 dark:border-neutral-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                <Link to="/about">About</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/speaking">Speaking</Link>
                <Link to="/uses">Uses</Link>
              </div>
              <p className="text-sm text-neutral-400 dark:text-neutral-500">
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
