import { easterEggId } from './utils';

export interface PageMeta {
  name: string;
  href: string;
  type?: 'primary';
}

export const easterEggPage: PageMeta = {
  name: 'Easter Egg',
  href: `/easter-egg/${easterEggId}`,
};
export const homePage: PageMeta = {
  name: 'Home',
  href: '/',
  type: 'primary',
};
export const aboutPage: PageMeta = {
  name: 'About',
  href: '/about',
  type: 'primary',
};
export const contactPage: PageMeta = {
  name: 'Contact',
  href: '/contact',
  type: 'primary',
};
export const privacyPage: PageMeta = {
  name: 'Privacy Policy',
  href: '/privacy',
};

export const pages: PageMeta[] = [
  easterEggPage,
  homePage,
  aboutPage,
  // articlesPage,
  // projectsPage,
  // usesPage,
  contactPage,
  privacyPage,
];

export function getPageIndex(href: string): number {
  return pages.findIndex((p) => p.href === href);
}
