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
const contactPage: PageMeta = {
  name: 'Contact',
  href: '/contact',
  navType: 'primary',
};
const privacyPage: PageMeta = {
  name: 'Privacy Policy',
  href: '/privacy',
};
const blankPage: PageMeta = {
  name: 'Blank',
  href: '/blank',
  hidden: true,
};
const transparentPage: PageMeta = {
  name: 'Transparent',
  href: '/transparent',
  hidden: true,
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
  blankPage,
  transparentPage,
];

export const primaryNavPages = (includeHidden?: boolean) =>
  pages.filter(
    (page) => page.navType === 'primary' && (!page.hidden || includeHidden),
  );
