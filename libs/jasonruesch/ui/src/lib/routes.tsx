import { Navigate, Route } from 'react-router-dom';
import About from './about/about';
import Blank from './blank/blank';
import Contact from './contact/contact';
import Home from './home/home';
import Privacy from './privacy/privacy';
import Projects from './projects/projects';
import { ResumeTailwindLabs } from './resumes/resume-tailwind-labs';
import Transparent from './transparent/transparent';

export const routes = (
  <>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="projects" element={<Projects />} />
    <Route path="contact" element={<Contact />} />
    <Route path="resumes">
      <Route index element={<Navigate to="/" />} />
      <Route path="tailwind-labs" element={<ResumeTailwindLabs />} />
    </Route>
    <Route path="privacy" element={<Privacy />} />
    <Route path="blank" element={<Blank />} />
    <Route path="transparent" element={<Transparent />} />
    <Route path="*" element={<Navigate to="/" />} />
  </>
);
