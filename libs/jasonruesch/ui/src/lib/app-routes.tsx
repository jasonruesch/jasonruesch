import { Navigate, Route, Routes, RoutesProps } from 'react-router-dom';

import { Page } from './components';
import {
  About,
  Articles,
  BuiltWith,
  Contact,
  EasterEgg,
  Home,
  Privacy,
  Projects,
  Transparent,
  Uses,
} from './pages';

export const AppRoutes = ({ location }: RoutesProps) => {
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/uses" element={<Uses />} />
      <Route path="/built-with" element={<BuiltWith />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blank" element={<Page />} />
      <Route path="/transparent" element={<Transparent />} />
      <Route path="easter-egg/:uid" element={<EasterEgg />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
