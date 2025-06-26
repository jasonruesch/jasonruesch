import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./routes/home.tsx'),
  route('about', './routes/about.tsx'),
  route('articles', './routes/articles.tsx'),
  route('projects', './routes/projects.tsx'),
  route('speaking', './routes/speaking.tsx'),
  route('uses', './routes/uses.tsx'),
  route('thank-you', './routes/thank-you.tsx'),
] satisfies RouteConfig;
