export interface PageMeta {
  name: string;
  href: string;
  navType?: 'primary';
  hidden?: boolean;
  authenticated?: boolean;
  skipAnimations?: boolean;
}
