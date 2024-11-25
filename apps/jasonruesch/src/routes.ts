import App from './app/app';
import Fallback from './app/fallback';

export default [
  {
    path: '/',
    Component: App,
    hydrateFallback: Fallback,
    children: [
      {
        path: '/',
        file: './routes/home',
      },
      {
        path: 'about',
        file: './routes/about',
      },
      {
        path: 'articles',
        file: './routes/articles',
      },
      {
        path: 'projects',
        file: './routes/projects',
      },
      {
        path: 'uses',
        file: './routes/uses',
      },
      {
        path: 'built-with',
        file: './routes/built-with',
      },
      {
        path: 'contact',
        file: './routes/contact',
      },
      {
        path: 'changelog',
        file: './routes/changelog',
      },
      {
        path: 'blank',
        file: './routes/blank',
      },
      {
        path: 'transparent',
        file: './routes/transparent',
      },
      {
        path: 'easter-egg/:uid',
        file: './routes/easter-egg',
      },
      {
        path: 'privacy',
        file: './routes/privacy',
      },
      {
        path: 'login',
        file: './routes/login',
      },
      {
        path: 'logout',
        file: './routes/logout',
      },
      {
        path: 'admin',
        file: './routes/admin',
      },
      {
        path: '*',
      },
    ],
  },
];
