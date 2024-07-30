import { pages } from '../data/pages';
import { PageMeta } from '../models';

export function getPageIndex(href: string): number {
  return pages.findIndex((p) => p.href === href);
}

export function getPage(href: string): PageMeta | undefined {
  return pages.find((p) => p.href === href);
}
