import { NavLink } from 'react-router';

export function AppNav() {
  return (
    <nav className="flex items-center gap-2 p-4">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/about" end>
        About
      </NavLink>
    </nav>
  );
}
