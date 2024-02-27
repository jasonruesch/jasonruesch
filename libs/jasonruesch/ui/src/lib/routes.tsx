import { Navigate, Route } from 'react-router-dom';
import About from './about/about';
import Contact from './contact/contact';
import Home from './home/home';
import Privacy from './privacy/privacy';

export const routes = (
  <>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="privacy" element={<Privacy />} />
    <Route path="*" element={<Navigate to="/" />} />
  </>
);
