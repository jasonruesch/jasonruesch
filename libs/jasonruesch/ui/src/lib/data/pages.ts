import { PageMeta } from '../models';
import { easterEggId } from '../utils';

const easterEggPage: PageMeta = {
  name: 'Easter Egg',
  href: `/easter-egg/${easterEggId}`,
};
const homePage: PageMeta = {
  name: 'Home',
  href: '/',
  type: 'primary',
};
const aboutPage: PageMeta = {
  name: 'About',
  href: '/about',
  type: 'primary',
};
const articlesPage: PageMeta = {
  name: 'Articles',
  href: '/articles',
  type: 'primary',
};
const projectsPage: PageMeta = {
  name: 'Projects',
  href: '/projects',
  type: 'primary',
};
const usesPage: PageMeta = {
  name: 'Uses',
  href: '/uses',
  type: 'primary',
};
const contactPage: PageMeta = {
  name: 'Contact',
  href: '/contact',
  type: 'primary',
};
const privacyPage: PageMeta = {
  name: 'Privacy Policy',
  href: '/privacy',
};

export const pages: PageMeta[] = [
  easterEggPage,
  homePage,
  aboutPage,
  articlesPage,
  projectsPage,
  usesPage,
  contactPage,
  privacyPage,
];
