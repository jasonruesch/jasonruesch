import { PageMeta } from '../models';
import { easterEggId } from '../utils';

const easterEggPage: PageMeta = {
  name: 'Easter Egg',
  href: `/easter-egg/${easterEggId}`,
};
const homePage: PageMeta = {
  name: 'Home',
  href: '/',
  navType: 'primary',
};
const aboutPage: PageMeta = {
  name: 'About',
  href: '/about',
  navType: 'primary',
};
const articlesPage: PageMeta = {
  name: 'Articles',
  href: '/articles',
  navType: 'primary',
  hidden: true,
};
const projectsPage: PageMeta = {
  name: 'Projects',
  href: '/projects',
  navType: 'primary',
  hidden: true,
};
const usesPage: PageMeta = {
  name: 'Uses',
  href: '/uses',
  navType: 'primary',
  hidden: true,
};
const builtWithPage: PageMeta = {
  name: 'Built With',
  href: '/built-with',
  navType: 'primary',
  hidden: true,
};
const contactPage: PageMeta = {
  name: 'Contact',
  href: '/contact',
  navType: 'primary',
};
const changelogPage: PageMeta = {
  name: 'Changelog',
  href: '/changelog',
  navType: 'primary',
  hidden: true,
};
const privacyPage: PageMeta = {
  name: 'Privacy Policy',
  href: '/privacy',
};

const blankPage: PageMeta = {
  name: 'Blank',
  href: '/blank',
};
const transparentPage: PageMeta = {
  name: 'Transparent',
  href: '/transparent',
};
const loginPage: PageMeta = {
  name: 'Sign In',
  href: '/login',
};
const logoutPage: PageMeta = {
  name: 'Sign Out',
  href: '/logout',
  skipAnimations: true,
  authenticated: true,
};
const adminPage: PageMeta = {
  name: 'Admin',
  href: '/admin',
  navType: 'primary',
  authenticated: true,
};

export const pages: PageMeta[] = [
  easterEggPage,
  homePage,
  aboutPage,
  articlesPage,
  projectsPage,
  usesPage,
  builtWithPage,
  contactPage,
  changelogPage,
  privacyPage,
  blankPage,
  transparentPage,
  loginPage,
  logoutPage,
  adminPage,
];

export const primaryNavPages = (includeHidden = false, authenticated = false) =>
  pages.filter(
    (page) =>
      page.navType === 'primary' &&
      (!page.hidden || includeHidden) &&
      (!page.authenticated || authenticated),
  );
