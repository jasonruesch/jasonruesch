export interface FeatureFlag {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
}

export const defaultFlags: FeatureFlag[] = [
  {
    key: 'all_navigation',
    name: 'Show All Navigation',
    description: 'Show all navigation items',
    enabled: false,
  },
  {
    key: 'hidden_navigation',
    name: 'Show Hidden Navigation',
    description: 'Show hidden navigation items',
    enabled: false,
  },
];
