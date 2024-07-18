import { pages } from '../data/pages';

export function getPageIndex(href: string): number {
  return pages.findIndex((p) => p.href === href);
}
